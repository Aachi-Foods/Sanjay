"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { onScrollTick, viewportProgress } from "./scrollTicker";

// Moves its child against the scroll, so foreground and background travel at
// different rates and the page reads as having depth.
//
// Only translate is used — no rotateX/rotateY and no `perspective`. Those
// blur rasterised text on some mobile GPUs, and on a tall element the
// perspective projection inflates the bounding box far past the element's
// real height, which once threw whole sections thousands of pixels out of
// position on this site. Layering plain translation at different speeds
// buys the same sense of depth with none of that.
//
// The transform is written straight to the node rather than held in React
// state: this runs on every scroll frame, and re-rendering a subtree that
// often is wasteful when only one style property changes.
export default function Parallax({
  children,
  className = "",
  // How far the element drifts, in px, across its full travel through the
  // viewport. Negative moves it with the scroll instead of against it.
  distance = 40,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  as?: "div" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;

    return onScrollTick(() => {
      const p = viewportProgress(el);
      const y = (0.5 - p) * distance * 2;
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    });
  }, [reduceMotion, distance]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
