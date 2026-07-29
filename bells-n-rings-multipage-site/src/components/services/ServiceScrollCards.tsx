"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Service } from "@/lib/content";

// Hover feature cards: at rest a card shows only its title and photo, with
// the full description parked out of sight behind it. Pointing at the card
// slides the description down into the space below, like a drawer.
//
// Mouse users get that on hover. Touch devices have no hover at all, so
// there the same panel opens from scroll position instead — as a card
// reaches the middle of the viewport — otherwise the descriptions would be
// unreachable on a phone. Which trigger applies is decided from the
// pointer's capabilities, not the viewport width, since a small window on a
// laptop still has a real cursor.
//
// The panel is only ever moved and faded, never unmounted, so its text stays
// in the markup for search engines and screen readers.

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
    // pointing or scrolling to become readable.
    if (!el || reduceMotion) return;

    // A real cursor drives this by hover; only fall back to scroll where
    // there isn't one.
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInBand(entry.isIntersecting),
      { rootMargin: CENTRE_BAND, threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const open = reduceMotion || hovered || inBand;

  return (
    <div
      ref={ref}
      id={service.slug}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex scroll-mt-28 flex-col"
    >
      {/* Card face. Opaque and stacked above the panel, so the panel can
          hide completely behind it rather than showing through. */}
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

      {/* Detail drawer. Parked at -100% of its own height, which lands it
          exactly behind the card, then slides down into the reserved space
          below. The space is reserved either way, so opening a card never
          shifts the grid around it. */}
      <motion.div
        initial={false}
        animate={open ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 220, damping: 26 }
        }
        className="z-[1] w-11/12 self-center"
      >
        <div className="rounded-b-3xl border border-t-0 border-gold-soft/50 bg-blush-soft px-5 py-4">
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
