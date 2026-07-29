"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const DURATION_S = 0.4;
const MS = 1000;
// Pronounced ease-out for a tall, staged lift from below.
const EASE = [0.18, 1, 0.32, 1] as const;

// Longest the staircase is allowed to run before the last letter starts.
// The headlines here are sentences, not single words, so a fixed per-letter
// stagger does not survive contact with them: at the catalog's 88ms,
// "Every Celebration Deserves Devoted Planning" would still be assembling
// itself nearly four seconds after it came into view. The stagger is
// therefore derived from the length of the line, and only reaches 88ms on
// text short enough to deserve it.
const MAX_STAGGER_SPAN_MS = 620;

/**
 * Letters rise from below in a staircase, one at a time, with no blur.
 * After the animate-text catalog's `bottom-up-letters`.
 *
 * Adapted in two ways for use on real headlines rather than single words:
 *
 *  - Characters are grouped into words, and each word is an inline-block
 *    that will not break internally. Making every character its own
 *    inline-block, as the original does, lets the browser wrap a line
 *    between any two letters, so multi-word headlines split mid-word.
 *  - The stagger shortens as the line gets longer, so a sentence lifts in
 *    at a sensible pace instead of crawling.
 */
export default function BottomUpLetters({
  children,
  className = "",
  delay = 0,
  stagger = 88,
  triggerOnView = true,
  as: Tag = "span",
}: {
  children: string;
  className?: string;
  /** Delay before the animation starts, in milliseconds. */
  delay?: number;
  /** Per-character stagger, in milliseconds. Capped for long lines. */
  stagger?: number;
  /** Animate only once the text scrolls into view. */
  triggerOnView?: boolean;
  as?: "span" | "h1" | "h2" | "h3";
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const play = (!triggerOnView || inView) && !reduceMotion;

  const text = String(children);
  const effectiveStagger = Math.min(
    stagger,
    MAX_STAGGER_SPAN_MS / Math.max(text.length - 1, 1),
  );

  // Split on spaces but keep them, so the gaps survive as their own tokens
  // and the words can be measured independently.
  const words = text.split(/(\s+)/).filter(Boolean);
  // Each token's offset is derived from the tokens before it rather than
  // carried in a counter mutated while mapping — a running variable
  // reassigned during render is exactly what the immutability rule rejects,
  // and it would be wrong anyway if React ever re-ran the map.
  const startOf = (index: number) =>
    words.slice(0, index).reduce((n, token) => n + token.length, 0);

  return (
    // The whole line is announced once from aria-label; the per-letter spans
    // are hidden so it is not read out one character at a time.
    <Tag aria-label={text} className={className} ref={ref as never}>
      {words.map((word, w) => {
        if (/^\s+$/.test(word)) {
          return (
            <span aria-hidden="true" key={`s${w}`}>
              {word}
            </span>
          );
        }
        return (
          <span
            aria-hidden="true"
            key={`w${w}`}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {Array.from(word).map((char, c) => {
              const at = startOf(w) + c;
              return (
                <motion.span
                  key={c}
                  initial={
                    reduceMotion ? { opacity: 1 } : { opacity: 0, y: 46 }
                  }
                  animate={play ? { opacity: 1, y: 0 } : undefined}
                  style={{ display: "inline-block", whiteSpace: "pre" }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : {
                          duration: DURATION_S,
                          delay: delay / MS + (at * effectiveStagger) / MS,
                          ease: EASE,
                        }
                  }
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
