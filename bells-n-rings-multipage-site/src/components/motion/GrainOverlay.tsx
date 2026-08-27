"use client";

import { useId, type CSSProperties } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";

// Subtle animated grain, cheap to render at any viewport size: an SVG
// feTurbulence filter over a full-bleed rect, rather than a canvas noise
// loop or a tiled PNG. baseFrequency is kept high (0.9) so the pattern
// reads as fine grain rather than visible blotches, and when animated the
// noise seed steps discretely every couple of seconds via SMIL <animate>
// — no per-frame JS, and slow enough to avoid a strobe effect.
//
// Drop into any section as a full-bleed absolute layer:
//   <section className="relative">
//     <GrainOverlay opacity={0.04} animated />
//     ...
//   </section>
export function GrainOverlay({
  opacity = 0.04,
  animated = false,
  className = "",
  blendMode = "overlay",
  style,
}: {
  /** How visible the grain is — kept very low by default (0.03-0.05). */
  opacity?: number;
  /** Slowly shifts the noise pattern. Falls back to static under reduced motion. */
  animated?: boolean;
  className?: string;
  /** "overlay" reads best on the mid-tone sections; "soft-light" is gentler
   * on the near-black rose-gold-deep backgrounds where "overlay" all but
   * disappears. Exposed rather than hardcoded so each section can pick. */
  blendMode?: "overlay" | "soft-light";
  /** Escape hatch for anything the props above don't cover — merged over
   * (and can override) the opacity/blendMode above. */
  style?: CSSProperties;
}) {
  const filterId = useId();
  const reduceMotion = useReducedMotion();
  const shouldAnimate = animated && !reduceMotion;

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity, mixBlendMode: blendMode, ...style }}
    >
      <filter id={filterId}>
        <feTurbulence type="fractalNoise" baseFrequency={0.9} numOctaves={2} stitchTiles="stitch" result="noise">
          {shouldAnimate && (
            <animate
              attributeName="seed"
              values="0;1;2;3;4;5;6;7;8;9;0"
              dur="8s"
              calcMode="discrete"
              repeatCount="indefinite"
            />
          )}
        </feTurbulence>
        {/* Desaturates the turbulence output — feTurbulence's raw RGBA
            noise reads as colorful static without this; grain should be
            monochrome. */}
        <feColorMatrix in="noise" type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${filterId})`} />
    </svg>
  );
}

export default GrainOverlay;
