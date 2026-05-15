# 𓂀 Anubis — Royal Egyptian QR Menu

Fine-dining, AI-powered, multi-sensory QR menu for restaurants in Egypt.
Built to be visually mesmerising as well as functional — every interaction
is a micro-spectacle, every dish carries its history, and the entire menu
adapts to a guest's mood in milliseconds.

## ✨ Headline features

- **7 languages** — Arabic (RTL), English, French, German, Italian, Russian, Turkish
- **Parallax hieroglyph background** — 3 SVG layers drift at different scroll speeds; sand specks float on top
- **Glassmorphism dish cards** — full-bleed food photo with a frosted-glass content panel laid over the lower half
- **Ingredient-journey map** — every dish opens a stylized SVG map of Egypt where signature ingredients trace animated paths from their region to the plate
- **Sommelier-style pairing** — every dish whispers “you must try this with…” and one tap swaps you to the paired drink or dessert
- **Bento-box layout** — variable-sized tiles, chef-picks become hero cards
- **Ingredient burst** — on hover/tap, ingredient labels disperse outward from the dish and re-gather
- **Mood-based smart filter** — `Light`, `Spicy festival`, `Sweet craving`, `Classic Egypt`, `In a hurry`, `Power plate`
- **Origin stories** — papyrus-scroll modal unfurls the dish’s history (Pharaonic, Coptic, Mamluk, Abbasid, Fatimid eras)
- **Live nutrition** — kcal / P / C / F / fiber / sodium per dish
- **9-allergen filter** — one-tap excludes any combination
- **Chef’s note + prep time + spice level** badges on every card
- **AI menu guide (Anubis)** — Claude API, structured tool-use, prompt-cached menu context
- **Feast Table cart** — golden-rimmed plates compose a banquet, tap to send back, live kcal/EGP total
- **Restaurant-soul microcopy** — “Begin the feast”, “Lift the silver dome”, “Close the bill”, “Send it back” — never robotic
- **Modern luxury Egyptian theme** — deep nile + gold, hieroglyph dividers, gold-shine typography, sand drift
- **Cinematic motion** — Framer Motion across every page, modal, card, button

## 🚀 Quick start

```bash
cd qr-menu
cp .env.example .env.local            # then edit and add ANTHROPIC_API_KEY
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — auto-redirects to the language splash.

## 🔑 Environment

| Variable               | Required | Default                          | Notes                                                                                            |
| ---------------------- | -------- | -------------------------------- | ------------------------------------------------------------------------------------------------ |
| `ANTHROPIC_API_KEY`    | optional | —                                | Without it the chat shows a friendly fallback; the rest of the menu (including moods) is local.  |
| `ANTHROPIC_MODEL`      | optional | `claude-haiku-4-5-20251001`      | Switch to `claude-sonnet-4-6` for richer recommendations.                                        |
| `UNSPLASH_ACCESS_KEY`  | optional | —                                | Enables official Unsplash search API (better quality, attribution, 24h cache). Without it, photos still load via `source.unsplash.com` — never placeholders. |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD` | optional | — | Your Cloudinary cloud name. Used by the `cloudinary()` helper for custom dish photography. |
| `NEXT_PUBLIC_FIREBASE_BUCKET` | optional | — | Your Firebase Storage bucket. Used by the `firebase()` helper for custom dish photography. |

## 🗺️ Routes

| Path             | What                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| `/`              | Auto-redirects to `/en`                                                                                 |
| `/[locale]`      | Splash + 7-language picker over pyramid scene                                                           |
| `/[locale]/menu` | Bento menu, mood filter, story scrolls, feast                                                           |
| `/[locale]/ai`   | Anubis AI chat                                                                                          |
| `/api/ai`        | Claude-powered recommendation API (tool-use)                                                            |
| `/api/image`     | Image proxy. `?q=keywords&w=1200&h=800&sig=dish-id` → Unsplash API (if key) or `source.unsplash.com`, 24h cache |

## 🍽️ Authoring content

Everything is driven by **two files**:

- [src/data/menu.ts](src/data/menu.ts) — 18 dishes × 7 languages × nutrition × allergens × ingredients × chef notes × prep time × bento size
- [src/data/stories.ts](src/data/stories.ts) — origin stories for chef-pick dishes (era, title, body, 7 languages)

Edit either and every page re-renders.

## 🧩 Architecture

```
src/
├── app/
│   ├── api/ai/route.ts            # Claude prompt-cached tool-use
│   └── [locale]/                  # Locale-scoped pages
│       ├── layout.tsx             # i18n + CartProvider + preconnects
│       ├── page.tsx               # Splash
│       ├── menu/page.tsx          # Menu
│       └── ai/page.tsx            # Anubis chat
├── components/
│   ├── PyramidScene.tsx           # SVG parallax desert / sun / dunes / sand
│   ├── HieroglyphDivider.tsx      # 𓂀 𓆣 𓋹 animated rule
│   ├── LanguagePicker.tsx
│   ├── MoodFilter.tsx             # Mood chips (light/spicy/sweet/...)
│   ├── BentoGrid.tsx              # Variable-span grid
│   ├── DishCard.tsx               # Burst, badges, chef note, add-to-feast
│   ├── DishModal.tsx              # Full detail + story CTA
│   ├── StoryModal.tsx             # Papyrus scroll unfurl
│   ├── FeastTable.tsx             # Banquet-style cart
│   ├── IngredientBurst.tsx        # Radial label disperse animation
│   ├── MenuView.tsx               # Composes everything
│   └── AIChat.tsx                 # Claude chat surface
├── data/
│   ├── menu.ts                    # All dishes + mood heuristics
│   └── stories.ts                 # Historical narratives
├── lib/
│   ├── cart.tsx                   # Feast cart context (localStorage-backed)
│   └── utils.ts                   # cn() helper
├── i18n.ts                        # Locale metadata (incl. RTL flag)
└── middleware.ts                  # Locale routing
```

