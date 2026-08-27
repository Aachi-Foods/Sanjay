"use client";

import { useEffect } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";
import { initSmoothScroll } from "@/lib/smooth-scroll";

// Mounted once in the root layout — the App Router's root layout persists
// across client-side navigations, so the Lenis instance and its GSAP ticker
// binding (see lib/smooth-scroll.ts) live for the lifetime of the tab, not
// per page. The actual Lenis/ScrollTrigger wiring lives in that module so
// section-level effects can reason about "is smooth scroll running" as a
// single shared concern instead of each reaching into this component.
export default function SmoothScroll() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handle = initSmoothScroll(reduceMotion);
    return handle.destroy;
  }, [reduceMotion]);

  return null;
}
