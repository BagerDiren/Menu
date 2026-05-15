import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['ar', 'en', 'fr', 'de', 'it', 'ru', 'tr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeMeta: Record<
  Locale,
  { label: string; native: string; flag: string; dir: 'rtl' | 'ltr' }
> = {
  ar: { label: 'Arabic', native: 'العربية', flag: '🇪🇬', dir: 'rtl' },
  en: { label: 'English', native: 'English', flag: '🇬🇧', dir: 'ltr' },
  fr: { label: 'French', native: 'Français', flag: '🇫🇷', dir: 'ltr' },
  de: { label: 'German', native: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  it: { label: 'Italian', native: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  ru: { label: 'Russian', native: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  tr: { label: 'Turkish', native: 'Türkçe', flag: '🇹🇷', dir: 'ltr' }
};

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();
  return {
    locale: locale as Locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
