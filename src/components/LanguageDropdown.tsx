'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { localeMeta, locales, type Locale } from '@/i18n';
import { cn } from '@/lib/utils';

/**
 * Minimalist glassmorphism language picker. Opens upward (intended to sit
 * near the bottom of a splash screen). Pure presentational — caller owns
 * the selected value and gets onChange callbacks.
 */
export default function LanguageDropdown({
  value,
  onChange,
  className
}: {
  value: Locale;
  onChange: (l: Locale) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const current = localeMeta[value];

  return (
    <div ref={ref} className={cn('relative w-full', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3.5 text-left transition hover:border-white/25 hover:bg-white/[0.08]"
        style={{ backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
      >
        <span className="text-base leading-none" aria-hidden>
          {current.flag}
        </span>
        <span className="flex-1 text-sm tracking-wide text-white/90">{current.native}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-white/55 transition-transform duration-300',
            open && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute bottom-full left-0 right-0 mb-2 overflow-hidden rounded-2xl border border-white/15 bg-black/75 shadow-deepNile"
            style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
          >
            {locales.map((l) => {
              const meta = localeMeta[l];
              const active = l === value;
              return (
                <li key={l}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onChange(l);
                      setOpen(false);
                    }}
                    className={cn(
                      'flex w-full items-center gap-3 px-5 py-3 text-left transition',
                      active
                        ? 'bg-white/[0.06] text-white'
                        : 'text-white/80 hover:bg-white/[0.04] hover:text-white'
                    )}
                  >
                    <span className="text-base leading-none" aria-hidden>
                      {meta.flag}
                    </span>
                    <span
                      className="flex-1 text-sm tracking-wide"
                      style={
                        meta.dir === 'rtl' ? { fontFamily: 'var(--font-arabic)' } : undefined
                      }
                    >
                      {meta.native}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                      {meta.label}
                    </span>
                    {active && <Check className="h-3.5 w-3.5 text-gold-400" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
