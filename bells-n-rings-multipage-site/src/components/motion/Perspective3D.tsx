import type { ReactNode } from "react";

// Shared 3D perspective context for card tilts, hover lifts, and any
// depth-based grid effect — one place setting `perspective` so depth
// intensity reads consistently everywhere instead of each component
// picking its own value. Pair with the `.preserve-3d` utility class (see
// globals.css) on the direct child that should actually sit in 3D space
// (the card/image), not on this wrapper itself.
export function Perspective3D({
  children,
  depth = 1200,
  className,
}: {
  children: ReactNode;
  /** Perspective distance in px — larger reads as more subtle/distant depth. */
  depth?: number;
  className?: string;
}) {
  return (
    <div className={className} style={{ perspective: `${depth}px` }}>
      {children}
    </div>
  );
}
