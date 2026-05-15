'use client';

import { useEffect, useState } from 'react';
import { defaultLocale, locales, type Locale } from '@/i18n';

/** Best-effort browser locale → app locale. SSR-safe. */
export function detectBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') return defaultLocale;
  const candidates = [navigator.language, ...(navigator.languages ?? [])];
  for (const raw of candidates) {
    const lower = raw.toLowerCase();
    const exact = locales.find((l) => l === lower);
    if (exact) return exact;
    const short = lower.split('-')[0] as Locale;
    if (locales.includes(short)) return short;
  }
  return defaultLocale;
}

/**
 * Reactive hook: returns the browser's preferred locale, or the supplied
 * `initial` fallback during SSR / before hydration. Pure read — no routing.
 */
export function useBrowserLocale(initial: Locale = defaultLocale): Locale {
  const [locale, setLocale] = useState<Locale>(initial);
  useEffect(() => {
    setLocale(detectBrowserLocale());
  }, []);
  return locale;
}
