"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { onScrollTick, viewportProgress } from "./scrollTicker";

// Wraps a whole section so it drifts as it crosses the viewport, instead of
// fading in once and then sitting perfectly still. Giving neighbouring
// sections different `depth` values makes them travel at different rates,
// which is what sells the page as scenes moving past rather than a stack of
// static blocks.
//
// Deliberately does not scale the section. A continuous scale leaves text
// sitting at a fractional pixel size for as long as it is on screen, which
// renders it soft — and this site has already had one round of blurred text
// from transforms. Translation is resolution-independent.
//
// Nor does it fade back out on the way past: a tall section is still being
// read when its progress is near 1, and dimming it then hides copy the
// visitor is in the middle of.
export default function StoryStage({
  children,
  className = "",
  depth = 28,
}: {
  children: ReactNode;
  className?: string;
  // px of drift across the full travel. Vary it between adjacent sections.
  depth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) {
      // Reduced motion still needs the section visible, since opacity is
      // animated in below.
      if (el) el.style.opacity = "1";
      return;
    }

    return onScrollTick(() => {
      const p = viewportProgress(el);
      const y = (0.5 - p) * depth * 2;
      // Ramp in over the first slice of travel, then hold.
      const opacity = Math.min(1, p / 0.16);
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      el.style.opacity = opacity.toFixed(3);
    });
  }, [reduceMotion, depth]);

  // Rendered fully visible and only dimmed once the ticker takes over on
  // mount. Starting at opacity 0 in the markup would leave the entire page
  // blank for anyone whose JavaScript fails to run.
  return (
    <div ref={ref} data-story-stage="" className={className}>
      {children}
    </div>
  );
}
