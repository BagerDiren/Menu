'use client';

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import arMsg from '../../messages/ar.json';
import deMsg from '../../messages/de.json';
import enMsg from '../../messages/en.json';
import frMsg from '../../messages/fr.json';
import itMsg from '../../messages/it.json';
import ruMsg from '../../messages/ru.json';
import trMsg from '../../messages/tr.json';
import { SPLASH_FALLBACK_URL, SPLASH_URL } from '@/lib/images';
import { useBrowserLocale } from '@/lib/locale-detect';
import { type Locale } from '@/i18n';
import DesertHaze from './DesertHaze';
import LanguageDropdown from './LanguageDropdown';

/**
 * Splash carries its OWN client-side language state via useState — so picking
 * a language updates every visible word instantly with an opacity fade, no
 * network roundtrip. When the user taps "Discover" we hand off to the
 * URL-locale menu pages.
 */
const T: Record<Locale, (typeof trMsg)['splash']> = {
  ar: arMsg.splash,
  de: deMsg.splash,
  en: enMsg.splash,
  fr: frMsg.splash,
  it: itMsg.splash,
  ru: ruMsg.splash,
  tr: trMsg.splash
};

// SPLASH_URL is imported from @/lib/images — hard-coded, verified 200 OK.

export default function Splash({ urlLocale }: { urlLocale: Locale }) {
  const router = useRouter();
  const detected = useBrowserLocale(urlLocale);
  const [lang, setLang] = useState<Locale>(urlLocale);
  const [imgFailed, setImgFailed] = useState(false);
  const [autoSwitched, setAutoSwitched] = useState(false);

  // Mouse parallax — the pyramid photo follows the cursor at 1/40th speed.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 35, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 35, damping: 18, mass: 0.6 });
  const parallaxX = useTransform(sx, (v) => v * -18);
  const parallaxY = useTransform(sy, (v) => v * -12);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1; // -1 .. 1
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  // Auto-detect browser language once on mount.
  useEffect(() => {
    if (autoSwitched) return;
    if (detected && detected !== lang) {
      setLang(detected);
      setAutoSwitched(true);
    }
  }, [detected, lang, autoSwitched]);

  const t = T[lang];
  const enter = () => router.push(`/${lang}/menu`);

  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-[#000] text-white">
      {/* ── Background — verified HD Giza image ─────────────────────── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,#3a2806_0%,#1a1408_30%,#000_70%)]" />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src={imgFailed ? SPLASH_FALLBACK_URL : SPLASH_URL}
          alt=""
          width={2400}
          height={1600}
          referrerPolicy="no-referrer"
          decoding="async"
          draggable={false}
          onError={() => setImgFailed(true)}
          style={{ x: parallaxX, y: parallaxY }}
          animate={{ scale: [1.0, 1.08, 1.0] }}
          transition={{ duration: 36, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -inset-8 h-[calc(100%+4rem)] w-[calc(100%+4rem)] object-cover object-center select-none"
        />

        {/* Light upper band + heavy lower band — pyramid visible, text legible */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.10) 30%, rgba(0,0,0,0.20) 55%, rgba(0,0,0,0.75) 85%, rgba(0,0,0,0.92) 100%)'
          }}
        />
        {/* Soft side vignette for cinematic depth (lighter) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.35)_100%)]" />
        {/* Warm gold glow from upper-right (sunset feel) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(212,175,55,0.22),transparent_50%)]" />
        {/* Atmospheric desert haze — 4 yatay süzülen sis tabakası + film grain */}
        <DesertHaze />
      </div>

      {/* ── Foreground — useState-driven copy ───────────────────────── */}
      <div
        className="relative z-10 flex min-h-[100svh] flex-col items-center justify-between px-6 pb-10 pt-10 sm:px-10 sm:pb-14 sm:pt-14"
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        {/* Brand mark */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex items-center gap-3"
        >
          <span
            className="font-display text-[12px] font-medium uppercase"
            style={{ color: '#D4AF37', letterSpacing: '0.55em' }}
          >
            Anubis
          </span>
          <span className="h-px w-12 bg-gradient-to-r from-[#D4AF37]/70 to-transparent" />
        </motion.div>

        {/* Title — animates on language change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45 }}
            className="relative max-w-md text-center"
            style={{ fontFamily: lang === 'ar' ? 'var(--font-arabic)' : undefined }}
          >
            {/* Local soft darken behind title for legibility over photo */}
            <div className="pointer-events-none absolute inset-x-[-2rem] inset-y-[-1.5rem] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55),transparent_70%)]" />
            <h1
              className="relative font-display text-[2.2rem] font-medium leading-[1.2] sm:text-[2.75rem]"
              style={{
                color: '#F4D67E',
                letterSpacing: '0.08em',
                textShadow:
                  '0 2px 6px rgba(0,0,0,0.95), 0 4px 28px rgba(0,0,0,0.9), 0 0 80px rgba(212,175,55,0.3)'
              }}
            >
              {t.tagline}
            </h1>
            <div className="relative mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
            <p
              className="relative mx-auto mt-5 max-w-[22rem] text-[14px] font-light uppercase text-white"
              style={{
                letterSpacing: '0.32em',
                lineHeight: 1.8,
                textShadow: '0 1px 6px rgba(0,0,0,0.95), 0 2px 18px rgba(0,0,0,0.85)'
              }}
            >
              {t.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Bottom — dropdown + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="w-full max-w-sm space-y-4"
        >
          <LanguageDropdown value={lang} onChange={setLang} />

          <motion.button
            type="button"
            onClick={enter}
            animate={{
              boxShadow: [
                '0 0 24px rgba(212,175,55,0.35), 0 0 48px rgba(212,175,55,0.15), inset 0 1px 0 rgba(255,255,255,0.18)',
                '0 0 38px rgba(212,175,55,0.55), 0 0 76px rgba(212,175,55,0.28), inset 0 1px 0 rgba(255,255,255,0.18)',
                '0 0 24px rgba(212,175,55,0.35), 0 0 48px rgba(212,175,55,0.15), inset 0 1px 0 rgba(255,255,255,0.18)'
              ]
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-full overflow-hidden rounded-full bg-gradient-to-br from-[#e8d49a] via-[#d4af37] to-[#8a6e1d] py-[18px] text-[14px] font-bold uppercase text-black"
            style={{ letterSpacing: '0.4em' }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={lang}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 block"
              >
                {t.enter}
              </motion.span>
            </AnimatePresence>
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
            />
          </motion.button>

          <p
            className="text-center text-[10px] font-light uppercase text-white/40"
            style={{ letterSpacing: '0.45em' }}
          >
            {t.poweredBy}
          </p>
        </motion.div>
      </div>
    </main>
  );
}
