"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import Reveal from "../shared/Reveal";
import Button from "../ui/Button";
import SectionHeading from "../ui/SectionHeading";

function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const t = Math.min(1, Math.max(0, (value - inMin) / (inMax - inMin)));
  return outMin + t * (outMax - outMin);
}

export default function AboutTeaser() {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [drift, setDrift] = useState(0);

  // A plain scroll listener rather than Framer's useScroll/useTransform: this
  // section sits inside <Scene>, which keeps a persistent CSS `perspective`
  // ancestor around it for its own 3D entrance. Scroll-linked MotionValues
  // bound via `style` inside such an ancestor stop reaching the DOM after
  // first paint (see InvitationReveal.tsx for the full writeup) — plain
  // state + inline styles sidesteps that entirely.
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
      <Reveal
        ref={frameRef}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl"
      >
        <Image
          src="https://d8j0ntlcm91z4.cloudfront.net/user_3FFtmdb1eNHE0E6WzeaGlZLlGyF/hf_20260722_044512_3b47cc14-5b72-4313-8670-5913e74ed62e.png"
          alt="Hands arranging fresh marigold and jasmine garlands on a decor table"
          fill
          loading="lazy"
          sizes="(min-width: 768px) 45vw, 100vw"
          style={reduceMotion ? undefined : { transform: `translateY(${drift}px) scale(1.12)` }}
          className="object-cover"
        />
      </Reveal>

      <Reveal delay={0.1}>
        <SectionHeading
          align="left"
          eyebrow="Who We Are"
          title="Every Celebration Deserves Devoted Planning"
          description="BnR Event Planners was founded on a simple belief: your celebration should feel as considered as the traditions it honors — layered, personal, and unmistakably yours. From event planning and venue selection to décor, catering, and on-ground logistics, we bring the same devotion to detail to every wedding, ceremony, and corporate event we plan."
        />
        <div className="mt-8">
          <Button href="/about" variant="outline">
            Our Story
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
