"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import AnimatedSection from "./AnimatedSection";

export default function AboutTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Moves the background image slower than scroll speed for a parallax feel.
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-charcoal py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:px-12">
        <div className="relative h-[420px] overflow-hidden rounded-2xl">
          <motion.div style={{ y }} className="absolute inset-0 h-[130%] w-full">
            <Image
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1400&auto=format&fit=crop"
              alt="BNR Event Planners team decorating a South Indian wedding mandapam"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        <AnimatedSection variant="slideInRight">
          <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-gold">
            Since 2014
          </p>
          <h2 className="font-display text-3xl font-bold text-cream sm:text-4xl">
            A Decade of Honouring Tradition, Elevating Celebration
          </h2>
          <p className="mt-6 font-body leading-relaxed text-cream/70">
            BNR Event Planners began in Chennai with a simple belief: South Indian
            ceremonies deserve planners who understand their rituals as deeply as
            their aesthetics. Today, our team of cultural consultants, decorators,
            and production specialists brings that philosophy to over 500 events
            across 20+ cities.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide text-gold transition-colors hover:bg-gold hover:text-charcoal"
          >
            Our Story <span aria-hidden>&rarr;</span>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
