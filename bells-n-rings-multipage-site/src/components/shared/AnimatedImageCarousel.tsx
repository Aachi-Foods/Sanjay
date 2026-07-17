"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export type CarouselSlide = { image: string; alt: string };

/**
 * Flow-style crossfade + Ken Burns pan, reused by the hero background and
 * the portfolio preview. Only one slide is mounted at a time so
 * AnimatePresence can crossfade the outgoing/incoming pair; the wrapping
 * motion.div drives the slow zoom independently of the fade.
 */
export default function AnimatedImageCarousel({
  slides,
  intervalMs = 5500,
  priority = false,
  className = "",
}: {
  slides: CarouselSlide[];
  intervalMs?: number;
  priority?: boolean;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [slides.length, intervalMs]);

  return (
    // No default `relative`/`absolute` here — callers control positioning via
    // className (e.g. Hero passes "absolute inset-0") to avoid conflicting
    // position utilities landing on the same element.
    <div className={`overflow-hidden ${className}`}>
      <AnimatePresence>
        {slides.map((slide, i) =>
          i === index ? (
            <motion.div
              key={`${slide.image}-${i}`}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0.5 : 1.4,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1 }}
                animate={{ scale: prefersReducedMotion ? 1 : 1.08 }}
                transition={{
                  duration: intervalMs / 1000 + 1.4,
                  ease: "linear",
                }}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={priority && i === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          ) : null,
        )}
      </AnimatePresence>
    </div>
  );
}
