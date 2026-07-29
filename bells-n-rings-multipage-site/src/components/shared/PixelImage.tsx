"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

// Assembles a photo out of a grid of tiles that fade in one by one, after
// Magic UI's PixelImage. Each tile is the whole photo clipped to one cell,
// so the picture appears to piece itself together.
//
// Two things differ from the original, both because of where it is used:
//
//  - It waits until the photo is scrolled into view. The original animates
//    on mount, which for anything below the fold means the reveal has long
//    finished by the time it is looked at.
//  - Tile delays come from a hash of the index rather than Math.random, so
//    the order is scattered but identical between the prerendered HTML and
//    the first client render. Random values would differ across that
//    boundary and trip a hydration mismatch.
function hash(i: number) {
  const x = Math.sin(i * 45.233) * 43758.5453;
  return x - Math.floor(x);
}

export default function PixelImage({
  src,
  alt,
  customGrid = { rows: 4, cols: 6 },
  grayscaleAnimation = true,
  className = "",
  sizes = "100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  customGrid?: { rows: number; cols: number };
  grayscaleAnimation?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Assembling the picture tile by tile is decorative; reduced motion
    // skips straight to the finished photo, handled by `revealed` below
    // rather than by setting state here.
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
      {Array.from({ length: total }, (_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const x1 = (col * 100) / cols;
        const x2 = ((col + 1) * 100) / cols;
        const y1 = (row * 100) / rows;
        const y2 = ((row + 1) * 100) / rows;
        const delay = reduceMotion ? 0 : hash(i) * 0.5;

        return (
          <div
            key={i}
            // Only the first tile carries the description; the rest are the
            // same photo again and would just repeat it to a screen reader.
            aria-hidden={i > 0 ? "true" : undefined}
            className="absolute inset-0"
            style={{
              clipPath: `polygon(${x1}% ${y1}%, ${x2}% ${y1}%, ${x2}% ${y2}%, ${x1}% ${y2}%)`,
              opacity: revealed ? 1 : 0,
              filter:
                grayscaleAnimation && !revealed
                  ? "grayscale(100%)"
                  : "grayscale(0%)",
              transition: reduceMotion
                ? undefined
                : `opacity 620ms ease-out ${delay}s, filter 900ms ease-out ${delay}s`,
            }}
          >
            <Image
              src={src}
              alt={i === 0 ? alt : ""}
              fill
              priority={priority}
              loading={priority ? undefined : "lazy"}
              sizes={sizes}
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
