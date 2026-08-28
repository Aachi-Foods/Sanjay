"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../ui/Button";
import { Perspective3D } from "../motion/Perspective3D";
import ParticleField from "../shared/ParticleField";
import useSyncedReducedMotion from "@/hooks/useReducedMotion";
import { useTilt } from "@/hooks/useTilt";
import { fadeUp, staggerContainer } from "@/lib/motionVariants";
import {
  HERO_POSTER,
  HERO_POSTER_MOBILE,
  HERO_POSTER_ALT,
  HERO_VIDEO,
} from "@/lib/constants";

// Registering here (rather than only in SmoothScroll) keeps this file's
// ScrollTrigger usage safe regardless of effect-ordering across components
// — registerPlugin is idempotent, so calling it again is a no-op.
gsap.registerPlugin(ScrollTrigger);

// A path into public/ needs the basePath prepending by hand — next/image and
// next/link get it applied for them, a raw <video src> does not.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const videoSrc = HERO_VIDEO.startsWith("http")
  ? HERO_VIDEO
  : `${BASE_PATH}${HERO_VIDEO}`;
// HERO_POSTER is a static import (StaticImageData), already resolved to a
// correct, content-hashed URL by Next's build — unlike HERO_VIDEO above,
// it needs no manual basePath handling. Only the raw <video poster> attribute
// needs the plain string out of it; next/image's own src prop below takes
// the StaticImageData object directly.
const posterSrc = HERO_POSTER.src;

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoLayerRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // Framer's useReducedMotion is safe everywhere else in this file (it only
  // ever changes animation *ranges*, never which element gets rendered),
  // but choosing between a <video> and an <img> is exactly the branching-
  // element-shape case that resolves synchronously on the client before
  // hydration — a real, verified mismatch. useSyncExternalStore is built to
  // reconcile that divergence without one, so only this decision uses it.
  const reduceMotionSynced = useSyncedReducedMotion();

  // Parallax split: the video visually lags behind the text/buttons layer
  // as the hero scrolls past — the classic depth cue. Both layers scrub
  // against the same ScrollTrigger range, but the video moves noticeably
  // further (yPercent 15) than the text layer (yPercent 3); the gap between
  // the two speeds is what reads as parallax, not either absolute value.
  // GSAP rather than Framer's useScroll here so both tweens share one
  // ScrollTrigger instance and stay perfectly in sync with each other and
  // with Lenis (see lib/smooth-scroll.ts).
  useEffect(() => {
    const section = sectionRef.current;
    const videoLayer = videoLayerRef.current;
    const textLayer = textLayerRef.current;
    if (!section || !videoLayer || !textLayer || reduceMotion) return;

    const setWillChange = (v: "transform" | "auto") => {
      videoLayer.style.willChange = v;
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
        onEnter: () => setWillChange("transform"),
        onEnterBack: () => setWillChange("transform"),
        onLeave: () => setWillChange("auto"),
        onLeaveBack: () => setWillChange("auto"),
      },
    });
    tl.fromTo(videoLayer, { yPercent: 0 }, { yPercent: 15, ease: "none" }, 0);
    tl.fromTo(textLayer, { yPercent: 0 }, { yPercent: 3, ease: "none" }, 0);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      setWillChange("auto");
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100dvh] min-h-[620px] w-full items-end justify-center overflow-hidden bg-rose-gold-deep pt-20 pb-16 sm:pb-20 md:pt-32"
    >
      {/* Video layer: taller than the viewport (130%, offset -15% from the
          top) so that scrubbing it up to yPercent 15 never reveals an empty
          edge at the top or bottom of the hero. Two nested layers on
          purpose: this outer one is the parallax-scrub target, the inner
          one carries the CSS Ken Burns scale — both write to `transform`,
          so they need separate elements rather than one fighting over a
          single inline style.

          The Ken Burns class is applied unconditionally rather than
          `reduceMotion ? "" : "animate-ken-burns"`: framer-motion's
          useReducedMotion can resolve synchronously on the client before
          hydration, while the server always renders the no-preference
          default — branching the className on it here caused a real
          hydration mismatch. The global `prefers-reduced-motion` rule in
          globals.css already neutralizes every animation on the site,
          this one included, so the class itself doesn't need to change. */}
      <div
        ref={videoLayerRef}
        className="absolute inset-x-0 -top-[15%] h-[130%]"
      >
        <div className="absolute inset-0 animate-ken-burns">
          {HERO_VIDEO && !reduceMotionSynced ? (
            <video
              src={videoSrc}
              poster={posterSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={HERO_POSTER_ALT}
              className="h-full w-full object-cover"
            />
          ) : (
            <>
              {/* Art-directed, not just resized: the portrait crop keeps
                  the mandap's full height and the kolam-lined aisle in
                  frame on a phone, where the landscape photo would center
                  on the couple and lose the rest of the scene. */}
              <Image
                src={HERO_POSTER_MOBILE}
                alt={HERO_POSTER_ALT}
                fill
                priority
                sizes="100vw"
                className="object-cover sm:hidden"
              />
              <Image
                src={HERO_POSTER}
                alt={HERO_POSTER_ALT}
                fill
                priority
                sizes="100vw"
                className="hidden object-cover sm:block"
              />
            </>
          )}
        </div>
      </div>

      {/* Just enough tint to keep the buttons legible over the footage —
          previously a 60% green wash sat on top of a backdrop already dimmed
          to 45%, which buried the picture behind it. */}
      <div
        className="absolute inset-0 bg-rose-gold-deep/25"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-charcoal/25 via-transparent to-charcoal/45"
        aria-hidden="true"
      />
      {/* A soft pool of shade behind the buttons only, positioned low to
          match them sitting near the bottom of the hero now rather than
          centered. The outline button has no fill, so it needs something to
          sit against on a bright frame — darkening the whole hero to
          achieve that is what made the picture disappear before. Neutral
          rather than green, to leave the footage's own colour alone. */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(0,0,0,0.35),_transparent_55%)]"
        aria-hidden="true"
      />

      {/* Ambient marigold drift, layered over the footage like the tint
          gradients above it rather than literally behind the opaque video
          — a low, unhurried density (kept well under the CTA band's own
          ParticleField instance) so it reads as atmosphere behind the
          heading/buttons, never competing with either. Cursor parallax is
          the one thing this instance turns on that the CTA band's doesn't
          — a hero is where a visitor's mouse is most likely to be resting
          and moving idly before they've committed to scrolling. */}
      <ParticleField
        density={{ desktop: 20, mobile: 10 }}
        enableParallax
        className="z-[1]"
      />

      {/* h-full matters here beyond layout: GSAP's yPercent is relative to
          the target's own box height, so without it this layer's box would
          only be as tall as the button row and a "yPercent: 3" parallax
          nudge would be a fraction of a pixel — far too small to read
          against the video layer's much taller (130%) box at yPercent 15.
          justify-end (rather than relying on the section's own items-end)
          replicates the original bottom-aligned button position now that
          this element has an explicit height of its own. */}
      <div
        ref={textLayerRef}
        className="relative z-10 flex h-full w-full flex-col items-center justify-end px-6 text-center"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.15, 0.3, !!reduceMotion)}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <HeroCtaButton
            href="/services"
            reduceMotion={!!reduceMotion}
            buttonClassName="transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(201,168,76,0.55)]"
          >
            Explore Our Services
          </HeroCtaButton>
          <HeroCtaButton
            href="/enquire"
            variant="outline"
            reduceMotion={!!reduceMotion}
            buttonClassName="!border-ivory !text-ivory transition-shadow duration-300 hover:!bg-ivory/10 hover:shadow-[0_0_28px_rgba(250,246,239,0.35)]"
          >
            Get In Touch
          </HeroCtaButton>
        </motion.div>
      </div>
    </section>
  );
}

