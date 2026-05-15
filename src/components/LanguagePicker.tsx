'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, localeMeta, type Locale } from '@/i18n';

export default function LanguagePicker({
  currentLocale,
  variant = 'splash'
}: {
  currentLocale?: Locale;
  variant?: 'splash' | 'inline';
}) {
  const pathname = usePathname();

  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';

  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap gap-1.5">
        {locales.map((l) => {
          const meta = localeMeta[l];
          const active = l === currentLocale;
          return (
            <Link
              key={l}
              href={`/${l}${pathWithoutLocale}`}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
                active
                  ? 'bg-gold-400 text-nile-950'
                  : 'bg-nile-800/60 text-papyrus hover:bg-nile-700/80'
              }`}
            >
              <span aria-hidden>{meta.flag}</span>
              <span>{meta.native}</span>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 max-w-3xl mx-auto"
    >
      {locales.map((l, i) => {
        const meta = localeMeta[l];
        return (
          <motion.div
            key={l}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + i * 0.08, type: 'spring', stiffness: 200 }}
          >
            <Link
              href={`/${l}/menu`}
              className="group block rounded-2xl glass px-4 py-4 text-center card-lift"
            >
              <div className="text-3xl mb-1" aria-hidden>
                {meta.flag}
              </div>
              <div
                className="text-papyrus font-semibold tracking-wide group-hover:text-gold-300 transition"
                style={meta.dir === 'rtl' ? { fontFamily: 'var(--font-arabic)' } : undefined}
              >
                {meta.native}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-papyrus/50 mt-1">
                {meta.label}
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
