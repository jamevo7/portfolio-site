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
    // don't drag on. Expressed in 60fps-frame units (see FRAME_MS below).
    const span = Math.min(41 + chars.length * 2.53, 138);
    // Each glyph flickers until its `end`, then locks in left→right. The convex
    // easing (t^1.6) widens the gap between successive locks, so the reveal
    // starts quick and decelerates. Each glyph gets its own flicker cadence and
    // phase so the scramble shimmers smoothly rather than flipping in lockstep.
    const queue = chars.map((to, i) => {
      const eased = Math.pow(i / last, 1.6);
      return {
        to,
        end: Math.round(span * eased) + 6 + Math.floor(Math.random() * 6),
        char: randHex(),
        flick: 45 + Math.random() * 40, // ms between hex swaps for this glyph
        nextFlip: Math.random() * 50, // initial phase offset (ms)
      };
    });

    // Drive progress from elapsed real time, not a per-frame counter, so the
    // pace is identical across refresh rates and stays smooth if frames drop.
    const FRAME_MS = 1000 / 60;
    let start = 0;
    let raf = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;
      const frame = elapsed / FRAME_MS;
      let done = 0;
      const next = queue.map((q) => {
        if (q.to === " ") return { char: " ", settled: true };
        if (frame >= q.end) {
          done++;
          return { char: q.to, settled: true };
        }
        // Steady per-glyph cadence keeps the flicker smooth and rhythmic.
        if (elapsed >= q.nextFlip) {
          q.char = randHex();
          q.nextFlip = elapsed + q.flick;
        }
        return { char: q.char, settled: false };
      });
      setCells(next);
      if (done === queue.length) return;
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
