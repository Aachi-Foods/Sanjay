"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  GALLERY_FILTERS,
  GALLERY_ITEMS,
  type GalleryCategorySlug,
} from "@/lib/content";
import Reveal from "../shared/Reveal";
import SessionsBrowser from "./SessionsBrowser";

const EASE = [0.22, 1, 0.36, 1] as const;

// Focus-pull slide, inspired by Google Flow's Sessions carousel: the
// incoming/outgoing image travels blurred and slightly scaled down, then
// sharpens into focus as it settles — rather than a plain cross-fade.
const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? 48 : -48,
    scale: 0.94,
    filter: "blur(10px)",
  }),
  center: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -48 : 48,
    scale: 0.94,
    filter: "blur(10px)",
  }),
};

export default function GalleryGrid() {
  const [filter, setFilter] = useState<GalleryCategorySlug | "all">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === filter),
    [filter],
  );

  const goTo = (next: number | ((i: number | null) => number | null), dir: number) => {
    setDirection(dir);
    setLightboxIndex(next);
  };

  // Deep-link support: /gallery#slug (used by Home page preview tiles)
  // opens straight to that item's lightbox. This has to be an effect —
  // window.location isn't available during server render or static export —
  // so the set-state-in-effect lint rule's usual "derive it during render
  // instead" advice doesn't apply here.
  useEffect(() => {
    const slug = window.location.hash.replace("#", "");
    if (!slug) return;
    const index = GALLERY_ITEMS.findIndex((item) => item.slug === slug);
    if (index >= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilter("all");
      setLightboxIndex(index);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setDirection(1);
        setLightboxIndex((i) => (i === null ? i : (i + 1) % GALLERY_ITEMS.length));
      }
      if (e.key === "ArrowLeft") {
        setDirection(-1);
        setLightboxIndex((i) =>
          i === null ? i : (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length,
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex]);

  const activeItem = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
      <Reveal
        className="mb-12 flex flex-wrap items-center justify-center gap-3"
        y={12}
        role="group"
        aria-label="Filter gallery by category"
      >
        {GALLERY_FILTERS.map((f) => {
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={active}
              className={`relative min-h-11 rounded-full border px-5 py-2.5 font-sans text-sm tracking-wide uppercase cursor-pointer ${
                active
                  ? "border-rose-gold-button text-ivory"
                  : "border-gold-soft/60 text-charcoal-soft transition-colors duration-300 hover:border-rose-gold-deep hover:text-rose-text"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="gallery-filter-pill"
                  className="absolute inset-0 rounded-full bg-rose-gold-button"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{f.label}</span>
            </button>
          );
        })}
      </Reveal>

      {/* Desktop: Google Flow Sessions-style spotlight browser — a scrolling
          title list with floating tilted thumbnails and a trailing glow.
          Mobile falls back to the card grid below; the layout doesn't
          translate to narrow viewports. */}
      <Reveal delay={0.1} className="hidden lg:block">
        <SessionsBrowser
          items={filtered}
          onView={(slug) => {
            const globalIndex = GALLERY_ITEMS.findIndex((g) => g.slug === slug);
            goTo(globalIndex, 0);
          }}
        />
      </Reveal>

      <Reveal delay={0.1} className="lg:hidden">
        <motion.div layout className="grid gap-6 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => {
              const globalIndex = GALLERY_ITEMS.findIndex((g) => g.slug === item.slug);
              return (
                <motion.div
                  key={item.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.45, delay: i * 0.04, ease: EASE },
                  }}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25, ease: EASE } }}
                  className="group"
                >
                  <button
                    type="button"
                    id={item.slug}
                    onClick={() => goTo(globalIndex, 0)}
                    className="relative block aspect-[4/5] w-full scroll-mt-24 overflow-hidden rounded-2xl text-left cursor-pointer transition-transform duration-500 ease-out hover:-translate-y-1"
                  >
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="font-display text-xl text-ivory">{item.title}</p>
                      <p className="font-sans text-xs tracking-wide text-blush-soft uppercase">
                        {item.location}
                      </p>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </Reveal>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${activeItem.title} detail view`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close detail view"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-ivory transition-colors hover:bg-ivory/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ivory sm:right-8 sm:top-8"
            >
              <X className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goTo(
                  (i) => (i === null ? i : (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length),
                  -1,
                );
              }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-ivory transition-colors hover:bg-ivory/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ivory sm:left-6"
            >
              <ChevronLeft className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goTo((i) => (i === null ? i : (i + 1) % GALLERY_ITEMS.length), 1);
              }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-ivory transition-colors hover:bg-ivory/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ivory sm:right-6"
            >
              <ChevronRight className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
            </button>

            <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
              {/* Warm glow pulse behind the card, echoing the soft radial
                  light that trails the active item in Google Flow's Sessions
                  carousel — brightens on arrival, then settles. */}
              <motion.div
                key={`glow-${activeItem.slug}`}
                aria-hidden="true"
                className="pointer-events-none absolute -inset-10 -z-10 rounded-[2.5rem] bg-[radial-gradient(circle,_rgba(201,168,76,0.45),_transparent_70%)] blur-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: [0, 0.85, 0.45], scale: [0.9, 1.05, 1] }}
                transition={{ duration: 0.7, ease: EASE }}
              />

              <div className="relative flex max-h-full w-full flex-col overflow-hidden rounded-2xl bg-ivory">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeItem.slug}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={activeItem.image}
                        alt={activeItem.imageAlt}
                        fill
                        sizes="(min-width: 640px) 700px, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 sm:p-8">
                      <h2 className="font-display text-2xl text-charcoal sm:text-3xl">
                        {activeItem.title}
                      </h2>
                      <p className="mt-1 font-sans text-xs tracking-wide text-rose-text uppercase">
                        {activeItem.location}
                      </p>
                      <p className="mt-4 font-sans text-sm text-charcoal-soft sm:text-base">
                        {activeItem.description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