## 📸 Photography

Every dish image is real photography, never a placeholder.

1. Each dish in `src/data/menu.ts` calls `img(keywords, sig)` with rich,
   dish-specific keywords (e.g. `"koshari, koshary, egyptian rice lentils pasta, crispy onion, tomato sauce"`) and a stable `sig` (the dish id).
2. The helper produces a URL pointing at `/api/image?q=…&w=1200&h=800&sig=…`.
3. The `/api/image` route (`src/app/api/image/route.ts`) decides at request time:
   - **With `UNSPLASH_ACCESS_KEY`** → calls `api.unsplash.com/search/photos` (orientation-aware, `content_filter=high`, cached 24h via Next data cache), picks a result deterministically from the `sig` (djb2 hash), then redirects to a sized Unsplash transform URL (`fit=crop&q=78&auto=format`).
   - **Without a key** → redirects to `source.unsplash.com/featured/{w}x{h}/?{keywords}&sig={id}` so you still get real photos.
4. The redirect is served with `Cache-Control: public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800` so the browser/edge stops re-resolving.
5. Photo attribution is propagated in the `X-Photo-Attribution` response header (artist name + Unsplash profile URL) for compliance.

To swap in a different image source (your own CDN, S3 etc.) just change `tryUnsplashApi` in `src/app/api/image/route.ts` — the rest of the app is untouched.

### Plugging in your AI-generated photography

For a truly bespoke result (Midjourney / Stable Diffusion / your own camera), upload your photos to Cloudinary or Firebase Storage and swap one helper:

```ts
// src/data/menu.ts
import { cloudinary, firebase } from '@/lib/images';

// Cloudinary — auto crop + AI focal point + WebP/AVIF (recommended)
image: cloudinary('menu/koshary'),
image: cloudinary('menu/hamam-mahshi', { w: 1600, h: 1000, quality: 'auto:best' }),

// Firebase Storage — served as-is, pre-size on upload
image: firebase('menu/koshary.webp'),

// Or paste any absolute URL
image: 'https://cdn.your-restaurant.com/menu/koshary.jpg',
```

Set `NEXT_PUBLIC_CLOUDINARY_CLOUD` (or `NEXT_PUBLIC_FIREBASE_BUCKET`) in `.env.local`. The helpers fall back to a `<your-cloud>` placeholder string if neither is set, so missing config is obvious at a glance.

Cloudinary URLs use:
- `c_fill,g_auto` — Cloudinary AI picks the focal point of each plate
- `q_auto:good` — quality tuned per-image
- `f_auto` — WebP/AVIF when supported, JPEG otherwise

### Image overlays

Every photo in the app is rendered with a `<ImageOverlay>` layer above it:

- `card` — dark top + bottom gradient + gold corner sheen + edge vignette (for menu cards)
- `hero` — light top + heavy bottom for title legibility, gold corner glow (DishModal hero)
- `thumb` — clean bottom gradient (PairingCard thumbnail)
- `plate` — diagonal porcelain sheen + inner shadow (FeastTable round plates)

These keep text crisp on top of any photo, give the menu a fine-dining feel even with very-light or very-dark source images, and are completely pointer-events-none.

All images use `object-cover object-center` so plates are always centered without breaking the card geometry.

## ⚡ Performance

- All heavy modals (`DishModal`, `StoryModal`, `FeastTable`) are `next/dynamic` with `ssr:false` — they only ship to the client when first opened.
- Preconnect / DNS-prefetch hints for fonts and image CDNs in `[locale]/layout.tsx`.
- Every `<img>` has `loading="lazy"` + `decoding="async"`; modal hero images use `loading="eager"`.
- Fonts are `font-display: swap` so first paint never blocks.
- Tailwind purges to a tiny CSS payload; only the icon set actually used is imported (tree-shakeable `lucide-react`).
- Static metadata + `generateStaticParams` makes every locale a static page.
- Anthropic prompt cache: the (~6 KB) menu context lives in a `cache_control: ephemeral` block — every call after the first is a cache hit, sub-cent per recommendation.
- Cart state persists to `localStorage` — survives reloads with no server round-trip.

## 🎨 Theme tokens (`tailwind.config.ts`)

- `nile` (deep blue base) · `gold` (royalty accent) · `sand` (warm desert)
- Single-tone: `papyrus`, `lapis`, `carnelian`
- Gradient utilities: `bg-royal-radial`, `bg-gold-shine`, `bg-papyrus-texture`
- Animations: `animate-shimmer`, `animate-float`, `animate-sandDrift`
- Shadows: `shadow-gold`, `shadow-deepNile`

## 📱 Deploy

```bash
vercel deploy
```

…and point your printed QR codes at the deployed URL. Done.

## 🔮 Roadmap

- Voice input for Anubis (Web Speech API)
- WebXR plate preview
- Restaurant admin panel (edit `menu.ts` from a UI)
- Per-table session + waiter notification webhook
