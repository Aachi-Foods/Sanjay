"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Decorative cursor accent — a soft gold glow that trails the pointer with a
 * gentle lag. The native cursor stays visible throughout (this only adds a
 * flourish alongside it, rather than replacing it), so link/text/form cursor
 * feedback is unaffected. Desktop (fine pointer) only.
 */
export default function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const [pressed, setPressed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const glowX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.8 });
  const glowY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.8 });

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
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] h-6 w-6 rounded-full bg-gold/40 blur-md"
      style={{ x: glowX, y: glowY, translateX: "-50%", translateY: "-50%" }}
      animate={{ scale: pressed ? 1.4 : 1, opacity: pressed ? 0.6 : 0.4 }}
      transition={{ duration: 0.2 }}
    />
  );
}
