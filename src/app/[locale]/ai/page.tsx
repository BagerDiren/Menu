import AIChat from '@/components/AIChat';
import type { Locale } from '@/i18n';

export default function AIPage({ params: { locale } }: { params: { locale: Locale } }) {
  return <AIChat locale={locale} />;
}
