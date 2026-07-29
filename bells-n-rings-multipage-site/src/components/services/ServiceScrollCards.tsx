"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Service } from "@/lib/content";

// Adapted from the "hover feature cards" pattern: each card keeps its
// description in a panel tucked behind it, which slides out from underneath
// when the card becomes active.
//
// The trigger is scroll position rather than hover — as a service reaches
// the middle of the viewport its panel opens on its own, so the details
// reveal themselves on the way down the page and the pattern still works on
// touch, where there is no hover at all. Pointer hover is kept as a second
// trigger for mouse users who want to open a card out of turn.
//
// The panel is never fully hidden: at rest it sits at 20% opacity peeking
// out from behind the card, so nothing is invisible to a visitor who does
// not scroll, and nothing is lost to a search engine or screen reader.
// The observer's root is squeezed to a horizontal band across the middle of
// the viewport; a card counts as active while it overlaps that band.
const CENTRE_BAND = "-38% 0px -38% 0px";

function ServiceScrollCard({ service }: { service: Service }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [inBand, setInBand] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    // Reduced motion gets every panel open and static, so nothing depends on
    // scrolling to become readable.
    if (!el || reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInBand(entry.isIntersecting),
      { rootMargin: CENTRE_BAND, threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const open = reduceMotion || inBand || hovered;

  return (
    <div
      ref={ref}
      id={service.slug}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex scroll-mt-28 flex-col"
    >
      {/* Card face. Sits above the panel so the panel can hide behind it. */}
      <div className="relative z-[5] flex h-64 flex-col overflow-hidden rounded-3xl border border-gold-soft/50 bg-ivory shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
        <div className="px-6 pt-6">
          <h3 className="font-display text-xl leading-tight text-charcoal">
            {service.title}
          </h3>
          <p className="mt-1 font-sans text-[0.65rem] tracking-[0.15em] text-rose-text uppercase">
            {service.shortDescription}
          </p>
        </div>

        {/* The photo runs off the bottom of the card and is faded back into
            the card colour, so the crop reads as deliberate. */}
        <div className="relative mt-4 min-h-0 flex-1">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ivory to-transparent"
          />
        </div>
      </div>

      {/* Detail panel, slightly narrower than the card so it reads as a
          drawer sliding out from behind it. */}
      <motion.div
        initial={false}
        animate={open ? { opacity: 1, y: 0 } : { opacity: 0.2, y: -30 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 200, damping: 22 }
        }
        className="z-[1] w-11/12 self-center overflow-hidden"
      >
        <div className="relative rounded-b-3xl border border-t-0 border-gold-soft/50 bg-blush-soft px-5 py-4">
          <p className="font-sans text-sm leading-relaxed text-charcoal-soft">
            {service.longDescription}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function ServiceScrollCards({ services }: { services: Service[] }) {
  return (
    <div className="grid w-full grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceScrollCard key={service.slug} service={service} />
      ))}
    </div>
  );
}
