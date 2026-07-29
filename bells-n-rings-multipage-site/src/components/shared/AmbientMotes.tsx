"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { onScrollTick, viewportProgress } from "./scrollTicker";

// Slow drifting points of gold light, like embers over a lit mandap. Purely
// atmospheric: hidden from assistive tech and untouchable by the pointer.
//
// Positions come from a hash of the index rather than Math.random. This is
// prerendered to static HTML, so a random layout would differ between the
// server's markup and the client's first render and React would throw a
// hydration mismatch.
function hash(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export default function AmbientMotes({
  count = 18,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // The field slides slower than the page, so the lights read as hanging
  // behind the content rather than stuck to it.
  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;
    return onScrollTick(() => {
      const p = viewportProgress(el);
      el.style.transform = `translate3d(0, ${((0.5 - p) * 60).toFixed(2)}px, 0)`;
    });
  }, [reduceMotion]);

  // Drifting lights are exactly the kind of unprompted movement the
  // reduced-motion setting exists to suppress.
  if (reduceMotion) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {Array.from({ length: count }, (_, i) => {
        const left = hash(i, 1) * 100;
        const top = hash(i, 2) * 100;
        const size = 2 + hash(i, 3) * 4;
        const duration = 9 + hash(i, 4) * 12;
        const delay = -hash(i, 5) * duration;
        const drift = (hash(i, 6) - 0.5) * 60;

        return (
          <span
            key={i}
            className="bnr-mote absolute rounded-full bg-gold"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              opacity: 0.18 + hash(i, 7) * 0.4,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              // Read by the keyframes so each light wanders its own way.
              ["--bnr-mote-x" as string]: `${drift}px`,
            }}
          />
        );
      })}
    </div>
  );
}
