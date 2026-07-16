"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type AnimationVariant = "fadeInUp" | "fadeIn" | "slideInLeft" | "slideInRight" | "scaleIn";

interface AnimatedSectionProps {
  children: ReactNode;
  variant?: AnimationVariant;
  className?: string;
  delay?: number;
  /** Stagger delay applied to direct children when `stagger` is true. */
  stagger?: boolean;
  staggerDelay?: number;
  as?: "div" | "section";
}

const variantMap: Record<AnimationVariant, Variants> = {
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
};

// Wraps a section in a whileInView-triggered Framer Motion animation.
// `stagger` makes direct children (which must each be `motion` elements using
// `staggerItem`) reveal one after another instead of all at once.
export default function AnimatedSection({
  children,
  variant = "fadeInUp",
  className = "",
  delay = 0,
  stagger = false,
  staggerDelay = 0.15,
  as = "div",
}: AnimatedSectionProps) {
  const Component = as === "section" ? motion.section : motion.div;

  const containerVariants: Variants = stagger
    ? {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }
    : variantMap[variant];

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      transition={stagger ? undefined : { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

// Use inside a `stagger` AnimatedSection to animate each child individually.
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
