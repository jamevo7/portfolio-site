"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * "Quantum fluctuation" layer for the hero: full grid cells momentarily light
 * up — fade in, hold, fade out — sometimes seeding a neighbour of an already-lit
 * cell so fluctuations cluster over time (never two in the same instant).
 *
 * Alignment: the lit cells live on the SAME fixed, viewport-anchored 56px
 * lattice as PageGrid, so they always coincide exactly with the visible
 * gridlines regardless of scroll. A clip-path limits them to the hero's
 * on-screen band. Each cell is a full 56×56 fill. Purely decorative: hidden
 * from assistive tech, nothing under prefers-reduced-motion.
 */

const CELL = 56; // must match PageGrid's backgroundSize
const MAX = 6; // hard cap on concurrent lit cells
const SKIP_TOP_ROWS = 2; // never light the top rows of the hero

// Four shades of the same blue — one is picked at random per cell.
const COLORS = [
  "bg-sky-300 dark:bg-sky-200",
  "bg-sky-400 dark:bg-sky-300",
  "bg-sky-500 dark:bg-sky-400",
  "bg-cyan-400 dark:bg-cyan-300",
];

type Region = { colMax: number; rowMin: number; rowMax: number };
type Cell = { id: number; x: number; y: number; color: string };

export function QuantumGrid() {
  const reduce = useReducedMotion();
  const probeRef = React.useRef<HTMLDivElement>(null);
  const idRef = React.useRef(0);
  const cellsRef = React.useRef<Cell[]>([]);
  const regionRef = React.useRef<Region>({ colMax: 0, rowMin: SKIP_TOP_ROWS, rowMax: -1 });
  const [clip, setClip] = React.useState("inset(0 0 100% 0)");
  const [cells, setCells] = React.useState<Cell[]>([]);

  // Track the hero's on-screen rectangle → clip band + spawnable cell range,
  // both expressed in fixed viewport-grid coordinates.
  React.useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const measure = () => {
      const el = probeRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const top = Math.max(r.top, 0);
      const bottom = Math.min(r.bottom, vh);
      setClip(`inset(${top}px 0px ${Math.max(vh - bottom, 0)}px 0px)`);
      regionRef.current = {
        colMax: Math.floor(vw / CELL) - 1,
        rowMin: Math.ceil(top / CELL) + SKIP_TOP_ROWS,
        rowMax: Math.floor(bottom / CELL) - 1,
      };
    };
    const onChange = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange);
    const ro = new ResizeObserver(onChange);
    if (probeRef.current) ro.observe(probeRef.current);
    return () => {
      window.removeEventListener("scroll", onChange);
      window.removeEventListener("resize", onChange);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  // Spawn loop: one cell at a time. ~25% land next to an existing cell
  // (clustering); those carry extra delay so two never pop in together.
  React.useEffect(() => {
    if (reduce) return;
    let timer: number;
    const spawn = () => {
      const region = regionRef.current;
      const prev = cellsRef.current;
      let extra = 0;
      const usable = region.rowMax >= region.rowMin && region.colMax >= 0;
      if (usable && prev.length < MAX) {
        const adj =
          prev.length > 0 && Math.random() < 0.25
            ? adjacentToExisting(prev, region, idRef)
            : null;
        const cell = adj ?? randomCell(region, idRef);
        if (adj) extra = 700; // keep clustered spawns from appearing in sync
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
      {/* In-flow probe: measures the hero's on-screen rect. */}
      <div ref={probeRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10" />
      {/* Fixed, viewport-aligned cell layer clipped to the hero band. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ clipPath: clip }}
      >
        <AnimatePresence>
          {cells.map((c) => (
            <motion.span
              key={c.id}
              className={`absolute ${c.color}`}
              style={{
                left: c.x * CELL,
                top: c.y * CELL,
                width: CELL,
                height: CELL,
              }}
              initial={{ opacity: 0 }}
              // fade-in 0.8s · hold ~1.2s · fade-out 2s (total 4s)
              animate={{ opacity: [0, 0.12, 0.12, 0] }}
              transition={{ duration: 4, times: [0, 0.2, 0.5, 1], ease: "easeInOut" }}
              onAnimationComplete={() => remove(c.id)}
            />
          ))}
        </AnimatePresence>
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

function randomCell(region: Region, idRef: React.MutableRefObject<number>): Cell {
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
