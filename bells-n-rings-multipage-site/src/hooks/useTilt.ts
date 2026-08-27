"use client";

import { useRef } from "react";
import { useMotionValue, useSpring, type SpringOptions } from "framer-motion";
import useReducedMotion from "./useReducedMotion";
import { TILT_MAX_DEG } from "@/lib/motion";

const SPRING: SpringOptions = { stiffness: 300, damping: 25, mass: 0.5 };

// Cursor-tilt hook for hero buttons, service cards, footer links — anything
// that should lean toward the pointer and spring back on leave. Returns
// Framer Motion values (not raw numbers) so callers wire them straight into
// `style={{ rotateX, rotateY }}` without an extra render on every mouse
// move; the spring physics (not manual RAF) is what makes the settle feel
// weighted rather than linear.
//
// Rotation is clamped to TILT_MAX_DEG from lib/motion.ts — the shared
// ceiling every tilt/hover component should clamp against instead of
// hardcoding its own degrees, so intensity stays consistent site-wide.
export function useTilt(maxDeg: number = TILT_MAX_DEG) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, SPRING);
  const rotateY = useSpring(rawY, SPRING);

  function onMouseMove(e: React.MouseEvent) {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Position within the element, -0.5..0.5 on each axis.
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    // Tilting toward the cursor means the top edge leans back when the
    // cursor is above center, hence the inverted Y->rotateX mapping.
    rawY.set(px * maxDeg);
    rawX.set(-py * maxDeg);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}

export default useTilt;
