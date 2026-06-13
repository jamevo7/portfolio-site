"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "framer-motion";

type CountUpProps = {
  /** Target value to count up to. */
  value: number;
  prefix?: string;
  suffix?: string;
  /** Animation duration in seconds. */
  duration?: number;
  className?: string;
};

/**
 * Counts from 0 up to `value` once when scrolled into view (easeOutCubic).
 * Respects prefers-reduced-motion by jumping straight to the final value.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1.4,
  className,
}: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {Math.round(display)}
      {suffix}
    </span>
  );
}
