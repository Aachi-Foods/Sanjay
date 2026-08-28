"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../shared/Reveal";
import SectionHeading from "../ui/SectionHeading";
import {
  EASE_OUT,
  fadeUp,
  scaleFade,
  staggerContainer,
  STAGGER,
  VIEWPORT_REVEAL,
} from "@/lib/motionVariants";
import ourStoryPhoto from "@/assets/about/our-story.jpg";

export default function StorySection() {
  // Framer's own hook, not the synced one — every use below only tunes a
  // transition's timing (stagger amount, delay), never which element shape
  // gets rendered, so there's no hydration-mismatch risk here (see
  // motionVariants.ts for the fuller reasoning).
  const reduceMotion = !!useReducedMotion();

  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:px-8 md:grid-cols-2 md:items-center md:gap-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_REVEAL}
        variants={staggerContainer(STAGGER.loose, 0, reduceMotion)}
      >
        <motion.div variants={fadeUp(24, 0.6, reduceMotion)}>
          <SectionHeading
            align="left"
            eyebrow="Our Story"
            title="Born From a Love of Beautifully Told Moments"
          />
        </motion.div>

        {/* The three paragraphs get their own, tighter stagger nested
            inside the outer one, so they arrive as a short cascade shortly
            after the heading settles rather than in lockstep with it. */}
        <motion.div
          variants={staggerContainer(STAGGER.base, 0, reduceMotion)}
          className="prose-measure mt-6 flex flex-col gap-4 font-sans text-base text-charcoal-soft"
        >
          <motion.p variants={fadeUp(16, 0.5, reduceMotion)}>
            BNR Event Planners began with a simple observation: the most
            memorable South Indian celebrations rarely feel
            &ldquo;planned&rdquo; at all. They feel inevitable — as though
            every ritual, every garland, every note of nadaswaram was always
            meant to fall exactly into place.
          </motion.p>
          <motion.p variants={fadeUp(16, 0.5, reduceMotion)}>
            What started as a small team coordinating intimate ceremonies
            across Tamil Nadu has grown into a full-service studio for Hindu,
            Muslim, Sikh, Christian, and interfaith celebrations alike —
            covering event planning, venue selection, décor and design,
            photography, catering, entertainment, guest management, and
            on-ground logistics, without ever losing the personal,
            tradition-first touch we started with.
          </motion.p>
          <motion.p variants={fadeUp(16, 0.5, reduceMotion)}>
            Today, we bring the same devotion to a 500-guest wedding as we do
            to an intimate muhurtham for close family. Every event gets a
            dedicated planning lead and a team that treats your celebration
            as the only one on the calendar.
          </motion.p>
        </motion.div>
      </motion.div>

      <Reveal
        delay={0.1}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl"
      >
        <Image
          src={ourStoryPhoto}
          alt="Wedding invitation suite, gold-bordered silk saree, jasmine garlands, and a hand-drawn venue floor plan"
          fill
          loading="lazy"
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-cover"
        />
      </Reveal>

      {/* Panel scales in slightly (0.98 -> 1.0) alongside its fade, rather
          than the plain opacity+y every other block on this page uses —
          reuses motionVariants' existing scaleFade so this isn't a new
          easing curve or a one-off transform. The text inside gets a
          short extra delay on top of the panel's own, so it reads as
          settling into a surface that's already arrived rather than
          popping in with it. */}
      <motion.div
        className="md:col-span-2"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_REVEAL}
        variants={scaleFade(0.98, 0.6, reduceMotion)}
      >
        <div className="rounded-2xl border border-gold-soft/50 bg-blush-soft/50 px-8 py-10 text-center sm:px-14">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_REVEAL}
            transition={{
              duration: 0.5,
              delay: reduceMotion ? 0 : 0.15,
              ease: EASE_OUT,
            }}
          >
            <h3 className="font-display text-2xl text-charcoal sm:text-3xl">
              Why BNR?
            </h3>
            <p className="prose-measure mx-auto mt-4 font-sans text-base text-charcoal-soft">
              At BNR Events, we don&rsquo;t just organize events—we curate
              unforgettable experiences with personalized designs, transparent
              pricing, meticulous planning, and flawless execution, ensuring
              every celebration is truly one of a kind.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
