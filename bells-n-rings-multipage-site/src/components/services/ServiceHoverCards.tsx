"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";
import type { Service } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

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

function ServiceHoverCard({ service }: { service: Service }) {
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

  // `reduceMotion` here is the shared useSyncExternalStore-based hook
  // (src/hooks/useReducedMotion.ts), not framer-motion's own — that one can
  // resolve synchronously on the client before hydration while the server
  // renders its no-preference default, and reading it straight into `open`
  // caused a real hydration mismatch (confirmed the same way as the earlier
  // Hero/AboutTeaser fixes). useSyncExternalStore is built for precisely
  // this "value depends on an environment React can't see during SSR" case
  // — it matches the server's snapshot for the first client render, then
  // resyncs immediately after, without a mismatch.
  const open = reduceMotion || hovered || inBand;

  return (
    <div
      ref={ref}
      id={service.slug}
      data-service-card=""
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex scroll-mt-28 flex-col"
    >
      {/* Card face. Opaque and stacked above the panel, so the panel can
          hide completely behind it rather than showing through. Lifts
          slightly on hover — a plain CSS transition, not Framer, since it
          only ever needs to ease in one direction and back. */}
      <div className="relative z-[5] flex flex-col overflow-hidden rounded-3xl border border-gold-soft/50 bg-ivory shadow-sm transition-[transform,box-shadow] duration-300 ease-out group-hover:-translate-y-1.5 group-hover:shadow-lg">
        {/* Fixed height so every card's photo starts at the same line,
            whether the title runs to one line or two. */}
        <div className="flex h-24 flex-col justify-center px-6">
          <h3 className="font-display text-xl leading-tight text-charcoal">
            {service.title}
          </h3>
          <p className="mt-1 font-sans text-[0.65rem] tracking-[0.15em] text-rose-text uppercase">
            {service.shortDescription}
          </p>
          {/* Thin gold accent line, echoing garland string — draws in under
              the title on hover rather than appearing all at once. */}
          <span className="mt-2 h-px w-0 bg-gold transition-[width] duration-300 ease-out group-hover:w-10" />
        </div>

        {/* Filling the card and showing every pixel of every photo cannot
            both be true while the sources are different shapes: the two
            local photos are 3:2 and the rest are 4:3, so a box matching
            either one letterboxes the others. The box fills instead, which
            is what makes the grid read as even — the crop is centred, and
            at 4:3 it is the majority of the photos that need none at all.
            Nothing is laid over the photo and it isn't scaled on hover,
            since either would hide part of it. */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-blush-soft">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-center"
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

export default function ServiceHoverCards({
  services,
  className = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
}: {
  services: Service[];
  // Column layout is the caller's call — the services page runs three
  // across, the home page four.
  className?: string;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Batched reveal in reading order (left-to-right, row by row), each card
  // fading and rising in with a slight forward tilt that settles flat — a
  // restrained bit of 3D depth on the cards themselves, never on the text
  // blocks elsewhere on the site (see Parallax.tsx for why: rotation on a
  // tall text element has already caused blurred type and wildly
  // mis-measured bounding boxes here before). Cards are short and squat, and
  // the tilt is small, so neither failure mode applies.
  //
  // The tilt itself is skipped on mobile (still fades/rises, just flat),
  // and the whole thing is skipped under reduced motion, where cards are
  // simply visible from the start — nothing here to animate in.
  //
  // A layout effect, not a plain effect: `gsap.set` below is what hides the
  // cards in the first place (there's no CSS class doing it), so it needs
  // to run before the browser paints or every card would flash fully
  // visible for a frame first.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid || reduceMotion) return;

    const cards = gsap.utils.toArray<HTMLElement>(
      grid.querySelectorAll("[data-service-card]"),
    );
    const mobile = window.innerWidth < 768;

    gsap.set(cards, { opacity: 0, y: 20, rotateX: mobile ? 0 : 10 });

    const triggers = ScrollTrigger.batch(cards, {
      start: "top 88%",
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          overwrite: true,
        }),
      onEnterBack: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          overwrite: true,
        }),
      // Cards fade back out as they scroll above the trigger band, so the
      // reveal replays on the way back down instead of only firing once.
      onLeaveBack: (batch) =>
        gsap.to(batch, {
          opacity: 0,
          y: 20,
          rotateX: mobile ? 0 : 10,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.in",
          overwrite: true,
        }),
    });

    return () => {
      triggers.forEach((st) => st.kill());
      gsap.set(cards, { clearProps: "opacity,transform" });
    };
  }, [reduceMotion]);

  return (
    <div
      ref={gridRef}
      className={`grid w-full gap-x-6 gap-y-4 ${className}`}
      style={{ perspective: "1400px" }}
    >
      {services.map((service) => (
        <ServiceHoverCard key={service.slug} service={service} />
      ))}
    </div>
  );
}
