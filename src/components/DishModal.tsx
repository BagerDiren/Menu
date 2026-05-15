'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  Check,
  Clock,
  Egg,
  Fish,
  Flame,
  Leaf,
  Milk,
  Nut,
  Plus,
  ScrollText,
  Shell,
  Wheat,
  X
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import type { Allergen, Dish } from '@/data/menu';
import { RELATIONS } from '@/data/relations';
import type { Locale } from '@/i18n';
import { useCart } from '@/lib/cart';
import { cn } from '@/lib/utils';
import ImageOverlay from './ImageOverlay';
import PairingCard from './PairingCard';
import { hasStory } from './StoryModal';

const ALLERGEN_ICONS: Record<Allergen, React.ComponentType<{ className?: string }>> = {
  gluten: Wheat,
  dairy: Milk,
  eggs: Egg,
  nuts: Nut,
  sesame: Nut,
  soy: Leaf,
  fish: Fish,
  shellfish: Shell,
  mustard: AlertTriangle
};

export default function DishModal({
  dish,
  locale,
  onClose,
  onOpenStory,
  onSelectPaired
}: {
  dish: Dish | null;
  locale: Locale;
  onClose: () => void;
  onOpenStory: (d: Dish) => void;
  onSelectPaired: (d: Dish) => void;
}) {
  const tDish = useTranslations('dish');
  const tAllergens = useTranslations('allergens');
  const tTags = useTranslations('tags');
  const tStory = useTranslations('story');
  const { has, toggle } = useCart();

  useEffect(() => {
    if (!dish) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [dish, onClose]);

  const inCart = dish ? has(dish.id) : false;

  return (
    <AnimatePresence>
      {dish && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-nile-950/80 backdrop-blur-sm p-0 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl glass shadow-deepNile no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 ltr:right-4 rtl:left-4 z-10 rounded-full bg-nile-950/70 p-2 text-papyrus hover:bg-nile-900 transition"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-[16/10] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dish.image}
                alt={dish.name[locale]}
                loading="eager"
                decoding="async"
                draggable={false}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center select-none"
              />
              <ImageOverlay variant="hero" />

              {/* Floating badges */}
              <div className="absolute top-4 ltr:left-4 rtl:right-4 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-nile-950/85 backdrop-blur px-2.5 py-1 text-xs text-papyrus">
                  <Clock className="h-3.5 w-3.5 text-gold-300" />
                  {dish.prepTime} {tDish('minutes')}
                </span>
                {dish.spiceLevel ? (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-carnelian/90 backdrop-blur px-2.5 py-1 text-xs font-semibold text-papyrus">
                    {Array.from({ length: dish.spiceLevel }).map((_, i) => (
                      <Flame key={i} className="h-3 w-3" />
                    ))}
                  </span>
                ) : null}
              </div>

              <div className="absolute bottom-4 ltr:left-5 rtl:right-5">
                <h2 className="font-display text-3xl sm:text-4xl text-gold-shine">
                  {dish.name[locale]}
                </h2>
              </div>
            </div>

            <div className="px-5 pb-8 pt-4 space-y-5">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {dish.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-nile-800/60 px-2.5 py-1 text-xs font-medium text-papyrus border border-gold-300/20"
                  >
                    {tTags(tag)}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-papyrus/85 leading-relaxed">{dish.description[locale]}</p>

              {/* Chef Note */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="relative rounded-xl border border-gold-300/25 bg-gradient-to-br from-gold-500/8 to-transparent p-4"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span aria-hidden className="h-px w-5 bg-[#b8860b]" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#dcc475] font-semibold">
                    {tDish('chefNote')}
                  </span>
                </div>
                <p
                  className="text-papyrus/95 italic leading-relaxed"
                  style={{ fontFamily: locale === 'ar' ? 'var(--font-arabic)' : undefined }}
                >
                  {dish.chefNote[locale]}
                </p>
              </motion.div>

              {/* Ingredients */}
              <div>
                <h3 className="font-display text-sm uppercase tracking-[0.2em] text-gold-400/80 mb-2">
                  {tDish('ingredients')}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {dish.ingredients[locale].map((ing, i) => (
                    <motion.span
                      key={`${ing}-${i}`}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.04 }}
                      className="inline-flex items-center rounded-full bg-white/[0.04] border border-white/10 px-2.5 py-1 text-xs text-papyrus/85"
                    >
                      {ing}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Pairing recommendation */}
              {RELATIONS[dish.id]?.pairing && (
                <PairingCard
                  pairingId={RELATIONS[dish.id].pairing as string}
                  locale={locale}
                  onSelect={onSelectPaired}
                />
              )}

              {/* Story CTA */}
              {hasStory(dish.id) && (
                <button
                  type="button"
                  onClick={() => onOpenStory(dish)}
                  className="group w-full rounded-xl border border-gold-300/30 bg-gradient-to-br from-amber-700/10 to-amber-900/10 hover:from-amber-600/20 hover:to-amber-900/20 px-4 py-3 transition flex items-center gap-3 text-left"
                >
                  <div className="rounded-full bg-gold-shine p-2 group-hover:rotate-6 transition">
                    <ScrollText className="h-4 w-4 text-nile-950" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-gold-300/80 font-semibold">
                      {tStory('title')}
                    </div>
                    <div className="text-sm text-papyrus group-hover:text-gold-300 transition">
                      {tStory('discover')}
                    </div>
                  </div>
                  <span className="text-gold-300 text-xl ltr:block rtl:hidden">→</span>
                  <span className="text-gold-300 text-xl ltr:hidden rtl:block">←</span>
                </button>
              )}

              {/* Nutrition */}
              <div>
                <h3 className="font-display text-sm uppercase tracking-[0.2em] text-gold-300/80 mb-3">
                  {tDish('nutrition')}
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  <NutritionCell label={tDish('calories')} value={dish.nutrition.calories} unit="" highlight />
                  <NutritionCell label={tDish('protein')} value={dish.nutrition.protein} unit="g" />
                  <NutritionCell label={tDish('carbs')} value={dish.nutrition.carbs} unit="g" />
                  <NutritionCell label={tDish('fat')} value={dish.nutrition.fat} unit="g" />
                  {dish.nutrition.fiber !== undefined && (
                    <NutritionCell label={tDish('fiber')} value={dish.nutrition.fiber} unit="g" />
                  )}
                  {dish.nutrition.sodium !== undefined && (
                    <NutritionCell label={tDish('sodium')} value={dish.nutrition.sodium} unit="mg" />
                  )}
                </div>
              </div>

              {/* Allergens */}
              <div>
                <h3 className="font-display text-sm uppercase tracking-[0.2em] text-gold-300/80 mb-3">
                  {dish.allergens.length === 0 ? tDish('noAllergens') : tDish('allergens')}
                </h3>
                {dish.allergens.length === 0 ? (
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-800/40 px-3 py-1.5 text-xs text-emerald-200 border border-emerald-500/30">
                    <Leaf className="h-4 w-4" />
                    {tDish('noAllergens')}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {dish.allergens.map((a) => {
                      const Icon = ALLERGEN_ICONS[a];
                      return (
                        <span
                          key={a}
                          className="inline-flex items-center gap-1.5 rounded-full bg-carnelian/20 border border-carnelian/40 px-3 py-1.5 text-xs text-papyrus"
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {tAllergens(a)}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Price + Add to Feast */}
              <div className="flex items-center justify-between gap-3 pt-2 border-t border-gold-300/15">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-papyrus/55">
                    {tDish('price')}
                  </div>
                  <div className="font-display text-3xl text-gold-shine">{dish.price}</div>
                </div>
                <button
                  type="button"
                  onClick={() => toggle(dish.id)}
                  className={cn(
                    'inline-flex h-11 items-center gap-2 rounded-full border px-6 text-[11px] font-bold uppercase transition-all duration-200 active:scale-[0.98]',
                    inCart
                      ? 'border-emerald-400/70 bg-emerald-500 text-black shadow-[0_6px_18px_-4px_rgba(16,185,129,0.5)] hover:bg-emerald-400'
                      : 'border-[#b8860b]/60 bg-gradient-to-br from-[#dcc475] via-[#b8860b] to-[#7e5d07] text-black shadow-gold hover:shadow-goldGlow'
                  )}
                  style={{ letterSpacing: '0.18em' }}
                >
                  {inCart ? (
                    <>
                      <Check className="h-4 w-4" />
                      {tDish('inFeast')}
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      {tDish('addToFeast')}
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NutritionCell({
  label,
  value,
  unit,
  highlight
}: {
  label: string;
  value: number;
  unit: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-xl px-2 py-2.5 text-center border',
        highlight
          ? 'bg-gold-500/10 border-gold-300/40'
          : 'bg-nile-800/40 border-gold-300/10'
      )}
    >
      <div className={cn('font-display text-lg', highlight ? 'text-gold-300' : 'text-papyrus')}>
        {value}
        <span className="text-xs ltr:ml-0.5 rtl:mr-0.5 opacity-70">{unit}</span>
      </div>
      <div className="text-[10px] uppercase tracking-wider text-papyrus/55 mt-0.5">{label}</div>
    </div>
  );
}
