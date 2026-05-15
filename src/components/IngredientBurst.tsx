'use client';

import { AnimatePresence, motion } from 'framer-motion';

/**
 * Malzemeler kartın merkezinden radyal olarak dağılır,
 * hover/tap kalkınca geri toplanır.
 */
export default function IngredientBurst({
  ingredients,
  active,
  radius = 96
}: {
  ingredients: string[];
  active: boolean;
  radius?: number;
}) {
  const items = ingredients.slice(0, 8);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Soft golden halo */}
          <motion.div
            className="absolute h-32 w-32 rounded-full bg-gold-400/15 blur-3xl"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1.3, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />

          {items.map((label, i) => {
            const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
            const tx = Math.cos(angle) * radius;
            const ty = Math.sin(angle) * radius;
            return (
              <motion.span
                key={`${label}-${i}`}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                animate={{
                  x: tx,
                  y: ty,
                  opacity: 1,
                  scale: 1,
                  rotate: [0, 4, -3, 0]
                }}
                exit={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                transition={{
                  type: 'spring',
                  stiffness: 160,
                  damping: 16,
                  delay: i * 0.04
                }}
                className="absolute text-[10px] sm:text-[11px] font-medium uppercase tracking-widest text-gold-200 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] whitespace-nowrap select-none"
              >
                <span className="rounded-full bg-nile-950/70 border border-gold-300/40 px-2 py-0.5 backdrop-blur-sm">
                  {label}
                </span>
              </motion.span>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
