"use client";

import { motion } from "framer-motion";
import Button from "../ui/Button";
import AnimatedImageCarousel from "../shared/AnimatedImageCarousel";
import { HERO_SLIDES } from "@/lib/content";
import { SITE_TAGLINE } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative flex h-[100dvh] min-h-[560px] w-full items-center justify-center overflow-hidden">
      <AnimatedImageCarousel
        slides={HERO_SLIDES}
        priority
        className="absolute inset-0 h-full w-full"
      />
      {/* Legibility scrim over the slideshow */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/35 to-charcoal/60"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-script text-3xl text-blush sm:text-4xl"
        >
          Bells n Rings
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="font-display text-4xl leading-tight text-ivory sm:text-5xl md:text-6xl"
        >
          Luxury Weddings &amp; Events,
          <br className="hidden sm:block" /> Designed to Feel Like a Dream
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="prose-measure font-sans text-base text-blush-soft sm:text-lg"
        >
          {SITE_TAGLINE} From intimate ceremonies to destination
          celebrations, we plan every detail so you can simply be present.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
          className="mt-2 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="/contact">Begin Your Story</Button>
          <Button href="/portfolio" variant="outline" className="!text-ivory !border-ivory hover:!bg-ivory/10">
            View Our Work
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
