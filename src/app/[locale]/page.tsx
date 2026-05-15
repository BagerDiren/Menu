import { setRequestLocale } from 'next-intl/server';
import Splash from '@/components/Splash';
import { type Locale } from '@/i18n';

export default function SplashPage({
  params: { locale }
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  return <Splash urlLocale={locale} />;
}
