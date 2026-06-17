"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

const HEX = "0123456789abcdef";
const randHex = () => HEX[Math.floor(Math.random() * HEX.length)]!;

type Cell = { char: string; settled: boolean };

const asSettled = (text: string): Cell[] =>
  text.split("").map((char) => ({ char, settled: true }));

/**
 * Renders `text` with a "decrypt" reveal: every glyph starts as a flickering
 * random hex character, then locks into the real text left-to-right. The hex
 * charset nods to the site's terminal/identity-card motif.
 *
 * SSR and the first client render emit the real text (good for SEO, no-JS, and
 * hydration parity); the scramble kicks in on mount. Honors reduced-motion by
 * skipping straight to the settled text, and exposes the real string to
 * assistive tech via `aria-label` while the animated glyphs are hidden.
 */
export function DecipherText({
  text,
  className,
  scrambleClassName = "text-primary/70",
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  /** Class applied to glyphs that are still scrambling. */
  scrambleClassName?: string;
  /** Delay before the scramble begins, in ms. */
  delay?: number;
  as?: React.ElementType;
}) {
  const reduce = useReducedMotion();
  const [cells, setCells] = React.useState<Cell[]>(() => asSettled(text));

  React.useEffect(() => {
    if (reduce) {
      setCells(asSettled(text));
      return;
    }

    const chars = text.split("");
    const last = Math.max(1, chars.length - 1);
    // Total scramble span grows gently with length, capped so long sentences
    // don't drag on. Kept short so glyphs settle quickly.
    const span = Math.min(36 + chars.length * 2.2, 120);
    // Each glyph flickers from frame 0 until its `end`, locking in left→right.
    // The convex easing (t^1.9) widens the gap between successive locks, so the
    // reveal starts quick and decelerates — slower and slower toward the end.
    const queue = chars.map((to, i) => {
      const eased = Math.pow(i / last, 1.6);
      return {
        to,
        end: Math.round(span * eased) + 6 + Math.floor(Math.random() * 6),
        char: randHex(),
      };
    });

    let frame = 0;
    let raf = 0;

    const tick = () => {
      let done = 0;
      const next = queue.map((q) => {
        if (q.to === " ") return { char: " ", settled: true };
        if (frame >= q.end) {
          done++;
          return { char: q.to, settled: true };
        }
        // Slow flicker rate keeps individual glyphs readable during scramble.
        if (Math.random() < 0.1) q.char = randHex();
        return { char: q.char, settled: false };
      });
      setCells(next);
      if (done === queue.length) return;
      frame++;
      raf = requestAnimationFrame(tick);
    };

    // Paint the all-hex starting state, then begin after the optional delay.
    setCells(queue.map((q) => ({ char: q.char, settled: false })));
    const timer = window.setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [text, delay, reduce]);

  return (
    <Tag className={className} aria-label={text}>
      {cells.map((cell, i) => (
        <span
          key={i}
          aria-hidden
          className={cn(
            "transition-opacity duration-300",
            cell.settled ? "opacity-100" : cn("opacity-50", scrambleClassName),
          )}
        >
          {cell.char === " " ? " " : cell.char}
        </span>
      ))}
    </Tag>
  );
}
