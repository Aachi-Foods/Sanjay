"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import SpinningRing from "../ui/SpinningRing";
import { SITE_NAME_PRIMARY, SITE_SUBHEADING, HERO_RING_TEXT } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative flex h-[100dvh] min-h-[620px] w-full items-center justify-center overflow-hidden bg-rose-gold-deep">
      {/* Dimmed background photo — kept subtle so the ring and heading stay legible */}
      <Image
        src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1920&q=80"
        alt="Placeholder — hero background, ornate mandap decorated with flowers"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-25"
      />
      {/* Deep forest-green gradient backdrop with a soft radial glow behind the ring */}
      <div
        className="absolute inset-0 bg-rose-gold-deep/80"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(201,168,76,0.16),_transparent_60%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-transparent to-charcoal/60"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        <div className="relative flex items-center justify-center">
          <SpinningRing
            text={HERO_RING_TEXT}
            size={380}
            className="absolute inset-0 m-auto hidden sm:block"
          />
          <SpinningRing
            text={HERO_RING_TEXT}
            size={280}
            className="absolute inset-0 m-auto sm:hidden"
          />

          <div className="relative flex flex-col items-center gap-4 px-10 py-10 sm:px-16 sm:py-16">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-sans text-xs tracking-[0.4em] text-gold-soft uppercase sm:text-sm"
            >
              {SITE_SUBHEADING}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
              className="font-display text-7xl leading-none text-ivory sm:text-8xl md:text-9xl"
            >
              {SITE_NAME_PRIMARY}
            </motion.h1>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="prose-measure mt-4 font-sans text-base text-blush-soft sm:text-lg"
        >
          From temple-town traditions to modern celebrations — we plan every
          detail so you can simply be present.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="/services">Explore Our Services</Button>
          <Button
            href="/contact"
            variant="outline"
            className="!border-ivory !text-ivory hover:!bg-ivory/10"
          >
            Get In Touch
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
