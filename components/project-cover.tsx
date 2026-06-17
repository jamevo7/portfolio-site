import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type ProjectCoverProps = {
  /** 1-based position; rendered as a zero-padded schematic index (01, 02…). */
  index: number;
  tag?: string;
  icon?: LucideIcon;
  /** Warm, handwritten-feel margin note — the human annotation on the drawing. */
  note?: string;
  className?: string;
};

/**
 * Blueprint-style project cover: a schematic "engineering drawing" that stands
 * in for a screenshot. Cool, technical scaffolding (grid, registration marks,
 * mono index) carries a single warm amber margin note — the "cool structure,
 * warm content" brand principle expressed as one object. Purely decorative.
 */
export function ProjectCover({
  index,
  tag,
  icon: Icon,
  note,
  className,
}: ProjectCoverProps) {
  const idx = String(index).padStart(2, "0");

  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden border-b bg-card",
        className
      )}
    >
      {/* Fine blueprint grid, tinted with the blue base. */}
      <div
        className="absolute inset-0 text-primary/[0.10] dark:text-primary/[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Soft diagonal wash for depth. */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.07] via-transparent to-transparent" />

      {/* Corner registration brackets — technical drawing framing. */}
      <span className="absolute left-2.5 top-2.5 size-3 border-l border-t border-primary/30" />
      <span className="absolute right-2.5 top-2.5 size-3 border-r border-t border-primary/30" />
      <span className="absolute bottom-2.5 left-2.5 size-3 border-b border-l border-primary/30" />
      <span className="absolute bottom-2.5 right-2.5 size-3 border-b border-r border-primary/30" />

      {/* Schematic glyph + dashed construction ring, centered. */}
      <span className="absolute left-1/2 top-1/2 size-[7.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary/15" />
      {Icon && (
        <Icon
          strokeWidth={1}
          className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 text-primary/25"
        />
      )}

      {/* Mono index + domain tag — top-left (aligned to the card's p-5 inset). */}
      <div className="absolute left-5 top-4 font-mono text-xs tracking-wider text-primary/70">
        {idx}
        {tag ? <span className="text-primary/45"> — {tag}</span> : null}
      </div>

      {/* Warm handwritten-feel margin note + hand-drawn arrow — bottom-left. */}
      {note && (
        <div className="absolute bottom-4 left-5 flex items-end gap-1.5">
          <HandArrow className="mb-1 text-brand-amber/80" />
          <span className="-rotate-2 font-script text-lg leading-none text-brand-amber">
            {note}
          </span>
        </div>
      )}
    </div>
  );
}

/** A small, slightly-wobbly arrow that reads as a hand annotation. */
function HandArrow({ className }: { className?: string }) {
  return (
    <svg
      width="26"
      height="18"
      viewBox="0 0 26 18"
      fill="none"
      className={className}
    >
      <path
        d="M1 14c5 0 8-5 13-7 4-1.5 7-2 11-3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M19 2.5 24.5 4 21.5 8.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
