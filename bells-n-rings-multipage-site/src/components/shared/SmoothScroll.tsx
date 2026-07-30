"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";

let pluginRegistered = false;

// Mounted once in the root layout — the App Router's root layout persists
// across client-side navigations, so this Lenis instance and its GSAP
// ticker binding live for the lifetime of the tab, not per page.
//
// Lenis, left in its default (non-virtual-scroll) mode, still moves the
// real document scroll position each frame; it just eases toward the
// target instead of jumping straight there. That matters because the site
// already has a native-`scroll`-event-driven ticker (scrollTicker.ts) that
// several sections depend on — since Lenis keeps firing real scroll
// events, that system keeps working untouched. This component only adds a
// second consumer of the same real scroll position: GSAP's ScrollTrigger.
export default function SmoothScroll() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!pluginRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      pluginRegistered = true;
    }

    // Reduced motion: skip the inertial easing entirely and leave native
    // scroll in charge. ScrollTrigger still works against native scroll
    // with no Lenis in the loop — individual components decide whether to
    // create scrubbed/pinned triggers at all under reduced motion.
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    // GSAP's ticker normally smooths over long frames (e.g. a background
    // tab regaining focus) by pretending less time passed than actually
    // did. With Lenis driving real scroll position from that same ticker,
    // that smoothing fights Lenis's own easing — disabling it here is the
    // documented pairing for GSAP + Lenis.
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return null;
}
