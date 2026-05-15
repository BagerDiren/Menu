'use client';

import { motion } from 'framer-motion';
import { Check, Clock, Flame, Leaf, Plus, ScrollText, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { Dish } from '@/data/menu';
import type { Locale } from '@/i18n';
import { useCart } from '@/lib/cart';
import { cn } from '@/lib/utils';
import { hasStory } from './StoryModal';

export type CardSize = 'sm' | 'md' | 'lg';

/**
 * Consistent fine-dining card. Every dish uses the SAME geometry:
 *   - 16:9 photo on top, rounded-xl, object-cover
 *   - title + chef-note below
 *   - price pinned bottom-right in matte gold (#D4AF37)
 */
export default function DishCard({
  dish,
  locale,
  index,
  onOpen
}: {
  dish: Dish;
  locale: Locale;
  index: number;
  // size kept for API compat but we render a single canonical layout now
  size?: CardSize;
  onOpen: (d: Dish) => void;
}) {
  const tDish = useTranslations('dish');
  const tTags = useTranslations('tags');
  const { has, toggle } = useCart();

  const isVeg = dish.tags.includes('vegan') || dish.tags.includes('vegetarian');
  const isChefPick = dish.tags.includes('chef_pick');
  const inCart = has(dish.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ delay: Math.min(index * 0.04, 0.35), duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#141414] to-[#0a0a0a] shadow-deepNile transition-all duration-500 hover:border-[#d4af37]/50 hover:shadow-[0_24px_60px_-12px_rgba(212,175,55,0.25)]"
    >
      <button
        type="button"
        onClick={() => onOpen(dish)}
        className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b8860b]"
        aria-label={dish.name[locale]}
      >
        {/* 16:9 photo */}
        <div className="relative aspect-video w-full overflow-hidden bg-[radial-gradient(circle_at_50%_40%,#1a1408_0%,#0a0a0a_75%)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dish.image}
            alt=""
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
            draggable={false}
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover object-center select-none transition-transform duration-700 group-hover:scale-[1.08]"
          />
          {/* Light gradients only — let the food photo breathe */}
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-black/35 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 ltr:left-3 rtl:right-3 z-10 flex flex-wrap gap-1.5 max-w-[80%]">
            {isChefPick && (
              <span
                className="inline-flex items-center gap-1 rounded-full bg-gradient-to-br from-[#dcc475] to-[#b8860b] px-2 py-0.5 text-[10px] font-bold text-black"
                style={{ letterSpacing: '0.08em' }}
              >
                <Star className="h-3 w-3 fill-current" />
                {tTags('chef_pick')}
              </span>
            )}
            {dish.spiceLevel ? (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-red-700/90 px-2 py-0.5 text-[10px] font-semibold text-white">
                {Array.from({ length: dish.spiceLevel }).map((_, i) => (
                  <Flame key={i} className="h-2.5 w-2.5" />
                ))}
              </span>
            ) : null}
            {isVeg && !isChefPick && (
              <span
                className="inline-flex items-center gap-1 rounded-full bg-emerald-700/90 px-2 py-0.5 text-[10px] font-semibold text-white"
                style={{ letterSpacing: '0.08em' }}
              >
                <Leaf className="h-3 w-3" />
                {dish.tags.includes('vegan') ? tTags('vegan') : tTags('vegetarian')}
              </span>
            )}
            {hasStory(dish.id) && (
              <span className="inline-flex items-center rounded-full bg-black/85 border border-[#b8860b]/40 px-2 py-0.5 text-[#d4af37]">
                <ScrollText className="h-3 w-3" />
              </span>
            )}
          </div>

          {/* Calories + prep time row, bottom-left */}
          <div
            className="absolute bottom-3 ltr:left-3 rtl:right-3 z-10 flex items-center gap-2 text-[11px] text-white/85"
            style={{ letterSpacing: '0.05em' }}
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 backdrop-blur-sm">
              <Clock className="h-3 w-3 text-[#d4af37]" />
              {dish.prepTime} {tDish('minutes')}
            </span>
            <span className="rounded-full bg-black/70 px-2 py-1 backdrop-blur-sm">
              {dish.nutrition.calories} {tDish('calories')}
            </span>
          </div>
        </div>

        {/* Body — name, description, chef note, price */}
        <div className="space-y-3 p-5">
          <h3
            className="font-display text-[20px] font-medium leading-tight text-white"
            style={{ letterSpacing: '0.02em' }}
          >
            {dish.name[locale]}
          </h3>

          <p
            className="text-[14px] text-white/65 line-clamp-2"
            style={{ lineHeight: 1.6, letterSpacing: '0.01em' }}
          >
            {dish.description[locale]}
          </p>

          {/* Chef note */}
          <div className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
            <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-[#b8860b]" />
            <p
              className="text-[12px] italic text-[#d4af37]/90"
              style={{ lineHeight: 1.5, fontFamily: locale === 'ar' ? 'var(--font-arabic)' : undefined }}
            >
              {dish.chefNote[locale]}
            </p>
          </div>

          {/* Price — bottom-right, brushed gold */}
          <div className="flex items-end justify-end pt-1">
            <span
              className="font-display text-[22px] font-semibold"
              style={{ color: '#D4AF37', letterSpacing: '0.04em' }}
            >
              {dish.price}
              <span className="ltr:ml-1 rtl:mr-1 text-[12px] font-medium opacity-75">
                {tDish('price')}
              </span>
            </span>
          </div>
        </div>
      </button>

      {/* Add to feast — refined top-right pill */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggle(dish.id);
        }}
        className={cn(
          'absolute top-3 ltr:right-3 rtl:left-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200 active:scale-95',
          inCart
            ? 'border-emerald-400/70 bg-emerald-500 text-black shadow-[0_4px_12px_-2px_rgba(16,185,129,0.45)]'
            : 'border-[#b8860b]/60 bg-gradient-to-br from-[#dcc475] via-[#b8860b] to-[#7e5d07] text-black shadow-gold hover:shadow-goldGlow'
        )}
        aria-label={inCart ? tDish('removeFromFeast') : tDish('addToFeast')}
      >
        {inCart ? <Check className="h-4 w-4" strokeWidth={2.6} /> : <Plus className="h-4 w-4" strokeWidth={2.6} />}
      </button>
    </motion.div>
  );
}
