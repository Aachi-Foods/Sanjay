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

export default function GalleryGrid() {
  const [filter, setFilter] = useState<GalleryCategorySlug | "all">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === filter),
    [filter],
  );

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
        setLightboxIndex((i) => (i === null ? i : (i + 1) % GALLERY_ITEMS.length));
      }
      if (e.key === "ArrowLeft") {
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
      <div className="mb-12 flex flex-wrap items-center justify-center gap-3" role="group" aria-label="Filter gallery by category">
        {GALLERY_FILTERS.map((f) => {
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={active}
              className={`rounded-full border px-5 py-2.5 min-h-11 font-sans text-sm tracking-wide uppercase transition-colors cursor-pointer ${
                active
                  ? "border-rose-gold-button bg-rose-gold-button text-ivory"
                  : "border-gold-soft/60 text-charcoal-soft hover:border-rose-gold-deep hover:text-rose-text"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => {
          const globalIndex = GALLERY_ITEMS.findIndex((i) => i.slug === item.slug);
          return (
            <Reveal key={item.slug} className="group">
              <button
                type="button"
                id={item.slug}
                onClick={() => setLightboxIndex(globalIndex)}
                className="relative block aspect-[4/5] w-full scroll-mt-24 overflow-hidden rounded-2xl text-left cursor-pointer"
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
            </Reveal>
          );
        })}
      </div>

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
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-ivory hover:bg-ivory/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ivory sm:right-8 sm:top-8"
            >
              <X className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) =>
                  i === null ? i : (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length,
                );
              }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-ivory hover:bg-ivory/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ivory sm:left-6"
            >
              <ChevronLeft className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i === null ? i : (i + 1) % GALLERY_ITEMS.length));
              }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-ivory hover:bg-ivory/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ivory sm:right-6"
            >
              <ChevronRight className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
            </button>

            <motion.div
              key={activeItem.slug}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-ivory"
              onClick={(e) => e.stopPropagation()}
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
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
