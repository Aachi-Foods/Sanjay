"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type AnimationVariant = "fadeInUp" | "fadeIn" | "slideInLeft" | "slideInRight" | "scaleIn";

interface AnimatedSectionProps {
  children: ReactNode;
  variant?: AnimationVariant;
  className?: string;
  delay?: number;
  stagger?: boolean;
  staggerDelay?: number;
}

const variantMap: Record<AnimationVariant, Variants> = {
  fadeInUp: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  slideInLeft: { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
  slideInRight: { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
  scaleIn: { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } },
};

// Wraps a section in a whileInView-triggered Framer Motion animation.
// `stagger` reveals direct motion children one after another via staggerItem.
export default function AnimatedSection({
  children,
  variant = "fadeInUp",
  className = "",
  delay = 0,
  stagger = false,
  staggerDelay = 0.15,
}: AnimatedSectionProps) {
  const containerVariants: Variants = stagger
    ? { hidden: {}, visible: { transition: { staggerChildren: staggerDelay, delayChildren: delay } } }
    : variantMap[variant];

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      transition={stagger ? undefined : { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
