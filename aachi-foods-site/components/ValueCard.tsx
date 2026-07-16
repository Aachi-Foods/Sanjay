"use client";

import { motion } from "framer-motion";
import { staggerItem } from "./AnimatedSection";

export default function ValueCard({ title, description }: { title: string; description: string }) {
  return (
    <motion.div variants={staggerItem} className="rounded-2xl bg-cream/5 p-6 text-center">
      <h3 className="font-display text-lg font-bold text-turmeric">{title}</h3>
      <p className="mt-3 font-body text-sm leading-relaxed text-cream/70">{description}</p>
    </motion.div>
  );
}
