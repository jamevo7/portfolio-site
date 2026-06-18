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
                  className="group relative flex size-4 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {current && !reduce && (
                    <span className="absolute inline-flex size-4 animate-ping rounded-full bg-emerald-500/50 [animation-duration:2.5s]" />
                  )}
                  <span
                    className={cn(
                      "size-3.5 rounded-full ring-2 ring-background transition-all",
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
                  <br />
                  <span className="text-muted-foreground/60">
                    &apos;{node.start.slice(-2)}
                  </span>
                </span>
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
