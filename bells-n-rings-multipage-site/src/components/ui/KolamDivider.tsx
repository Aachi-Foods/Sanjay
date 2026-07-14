/**
 * Geometric divider inspired by South Indian kolam/rangoli floor art — a
 * chain of diamond motifs and center dots along a dotted line. Pure stroke
 * SVG so it stays subtle against the ivory/gold palette.
 */
export default function KolamDivider({ className = "" }: { className?: string }) {
  const motifs = Array.from({ length: 9 });

  return (
    <div
      className={`flex justify-center py-2 ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 32"
        className="h-6 w-full max-w-xs text-gold sm:max-w-sm"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <line x1="0" y1="16" x2="400" y2="16" strokeDasharray="1 8" />
        {motifs.map((_, i) => {
          const x = 20 + i * 45;
          const isCenter = i === Math.floor(motifs.length / 2);
          const scale = isCenter ? 1.6 : 1;
          return (
            <g key={i} transform={`translate(${x} 16)`}>
              <rect
                x={-6 * scale}
                y={-6 * scale}
                width={12 * scale}
                height={12 * scale}
                transform={`rotate(45 0 0)`}
              />
              <circle r={2 * scale} fill="currentColor" stroke="none" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
