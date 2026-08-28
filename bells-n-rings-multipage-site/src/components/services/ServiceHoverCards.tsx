"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";
import { useTilt } from "@/hooks/useTilt";
import {
  BNR_EASE,
  LIFT_MAX_Z,
  SHADOW_GOLD_LG,
  SHADOW_GOLD_SM,
  registerBnrEase,
} from "@/lib/motion";
import { Perspective3D } from "../motion/Perspective3D";
import type { Service } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

// The sitewide gold shadow tiers, not a locally hand-picked pair — sm at
// rest, lg on hover/lift. Both strings share the same shape (four lengths,
// one rgba color) so Framer's box-shadow interpolation tweens smoothly
// between them instead of hard-cutting.
const BASE_SHADOW = SHADOW_GOLD_SM;
const HOVER_SHADOW = SHADOW_GOLD_LG;
// Under the sitewide LIFT_MAX_Z (32) ceiling — a card is a large, frequently
// hovered element, so it sits further under the ceiling than something
// small like a button.
const CARD_LIFT_Z = LIFT_MAX_Z - 8;
// Top of the 2-6deg ceiling audited in MOTION-AUDIT.md — a magnetic
// cursor-tracking tilt on an element this large reads best at the upper
// end of the band, unlike the tighter buttons/footer links.
const CARD_TILT_MAX_DEG = 6;
// Single warm-gold glow for every card rather than per-category colors —
// services have no existing category taxonomy of their own (unlike
// GalleryItem elsewhere in the codebase) to theme against, and inventing
// one would be a content decision, not a motion one.
const GLOW_GRADIENT =
  "radial-gradient(circle, rgba(201, 168, 76, 0.45), transparent 70%)";

// Hover feature cards: at rest a card shows only its title and photo, with
// the full description parked out of sight behind it. Pointing at the card
// slides the description down into the space below, like a drawer.
//
// Mouse users get that on hover. Touch devices have no hover at all, so
// there the same panel opens from scroll position instead — as a card
// reaches the middle of the viewport — otherwise the descriptions would be
// unreachable on a phone. Which trigger applies is decided from the
// pointer's capabilities, not the viewport width, since a small window on a
// laptop still has a real cursor.
//
// The panel is only ever moved and faded, never unmounted, so its text stays
// in the markup for search engines and screen readers.

// The observer's root is squeezed to a horizontal band across the middle of
// the viewport; a card counts as active while it overlaps that band.
const CENTRE_BAND = "-38% 0px -38% 0px";

