'use client';

import { motion } from 'framer-motion';
import { Coffee, Cookie, Feather, Flame, Hourglass, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { Mood } from '@/data/menu';
import { cn } from '@/lib/utils';

const MOOD_CONFIG: Array<{ id: Mood; Icon: React.ComponentType<{ className?: string }> }> = [
  { id: 'light', Icon: Feather },
  { id: 'spicy', Icon: Flame },
  { id: 'sweet', Icon: Cookie },
  { id: 'classic', Icon: Coffee },
  { id: 'quick', Icon: Hourglass },
  { id: 'protein', Icon: Zap }
];

/**
 * Refined mood chips — slim horizontal pills, icon + label.
 * No big boxy buttons. Same height as category chips for consistency.
 */
export default function MoodFilter({
  active,
  onSelect
}: {
  active: Mood | null;
  onSelect: (m: Mood | null) => void;
}) {
  const t = useTranslations('moods');

  return (
    <div className="mb-8">
      <div
        className="mb-3 text-[10px] uppercase text-white/55"
        style={{ letterSpacing: '0.4em' }}
      >
        {t('title')}
      </div>
      <div className="flex flex-wrap gap-2">
        {MOOD_CONFIG.map(({ id, Icon }, i) => {
          const isActive = active === id;
          return (
            <motion.button
              key={id}
              type="button"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(isActive ? null : id)}
              className={cn(
                'inline-flex h-10 items-center gap-2 rounded-full border px-4 text-[12px] font-medium uppercase transition-all duration-200',
                isActive
                  ? 'border-[#b8860b]/60 bg-gradient-to-br from-[#dcc475] via-[#b8860b] to-[#7e5d07] text-black shadow-gold'
                  : 'border-white/12 bg-white/[0.03] text-white/75 hover:border-white/25 hover:bg-white/[0.06] hover:text-white'
              )}
              style={{ letterSpacing: '0.1em' }}
            >
              <Icon className={cn('h-3.5 w-3.5', isActive ? 'text-black' : 'text-[#d4af37]')} />
              <span>{t(id)}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
