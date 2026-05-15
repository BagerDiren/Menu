'use client';

import { useEffect, useRef } from 'react';

/**
 * Canvas-based desert dust storm. 200 particles, physics-driven drift, layered
 * depth with motion blur. Pure 2D canvas — no WebGL, no library. Pauses
 * when offscreen for performance.
 */
export default function DustStorm({
  density = 200,
  className = ''
}: {
  density?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    // Layered particles — depth (z) controls size, speed and opacity
    type P = {
      x: number;
      y: number;
      z: number;
      r: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    };
    const rng = (a: number, b: number) => a + Math.random() * (b - a);
    const spawn = (init = false): P => {
      const z = Math.random(); // 0 = far, 1 = near
      return {
        x: init ? Math.random() * w : -20,
        y: rng(h * 0.1, h * 0.95),
        z,
        r: rng(0.6, 1.6) + z * 1.4,
        vx: rng(0.35, 0.9) + z * 1.6, // px per frame
        vy: rng(-0.15, 0.05),
        life: 0,
        maxLife: rng(360, 720)
      };
    };

    const particles: P[] = Array.from({ length: density }, () => spawn(true));

    let raf = 0;
    let lastTs = performance.now();
    let visible = true;
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const tick = (ts: number) => {
      const dt = Math.min(50, ts - lastTs) / 16.6667; // normalize to ~60fps frames
      lastTs = ts;

      if (visible) {
        // Trail effect — fade previous frame instead of clearing fully
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0,0,0,0.18)';
        ctx.fillRect(0, 0, w, h);

        ctx.globalCompositeOperation = 'source-over';
        for (const p of particles) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.life += dt;

          if (p.x > w + 40 || p.life > p.maxLife) {
            Object.assign(p, spawn(false));
          }

          // Subtle vertical drift modulation (wind gust feel)
          p.vy += (Math.random() - 0.5) * 0.002;
          p.vy = Math.max(-0.3, Math.min(0.2, p.vy));

          // Opacity proportional to depth (near particles brighter)
          const alpha = 0.05 + p.z * 0.45;

          // Layered colour — gold for foreground, warm white for background
          const goldNess = p.z;
          const r = Math.round(255);
          const g = Math.round(245 - 30 * (1 - goldNess));
          const b = Math.round(220 - 80 * (1 - goldNess));

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.shadowBlur = p.z * 12;
          ctx.shadowColor = `rgba(${r},${g},${b},${alpha * 0.6})`;
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(tick);
      rafRef.current = raf;
    };
    raf = requestAnimationFrame(tick);
    rafRef.current = raf;

    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      io.disconnect();
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full mix-blend-screen ${className}`}
    />
  );
}
