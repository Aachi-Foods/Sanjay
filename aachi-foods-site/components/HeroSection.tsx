"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const headline = "Authentic South Indian Flavor, In Every Home";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const word = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
  return (
    <section className="relative flex h-screen min-h-[620px] w-full items-center justify-center overflow-hidden bg-charcoal">
      <Image
        src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1920&auto=format&fit=crop"
        alt="Assorted South Indian spices and masalas"
        fill
        priority
        className="object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-chili/30 to-charcoal/80" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 font-body text-sm uppercase tracking-[0.3em] text-turmeric"
        >
          Since 1995 &middot; Chennai, Tamil Nadu
        </motion.p>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-x-3 font-display text-4xl font-bold leading-tight text-cream sm:text-6xl lg:text-7xl"
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
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-6 max-w-2xl font-body text-lg text-cream/90"
        >
          From fresh-ground masalas to ready-to-cook mixes and traditional
          pickles, Aachi brings 30 years of South Indian kitchen wisdom to
          your table.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/products"
            className="rounded-full bg-turmeric px-8 py-4 font-body text-sm font-semibold uppercase tracking-wide text-charcoal transition-transform hover:scale-105"
          >
            Explore Products
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-cream/40 px-8 py-4 font-body text-sm font-semibold uppercase tracking-wide text-cream transition-colors hover:border-turmeric hover:text-turmeric"
          >
            Our Story
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
