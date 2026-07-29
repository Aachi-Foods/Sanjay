"use client";

import { useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// Canvas particle field, after Magic UI's Particles. Points of light drift
// upward and lean away from the cursor, which gives the dark sections a
// sense of air in front of the photography.
//
// Adapted rather than dropped in: the original reads a light/dark theme from
// next-themes to pick between black and white, and this site has a single
// fixed palette, so the colour is just a prop defaulting to the brand gold.
//
// Two additions the original does not make, both of which matter here
// because the field is used on several long pages at once:
//
//  - The animation loop stops while the section is off screen. The original
//    runs its requestAnimationFrame loop for the lifetime of the page, so
//    three instances would keep three loops painting canvases nobody can
//    see, draining battery on a phone for nothing.
//  - Nothing renders at all under prefers-reduced-motion, in line with the
//    rest of the site.
const GOLD = "#c9a84c";

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
};

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean.split("").map((c) => c + c).join("")
      : clean;
  const int = parseInt(full, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

function remap(
  value: number,
  start1: number,
  end1: number,
  start2: number,
  end2: number,
) {
  const mapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
  return mapped > 0 ? mapped : 0;
}

export default function Particles({
  className = "",
  quantity = 70,
  staticity = 50,
  ease = 60,
  size = 0.5,
  color = GOLD,
  vx = 0,
  vy = -0.06,
}: {
  className?: string;
  quantity?: number;
  /** Higher keeps particles closer to home as the cursor moves. */
  staticity?: number;
  /** Higher eases the cursor lean more slowly. */
  ease?: number;
  size?: number;
  color?: string;
  vx?: number;
  /** Negative drifts upward, like embers. */
  vy?: number;
}) {
  const reduceMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const circlesRef = useRef<Circle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const sizeRef = useRef({ w: 0, h: 0 });
  const rafRef = useRef(0);
  const dprRef = useRef(1);

  const makeCircle = useCallback((): Circle => {
    const { w, h } = sizeRef.current;
    const radius = Math.floor(Math.random() * 2) + size;
    return {
      x: Math.floor(Math.random() * w),
      y: Math.floor(Math.random() * h),
      translateX: 0,
      translateY: 0,
      size: radius,
      alpha: 0,
      targetAlpha: parseFloat((Math.random() * 0.6 + 0.15).toFixed(1)),
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1,
      magnetism: 0.1 + Math.random() * 4,
    };
  }, [size]);

  useEffect(() => {
    if (reduceMotion) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    contextRef.current = canvas.getContext("2d");
    dprRef.current = window.devicePixelRatio || 1;
    const ctx = contextRef.current;
    if (!ctx) return;

    const dpr = dprRef.current;
    // Derived inside the effect, not in render: a fresh array on every
    // render would be a new dependency each time and rebuild the canvas
    // continuously.
    const rgb = hexToRgb(color);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      sizeRef.current.w = rect.width;
      sizeRef.current.h = rect.height;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      circlesRef.current = Array.from({ length: quantity }, makeCircle);
    };

    const draw = (c: Circle) => {
      ctx.beginPath();
      ctx.arc(
        c.x + c.translateX,
        c.y + c.translateY,
        c.size,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${c.alpha})`;
      ctx.fill();
    };

    const step = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      for (const c of circlesRef.current) {
        // Fade in, and fade back out as the particle nears any edge.
        const edges = [
          c.x + c.translateX - c.size,
          w - c.x - c.translateX - c.size,
          c.y + c.translateY - c.size,
          h - c.y - c.translateY - c.size,
        ];
        const closest = Math.min(...edges);
        const fade = parseFloat(remap(closest, 0, 20, 0, 1).toFixed(2));
        c.alpha =
          fade > 1
            ? Math.min(c.alpha + 0.02, c.targetAlpha)
            : c.targetAlpha * fade;

        c.x += c.dx + vx;
        c.y += c.dy + vy;
        c.translateX +=
          (mouseRef.current.x / (staticity / c.magnetism) - c.translateX) / ease;
        c.translateY +=
          (mouseRef.current.y / (staticity / c.magnetism) - c.translateY) / ease;

        // Recycle anything that has drifted out of frame.
        if (
          c.x < -c.size ||
          c.x > w + c.size ||
          c.y < -c.size ||
          c.y > h + c.size
        ) {
          Object.assign(c, makeCircle(), {
            // Re-enter from the opposite edge to the drift direction.
            y: vy < 0 ? h + c.size : -c.size,
          });
        }

        draw(c);
      }
      rafRef.current = requestAnimationFrame(step);
    };

    const start = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(step);
    };
    const stop = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const { w, h } = sizeRef.current;
      const x = e.clientX - rect.left - w / 2;
      const y = e.clientY - rect.top - h / 2;
      if (Math.abs(x) < w / 2 && Math.abs(y) < h / 2) {
        mouseRef.current = { x, y };
      }
    };

    // Only paint while the section is actually on screen.
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    observer.observe(container);

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [reduceMotion, quantity, staticity, ease, vx, vy, makeCircle, color]);

  // Drifting lights are exactly the unprompted movement that the
  // reduced-motion setting exists to suppress.
  if (reduceMotion) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
