import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, localeMeta, type Locale } from '@/i18n';
import { CartProvider } from '@/lib/cart';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Anubis — Royal Egyptian Menu',
  description:
    'Modern AI-powered QR menu with full nutrition, allergen and recommendation support.',
  themeColor: '#03101a'
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#03101a'
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) notFound();

  const messages = await getMessages();
  const meta = localeMeta[locale as Locale];

  return (
    <html lang={locale} dir={meta.dir}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://source.unsplash.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://source.unsplash.com" />
      </head>
      <body className="min-h-screen bg-royal-radial">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <CartProvider>{children}</CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
