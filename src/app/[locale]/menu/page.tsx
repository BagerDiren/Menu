import { setRequestLocale } from 'next-intl/server';
import MenuView from '@/components/MenuView';
import { type Locale } from '@/i18n';

export default function MenuPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  return <MenuView locale={locale} />;
}
