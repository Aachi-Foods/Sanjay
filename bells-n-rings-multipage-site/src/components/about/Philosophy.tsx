"use client";

import { Gem, HeartHandshake, Sparkles, Clock4 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../shared/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { EASE_OUT, fadeUp, staggerContainer, VIEWPORT_REVEAL } from "@/lib/motionVariants";

const PILLARS = [
  {
    icon: Sparkles,
    title: "Editorial Detail",
    description:
      "Every celebration is art-directed like an editorial shoot — considered styling, curated palettes, no detail left generic.",
  },
  {
    icon: HeartHandshake,
    title: "Personal, Not Prescriptive",
    description:
      "We design around your story rather than a template, so no two BNR events ever look the same.",
  },
  {
    icon: Gem,
    title: "Quiet Excellence",
    description:
      "The best compliment we can get is that everything simply worked. Our execution is meant to be felt, not seen.",
  },
  {
    icon: Clock4,
    title: "Devoted Timelines",
    description:
      "From the first enquiry to the final vendor payment, we manage every timeline so you never have to chase a detail.",
  },
];

// Icon's own entrance, distinct from the fadeUp used everywhere else on
// this page — a small scale-in reads as more "alive" for a personality
// detail like this, applied to just the icon circle rather than the whole
// card so the icon feels like it's arriving with a bit of character while
// the title/description underneath settle with the page's usual plain fade.
const ICON_VARIANTS = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

const ICON_VARIANTS_REDUCED = {
  hidden: { opacity: 0, scale: 1 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.01 } },
};

export default function Philosophy() {
  const reduceMotion = !!useReducedMotion();

  return (
    <section className="bg-blush-soft/50 py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Our Philosophy"
            title="What Guides Every Celebration We Plan"
            className="mb-14"
          />
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_REVEAL}
              // ~100ms between icons (delayChildren staggered per pillar,
              // rather than staggerChildren within one shared container,
              // since each pillar is its own independently-triggered
              // motion.div here).
              variants={staggerContainer(0.05, i * 0.1, reduceMotion)}
              className="flex flex-col items-center gap-4 text-center"
            >
              <motion.span
                variants={reduceMotion ? ICON_VARIANTS_REDUCED : ICON_VARIANTS}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-soft/60 bg-ivory text-rose-text"
              >
                <pillar.icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
              </motion.span>
              <motion.div variants={fadeUp(12, 0.5, reduceMotion)}>
                <h3 className="font-display text-xl text-charcoal">{pillar.title}</h3>
                <p className="font-sans text-sm text-charcoal-soft">{pillar.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
