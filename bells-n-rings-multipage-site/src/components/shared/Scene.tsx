"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type SceneProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Degrees the section starts tilted back on its X axis before settling flat. */
  tilt?: number;
  /** Pixels the section rises from as it tilts into place. */
  rise?: number;
  as?: "div" | "section";
} & Omit<
  HTMLMotionProps<"div">,
  "children" | "className" | "initial" | "whileInView" | "viewport" | "transition" | "style"
>;

// A "chapter" of the page rotating up out of the scroll, like a page in a
// pop-up book settling flat — used to give each homepage section its own
// storyteller-style entrance instead of a static, instant appearance.
export default function Scene({
  children,
  className = "",
  delay = 0,
  tilt = 10,
  rise = 56,
  as = "div",
  ...rest
}: SceneProps) {
  const reduceMotion = useReducedMotion();
  const Component = as === "section" ? motion.section : motion.div;

  if (reduceMotion) {
    return (
      <Component
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className={className}
        {...rest}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      initial={{ opacity: 0, y: rise, rotateX: tilt, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 1, delay, ease: EASE }}
      style={{ transformPerspective: 1200, transformOrigin: "50% 100%" }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
