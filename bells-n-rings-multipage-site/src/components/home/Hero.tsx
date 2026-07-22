"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Button from "../ui/Button";
import { SITE_NAME_PRIMARY } from "@/lib/constants";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // As the story is scrolled past, the backdrop pushes in and the
  // heading recedes and dissolves — the "camera" diving deeper into the page.
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100dvh] min-h-[620px] w-full items-center justify-center overflow-hidden bg-rose-gold-deep"
    >
      {/* Dimmed background photo — visible enough to read as a real backdrop, while the ring and heading stay legible */}
      <motion.div
        className="absolute inset-0"
        style={reduceMotion ? undefined : { scale: bgScale }}
      >
        <Image
          src="https://d8j0ntlcm91z4.cloudfront.net/user_3FFtmdb1eNHE0E6WzeaGlZLlGyF/hf_20260722_044156_e2cb7513-237f-4015-9363-635508cff470.png"
          alt="Ornate South Indian wedding mandap at dusk, draped in marigold and jasmine garlands with warm gold string lighting"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
      </motion.div>
      {/* Deep forest-green gradient backdrop with a soft radial glow behind the heading */}
      <div
        className="absolute inset-0 bg-rose-gold-deep/60"
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

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center px-6 text-center"
        style={
          reduceMotion
            ? undefined
            : { y: contentY, scale: contentScale, opacity: contentOpacity }
        }
      >
        <div className="relative flex flex-col items-center gap-4 px-10 py-10 sm:px-16 sm:py-16">
          <motion.h1
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="font-display text-9xl leading-none text-gold uppercase sm:text-[10.5rem] md:text-[11.5rem]"
          >
            {SITE_NAME_PRIMARY}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="whitespace-nowrap font-sans text-xs tracking-[0.3em] text-gold/85 uppercase sm:text-base sm:tracking-[0.5em]"
          >
            Plan <span aria-hidden="true" className="mx-1 text-gold/40 sm:mx-2">|</span> Design{" "}
            <span aria-hidden="true" className="mx-1 text-gold/40 sm:mx-2">|</span> Deliver
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:mt-12"
        >
          <Button href="/services">Explore Our Services</Button>
          <Button
            href="/enquire"
            variant="outline"
            className="!border-ivory !text-ivory hover:!bg-ivory/10"
          >
            Get In Touch
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