function ServiceHoverCard({
  service,
  isHovered,
  isDimmed,
  onHoverStart,
  onHoverEnd,
}: {
  service: Service;
  isHovered: boolean;
  isDimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const faceRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [inBand, setInBand] = useState(false);

  // Cursor position is measured against the outer card div — which never
  // itself rotates — rather than the face that actually tilts. Measuring
  // against a rotating element creates a feedback loop: near the edges of
  // a large element at a large max angle (this card is ~390px at a full
  // 6deg, the top of the ceiling), the rotated surface visually shifts out
  // from under a cursor sitting at a fixed screen position, which fires a
  // leave, resets rotation toward 0, brings the surface back under the
  // cursor, and re-fires enter — a flicker right at the edges, which is
  // exactly where a magnetic tilt is most likely to get tested. Confirmed
  // live: measuring off the face itself reproduced the flicker at every
  // edge; measuring off the never-rotated outer div does not, regardless
  // of how close to the ceiling the rotation gets. useTilt already guards
  // touch (pointer: coarse) and reduced motion internally, so neither
  // needs handling again here.
  const {
    ref: outerRef,
    rotateX,
    rotateY,
    onMouseMove: onTiltMouseMove,
    onMouseLeave: onTiltMouseLeave,
  } = useTilt({ maxDeg: CARD_TILT_MAX_DEG });

  // will-change is only useful while this card or a sibling is actually
  // mid-transform (the lift itself, or the recede triggered by a sibling's
  // lift) — toggled off the rest of the time rather than left on
  // permanently.
  useEffect(() => {
    const face = faceRef.current;
    if (!face) return;
    face.style.willChange = isHovered || isDimmed ? "transform" : "auto";
  }, [isHovered, isDimmed]);

  useEffect(() => {
    const el = outerRef.current;
    // Reduced motion gets every panel open and static, so nothing depends on
    // pointing or scrolling to become readable.
    if (!el || reduceMotion) return;

    // A real cursor drives this by hover; only fall back to scroll where
    // there isn't one.
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInBand(entry.isIntersecting),
      { rootMargin: CENTRE_BAND, threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion, outerRef]);

  // `reduceMotion` here is the shared useSyncExternalStore-based hook
  // (src/hooks/useReducedMotion.ts), not framer-motion's own — that one can
  // resolve synchronously on the client before hydration while the server
  // renders its no-preference default, and reading it straight into `open`
  // caused a real hydration mismatch (confirmed the same way as the earlier
  // Hero/AboutTeaser fixes). useSyncExternalStore is built for precisely
  // this "value depends on an environment React can't see during SSR" case
  // — it matches the server's snapshot for the first client render, then
  // resyncs immediately after, without a mismatch.
  const open = reduceMotion || isHovered || inBand;

  // Hover treatment: this card lifts forward (scale + translateZ + a
  // gold-tinted shadow) while any *other* card being hovered instead sends
  // this one into isDimmed (scale down, dim slightly) — the "hero card
  // among peers" read. Reduced motion keeps the shadow-deepen as a static
  // highlight but drops the scale/translateZ motion entirely.
  const faceAnimate = reduceMotion
    ? {
        scale: isHovered ? 1.01 : 1,
        z: 0,
        boxShadow: isHovered ? HOVER_SHADOW : BASE_SHADOW,
      }
    : isHovered
      ? { scale: 1.03, z: CARD_LIFT_Z, boxShadow: HOVER_SHADOW, opacity: 1 }
      : isDimmed
        ? { scale: 0.98, z: 0, boxShadow: BASE_SHADOW, opacity: 0.9 }
        : { scale: 1, z: 0, boxShadow: BASE_SHADOW, opacity: 1 };

  // Asymmetric so hovering in reads as immediate and un-hovering reads as
  // settling rather than snapping back. isDimmed keeps the original 0.35s
  // deliberately, not the new faster/slower pair — that's a reaction to a
  // *sibling* being hovered, not this card's own hover in/out, and several
  // cards' states change at once during a fast diagonal sweep across the
  // grid; giving isDimmed its own separate duration would have those cards
  // drifting at a different rate than the one actually being hovered.
  const faceDuration = isHovered ? 0.3 : isDimmed ? 0.35 : 0.4;

  return (
    <div
      ref={outerRef as React.RefObject<HTMLDivElement>}
      id={service.slug}
      data-service-card=""
      onMouseEnter={onHoverStart}
      onMouseMove={onTiltMouseMove}
      onMouseLeave={() => {
        onHoverEnd();
        onTiltMouseLeave();
      }}
      className="preserve-3d group relative flex scroll-mt-28 flex-col"
    >
      {/* Soft warm-gold glow behind the card, visible only on this card's
          own hover — sits behind the face in DOM order (no z-index needed,
          the face's own z-[5] already stacks above it) and bleeds past the
          card's own edges via the negative inset. pointer-events-none so
          it can never intercept clicks on a neighboring card even where
          the blur overlaps the grid gap. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 rounded-[2rem] blur-2xl"
        style={{ background: GLOW_GRADIENT }}
        animate={{ opacity: !reduceMotion && isHovered ? 1 : 0 }}
        transition={{ ease: BNR_EASE, duration: faceDuration }}
      />

      {/* Card face. Opaque and stacked above the panel, so the panel can
          hide completely behind it rather than showing through. The lift
          itself is now Framer-driven (faceAnimate above) rather than a
          plain CSS hover transition, since it also has to react to a
          *sibling* card being hovered, not just its own hover state.
          rotateX/rotateY come from useTilt as live spring-driven motion
          values passed via `style`, composing with the animate-driven
          scale/z/boxShadow above into one transform — Framer owns both,
          unlike the GSAP-vs-Framer splits used elsewhere in this codebase,
          so there's nothing here to fight over the same element. */}
      <motion.div
        ref={faceRef}
        animate={faceAnimate}
        style={{ rotateX, rotateY }}
        transition={{ ease: BNR_EASE, duration: faceDuration }}
        className="relative z-[5] flex flex-col overflow-hidden rounded-3xl border border-gold-soft/50 bg-ivory"
      >
        {/* Fixed height so every card's photo starts at the same line,
            whether the title runs to one line or two. */}
        <div className="flex h-24 flex-col justify-center px-6">
          <h3 className="font-display text-xl leading-tight text-charcoal">
            {service.title}
          </h3>
          <p className="mt-1 font-sans text-[0.65rem] tracking-[0.15em] text-rose-text uppercase">
            {service.shortDescription}
          </p>
          {/* Thin gold accent line, echoing garland string — draws in under
              the title on hover rather than appearing all at once. */}
          <span className="mt-2 h-px w-0 bg-gold transition-[width] duration-300 ease-out group-hover:w-10" />
        </div>

        {/* Filling the card and showing every pixel of every photo cannot
            both be true while the sources are different shapes: the two
            local photos are 3:2 and the rest are 4:3, so a box matching
            either one letterboxes the others. The box fills instead, which
            is what makes the grid read as even — the crop is centred, and
            at 4:3 it is the majority of the photos that need none at all.
            The image's own Ken Burns zoom (on this card's own hover only,
            never when it's merely open via inBand/reduced-motion) lives on
            an inner wrapper so it never fights the outer card-face's own
            lift transform above — two different transform contexts, one
            slow and ambient, one immediate. */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-blush-soft">
          <motion.div
            className="absolute inset-0"
            animate={{ scale: !reduceMotion && isHovered ? 1.06 : 1 }}
            transition={{ ease: BNR_EASE, duration: isHovered ? 1.2 : 0.8 }}
          >
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Detail drawer. Parked at -100% of its own height, which lands it
          exactly behind the card, then slides down into the reserved space
          below. The space is reserved either way, so opening a card never
          shifts the grid around it. */}
      <motion.div
        initial={false}
        animate={open ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 220, damping: 26 }
        }
        className="z-[1] w-11/12 self-center"
      >
        <div className="rounded-b-3xl border border-t-0 border-gold-soft/50 bg-blush-soft px-5 py-4">
          <p className="font-sans text-sm leading-relaxed text-charcoal-soft">
            {service.longDescription}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function ServiceHoverCards({
  services,
  className = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
}: {
  services: Service[];
  // Column layout is the caller's call — the services page runs three
  // across, the home page four.
  className?: string;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // Hover state tracked at the grid level (not per-card in isolation) so
  // every other card can react to any one card being hovered — the lifted
  // card vs. its receding peers. `onHoverEnd` only clears the id if it
  // still matches the card that's leaving, which protects against a fast
  // diagonal sweep firing a new card's enter before the old one's leave.
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  // Cards emerge from behind the screen plane (translateZ -36 -> 0) rather
  // than sliding up — a depth entrance, not the vertical-slide fade used
  // elsewhere on the site, and deliberately one-shot (toggleActions' last
  // three actions are all "none") rather than replaying on every scroll
  // pass like Reveal/BottomUpLetters do. That only reads as real depth
  // because the cards already sit inside the shared Perspective3D context
  // below — translateZ with no perspective ancestor would just look like
  // "fades in slightly smaller."
  //
  // -36 rather than the original -40: at exactly the sitewide 20-40px
  // ceiling's edge, paired with the opacity fade from 0, this read as
  // perceptibly deeper than the raw px value alone suggests — a
  // near-invisible element is easy to also read as "further away," so the
  // two together compound rather than being independent. -36 keeps the
  // entrance clearly inside the ceiling with a small margin rather than
  // sitting exactly on the boundary.
  //
  // A layout effect, not a plain effect: `gsap.set` below is what hides the
  // cards in the first place (there's no CSS class doing it), so it needs
  // to run before the browser paints or every card would flash fully
  // visible for a frame first.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid || reduceMotion) return;

    registerBnrEase();

    const cards = gsap.utils.toArray<HTMLElement>(
      grid.querySelectorAll("[data-service-card]"),
    );

    gsap.set(cards, { opacity: 0, z: -36 });

    const tween = gsap.to(cards, {
      opacity: 1,
      z: 0,
      duration: 0.8,
      ease: "bnrOut",
      // Plain index-order stagger, not GSAP's grid:"auto" distance-based
      // fan — that computes each card's stagger delay from its Euclidean
      // distance to the origin corner, which reads as a diagonal wave on
      // anything wider than 2 columns (confirmed live: on the 4-column
      // homepage grid it fired index order 0,1,4,2,5,8,3,6,7 — row 1's
      // first card jumping ahead of row 0's last two). The services array
      // itself is already laid out row-major, so firing in plain array
      // order is exactly "row-by-row, left to right" on every breakpoint,
      // with no grid geometry to get wrong.
      stagger: { each: 0.08, from: "start" },
      scrollTrigger: {
        trigger: grid,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(cards, { clearProps: "opacity,transform" });
    };
  }, [reduceMotion]);

  return (
    <Perspective3D depth={1400} className="w-full">
      <div
        ref={gridRef}
        className={`preserve-3d grid w-full gap-x-6 gap-y-4 ${className}`}
      >
        {services.map((service) => (
          <ServiceHoverCard
            key={service.slug}
            service={service}
            isHovered={hoveredSlug === service.slug}
            isDimmed={hoveredSlug !== null && hoveredSlug !== service.slug}
            onHoverStart={() => setHoveredSlug(service.slug)}
            onHoverEnd={() =>
              setHoveredSlug((current) =>
                current === service.slug ? null : current,
              )
            }
          />
        ))}
      </div>
    </Perspective3D>
  );
}
