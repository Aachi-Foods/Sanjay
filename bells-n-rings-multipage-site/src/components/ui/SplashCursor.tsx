"use client";

import { useEffect, useRef } from "react";

type SplashCursorProps = {
  /** Splash tint. Defaults to the site's own gold brand color. */
  COLOR?: string;
};

type Blob = {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  born: number;
  lifeMs: number;
  alpha: number;
};

// A from-scratch replacement for CursorFollower.tsx's single gold dot+glow —
// same role (a decorative, desktop-only, reduced-motion-respecting pointer
// accent), but a canvas-based splash trail instead. Deliberately a plain
// Canvas2D particle trail rather than a full WebGL fluid simulation (the
// technique the original React Bits SplashCursor is built on): that's a
// GPU stable-fluids sim — several render-to-texture passes (advection,
// curl, pressure, gradient subtraction) — genuinely one of the heaviest
// "cursor effect" categories that exists, and not something to reproduce
// correctly from memory with no reference source in hand. This reads as
// the same "colorful splash follows the cursor" effect for a fraction of
// the GPU cost, which matters more here than it would on a portfolio site:
// this runs on every page a visitor might be filling out an enquiry form
// on.
export default function SplashCursor({ COLOR = "#c9a84c" }: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduceMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const colorMatch = COLOR.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    const [r, g, b] = colorMatch
      ? [parseInt(colorMatch[1], 16), parseInt(colorMatch[2], 16), parseInt(colorMatch[3], 16)]
      : [201, 168, 76];

    const blobs: Blob[] = [];
    let lastSpawn = 0;
    let lastX = -1;
    let lastY = -1;
    let rafId = 0;

    const spawn = (x: number, y: number, burst: boolean) => {
      const count = burst ? 10 : 1;
      for (let i = 0; i < count; i++) {
        const angle = burst ? (i / count) * Math.PI * 2 : 0;
        const spread = burst ? 18 : 0;
        blobs.push({
          x: x + Math.cos(angle) * spread * Math.random(),
          y: y + Math.sin(angle) * spread * Math.random(),
          radius: burst ? 2 : 1,
          maxRadius: burst ? 34 + Math.random() * 22 : 20 + Math.random() * 14,
          born: performance.now(),
          lifeMs: burst ? 700 + Math.random() * 200 : 550 + Math.random() * 150,
          alpha: burst ? 0.5 : 0.32,
        });
      }
    };

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      const dx = lastX < 0 ? 0 : e.clientX - lastX;
      const dy = lastY < 0 ? 0 : e.clientY - lastY;
      const dist = Math.hypot(dx, dy);
      lastX = e.clientX;
      lastY = e.clientY;
      // Spawns scale with movement speed, throttled to ~every 30ms so a
      // fast flick doesn't flood the canvas with hundreds of blobs.
      if (now - lastSpawn > 30 && dist > 4) {
        spawn(e.clientX, e.clientY, false);
        lastSpawn = now;
      }
    };
    const onDown = (e: PointerEvent) => spawn(e.clientX, e.clientY, true);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const now = performance.now();
      ctx.globalCompositeOperation = "lighter";

      for (let i = blobs.length - 1; i >= 0; i--) {
        const blob = blobs[i];
        const t = (now - blob.born) / blob.lifeMs;
        if (t >= 1) {
          blobs.splice(i, 1);
          continue;
        }
        const eased = 1 - Math.pow(1 - t, 3);
        const radius = blob.radius + (blob.maxRadius - blob.radius) * eased;
        const alpha = blob.alpha * (1 - t);

        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, radius);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      cancelAnimationFrame(rafId);
    };
  }, [COLOR]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100]"
    />
  );
}
