import { cn } from '@/lib/utils';

/**
 * Stacked decorative layers that go ON TOP of every food photo.
 *
 *  - `card`   — top dark for badge contrast + gold sheen + bottom dark + edge vignette
 *  - `hero`   — modal hero: lighter top, soft bottom for title, gold corner glow
 *  - `thumb`  — pairing & small thumbnails: simple bottom dark
 *  - `plate`  — circular feast-table plate sheen
 *
 * Every layer is `pointer-events-none` so it never blocks interaction.
 */
export type OverlayVariant = 'card' | 'hero' | 'thumb' | 'plate';

export default function ImageOverlay({
  variant = 'card',
  className,
  intensity = 1
}: {
  variant?: OverlayVariant;
  className?: string;
  /** 0–1 — scales darkness for cards over very light photos. */
  intensity?: number;
}) {
  const root = cn('pointer-events-none absolute inset-0', className);

  if (variant === 'thumb') {
    return (
      <div className={root}>
        <div
          className="absolute inset-0 bg-gradient-to-t from-nile-950 via-nile-950/30 to-transparent"
          style={{ opacity: 0.85 * intensity }}
        />
      </div>
    );
  }

  if (variant === 'plate') {
    return (
      <div className={cn(root, 'rounded-full')}>
        {/* Diagonal sheen — light catching the rim */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/12 to-transparent" />
        {/* Inner shadow for porcelain depth */}
        <div className="absolute inset-0 shadow-[inset_0_0_36px_rgba(3,16,26,0.55)]" />
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={root}>
        {/* Bottom dark for the dish title */}
        <div className="absolute inset-0 bg-gradient-to-t from-nile-950 via-nile-950/30 to-transparent" />
        {/* Gold corner glow */}
        <div className="absolute top-0 right-0 h-2/3 w-2/3 bg-[radial-gradient(circle_at_top_right,rgba(233,179,44,0.22),transparent_55%)]" />
        {/* Edge vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(3,16,26,0.45)]" />
      </div>
    );
  }

  // 'card' default
  return (
    <div className={root}>
      {/* Top darken for top-row badges */}
      <div
        className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-nile-950/75 to-transparent"
        style={{ opacity: intensity }}
      />
      {/* Bottom heavy darken under the glass panel — keeps text crisp */}
      <div
        className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-nile-950 via-nile-950/55 to-transparent"
        style={{ opacity: intensity }}
      />
      {/* Subtle gold sheen on the top-right corner */}
      <div className="absolute top-0 right-0 h-3/5 w-3/5 bg-[radial-gradient(circle_at_top_right,rgba(245,224,142,0.18),transparent_60%)]" />
      {/* Edge vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(3,16,26,0.5)]" />
    </div>
  );
}
