'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ScrollText, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import type { Dish } from '@/data/menu';
import { STORIES } from '@/data/stories';
import type { Locale } from '@/i18n';

export default function StoryModal({
  dish,
  locale,
  onClose
}: {
  dish: Dish | null;
  locale: Locale;
  onClose: () => void;
}) {
  const tStory = useTranslations('story');

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

  const story = dish ? STORIES[dish.id] : undefined;

  return (
    <AnimatePresence>
      {dish && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-nile-950/85 backdrop-blur-md p-4"
          onClick={onClose}
        >
          {/* Unfurling papyrus scroll */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ transformOrigin: 'center top' }}
            className="relative w-full max-w-2xl max-h-[88vh] overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Papyrus background */}
            <div className="absolute inset-0 bg-papyrus-texture" />
            {/* Edge burn / vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(110,70,30,0.35)]" />
            {/* Decorative top/bottom rule */}
            <div className="absolute top-4 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-800/30 to-transparent" />
            <div className="absolute bottom-4 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-800/30 to-transparent" />

            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 ltr:right-4 rtl:left-4 z-10 rounded-full bg-amber-900/15 hover:bg-amber-900/30 text-amber-950 p-2 transition"
              aria-label={tStory('close')}
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative px-8 sm:px-12 py-12 sm:py-14 overflow-y-auto max-h-[88vh] no-scrollbar"
            >
              <div className="flex items-center justify-center gap-2 mb-2 text-amber-800">
                <ScrollText className="h-4 w-4" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-semibold">
                  {tStory('title')}
                </span>
              </div>

              {story ? (
                <>
                  <div className="text-center text-amber-900/70 text-xs uppercase tracking-[0.3em] mb-2">
                    {story.era[locale]}
                  </div>
                  <h2 className="text-center font-display text-3xl sm:text-4xl text-amber-950 mb-2 leading-tight">
                    {story.title[locale]}
                  </h2>
                  <div className="text-center text-amber-900/60 italic text-sm mb-6">
                    {dish.name[locale]}
                  </div>

                  <div className="mx-auto my-4 flex items-center justify-center gap-3">
                    <span className="h-px w-16 bg-amber-800/30" />
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-700/60" />
                    <span className="h-px w-16 bg-amber-800/30" />
                  </div>

                  <p
                    className="text-amber-950/90 leading-[1.85] text-base sm:text-lg first-letter:font-display first-letter:text-5xl first-letter:font-bold first-letter:text-amber-800 first-letter:ltr:float-left first-letter:rtl:float-right first-letter:mr-2 first-letter:mt-1 first-letter:rtl:ml-2 first-letter:rtl:mr-0"
                    style={{ fontFamily: locale === 'ar' ? 'var(--font-arabic)' : undefined }}
                  >
                    {story.body[locale]}
                  </p>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto mb-4 h-px w-16 bg-amber-800/40" />
                  <h2 className="font-display text-2xl text-amber-950 mb-3">
                    {dish.name[locale]}
                  </h2>
                  <p className="text-amber-900/70 italic">{tStory('noStory')}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function hasStory(dishId: string) {
  return Boolean(STORIES[dishId]);
}
