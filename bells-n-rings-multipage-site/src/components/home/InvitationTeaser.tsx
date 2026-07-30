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
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/motionVariants";

gsap.registerPlugin(ScrollTrigger);

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

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
        viewport={VIEWPORT_ONCE}
        variants={staggerContainer(0.12, 0, !!reduceMotion)}
        className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center"
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
        <motion.div
          variants={fadeUp(16, 0.6, !!reduceMotion)}
          whileHover={reduceMotion ? undefined : { scale: 1.03 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          className="inline-block"
        >
          <Button
            href="/enquire"
            className="transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(201,168,76,0.55)]"
          >
            Send an Enquiry
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
