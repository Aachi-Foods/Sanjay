// Wires Lenis and GSAP's ScrollTrigger onto the same frame clock and the
// same scroll-position source, so anything section-level builds on top of
// (hero parallax, pinned scroll, scrub-based reveals) reads a scroll
// position that never drifts from what the user actually sees smoothed on
// screen. Call initSmoothScroll() once, client-side only, from a mounted
// component (see components/shared/SmoothScroll.tsx) — it returns a cleanup
// function for that component's unmount/HMR teardown.
//
// Lenis runs in its default (non-virtual-scroll) mode: it still moves the
// real document scroll position each frame, just eased toward the target
// instead of jumping straight there. That matters for two reasons already
// established elsewhere in this codebase: the native-`scroll`-event-driven
// ticker in scrollTicker.ts depends on real scroll events continuing to
// fire, and it means the ScrollTrigger.scrollerProxy below is mostly a
// robustness/correctness measure (documented best practice for pairing the
// two libraries) rather than something load-bearing today — if this ever
// switches to Lenis's virtual-scroll mode, the proxy is what keeps
// ScrollTrigger correct without further changes here.
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerBnrEase } from "./motion";

let pluginsRegistered = false;

function registerPluginsOnce() {
  if (pluginsRegistered) return;
  gsap.registerPlugin(ScrollTrigger);
  registerBnrEase();
  pluginsRegistered = true;
}

export type SmoothScrollHandle = {
  lenis: Lenis | null;
  destroy: () => void;
};

// `reduceMotion` decided once here, not per-effect: every later
// scroll-linked section can assume Lenis is either fully running or fully
// absent, rather than re-checking prefers-reduced-motion itself just to
// decide whether to trust the smoothed position. Individual sections still
// make their own reduced-motion call about whether to *animate* against
// that scroll position at all.
export function initSmoothScroll(reduceMotion: boolean): SmoothScrollHandle {
  registerPluginsOnce();

  if (reduceMotion) {
    // No Lenis instance: native scroll stays in charge, and ScrollTrigger
    // reads real window scroll directly. Nothing to proxy or tick.
    return { lenis: null, destroy: () => {} };
  }

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
  });

  // Tells ScrollTrigger to read/write scroll position through Lenis
  // instead of the raw window/document APIs. Required for correctness if
  // Lenis is ever switched to virtual-scroll mode; harmless (a same-value
  // passthrough) in the current real-scroll mode.
  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (typeof value === "number") {
        lenis.scrollTo(value, { immediate: true });
        return;
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  lenis.on("scroll", ScrollTrigger.update);

  // Lenis's raf loop is driven by GSAP's own ticker rather than a separate
  // requestAnimationFrame call, so both libraries advance on the same frame
  // — the documented pairing for GSAP + Lenis, and what keeps scrub-based
  // ScrollTriggers from lagging a frame behind the smoothed scroll.
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  // GSAP's ticker normally smooths over long frames (e.g. a background tab
  // regaining focus) by pretending less time passed than actually did.
  // With Lenis driving real scroll position from that same ticker, that
  // smoothing fights Lenis's own easing — disabling it here is the
  // documented pairing for GSAP + Lenis.
  gsap.ticker.lagSmoothing(0);

  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("resize", refresh);
  // ScrollTrigger already listens for resize itself; this additional
  // listener specifically re-anchors Lenis's own scroll measurements
  // against the scrollerProxy above after a viewport change, so pin
  // positions don't silently drift on resize.
  const onScrollTriggerRefresh = () => lenis.resize();
  ScrollTrigger.addEventListener("refresh", onScrollTriggerRefresh);

  return {
    lenis,
    // Only tears down what this module created (the Lenis instance, its
    // ticker binding, and these two listeners) — never calls
    // ScrollTrigger.getAll()/kill() here, since individual sections create
    // and clean up their own ScrollTrigger instances independently, and
    // this module doesn't own their lifecycle.
    destroy: () => {
      window.removeEventListener("resize", refresh);
      ScrollTrigger.removeEventListener("refresh", onScrollTriggerRefresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
    },
  };
}
