"use client";

import * as React from "react";

import { GRID_CELL as CELL } from "@/lib/grid";

/**
 * "Quantum fluctuation" layer for the hero: grid cells momentarily light up —
 * fade in, hold, fade out — sometimes seeding a neighbour of an already-lit cell
 * so fluctuations cluster over time.
 *
 * Performance / alignment: the lit cells render in a *fixed*, viewport-anchored
 * layer — the same reference frame as PageGrid — so they stay locked to the
 * blueprint lattice and never slide while you scroll (the earlier `absolute`
 * version scrolled with the hero and drifted off the fixed gridlines mid-fade).
 * A separate, empty in-hero sentinel is measured (ResizeObserver) and watched
 * (IntersectionObserver) only to size the spawn region and idle the loop once
 * the hero leaves view — so there's still no scroll listener, no per-frame
 * `getBoundingClientRect`, and no clip-path. Cells are plain divs animated by a
 * CSS keyframe (`quantum-fade` in globals.css) and removed on `animationend`,
 * so there's no animation-library runtime either. Purely decorative; disabled
 * under prefers-reduced-motion.
 */

const MAX = 6; // hard cap on concurrent lit cells
const SKIP_TOP_ROWS = 2; // never light the rows under the nav

// Four shades of the same blue — one is picked at random per cell.
const COLORS = [
  "bg-sky-300 dark:bg-sky-200",
  "bg-sky-400 dark:bg-sky-300",
  "bg-sky-500 dark:bg-sky-400",
  "bg-cyan-400 dark:bg-cyan-300",
];

type Region = { colMax: number; rowMin: number; rowMax: number };
type Cell = { id: number; x: number; y: number; color: string };

function usePrefersReducedMotion() {
  const [reduce, setReduce] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduce;
}

export function QuantumGrid() {
  const reduce = usePrefersReducedMotion();
  const layerRef = React.useRef<HTMLDivElement>(null);
  const regionRef = React.useRef<Region>({
    colMax: 0,
    rowMin: SKIP_TOP_ROWS,
    rowMax: -1,
  });
  const visibleRef = React.useRef(true);
  const idRef = React.useRef(0);
  const cellsRef = React.useRef<Cell[]>([]);
  const [cells, setCells] = React.useState<Cell[]>([]);

  // Measure the hero's cell grid once (and on resize) — no scroll work.
  React.useEffect(() => {
    if (reduce) return;
    const el = layerRef.current;
    if (!el) return;
    const measure = () => {
      regionRef.current = {
        colMax: Math.floor(el.clientWidth / CELL) - 1,
        rowMin: SKIP_TOP_ROWS,
        rowMax: Math.floor(el.clientHeight / CELL) - 1,
      };
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    // Idle the spawn loop while the hero is scrolled out of view.
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { rootMargin: "0px" }
    );
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, [reduce]);

  // Spawn loop: one cell at a time, ~25% adjacent to an existing one.
  React.useEffect(() => {
    if (reduce) return;
    let timer: number;
    const spawn = () => {
      const region = regionRef.current;
      const prev = cellsRef.current;
      let extra = 0;
      const usable =
        visibleRef.current &&
        region.rowMax >= region.rowMin &&
        region.colMax >= 0;
      if (usable && prev.length < MAX) {
        const adj =
          prev.length > 0 && Math.random() < 0.25
            ? adjacentToExisting(prev, region, idRef)
            : null;
        const cell = adj ?? randomCell(region, idRef);
        if (adj) extra = 700; // de-sync clustered spawns
        const updated = [...prev, cell].slice(0, MAX);
        cellsRef.current = updated;
        setCells(updated);
      }
      timer = window.setTimeout(spawn, 900 + Math.random() * 900 + extra);
    };
    timer = window.setTimeout(spawn, 600);
    return () => window.clearTimeout(timer);
  }, [reduce]);

  if (reduce) return null;

  const remove = (id: number) => {
    cellsRef.current = cellsRef.current.filter((c) => c.id !== id);
    setCells(cellsRef.current);
  };

  return (
    <>
      {/* Empty sentinel in the hero's flow — measured (ResizeObserver) and
          visibility-watched (IntersectionObserver) only; renders nothing. */}
      <div
        ref={layerRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      />
      {/* Lit cells live in a fixed, viewport-anchored layer (same frame as
          PageGrid) so they stay on the blueprint lattice and don't move when
          the page scrolls. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        {cells.map((c) => (
          <div
            key={c.id}
            className={`absolute ${c.color}`}
            style={{
              left: c.x * CELL,
              top: c.y * CELL,
              width: CELL,
              height: CELL,
              opacity: 0,
              animation: "quantum-fade 4s ease-in-out forwards",
            }}
            onAnimationEnd={() => remove(c.id)}
          />
        ))}
      </div>
    </>
  );
}

function rand(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function pickColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function randomCell(
  region: Region,
  idRef: React.MutableRefObject<number>
): Cell {
  return {
    id: idRef.current++,
    x: rand(0, region.colMax),
    y: rand(region.rowMin, region.rowMax),
    color: pickColor(),
  };
}

function adjacentToExisting(
  prev: Cell[],
  region: Region,
  idRef: React.MutableRefObject<number>
): Cell | null {
  const anchor = prev[Math.floor(Math.random() * prev.length)];
  const occupied = new Set(prev.map((c) => `${c.x},${c.y}`));
  const free = (
    [
      [anchor.x + 1, anchor.y],
      [anchor.x - 1, anchor.y],
      [anchor.x, anchor.y + 1],
      [anchor.x, anchor.y - 1],
    ] as const
  ).filter(
    ([x, y]) =>
      x >= 0 &&
      x <= region.colMax &&
      y >= region.rowMin &&
      y <= region.rowMax &&
      !occupied.has(`${x},${y}`)
  );
  if (free.length === 0) return null;
  const [x, y] = free[Math.floor(Math.random() * free.length)];
  return { id: idRef.current++, x, y, color: pickColor() };
}
