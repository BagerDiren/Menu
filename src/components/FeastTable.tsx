'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Bell, Trash2, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import type { Locale } from '@/i18n';
import { useCart } from '@/lib/cart';
import ImageOverlay from './ImageOverlay';

export default function FeastTable({
  open,
  locale,
  onClose
}: {
  open: boolean;
  locale: Locale;
  onClose: () => void;
}) {
  const tFeast = useTranslations('feast');
  const tDish = useTranslations('dish');
  const { dishes, totals, count, remove, clear } = useCart();

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[55] bg-nile-950/85 backdrop-blur-md flex flex-col"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            className="relative w-full h-full max-w-4xl mx-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div>
                <div
                  className="text-[10px] font-medium uppercase text-[#b8860b]"
                  style={{ letterSpacing: '0.45em' }}
                >
                  Anubis
                </div>
                <h2 className="font-display text-2xl text-white mt-1">{tFeast('title')}</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-nile-800/60 hover:bg-nile-800 p-2 text-papyrus transition"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Feast scene */}
            <div className="flex-1 relative overflow-hidden">
              {/* Wood/marble table backdrop */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sand-900/30 to-sand-950/60" />

              {/* Soft gold runner across the table */}
              <div
                aria-hidden
                className="absolute top-1/2 left-0 right-0 mx-auto -translate-y-1/2 h-px max-w-md bg-gradient-to-r from-transparent via-[#b8860b]/35 to-transparent pointer-events-none"
              />

              {/* Empty state */}
              {count === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
                >
                  <div
                    className="mb-4 font-display text-xs uppercase text-[#b8860b]"
                    style={{ letterSpacing: '0.45em' }}
                  >
                    · Anubis ·
                  </div>
                  <p
                    className="text-white/55 max-w-sm"
                    style={{ lineHeight: 1.7, letterSpacing: '0.02em' }}
                  >
                    {tFeast('empty')}
                  </p>
                </motion.div>
              )}

              {/* Plates */}
              {count > 0 && (
                <div className="absolute inset-0 overflow-y-auto p-6 sm:p-10 pb-32">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-gold-300/60 text-center mb-4">
                    {tFeast('summary')}
                  </div>
                  <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
                    <AnimatePresence>
                      {dishes.map(({ dish, qty }, i) => (
                        <Plate
                          key={dish.id}
                          name={dish.name[locale]}
                          image={dish.image}
                          price={dish.price * qty}
                          qty={qty}
                          calories={dish.nutrition.calories * qty}
                          priceLabel={tDish('price')}
                          calLabel={tDish('calories')}
                          delay={i * 0.05}
                          onRemove={() => remove(dish.id)}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>

            {/* Footer summary */}
            {count > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="border-t border-gold-300/20 bg-nile-950/95 backdrop-blur px-6 py-4 sm:py-5"
              >
                <div className="mx-auto mb-3 h-px max-w-xs bg-gradient-to-r from-transparent via-[#b8860b]/50 to-transparent" />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-papyrus/55">
                        {tFeast('items')}
                      </div>
                      <div className="font-display text-2xl text-gold-shine">{count}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-papyrus/55">
                        {tFeast('calories')}
                      </div>
                      <div className="font-display text-2xl text-papyrus">
                        {totals.calories}
                        <span className="text-sm ltr:ml-1 rtl:mr-1 opacity-60">
                          {tDish('calories')}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-papyrus/55">
                        {tFeast('total')}
                      </div>
                      <div className="font-display text-3xl text-gold-shine">
                        {totals.price}
                        <span className="text-sm ltr:ml-1 rtl:mr-1 opacity-70">
                          {tDish('price')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={clear}
                      className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 text-[11px] font-medium uppercase text-white/75 transition-all duration-200 hover:border-white/30 hover:text-white"
                      style={{ letterSpacing: '0.15em' }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      {tFeast('clear')}
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-[#b8860b]/60 bg-gradient-to-br from-[#dcc475] via-[#b8860b] to-[#7e5d07] px-5 text-[11px] font-bold uppercase text-black shadow-gold transition-all duration-200 hover:shadow-goldGlow"
                      style={{ letterSpacing: '0.18em' }}
                    >
                      <Bell className="h-4 w-4" />
                      {tFeast('callServer')}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Plate({
  name,
  image,
  price,
  qty,
  calories,
  priceLabel,
  calLabel,
  delay,
  onRemove
}: {
  name: string;
  image: string;
  price: number;
  qty: number;
  calories: number;
  priceLabel: string;
  calLabel: string;
  delay: number;
  onRemove: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onRemove}
      layout
      initial={{ opacity: 0, scale: 0.6, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.4, y: -40 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22, delay }}
      whileHover={{ rotate: [0, -2, 2, 0] }}
      className="group relative"
    >
      {/* Golden plate rim */}
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-gold-200 via-gold-400 to-gold-700 p-1.5 shadow-deepNile hover:shadow-gold transition">
        {/* Inner plate (food image) */}
        <div className="relative w-full h-full rounded-full overflow-hidden bg-nile-950">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={name}
            loading="lazy"
            decoding="async"
            draggable={false}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center select-none"
          />
          {/* Plate sheen + porcelain depth */}
          <ImageOverlay variant="plate" />
        </div>

        {/* Qty badge */}
        {qty > 1 && (
          <div className="absolute -top-1 ltr:-right-1 rtl:-left-1 rounded-full bg-nile-950 border-2 border-gold-300 text-gold-300 text-xs font-bold w-7 h-7 flex items-center justify-center">
            ×{qty}
          </div>
        )}

        {/* Remove hover indicator */}
        <div className="absolute inset-0 rounded-full bg-carnelian/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <Trash2 className="h-5 w-5 text-papyrus" />
        </div>
      </div>

      {/* Caption */}
      <div className="mt-3 text-center max-w-[160px]">
        <div className="text-sm font-medium text-papyrus line-clamp-1">{name}</div>
        <div className="text-[10px] uppercase tracking-wider text-gold-300/80 mt-0.5">
          {price} {priceLabel} · {calories} {calLabel}
        </div>
      </div>
    </motion.button>
  );
}
