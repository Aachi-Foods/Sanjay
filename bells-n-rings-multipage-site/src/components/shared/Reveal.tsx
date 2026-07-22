"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

const Reveal = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    delay?: number;
    y?: number;
    className?: string;
  } & Omit<HTMLMotionProps<"div">, "children" | "className" | "initial" | "whileInView" | "viewport" | "transition">
>(function Reveal({ children, delay = 0, y = 24, className = "", ...rest }, ref) {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      // Pulling the margin in from the bottom only (not symmetric on all
      // sides) means content reveals as it enters from below, not only once
      // it's scrolled deep into the middle of the viewport — a symmetric
      // margin on a short mobile screen can leave a section invisible for
      // several scrolls, reading as a blank page. See Scene.tsx for the
      // fuller writeup of this same bug.
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
});

export default Reveal;
