"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

/**
 * Hero centerpiece — a slowly rotating ring with the tagline set along its
 * circumference via SVG textPath. Rotation duration sits in the 12-20s
 * "elegant, slow" range called for in the brief; prefers-reduced-motion is
 * honored globally via the .animate-spin-ring keyframe rule in globals.css.
 */
export default function SpinningRing({
  text,
  size = 340,
  repeat = 3,
  durationSeconds = 18,
  className = "",
}: {
  text: string;
  size?: number;
  repeat?: number;
  durationSeconds?: number;
  className?: string;
}) {
  const rawId = useId().replace(/:/g, "");
  const pathId = `ring-text-path-${rawId}`;
  const prefersReducedMotion = useReducedMotion();
  const radius = size / 2 - 22;
  const center = size / 2;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div
        className="h-full w-full"
        style={
          prefersReducedMotion
            ? undefined
            : { animation: `spin-ring ${durationSeconds}s linear infinite` }
        }
      >
        <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full overflow-visible">
          <defs>
            <path
              id={pathId}
              fill="none"
              d={`M ${center - radius}, ${center} a ${radius},${radius} 0 1,1 ${
                radius * 2
              },0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
            />
          </defs>
          <circle
            cx={center}
            cy={center}
            r={radius + 10}
            className="stroke-gold/50"
            strokeWidth="1"
            fill="none"
          />
          <circle
            cx={center}
            cy={center}
            r={radius - 10}
            className="stroke-gold/25"
            strokeWidth="1"
            fill="none"
          />
          <text
            className="fill-gold font-sans uppercase"
            style={{ fontSize: size * 0.048, letterSpacing: "0.3em" }}
          >
            <textPath href={`#${pathId}`} startOffset="0%">
              {text.repeat(repeat)}
            </textPath>
          </text>
        </svg>
      </div>
    </motion.div>
  );
}
