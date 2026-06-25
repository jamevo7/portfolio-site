"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Subtle scroll-triggered fade + slide-up. Animates once when in view.
 *
 * Implementation note: this used to be a framer-motion `whileInView`, which
 * spins up an observer and a JS animation loop per element — costly when ~20 of
 * them are on a page. It's now pure CSS (see `.reveal` in globals.css) driven by
 * a single module-level IntersectionObserver shared across every instance, so
 * revealing is essentially free and nothing runs on the main thread during
 * scroll. Reduced motion is handled in CSS.
 */

type Subscriber = () => void;

// One observer for the whole app. Elements register a callback; on first
// intersection we fire it once and stop observing that element.
let sharedObserver: IntersectionObserver | null = null;
const subscribers = new WeakMap<Element, Subscriber>();

function observe(el: Element, onReveal: Subscriber) {
  if (typeof IntersectionObserver === "undefined") {
    onReveal(); // SSR / unsupported → just show it
    return () => {};
  }
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          subscribers.get(entry.target)?.();
          subscribers.delete(entry.target);
          sharedObserver!.unobserve(entry.target);
        }
      },
      // Reveal a touch before the element is fully on screen.
      { rootMargin: "0px 0px -80px 0px" }
    );
  }
  subscribers.set(el, onReveal);
  sharedObserver.observe(el);
  return () => {
    subscribers.delete(el);
    sharedObserver?.unobserve(el);
  };
}

type RevealProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Stagger delay in seconds. */
  delay?: number;
};

export function Reveal({
  className,
  delay = 0,
  children,
  style,
  ...props
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observe(el, () => setVisible(true));
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ ["--reveal-delay" as string]: `${delay}s`, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
