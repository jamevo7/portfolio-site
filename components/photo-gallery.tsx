"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * A square photo gallery that crossfades one image to the next every ~4.5s,
 * framed in the site's blueprint language (registration brackets + mono
 * caption). Pauses on hover; dots allow manual selection; static under
 * prefers-reduced-motion.
 *
 * Dummy data for now — swap each slide's placeholder block for a real <Image>.
 */
// Neutral placeholder tones — graded steps of the foreground so the gallery
// reads monochrome until real photos drop in.
const SLIDES = [
  { caption: "mentoring", tone: "from-foreground/10 to-foreground/5" },
  { caption: "volunteering", tone: "from-foreground/15 to-foreground/5" },
  { caption: "on the trail", tone: "from-foreground/10 to-foreground/[0.03]" },
  { caption: "building things", tone: "from-foreground/20 to-foreground/5" },
];

const INTERVAL = 4500;

export function PhotoGallery({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (reduce || paused) return;
    const t = window.setInterval(
      () => setIndex((p) => (p + 1) % SLIDES.length),
      INTERVAL
    );
    return () => window.clearInterval(t);
  }, [reduce, paused]);

  const slide = SLIDES[index];
  const next = () => setIndex((p) => (p + 1) % SLIDES.length);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Show next photo"
      className={cn(
        "relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border bg-card shadow-sm",
        className
      )}
      onClick={next}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          next();
        }
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className={cn("absolute inset-0 bg-gradient-to-br", slide.tone)}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        >
          {/* Placeholder mark — replace this block with a real <Image>. */}
          <div className="flex h-full items-center justify-center">
            <ImageIcon className="size-9 text-foreground/25" strokeWidth={1.5} />
          </div>
          <div className="absolute bottom-3 left-4 font-mono text-xs uppercase tracking-wider text-foreground/70">
            {slide.caption}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Blueprint registration brackets. */}
      <span className="pointer-events-none absolute left-2.5 top-2.5 size-3 border-l border-t border-primary/30" />
      <span className="pointer-events-none absolute right-2.5 top-2.5 size-3 border-r border-t border-primary/30" />
      <span className="pointer-events-none absolute bottom-2.5 left-2.5 size-3 border-b border-l border-primary/30" />
      <span className="pointer-events-none absolute bottom-2.5 right-2.5 size-3 border-b border-r border-primary/30" />

      {/* Dot indicators. */}
      <div className="absolute bottom-3 right-3 flex gap-1.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.caption}
            type="button"
            aria-label={`Show ${s.caption}`}
            aria-current={i === index}
            onClick={(e) => {
              e.stopPropagation();
              setIndex(i);
            }}
            className={cn(
              "size-1.5 rounded-full transition-colors",
              i === index
                ? "bg-primary"
                : "bg-foreground/25 hover:bg-foreground/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}
