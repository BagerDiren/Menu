import Splash from '@/components/Splash';
import { type Locale } from '@/i18n';

export default function SplashPage({
  params: { locale }
}: {
  params: { locale: Locale };
}) {
  return <Splash urlLocale={locale} />;
}
