"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../ui/Button";
import ParticleField from "../shared/ParticleField";
import useSyncedReducedMotion from "@/hooks/useReducedMotion";
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
  const parallaxRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // Framer's useReducedMotion is safe everywhere else in this file (it only
  // ever changes animation *ranges*, never which element gets rendered),
  // but choosing between a <video> and an <img> is exactly the branching-
  // element-shape case that resolves synchronously on the client before
  // hydration — a real, verified mismatch. useSyncExternalStore is built to
  // reconcile that divergence without one, so only this decision uses it.
  const reduceMotionSynced = useSyncedReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // As the story is scrolled past, the heading recedes and dissolves — the
  // "camera" diving deeper into the page. Distinct from the background
  // parallax below (a different element), so this stays on Framer Motion
  // rather than fighting a second ScrollTrigger for the same scroll range.
  //
  // The reduced-motion branch lives in the *ranges* here, not in whether
  // `style` is applied at all further down — framer-motion's
  // useReducedMotion can resolve synchronously on the client before
  // hydration while the server always renders its no-preference default,
  // so conditionally omitting `style` caused a real hydration mismatch for
  // anyone with the OS preference on. Both ranges below start at the same
  // value, so at mount (scroll progress 0) the computed style is identical
  // either way — nothing to mismatch — and the two only diverge once the
  // user actually scrolls, safely after hydration.
  const contentY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 140]);
  const contentScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1, 0.82]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], reduceMotion ? [1, 1] : [1, 0]);

  // Background: moves slower than the page as the hero scrolls past — the
  // classic parallax lag, continuous and scroll-position-tracked, so it's
  // GSAP ScrollTrigger rather than Framer here. `scrub: true` ties it
  // directly to scroll offset with no easing of its own to fight Lenis's.
  useEffect(() => {
    const section = sectionRef.current;
    const bg = parallaxRef.current;
    if (!section || !bg || reduceMotion) return;

    const tween = gsap.fromTo(
      bg,
      { yPercent: 0 },
      {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100dvh] min-h-[620px] w-full items-end justify-center overflow-hidden bg-rose-gold-deep pt-20 pb-16 sm:pb-20 md:pt-32"
    >
      {/* Backdrop: the video when one is configured, otherwise the still.
          Reduced motion always gets the still — a hero that loops by itself
          is the kind of movement that setting exists to stop. Two nested
          layers on purpose: the outer one is GSAP's scroll-parallax target,
          the inner one carries the CSS Ken Burns scale — both write to
          `transform`, so they need separate elements rather than one
          fighting over a single inline style.

          The Ken Burns class is applied unconditionally rather than
          `reduceMotion ? "" : "animate-ken-burns"`: framer-motion's
          useReducedMotion can resolve synchronously on the client before
          hydration, while the server always renders the no-preference
          default — branching the className on it here caused a real
          hydration mismatch. The global `prefers-reduced-motion` rule in
          globals.css already neutralizes every animation on the site,
          this one included, so the class itself doesn't need to change. */}
      <div ref={parallaxRef} className="absolute inset-0">
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

      {/* Ambient gold particle drift — the one Three.js layer on the site,
          purely atmospheric. Replaces the old cursor-reactive ember canvas
          here specifically; that canvas version still does its job on the
          testimonial section. */}
      <ParticleField />

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center px-6 text-center"
        style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.15, 0.3, !!reduceMotion)}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.div
            variants={fadeUp(16, 0.8, !!reduceMotion)}
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="inline-block"
          >
            <Button
              href="/services"
              className="transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(201,168,76,0.55)]"
            >
              Explore Our Services
            </Button>
          </motion.div>
          <motion.div
            variants={fadeUp(16, 0.8, !!reduceMotion)}
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="inline-block"
          >
            <Button
              href="/enquire"
              variant="outline"
              className="!border-ivory !text-ivory transition-shadow duration-300 hover:!bg-ivory/10 hover:shadow-[0_0_28px_rgba(250,246,239,0.35)]"
            >
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
