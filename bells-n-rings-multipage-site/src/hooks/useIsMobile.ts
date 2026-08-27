"use client";

import { useSyncExternalStore } from "react";

// 767px — matches Tailwind's own `md:` cutoff (768px), so this agrees with
// every responsive class already in use on the site rather than defining a
// second, slightly different notion of "mobile."
const QUERY = "(max-width: 767px)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

// Assumes desktop on the server and for the very first client render —
// same contract as useReducedMotion. A real mobile viewport briefly
// mismatches the server's guess, but useSyncExternalStore is built to
// reconcile exactly that divergence without a hydration warning, then
// resyncs immediately after.
function getServerSnapshot() {
  return false;
}

// Deciding between the pinned horizontal scroll (desktop) and a plain
// scroll-snap carousel (mobile) is a real change in which elements get
// rendered, not just an animation range — the same category of decision
// useReducedMotion already exists for, so this mirrors that hook's
// implementation exactly rather than a useEffect+useState viewport check.
export default function useIsMobile(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
