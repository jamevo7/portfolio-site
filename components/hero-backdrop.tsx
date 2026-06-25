"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/**
 * Decorative hero backdrop: two dark-blue aurora blobs (plus a lighter accent)
 * that drift slowly and indefinitely. The blueprint grid is a separate,
 * page-wide layer (`PageGrid`); this just adds the moving glow over the hero.
 * Purely ornamental — hidden from assistive tech and fully static when the
 * user prefers reduced motion.
 *
 * The drift only runs while the hero is on screen (`useInView`) — once scrolled
 * past, the animation frames stop so they don't burn GPU on the rest of the page.
 */
export function HeroBackdrop() {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const active = inView && !reduce;

  // A slow, organic drift. Held still (no animation frames) when off-screen or
  // when the user prefers reduced motion, so the aurora reads as a static glow.
  const drift = (
    x: number[],
    y: number[],
    scale: number[],
    duration: number
  ) =>
    active
      ? {
          x,
          y,
          scale,
          transition: {
            duration,
            repeat: Infinity,
            repeatType: "mirror" as const,
            ease: "easeInOut" as const,
          },
        }
      : false;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Aurora blob — primary, upper area. */}
      <motion.div
        className="absolute left-1/2 top-[-12%] size-[460px] -translate-x-1/2 transform-gpu rounded-full bg-primary/30 blur-3xl will-change-transform"
        animate={drift([-40, 60, -20], [0, 30, 10], [1, 1.12, 1], 19)}
      />

      {/* Aurora blob — lighter, offset for depth and color separation. */}
      <motion.div
        className="absolute left-[18%] top-[6%] size-[360px] transform-gpu rounded-full bg-blue-700/20 blur-3xl will-change-transform dark:bg-blue-600/20"
        animate={drift([0, 70, 30], [10, -20, 0], [1, 1.18, 1.05], 24)}
      />

      {/* Aurora blob — deep blue, lower-right, anchors the composition. */}
      <motion.div
        className="absolute right-[12%] top-[28%] size-[300px] transform-gpu rounded-full bg-primary/25 blur-3xl will-change-transform"
        animate={drift([20, -50, 0], [0, 25, -10], [1.05, 1, 1.12], 21)}
      />
    </div>
  );
}
