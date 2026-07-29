"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

// Reveals a photo as a grid of tiles that lift away one by one, after Magic
// UI's PixelImage.
//
// The photograph itself is laid down once, unclipped. The tiles are flat
// covers on top of it that fade out — rather than 24 clipped copies of the
// photo fading in, which is the obvious way to build this and the way that
// leaves a permanent grid of hairlines across the finished image: the tile
// edges fall on fractional pixels, and anti-aliasing along each seam never
// quite adds up to an opaque join. Covering and uncovering means the end
// state is just the photo, with nothing overlaid to seam.
//
// The covers overlap each other very slightly for the same reason in
// reverse, so no sliver of photo leaks between them part way through. Being
// one flat colour, the overlap cannot show.
//
// Two differences from the original, both from where it is used here:
//
//  - It waits until the photo is scrolled into view. The original animates
//    on mount, which for anything below the fold means the reveal has long
//    finished by the time it is looked at.
//  - Tile delays come from a hash of the index rather than Math.random, so
//    the order is scattered but identical between the prerendered HTML and
//    the first client render — random values would differ across that
//    boundary and trip a hydration mismatch.
function hash(i: number) {
  const x = Math.sin(i * 45.233) * 43758.5453;
  return x - Math.floor(x);
}

// Percent of the box each cover is grown by on every side, to close the
// sub-pixel gaps between neighbours.
const OVERLAP = 0.6;

export default function PixelImage({
  src,
  alt,
  customGrid = { rows: 4, cols: 6 },
  grayscaleAnimation = true,
  className = "",
  coverClassName = "bg-ivory",
  sizes = "100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  customGrid?: { rows: number; cols: number };
  grayscaleAnimation?: boolean;
  className?: string;
  /** Colour of the tiles that lift away — match the surrounding section. */
  coverClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const coversRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);

  // The covers are transparent in the markup and only made opaque once this
  // runs, so if the JavaScript never executes the photo is simply visible
  // rather than hidden behind tiles that will never lift. Before paint, so
  // there is no flash of the uncovered photo.
  useLayoutEffect(() => {
    if (reduceMotion) return;
    const covers = coversRef.current;
    if (covers) covers.style.opacity = "1";
  }, [reduceMotion]);

  useEffect(() => {
    // Assembling the picture is decorative; reduced motion skips straight to
    // the finished photo, handled by `revealed` below rather than by setting
    // state here.
    if (reduceMotion) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const revealed = reduceMotion || inView;
  const { rows, cols } = customGrid;
  const total = rows * cols;

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* The photograph, never clipped — so the finished image carries no
          tile seams at all. */}
      <div
        className="absolute inset-0"
        style={{
          filter:
            grayscaleAnimation && !revealed ? "grayscale(100%)" : "grayscale(0%)",
          transition: reduceMotion
            ? undefined
            : "filter 900ms ease-out 150ms",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes={sizes}
          className="object-cover"
        />
      </div>

      {!reduceMotion && (
        <div
          ref={coversRef}
          aria-hidden="true"
          className="absolute inset-0"
          style={{ opacity: 0 }}
        >
          {Array.from({ length: total }, (_, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;
            const x1 = Math.max(0, (col * 100) / cols - OVERLAP);
            const x2 = Math.min(100, ((col + 1) * 100) / cols + OVERLAP);
            const y1 = Math.max(0, (row * 100) / rows - OVERLAP);
            const y2 = Math.min(100, ((row + 1) * 100) / rows + OVERLAP);

            return (
              <div
                key={i}
                className={`absolute inset-0 ${coverClassName}`}
                style={{
                  clipPath: `polygon(${x1}% ${y1}%, ${x2}% ${y1}%, ${x2}% ${y2}%, ${x1}% ${y2}%)`,
                  opacity: revealed ? 0 : 1,
                  transition: `opacity 560ms ease-out ${(hash(i) * 0.45).toFixed(3)}s`,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
