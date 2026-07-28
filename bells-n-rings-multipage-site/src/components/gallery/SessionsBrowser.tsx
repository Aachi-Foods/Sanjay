"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { GalleryItem } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;
const ROW_HEIGHT = 56;
const VISIBLE_ROWS = 7;
const LIST_HEIGHT = ROW_HEIGHT * VISIBLE_ROWS;

// Deterministic tilt angles (no Math.random — must match between server and
// client render) cycled per stacking depth, echoing the scattered, slightly
// rotated photo cards in Google Flow's Sessions carousel.
const TILT = { back: -7, front: 5 };

export default function SessionsBrowser({
  items,
  onView,
}: {
  items: GalleryItem[];
  onView: (slug: string) => void;
}) {
  const [active, setActive] = useState(0);

  // Filter change swaps the whole item list out from under us — snap back
  // to the first item rather than pointing at a now out-of-range index.
  // Adjusted during render (React's documented pattern for resetting state
  // in response to a prop change) rather than an effect, to avoid an extra
  // render pass.
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setActive(0);
  }

  if (items.length === 0) return null;

  const go = (dir: number) => setActive((i) => (i + dir + items.length) % items.length);
  const current = items[active];
  const hasNeighbors = items.length > 1;
  const prevItem = hasNeighbors ? items[(active - 1 + items.length) % items.length] : null;
  const nextItem = hasNeighbors && items.length > 2 ? items[(active + 1) % items.length] : null;

  return (
    <div
      className="relative hidden overflow-hidden rounded-[2.5rem] border border-gold-soft/20 bg-rose-gold-deep lg:block"
      style={{ minHeight: 560 }}
    >
      {/* Warm glow trailing the active session, as in Flow Sessions */}
      <motion.div
        key={`glow-${current.slug}`}
        aria-hidden="true"
        className="pointer-events-none absolute right-[18%] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(201,168,76,0.4),_transparent_70%)] blur-3xl"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: [0, 0.9, 0.5], scale: [0.85, 1.05, 1] }}
        transition={{ duration: 0.8, ease: EASE }}
      />

      <div className="relative z-10 grid h-full grid-cols-2 items-center gap-12 px-14 py-16">
        {/* Left: vertical title list, scrolling to keep the active item centered */}
        <div
          className="relative overflow-hidden"
          style={{
            height: LIST_HEIGHT,
            maskImage:
              "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          }}
        >
          <motion.div
            animate={{ y: LIST_HEIGHT / 2 - ROW_HEIGHT / 2 - active * ROW_HEIGHT }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {items.map((item, i) => {
              const dist = Math.abs(i - active);
              const isActive = i === active;
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setActive(i)}
                  className="flex w-full cursor-pointer items-center text-left"
                  style={{ height: ROW_HEIGHT }}
                >
                  <motion.span
                    animate={{
                      opacity: isActive ? 1 : Math.max(0.55, 1 - dist * 0.15),
                      color: isActive ? "#c9a84c" : "#f1ead6",
                    }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="truncate font-display"
                    style={{ fontSize: isActive ? "2.25rem" : "1.3rem" }}
                  >
                    {item.title}
                  </motion.span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Right: stacked floating thumbnails + active session detail */}
        <div className="flex flex-col gap-8">
          <div className="relative h-64" style={{ perspective: 1200 }}>
            <AnimatePresence mode="popLayout">
              {prevItem && (
                <motion.div
                  key={`prev-${prevItem.slug}`}
                  className="absolute left-0 top-6 h-40 w-56 overflow-hidden rounded-xl shadow-2xl"
                  initial={{ opacity: 0, x: -40, rotate: TILT.back, scale: 0.7 }}
                  animate={{ opacity: 0.55, x: 0, rotate: TILT.back, scale: 0.78, filter: "blur(3px)" }}
                  exit={{ opacity: 0, x: -40, scale: 0.7 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <Image
                    src={prevItem.image}
                    alt=""
                    fill
                    sizes="224px"
                    className="object-cover"
                  />
                </motion.div>
              )}

              <motion.div
                key={`active-${current.slug}`}
                className="absolute left-1/4 top-0 h-56 w-72 overflow-hidden rounded-2xl shadow-2xl"
                initial={{ opacity: 0, scale: 0.85, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: 3, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.5, ease: EASE }}
                style={{ zIndex: 3 }}
              >
                <Image
                  src={current.image}
                  alt={current.imageAlt}
                  fill
                  sizes="288px"
                  className="object-cover"
                  priority
                />
              </motion.div>

              {nextItem && (
                <motion.div
                  key={`next-${nextItem.slug}`}
                  className="absolute right-0 top-10 h-40 w-56 overflow-hidden rounded-xl shadow-2xl"
                  initial={{ opacity: 0, x: 40, rotate: TILT.front, scale: 0.7 }}
                  animate={{ opacity: 0.5, x: 0, rotate: TILT.front, scale: 0.74, filter: "blur(4px)" }}
                  exit={{ opacity: 0, x: 40, scale: 0.7 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <Image
                    src={nextItem.image}
                    alt=""
                    fill
                    sizes="224px"
                    className="object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <h3 className="font-display text-3xl text-ivory">{current.title}</h3>
              <p className="mt-1 font-sans text-xs tracking-wide text-blush-soft uppercase">
                {current.location}
              </p>
              <p className="prose-measure mt-4 font-sans text-sm text-ivory/85">
                {current.description}
              </p>
              <button
                type="button"
                onClick={() => onView(current.slug)}
                className="mt-4 cursor-pointer font-sans text-xs tracking-[0.2em] text-gold uppercase underline underline-offset-4 hover:text-ivory"
              >
                View Photo
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {hasNeighbors && (
        <div className="absolute right-8 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous session"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-ivory/10 text-ivory transition-colors hover:bg-ivory/20"
          >
            <ChevronUp className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next session"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-ivory/10 text-ivory transition-colors hover:bg-ivory/20"
          >
            <ChevronDown className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
