"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BNR_EASE_GSAP_NAME } from "@/lib/motion";
import type { GalleryCategorySlug, GalleryItem } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_LABELS: Record<GalleryCategorySlug, string> = {
  weddings: "Wedding",
  receptions: "Reception",
  traditional: "Traditional Ceremony",
  corporate: "Corporate & Private",
};

type Variant = "pinned" | "carousel" | "stacked";

const VARIANT_CLASSES: Record<Variant, string> = {
  pinned: "story-panel h-screen w-screen shrink-0",
  carousel: "h-[70vh] w-full shrink-0 snap-center",
  stacked: "aspect-[4/5] w-full sm:aspect-[16/9]",
};

export default function StoryPanel({
  story,
  index,
  variant,
  masterTween,
}: {
  story: GalleryItem;
  index: number;
  variant: Variant;
  // Only ever set (non-null) in the "pinned" variant — the master horizontal
  // scrub tween Task 1 creates, which this panel's own nested ScrollTriggers
  // key their progress to via containerAnimation. Carousel/stacked panels
  // never receive one, since neither uses the pin at all.
  masterTween: gsap.core.Tween | null;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const photoLayerRef = useRef<HTMLDivElement>(null);
  const captionLayerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);

  const pinned = variant === "pinned";

  // Task 2 (two-speed parallax) + Task 3 (mask-reveal text), both keyed to
  // this panel's own transit through the master horizontal scrub via
  // containerAnimation — not to raw vertical scroll — so each of the 5
  // panels' effects fire independently as that panel takes its turn
  // crossing the viewport, rather than all 5 firing together. Skipped
  // entirely outside the pinned variant: carousel/stacked panels render
  // their text already fully revealed with no parallax, by design.
  useLayoutEffect(() => {
    if (!pinned || !masterTween) return;
    const panel = panelRef.current;
    const photoLayer = photoLayerRef.current;
    const captionLayer = captionLayerRef.current;
    const title = titleRef.current;
    const location = locationRef.current;
    if (!panel || !photoLayer || !captionLayer || !title || !location) return;

    const ctx = gsap.context(() => {
      // Caption "outruns" the photo during the panel's own transit — a much
      // larger swing (+-15%) than the photo's (+-5%), which is what reads
      // as two speeds rather than one static layer and one moving layer.
      gsap.fromTo(
        captionLayer,
        { xPercent: 15 },
        {
          xPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: masterTween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        },
      );
      gsap.fromTo(
        photoLayer,
        { xPercent: 5 },
        {
          xPercent: -5,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: masterTween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        },
      );

      // A discrete play/reverse timeline was tried first here, per the
      // brief, using a narrow "left 60%"/"left 20%" window meant to fire
      // right as the panel becomes primary. Two problems surfaced testing
      // it against this track's actual geometry: panel 0's equivalent
      // window falls entirely *before* scroll position 0 (it's already the
      // active panel at rest, with nothing to scroll past first), so its
      // "onEnter" never fires and its text never reveals at all; and for
      // every other panel, the narrow window's "onLeave" (the toggleActions
      // reverse) landed well before the panel had actually scrolled off
      // screen — its own text was visibly wiping back to hidden while the
      // panel was still the one in view.
      //
      // Reusing the *same* "left right"/"right left" window already proven
      // correct for the Task 2 parallax above — the panel's true full
      // transit across the viewport — and scrubbing a reveal-then-rehide
      // across it as one continuous function of scroll position sidesteps
      // both: it's tied directly to where the panel actually is on screen
      // rather than a separately-guessed narrow band, it can't get stuck in
      // an intermediate state under fast back-and-forth scrolling the way a
      // discrete toggled timeline can, and a panel whose window starts
      // before scroll position 0 (panel 0) or ends after position 1 (the
      // last panel) simply clamps at whatever the visible part of its
      // reveal resolves to — panel 0 lands already revealed, the last panel
      // stays revealed at the end, both correct without special-casing.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: panel,
            containerAnimation: masterTween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        })
        // Reveal shortly after entering, hold through the panel's time as
        // the primary one in view (nothing animates clip-path between the
        // two windows below, so it simply stays put), then wipe back to
        // hidden as it starts genuinely leaving. All four positions are
        // absolute fractions of this timeline, which the "left right"/
        // "right left" scrub maps onto the panel's actual full transit —
        // 0.1 is 10% of the way through that transit, not 10% of a
        // real-time duration. Location trails the title by a short beat on
        // both ends, same as the hero's heading/subtext choreography.
        .fromTo(
          title,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.15, ease: BNR_EASE_GSAP_NAME },
          0.1,
        )
        .fromTo(
          location,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.15, ease: BNR_EASE_GSAP_NAME },
          0.15,
        )
        .to(
          title,
          { clipPath: "inset(0 0 100% 0)", duration: 0.15, ease: BNR_EASE_GSAP_NAME },
          0.75,
        )
        .to(
          location,
          { clipPath: "inset(0 0 100% 0)", duration: 0.13, ease: BNR_EASE_GSAP_NAME },
          0.72,
        );
    }, panel);

    return () => ctx.revert();
  }, [pinned, masterTween]);

  return (
    <div
      ref={panelRef}
      data-story-panel=""
      className={`relative flex items-center overflow-hidden bg-charcoal ${VARIANT_CLASSES[variant]}`}
    >
      {/* Oversized (scale 1.12) on a static inner wrapper, separate from the
          xPercent-animated layer above it — the same two-layer split used
          for the hero video and the AboutTeaser photo drift, needed here so
          a +-5% horizontal shift never reveals an empty edge outside the
          photo. */}
      <div ref={photoLayerRef} className="absolute inset-0">
        <div className="absolute inset-0 scale-[1.12]">
          <Image
            src={story.image}
            alt={story.imageAlt}
            fill
            sizes="100vw"
            priority={index === 0}
            className="object-cover"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/15 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div
        ref={captionLayerRef}
        className="relative z-10 max-w-xl px-8 sm:px-16"
      >
        <span className="inline-block rounded-full border border-ivory/40 px-3 py-1 font-sans text-[0.65rem] tracking-[0.2em] text-ivory uppercase">
          {CATEGORY_LABELS[story.category]}
        </span>

        <div className="mt-4 overflow-hidden">
          <h2
            ref={titleRef}
            style={pinned ? { clipPath: "inset(0 0 100% 0)" } : undefined}
            className="font-display text-4xl leading-tight text-ivory sm:text-5xl md:text-6xl"
          >
            {story.title}
          </h2>
        </div>

        <div className="mt-3 overflow-hidden">
          <p
            ref={locationRef}
            style={pinned ? { clipPath: "inset(0 0 100% 0)" } : undefined}
            className="font-sans text-sm tracking-[0.1em] text-ivory/80 uppercase"
          >
            {story.location}
          </p>
        </div>

        <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-ivory/85">
          {story.description}
        </p>
      </div>
    </div>
  );
}
