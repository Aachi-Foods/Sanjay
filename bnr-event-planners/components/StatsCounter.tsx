"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { stats } from "@/lib/content";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = Math.round(latest).toString();
    });
  }, [springValue]);

  return (
    <span className="font-display text-5xl font-bold text-gold lg:text-6xl">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="bg-maroon py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 text-center lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <Counter value={stat.value} suffix={stat.suffix} />
            <p className="mt-2 font-body text-sm uppercase tracking-wider text-cream/80">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
