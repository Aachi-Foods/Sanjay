"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowDown } from "react-icons/fi";

const headline = "Making Your Moments Unforgettable";

// Splits the headline into words so each can fade/slide in with its own
// staggered delay — the classic Lumene-style animated hero title.
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.4 },
  },
};

const word = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroSection() {
  return (
    <section className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden bg-charcoal">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1610190875589-6da42e1ff2b6?q=80&w=1920&auto=format&fit=crop"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      >
        <source
          src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Maroon-tinted scrim so cream/gold text stays legible over any footage */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-maroon/40 to-charcoal/80" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 font-body text-sm uppercase tracking-[0.3em] text-gold"
        >
          Chennai &middot; South India
        </motion.p>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-x-4 font-display text-4xl font-bold leading-tight text-cream sm:text-6xl lg:text-7xl"
        >
          {headline.split(" ").map((w, i) => (
            <motion.span key={i} variants={word}>
              {w}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-6 max-w-2xl font-body text-lg text-cream/90"
        >
          Weddings, ceremonies, and celebrations designed with South Indian
          tradition at heart — from Muhurtham to milestone corporate events.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.9 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/contact"
            className="rounded-full bg-gold px-8 py-4 font-body text-sm font-semibold uppercase tracking-wide text-charcoal transition-transform hover:scale-105"
          >
            Plan Your Event
          </Link>
          <Link
            href="/gallery"
            className="rounded-full border border-cream/40 px-8 py-4 font-body text-sm font-semibold uppercase tracking-wide text-cream transition-colors hover:border-gold hover:text-gold"
          >
            View Our Work
          </Link>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cream/70"
      >
        <FiArrowDown size={24} />
      </motion.div>
    </section>
  );
}
