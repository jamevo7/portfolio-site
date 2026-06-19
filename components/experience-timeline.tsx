"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import type { Experience } from "@/lib/data";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * A thin work-history timeline: a full-bleed line with a bubble per role
 * (oldest → newest) and arrows between roles. Controlled — clicking a bubble
 * calls `onSelect`, and the selected role is shown elsewhere (the identity
 * card). The current role pulses; the line draws in on scroll.
 */
export function ExperienceTimeline({
  nodes,
  active,
  onSelect,
}: {
  nodes: Experience[];
  active: number | null;
  onSelect: (i: number) => void;
}) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  // useInView (not whileInView) so the line still draws in — and stays visible —
  // when the section is already on-screen at mount (e.g. after an HMR remount).
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // The pointer sits under the selected role, defaulting to the most recent
  // (last) company when nothing is selected.
  const pointed = active ?? nodes.length - 1;

  return (
    <div ref={ref} className="relative">
      {/* Connecting line — full-bleed for cohesion with the quote strip above;
          draws in on scroll. left-1/2 + -ml-[50vw] bleeds without a transform,
          so it doesn't clash with the scaleX draw-in. Arrows sit atop it. */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-2 -ml-[50vw] h-px w-screen origin-left bg-border"
        initial={reduce ? false : { scaleX: 0 }}
        animate={{ scaleX: reduce || inView ? 1 : 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      />
      <ol className="relative flex items-start">
        {nodes.map((node, i) => {
          const current = node.end === "Present";
          const isActive = i === active;
          return (
            <React.Fragment key={`${node.company}-${node.start}`}>
              <li className="flex flex-none flex-col items-center">
                <button
                  type="button"
                  onClick={() => onSelect(i)}
                  aria-pressed={isActive}
                  aria-label={`${node.role}, ${node.company}`}
                  className="group relative flex size-5 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                <span className="mt-2 text-center font-mono text-[11px] leading-tight text-muted-foreground">
                  {node.company}
                </span>
                {/* North-pointing pointer marking the selected role. Only one
                    exists; the shared layoutId slides it between nodes. Centered
                    under the dot/name by the column's items-center. */}
                {i === pointed && (
                  <motion.span
                    layoutId="timeline-pointer"
                    aria-hidden
                    className="mt-1.5"
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
              {i < nodes.length - 1 && (
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
