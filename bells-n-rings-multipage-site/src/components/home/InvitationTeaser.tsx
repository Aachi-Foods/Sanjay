"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";
import Button from "../ui/Button";
import GoldDivider from "../ui/GoldDivider";
import FloralAccent from "../ui/FloralAccent";
import ParticleField from "../shared/ParticleField";
import { GrainOverlay } from "../motion/GrainOverlay";
import { Perspective3D } from "../motion/Perspective3D";
import { useTilt } from "@/hooks/useTilt";
import { BNR_EASE } from "@/lib/motion";
import { fadeUp, staggerContainer, VIEWPORT_REVEAL } from "@/lib/motionVariants";

gsap.registerPlugin(ScrollTrigger);

export default function InvitationTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftAccentRef = useRef<SVGSVGElement>(null);
  const rightAccentRef = useRef<SVGSVGElement>(null);
  const reduceMotion = useReducedMotion();

  // A smaller echo of the hero's background parallax — there's no photo
  // here to move, so the corner florals stand in as the "background"
  // layer, drifting opposite directions and slower than the page scroll.
  useEffect(() => {
    const section = sectionRef.current;
    const left = leftAccentRef.current;
    const right = rightAccentRef.current;
    if (!section || !left || !right || reduceMotion) return;

    const tween = gsap.fromTo(
      [left, right],
      { yPercent: 0 },
      {
        yPercent: (i) => (i === 0 ? 12 : -12),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
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
    <section ref={sectionRef} className="relative overflow-hidden bg-blush py-24">
      {/* 0.05 rather than the component's 0.04 default — this section's
          bg-blush is light enough that 0.04 read as essentially invisible
          against it in testing. */}
      <GrainOverlay opacity={0.05} animated />

      <FloralAccent
        ref={leftAccentRef}
        className="pointer-events-none absolute -left-6 -top-6 h-40 w-40 text-rose-gold-deep/50 sm:h-56 sm:w-56"
      />
      <FloralAccent
        ref={rightAccentRef}
        flip
        className="pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 text-rose-gold-deep/50 sm:h-56 sm:w-56"
      />

      {/* A sparser echo of the hero's ambient particle layer — same
          purely-atmospheric gold drift, opening and closing the page on
          the same motif, just quieter here. */}
      <ParticleField density={{ desktop: 20, mobile: 8 }} />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_REVEAL}
        variants={staggerContainer(0.12, 0, !!reduceMotion)}
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center"
      >
        <motion.span
          variants={fadeUp(16, 0.6, !!reduceMotion)}
          className="font-script text-4xl text-rose-text sm:text-5xl"
        >
          You&rsquo;re Invited
        </motion.span>
        <motion.h2
          variants={fadeUp(16, 0.6, !!reduceMotion)}
          className="font-display text-3xl text-charcoal sm:text-4xl"
        >
          Let&rsquo;s Start Planning Something Beautiful
        </motion.h2>
        <motion.p
          variants={fadeUp(16, 0.6, !!reduceMotion)}
          className="prose-measure font-sans text-base text-charcoal-soft sm:text-lg"
        >
          Share your event date and vision with us, and we&rsquo;ll be in
          touch to begin crafting a celebration that feels entirely yours.
        </motion.p>
        <motion.div variants={fadeUp(16, 0.6, !!reduceMotion)}>
          <GoldDivider />
        </motion.div>
        <motion.div variants={fadeUp(16, 0.6, !!reduceMotion)} className="inline-block">
          <EnquireCtaButton reduceMotion={!!reduceMotion} />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Same cursor-tilt treatment as the hero's CTA buttons (3deg cap, translateZ
// lift, gold glow) — this is the page's other primary call-to-action, so it
// should feel like the same button, not a different one that happens to say
// similar words. Kept as its own component here rather than a shared
// TiltButton, matching how the hero built this pattern (inline, per file)
// rather than as a reusable export.
function EnquireCtaButton({ reduceMotion }: { reduceMotion: boolean }) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt({ maxDeg: 3 });

  return (
    <Perspective3D depth={900}>
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        whileHover={reduceMotion ? undefined : { z: 10 }}
        transition={{ duration: 0.3, ease: BNR_EASE }}
        style={{ rotateX, rotateY }}
        className="preserve-3d"
      >
        <Button
          href="/enquire"
          className="transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(201,168,76,0.55)]"
        >
          Send an Enquiry
        </Button>
      </motion.div>
    </Perspective3D>
  );
}
