"use client";

import { motion } from "framer-motion";
import { timeline } from "@/lib/content";

export default function Timeline() {
  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px bg-gold/40" />

      <div className="space-y-12">
        {timeline.map((item, i) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="relative pl-12"
          >
            <span className="absolute left-2.5 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-gold bg-cream" />
            <p className="font-display text-2xl font-bold text-maroon">{item.year}</p>
            <h3 className="font-display text-lg font-semibold text-charcoal">{item.title}</h3>
            <p className="mt-1 font-body text-sm leading-relaxed text-charcoal/70">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
