import type { Variants } from "framer-motion";

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

// Reduced motion is folded into the *transition timing* here, not into a
// differently-shaped `hidden` state picked by the caller. An earlier version
// of this file exposed `fadeUpReduced`/`staggerContainerReduced` as separate
// variant objects for callers to branch to — but framer-motion's
// useReducedMotion can resolve synchronously on the client before hydration
// while the server always renders its no-preference default, so whichever
// variant a caller picked could differ between the server-rendered HTML and
// the client's first paint, a real hydration mismatch for anyone with the
// OS preference on. Keeping `hidden`'s shape fixed regardless of
// reduceMotion — and only collapsing the *duration* to near-zero — means
// there's nothing for server and client to disagree about at mount.
const INSTANT = 0.01;

// Simple fade + rise.
export const fadeUp = (
  y = 24,
  duration: number = DURATION.short,
  reduceMotion = false,
): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: reduceMotion
      ? { duration: INSTANT, ease: "linear" }
      : { duration, ease: EASE_OUT },
  },
});

// Wrap a group of `fadeUp` children in this to stagger them in reading
// order. `staggerChildren`/`delayChildren` are the only timing knobs here —
// each child still supplies its own duration/easing via `fadeUp`. Under
// reduced motion the stagger collapses to 0 so children arrive together
// instead of marching in one at a time.
export const staggerContainer = (
  stagger: number = STAGGER.base,
  delayChildren = 0,
  reduceMotion = false,
): Variants => ({
  hidden: {},
  visible: {
    transition: reduceMotion
      ? { staggerChildren: 0 }
      : { staggerChildren: stagger, delayChildren },
  },
});

export const scaleFade = (
  fromScale = 0.98,
  duration: number = DURATION.short,
  reduceMotion = false,
): Variants => ({
  hidden: { opacity: 0, scale: fromScale },
  visible: {
    opacity: 1,
    scale: 1,
    transition: reduceMotion
      ? { duration: INSTANT, ease: "linear" }
      : { duration, ease: EASE_OUT },
  },
});

// Standard "replays every time it scrolls into view" viewport config —
// content fades back out above the fold and re-plays on the way back down,
// rather than only ever animating in once. Margin is pulled in from the
// bottom only — see Reveal.tsx for why a symmetric margin can leave
// short-viewport content invisible for several scrolls.
export const VIEWPORT_REVEAL = { once: false, margin: "0px 0px -60px 0px" } as const;
