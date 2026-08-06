"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import useReducedMotion from "@/hooks/useReducedMotion";
import { EASE_OUT, VIEWPORT_REVEAL } from "@/lib/motionVariants";
import { TESTIMONIALS } from "@/lib/content";

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const current = TESTIMONIALS[index];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={VIEWPORT_REVEAL}
      transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: EASE_OUT }}
      className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center"
    >
      <Quote className="h-8 w-8 text-rose-gold" strokeWidth={1.25} aria-hidden="true" />

      <div className="relative min-h-[9rem] w-full">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col items-center gap-4"
          >
            <p className="prose-measure font-display text-xl leading-relaxed text-charcoal italic sm:text-2xl">
              &ldquo;{current.quote}&rdquo;
            </p>
            {/* Follows the quote by a beat rather than arriving with it —
                its own initial/animate/exit inside the AnimatePresence-keyed
                blockquote, so it still crossfades on every rotation, not
                just the first time this section is scrolled into view. */}
            <motion.footer
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeInOut" }}
              className="font-sans text-sm text-charcoal-soft"
            >
              <span className="font-medium text-rose-text">{current.name}</span>
              {" — "}
              {current.eventType}, {current.location}
            </motion.footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="flex items-center" role="tablist" aria-label="Testimonials">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.name}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show testimonial from ${t.name}`}
            onClick={() => setIndex(i)}
            className="flex h-11 w-11 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-gold-deep"
          >
            <span
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === index ? "bg-rose-gold-deep" : "bg-gold-soft/60"
              }`}
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}
