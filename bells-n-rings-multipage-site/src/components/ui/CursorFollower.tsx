"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Decorative cursor accent — a small gold dot that tracks the pointer
 * exactly, with a softly glowing trail that eases behind it and pulses
 * gently at rest. The native cursor stays visible throughout (this only
 * adds a flourish alongside it, rather than replacing it), so link/text/
 * form cursor feedback is unaffected. Desktop (fine pointer) only.
 */
export default function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const [pressed, setPressed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const glowX = useSpring(x, { stiffness: 100, damping: 16, mass: 0.9 });
  const glowY = useSpring(y, { stiffness: 100, damping: 16, mass: 0.9 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || prefersReducedMotion) return;

    // matchMedia isn't available during server render, so this can't be
    // derived during render — it has to run once the effect confirms we're
    // on a fine-pointer client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [prefersReducedMotion, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Glowing trail — eases behind the pointer and breathes gently at rest */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full bg-gold/30 blur-md"
        style={{ x: glowX, y: glowY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: pressed ? 44 : [26, 32, 26],
          height: pressed ? 44 : [26, 32, 26],
          opacity: pressed ? 0.55 : [0.3, 0.45, 0.3],
        }}
        transition={
          pressed
            ? { duration: 0.2 }
            : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
        }
      />
      {/* Sharp dot — tracks the pointer exactly, no lag */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100] h-1.5 w-1.5 rounded-full bg-gold"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: pressed ? 1.8 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
