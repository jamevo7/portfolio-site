import { GRID_CELL } from "@/lib/grid";

/**
 * Page-wide "blueprint" grid. A single fixed, viewport-filling layer that sits
 * behind all content so the grid stays perfectly consistent as the page
 * scrolls. `currentColor` drives the line tint, so it adapts to light/dark
 * automatically. Purely decorative — hidden from assistive tech.
 */
export function PageGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 text-foreground/[0.06] dark:text-foreground/[0.045]"
      style={{
        backgroundImage:
          "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
        backgroundSize: `${GRID_CELL}px ${GRID_CELL}px`,
      }}
    />
  );
}
