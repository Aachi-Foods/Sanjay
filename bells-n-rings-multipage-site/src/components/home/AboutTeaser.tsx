"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../shared/Reveal";
import BottomUpLetters from "../shared/BottomUpLetters";
import Button from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

const PHOTO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3FFtmdb1eNHE0E6WzeaGlZLlGyF/hf_20260722_044512_3b47cc14-5b72-4313-8670-5913e74ed62e.png";
const PHOTO_ALT = "Hands arranging fresh marigold and jasmine garlands on a decor table";

function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const t = Math.min(1, Math.max(0, (value - inMin) / (inMax - inMin)));
  return outMin + t * (outMax - outMin);
}

export default function AboutTeaser() {
  const frameRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [drift, setDrift] = useState(0);

  // Photo reveal: a clip-path wipe tied directly to scroll position as the
  // frame enters — a curtain drawing back, not a fade. Set up in a layout
  // effect (before paint) rather than a plain effect, and the JSX below has
  // no clip-path of its own: if JS never runs, the photo is simply visible
  // rather than permanently hidden behind an edge that will never open.
  useLayoutEffect(() => {
    const frame = frameRef.current;
    const clip = clipRef.current;
    if (!frame || !clip || reduceMotion) return;

    gsap.set(clip, { clipPath: "inset(0% 100% 0% 0%)" });

    const tween = gsap.to(clip, {
      clipPath: "inset(0% 0% 0% 0%)",
      ease: "none",
      scrollTrigger: {
        trigger: frame,
        start: "top 85%",
        end: "top 40%",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduceMotion]);

  // Parallax drift for the photo inside its frame — a plain scroll listener
  // rather than Framer's useScroll/useTransform. This section is wrapped by
  // <StoryStage>, which keeps a transform on an ancestor for the whole time
  // the section is on screen. Scroll-linked MotionValues bound via `style`
  // under such an ancestor stop reaching the DOM after first paint (see
  // InvitationReveal.tsx for the full writeup) — plain state and inline
  // styles sidestep that entirely.
  useEffect(() => {
    if (reduceMotion) return;
    const frame = frameRef.current;
    if (!frame) return;

    let rafId = 0;
    const update = () => {
      const rect = frame.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setDrift(mapRange(center, -600, 600, -28, 28));
    };
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [reduceMotion]);

  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:px-8 md:grid-cols-2 md:items-center md:gap-16">
      <div
        ref={frameRef}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl"
      >
        <div ref={clipRef} className="absolute inset-0">
          {/* Oversized and offset by the scroll drift, so the photo still
              parallaxes inside its frame while the curtain draws back.
              Applied unconditionally rather than `reduceMotion ? undefined
              : {...}` — that branch can differ between the server's
              default render and the client's first paint for real
              reduced-motion users (see the Ken Burns fix in Hero.tsx for
              the full writeup), causing a real hydration mismatch. `drift`
              starts at 0 and the effect above never updates it under
              reduced motion, so this is already static for those users;
              it just doesn't need a second, riskier way to say so. */}
          <div
            className="absolute inset-0"
            style={{ transform: `translateY(${drift}px) scale(1.12)` }}
          >
            <Image
              src={PHOTO_SRC}
              alt={PHOTO_ALT}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-4 text-left">
        <Reveal delay={0} y={16}>
          <span className="font-script text-2xl text-rose-text sm:text-3xl">
            Who We Are
          </span>
        </Reveal>

        <BottomUpLetters
          as="h2"
          delay={150}
          className="font-display text-3xl leading-tight text-charcoal sm:text-4xl md:text-5xl"
        >
          Every Celebration Deserves Devoted Planning
        </BottomUpLetters>

        <Reveal delay={0.35} y={16}>
          <p className="prose-measure font-sans text-base text-charcoal-soft sm:text-lg">
            BNR Event Planners was founded on a simple belief: your celebration
            should feel as considered as the traditions it honors — layered,
            personal, and unmistakably yours. From event planning and venue
            selection to décor, catering, and on-ground logistics, we bring the
            same devotion to detail to every wedding, ceremony, and corporate
            event we plan.
          </p>
        </Reveal>

        <Reveal delay={0.5} y={16} className="mt-4">
          <Button href="/about" variant="outline">
            Our Story
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
