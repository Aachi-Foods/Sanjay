"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { testimonials } from "@/lib/content";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-maroon">
          Kind Words
        </p>
        <h2 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
          What Our Families Say
        </h2>

        <div className="relative mt-14 min-h-[260px]">
          <FaQuoteLeft className="mx-auto mb-6 text-3xl text-gold" />
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mx-auto max-w-2xl font-display text-xl italic leading-relaxed text-charcoal/90 sm:text-2xl">
                &ldquo;{current.quote}&rdquo;
              </p>
              <p className="mt-6 font-body font-semibold text-maroon">{current.name}</p>
              <p className="font-body text-sm text-charcoal/60">
                {current.event} &middot; {current.location}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex justify-center gap-3">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              aria-label={`Show testimonial from ${t.name}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-8 bg-maroon" : "w-2.5 bg-maroon/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
