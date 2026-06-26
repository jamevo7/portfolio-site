"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import type { Experience } from "@/lib/data";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * A thin work-history timeline: a line with a bubble per role (oldest → newest)
 * and a pointer marking the selected one. Controlled — clicking a bubble calls
 * `onSelect`. The current role pulses; the line draws in on scroll.
 *
 * `orientation` lays the same data/logic out either horizontally (default — a
 * full-bleed line, used in the About section) or vertically (a column, used in
 * the hero in place of the photo). The pointer's layoutId is per-instance via
 * useId, so two timelines on one page don't fight over the shared layout slide.
 */
export function ExperienceTimeline({
  nodes,
  active,
  onSelect,
  orientation = "horizontal",
}: {
  nodes: Experience[];
  active: number | null;
  onSelect: (i: number) => void;
  orientation?: "horizontal" | "vertical";
}) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  // useInView (not whileInView) so the line still draws in — and stays visible —
  // when the section is already on-screen at mount (e.g. after an HMR remount).
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const pointerId = React.useId();
  const vertical = orientation === "vertical";

  // The pointer sits under/beside the selected role, defaulting to the most
  // recent (last) company when nothing is selected.
  const pointed = active ?? nodes.length - 1;

  return (
    <div ref={ref} className="relative">
      {/* Connecting line — draws in on scroll. Horizontal is full-bleed for
          cohesion with the quote strip (left-1/2 + -ml-[50vw] bleeds without a
          transform, so it doesn't clash with the scaleX draw-in). Vertical runs
          through the dot centers (left-2.5 = the size-5 bubble's center). */}
      <motion.div
        aria-hidden
        className={cn(
          "absolute bg-border",
          vertical
            ? "left-2.5 top-2.5 h-[calc(100%-1.25rem)] w-px origin-top"
            : "left-1/2 top-2 -ml-[50vw] h-px w-screen origin-left"
        )}
        initial={reduce ? false : vertical ? { scaleY: 0 } : { scaleX: 0 }}
        animate={
          vertical
            ? { scaleY: reduce || inView ? 1 : 0 }
            : { scaleX: reduce || inView ? 1 : 0 }
        }
        transition={{ duration: 0.8, ease: EASE_OUT }}
      />
      <ol
        className={cn(
          "relative flex",
          vertical ? "flex-col gap-5" : "items-start"
        )}
      >
        {nodes.map((node, i) => {
          const current = node.end === "Present";
          const isActive = i === active;
          return (
            <React.Fragment key={`${node.company}-${node.start}`}>
              <li
                className={cn(
                  "flex",
                  vertical
                    ? "items-center gap-3"
                    : "flex-none flex-col items-center"
                )}
              >
                <button
                  type="button"
                  onClick={() => onSelect(i)}
                  aria-pressed={isActive}
                  aria-label={`${node.role}, ${node.company}`}
                  className="group relative flex size-5 flex-none items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {/* Heartbeat ping — on the current role, and on whichever role
                      is pressed (active). Pressed pings primary, current emerald. */}
                  {(isActive || current) && !reduce && (
                    <span
                      className={cn(
                        "absolute inline-flex size-5 animate-ping rounded-full [animation-duration:2.5s]",
                        isActive ? "bg-primary/50" : "bg-emerald-500/50"
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      "size-4 rounded-full ring-2 ring-background transition-all",
                      isActive
                        ? "scale-110 bg-primary"
                        : current
                          ? "bg-emerald-500"
                          : "bg-muted-foreground/40 group-hover:bg-primary/70"
                    )}
                  />
                </button>
                <span
                  className={cn(
                    "font-mono text-[11px] leading-tight text-muted-foreground",
                    vertical ? "" : "mt-2 text-center"
                  )}
                >
                  {node.company}
                </span>

                {/* Pointer marking the selected role. One exists; the shared
                    layoutId slides it between nodes. Horizontal points north
                    under the dot; vertical points west from the row's far edge. */}
                {i === pointed && (
                  <motion.span
                    layoutId={pointerId}
                    aria-hidden
                    className={cn(vertical ? "ml-auto -rotate-90" : "mt-1.5")}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 500, damping: 38 }
                    }
                  >
                    <svg
                      width="12"
                      height="7"
                      viewBox="0 0 12 7"
                      className="block fill-muted-foreground/70"
                    >
                      <path d="M6 0 12 7 0 7Z" />
                    </svg>
                  </motion.span>
                )}
              </li>
              {/* Connector between nodes — only horizontal; the vertical line
                  already reads as continuous. */}
              {!vertical && i < nodes.length - 1 && (
                <li
                  aria-hidden
                  className="flex h-4 flex-1 items-center justify-center"
                >
                  <ChevronRight className="size-4 text-muted-foreground/50" />
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </div>
  );
}
