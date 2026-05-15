'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Filter, Sparkles, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  ALL_ALLERGENS,
  CATEGORIES,
  MENU,
  dishesForMood,
  type Allergen,
  type Category,
  type Dish,
  type Mood
} from '@/data/menu';
import type { Locale } from '@/i18n';
import { useCart } from '@/lib/cart';
import { cn } from '@/lib/utils';
import DishCard from './DishCard';
import LanguagePicker from './LanguagePicker';
import MoodFilter from './MoodFilter';

// Heavy / below-fold components — load on demand
const DishModal = dynamic(() => import('./DishModal'), { ssr: false });
const StoryModal = dynamic(() => import('./StoryModal'), { ssr: false });
const FeastTable = dynamic(() => import('./FeastTable'), { ssr: false });

export default function MenuView({ locale }: { locale: Locale }) {
  const tCat = useTranslations('categories');
  const tNav = useTranslations('nav');
  const tFilters = useTranslations('filters');
  const tAllergens = useTranslations('allergens');

  const [activeCat, setActiveCat] = useState<Category | 'all'>('all');
  const [excluded, setExcluded] = useState<Set<Allergen>>(new Set());
  const [mood, setMood] = useState<Mood | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [storyDish, setStoryDish] = useState<Dish | null>(null);
  const [feastOpen, setFeastOpen] = useState(false);

  const { count } = useCart();

  const moodIds = useMemo(() => (mood ? new Set(dishesForMood(mood)) : null), [mood]);

  const filtered = useMemo(() => {
    return MENU.filter((d) => {
      if (activeCat !== 'all' && d.category !== activeCat) return false;
      if (moodIds && !moodIds.has(d.id)) return false;
      for (const a of excluded) if (d.allergens.includes(a)) return false;
      return true;
    });
  }, [activeCat, excluded, moodIds]);

  const grouped = useMemo(() => {
    if (activeCat !== 'all' || mood) return [{ cat: activeCat === 'all' ? null : activeCat, items: filtered }];
    return CATEGORIES.map((cat) => ({
      cat: cat as Category | null,
      items: filtered.filter((d) => d.category === cat)
    })).filter((g) => g.items.length > 0);
  }, [activeCat, filtered, mood]);

  const toggleAllergen = (a: Allergen) => {
    const next = new Set(excluded);
    if (next.has(a)) next.delete(a);
    else next.add(a);
    setExcluded(next);
  };


  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      {/* ── Fixed Egypt backdrop — Giza pyramids, blurred, dimmed so it doesn't tire the eye ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1623674587543-9c7564de99d1?w=1600&q=70&auto=format&fit=crop"
          alt=""
          decoding="async"
          referrerPolicy="no-referrer"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover object-center select-none"
          style={{ filter: 'blur(6px) saturate(0.9) brightness(0.55)', transform: 'scale(1.08)' }}
        />
        {/* Dark overlay — keeps the photo as a hint, content fully legible */}
        <div className="absolute inset-0 bg-[#0a0a0a]/[0.78]" />
        {/* Subtle warm gold haze at the top — sunset hint */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(ellipse_at_70%_0%,rgba(184,134,11,0.18),transparent_55%)]" />
        {/* Soft vignette pulling focus to centre */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.7)_100%)]" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0a0a]/85 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link href={`/${locale}`} className="group">
            <span
              className="font-display text-xs font-medium uppercase text-[#b8860b]"
              style={{ letterSpacing: '0.4em' }}
            >
              Anubis
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilterOpen((v) => !v)}
              className={cn(
                'inline-flex h-9 items-center gap-2 rounded-full border px-4 text-[11px] font-medium uppercase transition-all duration-200',
                filterOpen || excluded.size > 0
                  ? 'border-[#b8860b] bg-[#b8860b]/15 text-[#d4af37]'
                  : 'border-white/15 bg-transparent text-white/75 hover:border-white/30 hover:text-white'
              )}
              style={{ letterSpacing: '0.18em' }}
            >
              <Filter className="h-3.5 w-3.5" />
              {tFilters('filters')}
              {excluded.size > 0 && (
                <span className="ltr:ml-1 rtl:mr-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#b8860b] px-1 text-[10px] font-bold text-black">
                  {excluded.size}
                </span>
              )}
            </button>

            <Link
              href={`/${locale}/ai`}
              className="group inline-flex h-9 items-center gap-2 overflow-hidden rounded-full bg-gradient-to-br from-[#dcc475] via-[#b8860b] to-[#7e5d07] px-4 text-[11px] font-bold uppercase text-black shadow-gold transition-all duration-200 hover:shadow-goldGlow"
              style={{ letterSpacing: '0.18em' }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              {tNav('ai')}
            </Link>
          </div>
        </div>

        {/* Category bar */}
        <div className="max-w-6xl mx-auto px-4 pb-3 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 min-w-max">
            <CatChip
              label={tFilters('all')}
              active={activeCat === 'all'}
              onClick={() => setActiveCat('all')}
            />
            {CATEGORIES.map((c) => (
              <CatChip
                key={c}
                label={tCat(c)}
                active={activeCat === c}
                onClick={() => setActiveCat(c)}
              />
            ))}
          </div>
        </div>

        {/* Filter drawer */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gold-300/15 bg-nile-900/80 overflow-hidden"
            >
              <div className="max-w-6xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gold-300">
                    {tFilters('allergensExclude')}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setExcluded(new Set())}
                    className="text-xs text-papyrus/60 hover:text-papyrus inline-flex items-center gap-1"
                  >
                    <X className="h-3 w-3" />
                    {tFilters('clear')}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ALL_ALLERGENS.map((a) => {
                    const active = excluded.has(a);
                    return (
                      <button
                        key={a}
                        type="button"
                        onClick={() => toggleAllergen(a)}
                        className={cn(
                          'rounded-full px-3 py-1.5 text-xs font-medium transition border',
                          active
                            ? 'bg-carnelian text-papyrus border-carnelian'
                            : 'bg-nile-800/60 text-papyrus/80 border-gold-300/20 hover:border-gold-300/50'
                        )}
                      >
                        {tAllergens(a)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-5 py-8">
        {/* Mood filter — only on "All" view */}
        {activeCat === 'all' && <MoodFilter active={mood} onSelect={setMood} />}

        <div className="space-y-12">
          {grouped.map((group) => (
            <section key={group.cat ?? 'mood'}>
              {group.cat && (
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <h2
                      className="font-display text-2xl sm:text-3xl whitespace-nowrap"
                      style={{ color: '#D4AF37', letterSpacing: '0.06em' }}
                    >
                      {tCat(group.cat)}
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-[#b8860b]/60 via-[#b8860b]/25 to-transparent" />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.items.map((d, i) => (
                  <DishCard
                    key={d.id}
                    dish={d}
                    locale={locale}
                    index={i}
                    onOpen={setSelectedDish}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        {grouped.length === 0 || filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white/55 py-20"
          >
            <div
              className="mb-3 font-display text-xs uppercase text-[#b8860b]"
              style={{ letterSpacing: '0.4em' }}
            >
              · Anubis ·
            </div>
            No dishes match these filters.
          </motion.div>
        ) : null}

        {/* Footer */}
        <footer className="mt-12 mb-4 text-center">
          <div className="mx-auto mb-5 h-px max-w-xs bg-gradient-to-r from-transparent via-[#b8860b]/50 to-transparent" />
          <div className="flex justify-center">
            <LanguagePicker currentLocale={locale} variant="inline" />
          </div>
        </footer>
      </main>

      {/* Feast FAB */}
      <AnimatePresence>
        {count > 0 && !feastOpen && (
          <motion.button
            type="button"
            onClick={() => setFeastOpen(true)}
            initial={{ y: 80, opacity: 0, scale: 0.6 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.6 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-5 ltr:right-5 rtl:left-5 z-40 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#cba84a] via-[#b8860b] to-[#7e5d07] px-5 py-3 text-xs font-bold uppercase text-black shadow-goldGlow"
            style={{ letterSpacing: '0.2em' }}
            aria-label={tNav('feast')}
          >
            <span>{tNav('feast')}</span>
            <span className="inline-flex items-center justify-center min-w-6 h-6 rounded-full bg-black/85 text-[#dcc475] text-[10px] font-bold px-2">
              {count}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <DishModal
        dish={selectedDish}
        locale={locale}
        onClose={() => setSelectedDish(null)}
        onOpenStory={(d) => setStoryDish(d)}
        onSelectPaired={(d) => setSelectedDish(d)}
      />
      <StoryModal dish={storyDish} locale={locale} onClose={() => setStoryDish(null)} />
      <FeastTable open={feastOpen} locale={locale} onClose={() => setFeastOpen(false)} />
    </div>
  );
}

function CatChip({
  label,
  active,
  onClick
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'whitespace-nowrap rounded-full px-4 h-9 text-[12px] font-medium uppercase transition-all duration-200 border',
        active
          ? 'border-[#b8860b]/60 bg-gradient-to-br from-[#dcc475] via-[#b8860b] to-[#7e5d07] text-black shadow-gold'
          : 'border-white/12 bg-white/[0.03] text-white/70 hover:border-white/25 hover:bg-white/[0.06] hover:text-white'
      )}
      style={{ letterSpacing: '0.1em' }}
    >
      {label}
    </button>
  );
}
