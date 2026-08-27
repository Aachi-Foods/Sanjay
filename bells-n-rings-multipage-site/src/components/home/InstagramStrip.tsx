"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import useReducedMotion from "@/hooks/useReducedMotion";
import { INSTAGRAM_STRIP_IMAGES } from "@/lib/content";
import { CONTACT } from "@/lib/constants";
import Reveal from "../shared/Reveal";
import { InstagramIcon } from "../ui/SocialIcons";

// Deliberately understated relative to the rest of the page — a slow,
// continuous, non-interactive drift rather than anything scroll-linked or
// 3D. Luxury sites tend to deprioritize the social-proof grid; this stays
// the calmest section on the page, not the busiest. No ScrollTrigger here
// at all (unlike most other sections) since this motion is never tied to
// scroll position in the first place.
export default function InstagramStrip() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // The set is duplicated once (not tripled) so translating by exactly one
  // set-width lands the second copy precisely where the first one started —
  // an invisible reset point rather than a visible jump. Reduced motion
  // skips the duplicate entirely; it's only ever needed to sell the loop.
  const tiles = reduceMotion
    ? INSTAGRAM_STRIP_IMAGES
    : [...INSTAGRAM_STRIP_IMAGES, ...INSTAGRAM_STRIP_IMAGES];

  useLayoutEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee || reduceMotion) return;

    const setWidth = marquee.scrollWidth / 2;

    const tween = gsap.to(marquee, {
      x: -setWidth,
      duration: 40,
      ease: "none",
      repeat: -1,
    });

    // pause()/play() rather than killing and recreating the tween, so
    // hovering back off resumes from exactly where it left off instead of
    // restarting or jumping.
    const pause = () => tween.pause();
    const resume = () => tween.play();
    marquee.addEventListener("mouseenter", pause);
    marquee.addEventListener("mouseleave", resume);

    return () => {
      marquee.removeEventListener("mouseenter", pause);
      marquee.removeEventListener("mouseleave", resume);
      tween.kill();
    };
  }, [reduceMotion]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
      <Reveal className="mb-10 flex flex-col items-center gap-3 text-center">
        <InstagramIcon className="h-6 w-6 text-rose-text" />
        <h2 className="font-display text-3xl text-charcoal sm:text-4xl">
          Follow the Celebration
        </h2>
        <a
          href={CONTACT.instagram}
          target="_blank"
          rel="noreferrer noopener"
          className="font-sans text-sm tracking-wide text-rose-text uppercase hover:underline"
        >
          {CONTACT.instagramHandle}
        </a>
      </Reveal>

      {/* overflow-hidden, not overflow-x-auto — there is nothing here for a
          touch scroll gesture to capture, so the ambient drift can never
          fight the page's own vertical scroll. */}
      <div className="overflow-hidden">
        <div ref={marqueeRef} className="flex w-max gap-3">
          {tiles.map((src, i) => (
            <a
              key={`${src}-${i}`}
              href={CONTACT.instagram}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="View on Instagram"
              // Duplicated tiles are a visual echo of the same 6 posts, not
              // a second set of distinct content — hidden from assistive
              // tech so the feed doesn't announce every post twice.
              aria-hidden={i >= INSTAGRAM_STRIP_IMAGES.length || undefined}
              tabIndex={i >= INSTAGRAM_STRIP_IMAGES.length ? -1 : undefined}
              className="group relative h-40 w-40 shrink-0 overflow-hidden rounded-lg"
            >
              <Image
                src={src}
                alt="Placeholder — BNR Instagram gallery highlight"
                fill
                loading="lazy"
                sizes="160px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/20" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
