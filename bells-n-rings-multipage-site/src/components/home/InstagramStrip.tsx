"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";
import { INSTAGRAM_STRIP_IMAGES } from "@/lib/content";
import { CONTACT } from "@/lib/constants";
import Reveal from "../shared/Reveal";
import { InstagramIcon } from "../ui/SocialIcons";

gsap.registerPlugin(ScrollTrigger);

export default function InstagramStrip() {
  const gridRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Same batched-reveal approach as the services grid, minus the 3D tilt —
  // these tiles are plain photos with no card chrome, so a flat fade/rise
  // reads as tidier than an added forward lean would here.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid || reduceMotion) return;

    const tiles = gsap.utils.toArray<HTMLElement>(grid.querySelectorAll("[data-insta-tile]"));
    gsap.set(tiles, { opacity: 0, y: 20 });

    const triggers = ScrollTrigger.batch(tiles, {
      start: "top 90%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          overwrite: true,
        }),
    });

    return () => {
      triggers.forEach((st) => st.kill());
      gsap.set(tiles, { clearProps: "opacity,transform" });
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

      <div ref={gridRef} className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
        {INSTAGRAM_STRIP_IMAGES.map((src) => (
          <a
            key={src}
            href={CONTACT.instagram}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="View on Instagram"
            data-insta-tile=""
            className="group relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={src}
              alt="Placeholder — BNR Instagram gallery highlight"
              fill
              loading="lazy"
              sizes="(min-width: 640px) 16vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/20" />
          </a>
        ))}
      </div>
    </section>
  );
}
