'use client';

import { motion } from 'framer-motion';
import { Wine } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { MENU, type Dish } from '@/data/menu';
import type { Locale } from '@/i18n';
import ImageOverlay from './ImageOverlay';

/**
 * Sommelier-style "you must try this with..." recommendation card.
 * Tap → swap modal to the paired dish.
 */
export default function PairingCard({
  pairingId,
  locale,
  onSelect
}: {
  pairingId: string;
  locale: Locale;
  onSelect: (d: Dish) => void;
}) {
  const t = useTranslations('pairing');
  const dish = MENU.find((d) => d.id === pairingId);
  if (!dish) return null;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      whileHover={{ y: -2 }}
      onClick={() => onSelect(dish)}
      className="group w-full text-left rounded-2xl overflow-hidden border border-gold-300/30 bg-gradient-to-br from-gold-500/8 via-nile-900/40 to-gold-500/5 hover:from-gold-500/15 hover:to-gold-500/10 transition relative"
    >
      {/* Faint pattern wash */}
      <div className="absolute inset-0 hg-bg opacity-50 pointer-events-none" />

      <div className="relative flex items-center gap-4 p-3">
        {/* Paired dish thumb */}
        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 ring-2 ring-gold-300/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dish.image}
            alt={dish.name[locale]}
            loading="lazy"
            decoding="async"
            draggable={false}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center select-none group-hover:scale-110 transition duration-500"
          />
          <ImageOverlay variant="thumb" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <Wine className="h-3 w-3 text-gold-300" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold-300/85 font-semibold">
              {t('header')}
            </span>
          </div>
          <div className="font-display text-lg text-papyrus group-hover:text-gold-300 transition leading-tight">
            {dish.name[locale]}
          </div>
          <p className="text-[11px] italic text-papyrus/65 line-clamp-2 mt-0.5">{t('whisper')}</p>
        </div>

        <span className="text-gold-300 text-xl ltr:block rtl:hidden">→</span>
        <span className="text-gold-300 text-xl ltr:hidden rtl:block">←</span>
      </div>
    </motion.button>
  );
}
