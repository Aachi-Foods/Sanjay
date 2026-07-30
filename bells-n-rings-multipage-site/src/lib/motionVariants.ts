import type { Transition, Variants } from "framer-motion";

// Shared vocabulary for the GSAP/Three.js animation pass — soft, decelerating
// curves throughout. This brand doesn't bounce, so elastic/spring easings
// are deliberately absent everywhere in this file.
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  short: 0.6,
  base: 0.8,
  long: 1.1,
} as const;

// Per-item delay inside a staggered group (cards, grid tiles, nav items).
export const STAGGER = {
  tight: 0.06,
  base: 0.08,
  loose: 0.12,
} as const;

export function fadeUpTransition(delay = 0, duration: number = DURATION.short): Transition {
  return { duration, delay, ease: EASE_OUT };
}

// Simple fade + rise. Reduced motion still needs a variant object (Framer
// Motion has no built-in reduced-motion mode), so callers branch to
// `fadeUpReduced` instead of this one — see `useReducedMotion`.
export const fadeUp = (y = 24, duration: number = DURATION.short): Variants => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration, ease: EASE_OUT } },
});

// Reduced-motion counterpart: same start/end state, no travel — just a
// slightly quicker cross-fade so content still announces itself as "new."
export const fadeUpReduced = (duration = 0.4): Variants => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration, ease: "linear" } },
});

// Wrap a group of `fadeUp` children in this to stagger them in reading
// order. `staggerChildren` is intentionally the only timing knob here —
// each child still supplies its own duration/easing via `fadeUp`.
export const staggerContainer = (
  stagger: number = STAGGER.base,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

// Reduced motion: children still need *a* container to fade in against
// (whileInView is set on the parent), but they should arrive together
// rather than marching in one at a time.
export const staggerContainerReduced = (): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0 } },
});

export const scaleFade = (fromScale = 0.98): Variants => ({
  hidden: { opacity: 0, scale: fromScale },
  visible: { opacity: 1, scale: 1, transition: { duration: DURATION.short, ease: EASE_OUT } },
});

// Standard "once, on first scroll into view" viewport config. Margin is
// pulled in from the bottom only — see Reveal.tsx for why a symmetric
// margin can leave short-viewport content invisible for several scrolls.
export const VIEWPORT_ONCE = { once: true, margin: "0px 0px -60px 0px" } as const;
