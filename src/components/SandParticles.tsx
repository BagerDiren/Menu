'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

/**
 * Visible dust-particle cloud — div-based, Framer Motion animated.
 * White at ~50% peak opacity so it reads clearly over the dark photo.
 */
export default function SandParticles({ count = 26 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: (i * 53) % 100,
        y: (i * 31) % 100,
        size: 2 + (i % 3), // 2-4 px
        delay: (i % 8) * 0.9,
        duration: 18 + ((i * 5) % 10),
        drift: 140 + ((i * 23) % 120),
        rise: 40 + ((i * 7) % 30)
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white/80"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            boxShadow: '0 0 8px rgba(255,255,255,0.6)'
          }}
          animate={{
            x: [0, p.drift / 2, p.drift],
            y: [0, -p.rise / 2, -p.rise],
            opacity: [0, 0.55, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
}
