import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import { MENU } from '@/data/menu';
import { locales, type Locale } from '@/i18n';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001';

/* ─────────────────────────────────────────────────────────────────────
 * Shared menu context — compact, deterministic.
 * ──────────────────────────────────────────────────────────────────── */
function buildMenuContext(): string {
  return MENU.map((d) => {
    const allergens = d.allergens.length ? `allergens=[${d.allergens.join(',')}]` : 'allergens=[]';
    const tags = d.tags.join(',');
    return [
      `- ${d.id} | category=${d.category}`,
      `  en="${d.name.en}" — ${d.description.en}`,
      `  tags=[${tags}] ${allergens}`,
      `  nutrition: ${d.nutrition.calories}kcal, P${d.nutrition.protein} C${d.nutrition.carbs} F${d.nutrition.fat}`,
      d.spiceLevel ? `  spice=${d.spiceLevel}/3` : ''
    ]
      .filter(Boolean)
      .join('\n');
  }).join('\n');
}

const SYSTEM_PREFIX = `You are Anubis, the AI menu guide for a luxury modern Egyptian restaurant.
Pick 1–3 perfect dishes from the menu below based on the diner's mood, diet and constraints.
Hard rules:
- Respect declared allergies absolutely.
- Respect diet tags (vegan / vegetarian / halal / gluten_free).
- Be warm, brief, evocative — like a knowledgeable host, never a salesperson.`;

const RECOMMEND_TOOL: Anthropic.Tool = {
  name: 'recommend_dishes',
  description:
    'Return 1–3 dish recommendations. dish_ids must be exact ids from the menu list.',
  input_schema: {
    type: 'object',
    properties: {
      dish_ids: {
        type: 'array',
        items: { type: 'string' },
        minItems: 1,
        maxItems: 3
      },
      reasoning: { type: 'string' },
      pairing_tip: { type: 'string' }
    },
    required: ['dish_ids', 'reasoning']
  }
};

type ChatMessage = { role: 'user' | 'assistant'; content: string };

interface RequestBody {
  messages: ChatMessage[];
  locale: Locale;
}

interface Recommendation {
  dish_ids: string[];
  reasoning: string;
  pairing_tip: string;
  provider: 'anthropic' | 'pollinations' | 'local';
}

/* ─────────────────────────────────────────────────────────────────────
 * POST /api/ai
 * ──────────────────────────────────────────────────────────────────── */
export async function POST(req: Request) {
  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: 'BAD_JSON' }, { status: 400 });
  }

  const { messages, locale } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'NO_MESSAGES' }, { status: 400 });
  }
  if (!locales.includes(locale)) {
    return NextResponse.json({ error: 'BAD_LOCALE' }, { status: 400 });
  }

  const menuCtx = buildMenuContext();
  const trimmed = messages.slice(-6);
  const lastIdx = trimmed.length - 1;
  if (trimmed[lastIdx].role === 'user') {
    trimmed[lastIdx] = {
      role: 'user',
      content: `[diner_language=${locale}]\n${trimmed[lastIdx].content}`
    };
  }

  // 1) Try Anthropic (premium quality if key present)
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const r = await callAnthropic(menuCtx, trimmed);
      return NextResponse.json(r);
    } catch (err) {
      console.warn('[ai] anthropic failed, falling back:', err);
    }
  }

  // 2) Fallback to Pollinations text API (free, no key required)
  try {
    const r = await callPollinations(menuCtx, trimmed, locale);
    return NextResponse.json(r);
  } catch (err) {
    console.warn('[ai] pollinations failed, falling back to local:', err);
  }

  // 3) Last resort — local heuristic
  return NextResponse.json(localRecommend(trimmed[lastIdx]?.content ?? '', locale));
}

/* ─────────────────────────────────────────────────────────────────────
 * Provider 1 — Anthropic (Claude) via tool-use
 * ──────────────────────────────────────────────────────────────────── */