// Cursor-tilt CTA button: tilts toward the pointer (capped at 3deg — tighter
// than the sitewide 4deg ceiling, since anything larger on a small,
// frequently-hovered element reads as jittery rather than premium) and
// lifts slightly toward the viewer on hover. The entrance fade/rise
// (fadeUp variant) and the tilt are on separate nested elements: the outer
// motion.div owns the staggered entrance, the inner one owns the
// pointer-driven tilt, so the two animations never fight over the same
// `style` object.
function HeroCtaButton({
  href,
  variant,
  buttonClassName,
  reduceMotion,
  children,
}: {
  href: string;
  variant?: "primary" | "outline" | "ghost";
  buttonClassName?: string;
  reduceMotion: boolean;
  children: React.ReactNode;
}) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt({ maxDeg: 3 });

  return (
    <motion.div
      variants={fadeUp(16, 0.8, reduceMotion)}
      className="inline-block"
    >
      {/* 800-1000px perspective reads better on small elements like a
          button than the sitewide default depth — a very large value makes
          a 3deg tilt on something this size barely register. */}
      <Perspective3D depth={900}>
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          whileHover={reduceMotion ? undefined : { z: 10 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          style={{ rotateX, rotateY }}
          className="preserve-3d"
        >
          <Button href={href} variant={variant} className={buttonClassName}>
            {children}
          </Button>
        </motion.div>
      </Perspective3D>
    </motion.div>
  );
}
