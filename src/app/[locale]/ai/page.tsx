import { setRequestLocale } from 'next-intl/server';
import AIChat from '@/components/AIChat';
import { type Locale } from '@/i18n';

export default function AIPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  return <AIChat locale={locale} />;
}
