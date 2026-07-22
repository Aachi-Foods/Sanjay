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
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
});

export default Reveal;
