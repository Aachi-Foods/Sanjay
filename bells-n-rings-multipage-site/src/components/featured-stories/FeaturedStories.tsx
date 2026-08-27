"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";
import useIsMobile from "@/hooks/useIsMobile";
import { registerBnrEase } from "@/lib/motion";
import { FEATURED_STORIES } from "@/lib/content";
import StoryPanel from "./StoryPanel";

gsap.registerPlugin(ScrollTrigger);

// Shortens the pin's scroll-jacked distance to 80% of the track's true
// horizontal travel. At 100%, five panels' worth of horizontal transit maps
// to a very long stretch of vertical scroll — noticeably out of proportion
// to the section's actual content weight next to the rest of the homepage.
// This only changes the scrub *rate* (how much scrolling it takes to cross
// the section) — the tween's own `x` target below is unchanged, so the last
// panel still lands exactly in place at the end of the pin range either way.
const END_DISTANCE_FACTOR = 0.8;

// Which layout this section renders as — a real change in which elements
// exist, decided once per render, not toggled per-scroll-frame:
//   "pinned"   — desktop, motion allowed: Task 1's pin + horizontal scrub.
//   "carousel" — mobile, motion allowed: a plain scroll-snap swipe strip.
//                Pinned horizontal scroll assumes a mouse-wheel/trackpad
//                gesture a touch viewport doesn't have, so it's dropped
//                entirely here rather than forced.
//   "stacked"  — prefers-reduced-motion, any viewport: a plain vertical
//                stack, fully visible, no pin/parallax/mask-reveal.
type Mode = "pinned" | "carousel" | "stacked";

export default function FeaturedStories() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [masterTween, setMasterTween] = useState<gsap.core.Tween | null>(
    null,
  );

  const stories = FEATURED_STORIES;
  const mode: Mode = reduceMotion ? "stacked" : isMobile ? "carousel" : "pinned";

  // Task 1: pin the section and scrub the track horizontally against
  // vertical scroll. Only ever constructed in "pinned" mode — mode changes
  // (e.g. a resize crossing the mobile breakpoint) tear this down via the
  // cleanup below rather than leaving a stale pin active under the wrong
  // layout.
  useLayoutEffect(() => {
    if (mode !== "pinned") return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    registerBnrEase();

    // A raw pixel `x`, not `xPercent` — xPercent resolves against the
    // *track's own* width (n panels wide), so `-100 * (n-1)` overshoots by a
    // factor of n: it drags the track n-1 full track-widths to the left
    // instead of n-1 panel-widths. Measuring the actual distance directly
    // sidesteps that percentage-basis trap entirely, and as a function it
    // re-resolves on `invalidateOnRefresh` too, so a resize corrects both
    // the travel distance and the scroll length needed to cover it.
    const tween = gsap.to(track, {
      x: () => -(track.offsetWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 0.6,
        start: "top top",
        // Computed from the track's actual rendered width, not hardcoded —
        // stays correct if a story is ever added or removed. `invalidateOnRefresh`
        // makes ScrollTrigger re-run this function (and re-measure
        // offsetWidth/innerWidth) on resize, so the pin range self-corrects
        // instead of freezing at whatever it was computed as on first load.
        end: () =>
          `+=${(track.offsetWidth - window.innerWidth) * END_DISTANCE_FACTOR}`,
        invalidateOnRefresh: true,
      },
    });

    setMasterTween(tween);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      setMasterTween(null);
    };
  }, [mode, stories.length]);

  if (mode === "stacked") {
    return (
      <section className="bg-charcoal py-16 sm:py-24">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 sm:px-8">
          {stories.map((story, index) => (
            <StoryPanel
              key={story.slug}
              story={story}
              index={index}
              variant="stacked"
              masterTween={null}
            />
          ))}
        </div>
      </section>
    );
  }

  if (mode === "carousel") {
    return (
      <section className="bg-charcoal py-10">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2">
          {stories.map((story, index) => (
            <StoryPanel
              key={story.slug}
              story={story}
              index={index}
              variant="carousel"
              masterTween={null}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-charcoal">
      <div
        ref={trackRef}
        className="flex h-screen"
        style={{ width: `${stories.length * 100}vw` }}
      >
        {stories.map((story, index) => (
          <StoryPanel
            key={story.slug}
            story={story}
            index={index}
            variant="pinned"
            masterTween={masterTween}
          />
        ))}
      </div>
    </section>
  );
}
