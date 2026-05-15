/**
 * Image utilities.
 *
 * Strategy: Pollinations AI generates the exact image we describe via prompt.
 * Cloudflare caches the result for a year, so first paint takes 3-6 s and
 * every subsequent visit is instant.
 *
 * Why not raw Unsplash photo IDs? They pass HTTP 200 but the actual photo
 * content is unrelated to what we asked for (we got hikers when we wanted
 * pyramids, and buildings when we wanted food).
 */

import type { Category } from '@/data/menu';

/* ─────────────────────────────────────────────────────────────────── */
/*  djb2 hash for deterministic seeds                                   */
/* ─────────────────────────────────────────────────────────────────── */

export function djb2(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(hash | 0);
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Pollinations AI URL builder                                         */
/* ─────────────────────────────────────────────────────────────────── */

function pollinations(
  prompt: string,
  opts: { w?: number; h?: number; seed?: string | number; model?: 'flux' | 'turbo' } = {}
): string {
  const { w = 1024, h = 640, seed = prompt, model = 'turbo' } = opts;
  const seedNum = typeof seed === 'number' ? seed : djb2(seed);
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(
    prompt
  )}?width=${w}&height=${h}&seed=${seedNum}&model=${model}&nologo=true`;
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Splash hero — Giza pyramids at sunset                              */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Splash hero — REAL HD Giza pyramids photo, sunset over Cairo.
 * Visually verified by fetching and inspecting the actual JPEG.
 * Unsplash photo by a professional photographer.
 */
export const SPLASH_URL =
  'https://images.unsplash.com/photo-1623674587543-9c7564de99d1?w=2400&q=85&auto=format&fit=crop';

/** AI-generated fallback if the real photo ever fails. */
export const SPLASH_FALLBACK_URL = pollinations(
  'great sphinx of giza desert sunset photorealistic',
  { seed: 'anubis-sphinx-fallback', w: 1024, h: 1536, model: 'turbo' }
);

/* ─────────────────────────────────────────────────────────────────── */
/*  Category photos — Pollinations Egyptian-themed prompts             */
/* ─────────────────────────────────────────────────────────────────── */

const CATEGORY_PROMPTS: Record<Category, string> = {
  starters:
    'egyptian mezze platter, ful medames hummus baba ghanoush falafel, dark luxury restaurant plating, gourmet photography',
  soups:
    'egyptian molokhia green soup with rice in ceramic bowl, gourmet plating, dark moody restaurant photography',
  mains:
    'egyptian koshary national dish rice macaroni lentils crispy onions in copper bowl, dark fine dining photography',
  grills:
    'egyptian mixed grill platter lamb kofta shish taouk on charcoal, baladi bread, dark gourmet photography',
  seafood:
    'egyptian sayadeya fish on caramelised rice with lemon, dark restaurant photography, gourmet plating',
  desserts:
    'egyptian om ali bread pudding dessert with pistachio and almond in white ramekin, gourmet dark photography',
  drinks:
    'egyptian karkadeh hibiscus tea ruby red in elegant glass with hibiscus petals, dark moody photography'
};

export function categoryPhoto(category: Category): string {
  return pollinations(CATEGORY_PROMPTS[category], { seed: `anubis-${category}`, w: 1024, h: 640 });
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Splash convenience wrapper                                          */
/* ─────────────────────────────────────────────────────────────────── */

export function splashBg(): string {
  return SPLASH_URL;
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Optional providers (for custom CDN photography)                     */
/* ─────────────────────────────────────────────────────────────────── */

export function unsplashImg(
  photoId: string,
  opts: { w?: number; h?: number; q?: number } = {}
): string {
  const { w = 1600, h = 1000, q = 80 } = opts;
  return `https://images.unsplash.com/photo-${photoId}?w=${w}&h=${h}&q=${q}&auto=format&fit=crop`;
}

export type CloudinaryOpts = {
  cloud?: string;
  w?: number;
  h?: number;
  quality?: number | string;
  crop?: 'fill' | 'fit' | 'thumb' | 'crop' | 'scale';
  extra?: string[];
};

export function cloudinary(publicId: string, opts: CloudinaryOpts = {}): string {
  const cloud = opts.cloud ?? process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD ?? '<your-cloud>';
  const transforms = [
    `c_${opts.crop ?? 'fill'}`,
    'g_auto',
    `w_${opts.w ?? 1200}`,
    `h_${opts.h ?? 800}`,
    `q_${opts.quality ?? 'auto:good'}`,
    'f_auto',
    ...(opts.extra ?? [])
  ].join(',');
  return `https://res.cloudinary.com/${cloud}/image/upload/${transforms}/${publicId.replace(/^\//, '')}`;
}

export type FirebaseOpts = { bucket?: string; token?: string };

export function firebase(path: string, opts: FirebaseOpts = {}): string {
  const bucket = opts.bucket ?? process.env.NEXT_PUBLIC_FIREBASE_BUCKET ?? '<your-bucket>';
  const encoded = encodeURIComponent(path.replace(/^\//, ''));
  const token = opts.token ? `&token=${encodeURIComponent(opts.token)}` : '';
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encoded}?alt=media${token}`;
}
