"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type SceneProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Pixels the section rises from, growing to full size, as it settles into place. */
  rise?: number;
  as?: "div" | "section";
} & Omit<
  HTMLMotionProps<"div">,
  "children" | "className" | "initial" | "whileInView" | "viewport" | "transition" | "style"
>;

// A "chapter" of the page rising and growing into place as it scrolls into
// view, instead of appearing statically and instantly.
//
// Deliberately avoids rotateX/perspective, which an earlier version of this
// component used for a "tilting up like a pop-up book" effect: rotating a
// very tall section (the services grid alone runs ~2000px) in 3D space
// inflates the element's rendered bounding box far beyond its real height
// while it's still in its pre-animation state, pushing it well past its
// normal scroll position and leaving a large blank gap above it — the
// section was there, just rendered thousands of pixels lower than where it
// belonged, which read as "the page is broken/empty" while scrolling.
export default function Scene({
  children,
  className = "",
  delay = 0,
  rise = 64,
  as = "div",
  ...rest
}: SceneProps) {
  const reduceMotion = useReducedMotion();
  const Component = as === "section" ? motion.section : motion.div;

  // Pulling the margin in from the bottom only (not symmetric on all sides)
  // means content reveals as it enters from below, not only once it's
  // scrolled deep into the middle of the viewport — a symmetric margin on a
  // short mobile screen can otherwise leave a section invisible for several
  // scrolls.
  const TRIGGER_MARGIN = "0px 0px -80px 0px";

  if (reduceMotion) {
    return (
      <Component
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: TRIGGER_MARGIN }}
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
      initial={{ opacity: 0, y: rise, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: TRIGGER_MARGIN }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
