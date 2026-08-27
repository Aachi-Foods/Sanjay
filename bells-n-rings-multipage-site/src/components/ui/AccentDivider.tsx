import { forwardRef } from "react";

// Length in SVG user units — fixed rather than responsive, so the rendered
// line's actual pixel width (set via className) never has to be measured:
// getTotalLength() on the <line> always comes back as exactly this number,
// matching the static strokeDasharray/strokeDashoffset fallback below with
// no risk of the two drifting apart.
const LENGTH = 64;

// A single-path gold accent line, built as SVG (not a CSS border) so its
// length can be driven by stroke-dashoffset for a draw-in reveal. The ref
// is forwarded straight to the <line> so the caller's GSAP tween can target
// it directly. strokeDasharray/strokeDashoffset are also set as static JSX
// attributes — not only via the caller's gsap.set() — so the line renders
// fully hidden even for the one frame before JS runs, rather than flashing
// fully drawn first.
const AccentDivider = forwardRef<SVGLineElement, { className?: string }>(
  function AccentDivider({ className = "" }, ref) {
    return (
      <svg
        role="presentation"
        aria-hidden="true"
        viewBox={`0 0 ${LENGTH} 2`}
        preserveAspectRatio="none"
        className={`h-[2px] w-16 ${className}`}
      >
        <line
          ref={ref}
          x1="0"
          y1="1"
          x2={LENGTH}
          y2="1"
          stroke="var(--color-gold)"
          strokeWidth="2"
          strokeDasharray={LENGTH}
          strokeDashoffset={LENGTH}
        />
      </svg>
    );
  },
);

export default AccentDivider;
