"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";
import { EASE_OUT, VIEWPORT_REVEAL } from "@/lib/motionVariants";
import { TESTIMONIALS } from "@/lib/content";
import Particles from "../shared/Particles";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);
  // A plain div wrapping the Framer-animated block below, not the
  // motion.div itself — GSAP's yPercent and Framer's own opacity/scale
  // entrance would otherwise both be writing to the same element's
  // `transform`, and Framer periodically rewrites the full transform string
  // from its own motion-value state, silently erasing GSAP's contribution.
  // Same split already used for the hero CTA buttons and AboutTeaser.
  const textWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  // Watermark drifts noticeably further than the text, and in the opposite
  // direction — a slow, large background move against a small, subtle
  // foreground one is what reads as depth; equal-and-opposite at the same
  // magnitude reads as a glitch instead. Both are scrubbed against this
  // specific section's own rendered height (via the shared trigger/start/
  // end below) rather than a generic assumption, since a compact section
  // like this one has much less scroll range to play a parallax out over
  // than a full-viewport one.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const watermark = watermarkRef.current;
    const textWrap = textWrapRef.current;
    if (!section || !watermark || !textWrap || reduceMotion) return;

    const setWillChange = (v: "transform" | "auto") => {
      watermark.style.willChange = v;
      textWrap.style.willChange = v;
    };

    const scrollTrigger = {
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.6,
      onEnter: () => setWillChange("transform"),
      onEnterBack: () => setWillChange("transform"),
      onLeave: () => setWillChange("auto"),
      onLeaveBack: () => setWillChange("auto"),
    };

    // yPercent scales against each element's *own* box height, and the
    // watermark glyph's box (a giant line of text) is nearly double the
    // text block's — 20% here measured out to roughly 4.5x the text's own
    // travel once rendered, well past the "roughly 2-3x" this is meant to
    // read as. 12% brings the two back in line against this section's
    // actual proportions rather than the brief's generic starting numbers.
    const watermarkTween = gsap.to(watermark, {
      yPercent: 12,
      ease: "none",
      scrollTrigger,
    });
    const textTween = gsap.to(textWrap, {
      yPercent: -8,
      ease: "none",
      scrollTrigger: { ...scrollTrigger },
    });

    return () => {
      watermarkTween.scrollTrigger?.kill();
      watermarkTween.kill();
      textTween.scrollTrigger?.kill();
      textTween.kill();
      setWillChange("auto");
    };
  }, [reduceMotion]);

  const current = TESTIMONIALS[index];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ivory-deep py-24"
    >
      <Particles quantity={45} staticity={60} className="opacity-70" />

      {/* Oversized Playfair Display opening quote — the same serif already
          used for every heading on the site, so this reads as an extension
          of the brand's own typography rather than a generic stock-icon
          watermark. Anchored off-center toward the top-left and allowed to
          bleed past the section's edges (negative inset, no clamping) —
          a giant mark centered directly behind centered text tends to read
          as a z-index mistake rather than a deliberate layered
          composition. */}
      <span
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-6 select-none font-display text-[20rem] leading-none text-gold opacity-[0.08] sm:-top-32 sm:text-[26rem] md:text-[32rem]"
      >
        &ldquo;
      </span>

      <div
        ref={textWrapRef}
        className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8"
      >
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
      </div>
    </section>
  );
}
