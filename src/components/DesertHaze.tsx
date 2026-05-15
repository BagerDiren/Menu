'use client';

import { motion } from 'framer-motion';

/**
 * Gerçek bir çöl atmosferi — 4 sis/toz tabakası yatayda yavaşça süzülür.
 * Her katman farklı opasite, renk, hız ve dikey konumda → derinlik hissi.
 * Tek tek nokta yerine yumuşak, atmosferik bir çöl rüzgârı.
 */
export default function DesertHaze() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Layer 1 — uzak büyük altın sis bandı (yavaş) */}
      <motion.div
        className="absolute -left-1/2 -right-1/2 top-[15%] h-1/3"
        style={{
          background:
            'radial-gradient(ellipse 60% 100% at center, rgba(232,210,164,0.13), rgba(212,175,55,0.06) 35%, transparent 70%)',
          filter: 'blur(28px)'
        }}
        animate={{ x: ['-12%', '12%', '-12%'] }}
        transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Layer 2 — ufuk hattında yatay sıcak haze (orta hız) */}
      <motion.div
        className="absolute -left-1/2 -right-1/2 top-[42%] h-1/4"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(245,224,142,0.12) 25%, rgba(232,210,164,0.18) 50%, rgba(245,224,142,0.12) 75%, transparent 100%)',
          filter: 'blur(22px)'
        }}
        animate={{ x: ['-25%', '25%'] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
      />

      {/* Layer 3 — yakın yer toz bulutu (alt 3/4 — yer seviyesi) */}
      <motion.div
        className="absolute -left-1/3 -right-1/3 bottom-[8%] h-1/3"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at center, rgba(184,134,11,0.18), rgba(184,134,11,0.08) 40%, transparent 75%)',
          filter: 'blur(36px)'
        }}
        animate={{ x: ['-18%', '18%', '-18%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut', delay: -10 }}
      />

      {/* Layer 4 — yüksek hızlı ince ön plan toz şeridi (en yakın) */}
      <motion.div
        className="absolute -left-1/2 -right-1/2 top-[58%] h-[8%]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,240,200,0.10) 30%, rgba(255,245,210,0.20) 50%, rgba(255,240,200,0.10) 70%, transparent 100%)',
          filter: 'blur(14px)'
        }}
        animate={{ x: ['-30%', '30%'] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />

      {/* Layer 5 — yumuşak film grain (statik, çok soluk) */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-[0.08]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22240%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>")'
        }}
      />
    </div>
  );
}