async function callAnthropic(menuCtx: string, messages: ChatMessage[]): Promise<Recommendation> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const response = await client.messages.create({
    model: ANTHROPIC_MODEL,
    max_tokens: 600,
    system: [
      { type: 'text', text: SYSTEM_PREFIX },
      { type: 'text', text: `\n\nMENU:\n${menuCtx}`, cache_control: { type: 'ephemeral' } }
    ],
    tools: [RECOMMEND_TOOL],
    tool_choice: { type: 'tool', name: 'recommend_dishes' },
    messages: messages.map((m) => ({ role: m.role, content: m.content }))
  });

  const toolBlock = response.content.find((b) => b.type === 'tool_use') as
    | Anthropic.ToolUseBlock
    | undefined;
  if (!toolBlock) throw new Error('NO_TOOL_USE');

  const input = toolBlock.input as {
    dish_ids: string[];
    reasoning: string;
    pairing_tip?: string;
  };
  return {
    dish_ids: input.dish_ids.filter((id) => MENU.some((d) => d.id === id)),
    reasoning: input.reasoning,
    pairing_tip: input.pairing_tip ?? '',
    provider: 'anthropic'
  };
}

/* ─────────────────────────────────────────────────────────────────────
 * Provider 2 — Pollinations text API (free, OpenAI-compatible)
 * ──────────────────────────────────────────────────────────────────── */
async function callPollinations(
  menuCtx: string,
  messages: ChatMessage[],
  locale: Locale
): Promise<Recommendation> {
  const systemPrompt = `${SYSTEM_PREFIX}

MENU:
${menuCtx}

OUTPUT FORMAT — reply with ONLY a single JSON object, no surrounding prose, no markdown fences:
{
  "dish_ids": ["<exact dish id from menu>", ...],
  "reasoning": "<2-4 warm sentences in the diner's language (${locale})>",
  "pairing_tip": "<optional one-line pairing in same language, or empty string>"
}`;

  const res = await fetch('https://text.pollinations.ai/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'openai',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.content }))
      ],
      seed: 42,
      jsonMode: true
    })
  });
  if (!res.ok) throw new Error(`pollinations ${res.status}`);

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const raw = data.choices?.[0]?.message?.content?.trim() ?? '';
  const json = extractJson(raw);
  if (!json) throw new Error('NO_JSON');

  const parsed = JSON.parse(json) as {
    dish_ids?: string[];
    reasoning?: string;
    pairing_tip?: string;
  };
  const dish_ids = (parsed.dish_ids ?? []).filter((id) => MENU.some((d) => d.id === id));
  if (dish_ids.length === 0) throw new Error('NO_DISHES');

  return {
    dish_ids,
    reasoning: parsed.reasoning ?? '',
    pairing_tip: parsed.pairing_tip ?? '',
    provider: 'pollinations'
  };
}

function extractJson(raw: string): string | null {
  // Try fenced code block first
  const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) return fence[1].trim();
  // Else first { ... last }
  const first = raw.indexOf('{');
  const last = raw.lastIndexOf('}');
  if (first >= 0 && last > first) return raw.slice(first, last + 1);
  return null;
}

/* ─────────────────────────────────────────────────────────────────────
 * Provider 3 — Local heuristic (last resort, always succeeds)
 * ──────────────────────────────────────────────────────────────────── */
const FALLBACK_COPY: Record<Locale, string> = {
  ar: 'إليك مجموعة مختارة من اختيار الشيف — استمتع بمائدتك.',
  en: "Here's a chef's selection — enjoy your table.",
  fr: 'Voici une sélection du chef — bon appétit.',
  de: 'Eine Auswahl des Küchenchefs — guten Appetit.',
  it: 'Una selezione dello chef — buon appetito.',
  ru: 'Подборка от шефа — приятного аппетита.',
  tr: 'Şefin seçimi — afiyet olsun.'
};

function localRecommend(userText: string, locale: Locale): Recommendation {
  const lower = userText.toLowerCase();
  const wantsSpicy = /spic|hot|chil|baharat|острое|épice|scharf|piccant/.test(lower);
  const wantsVegan = /vegan|نباتي|végan/.test(lower);
  const wantsSweet = /sweet|dessert|tatlı|сладк|dolce|süß/.test(lower);

  let pool = MENU;
  if (wantsVegan) pool = pool.filter((d) => d.tags.includes('vegan'));
  if (wantsSpicy) pool = pool.filter((d) => d.tags.includes('spicy'));
  if (wantsSweet) pool = pool.filter((d) => d.category === 'desserts');
  if (pool.length === 0) pool = MENU.filter((d) => d.tags.includes('chef_pick'));

  const picks = pool.slice(0, 3).map((d) => d.id);
  return {
    dish_ids: picks,
    reasoning: FALLBACK_COPY[locale],
    pairing_tip: '',
    provider: 'local'
  };
}
