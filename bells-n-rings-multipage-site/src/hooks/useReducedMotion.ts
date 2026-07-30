"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

// Framer Motion ships its own `useReducedMotion`, and existing components
// keep using that. This is the equivalent for the GSAP/Three.js layer, which
// doesn't depend on Framer Motion internals — same matchMedia check, plus a
// synchronous variant for imperative setup code (deciding whether to create
// a ScrollTrigger or a pin at all) that runs outside of React's render cycle.
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
}

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

// useSyncExternalStore rather than a matchMedia listener wired through
// useEffect + setState: this is exactly the "subscribe to state that lives
// outside React" case it exists for, and it avoids a render-then-immediately-
// re-render on mount that a naive effect would cause.
export default function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
