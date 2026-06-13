"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type Fact = { label: string; value: string };
type Segment = { text: string; className?: string };

/** "Based in" -> "based_in" so facts read like JSON claim keys. */
function toKey(label: string) {
  return label.trim().toLowerCase().replace(/\s+/g, "_");
}

const MUTED = "text-muted-foreground";
const KEY = "text-sky-600 dark:text-sky-400";
const STRING = "text-foreground";
const NUM = "text-blue-700 dark:text-blue-400";
const OK = "text-emerald-600 dark:text-emerald-400";

/** Build the colored token stream for the decoded auth payload. */
function buildSegments(facts: readonly Fact[]): Segment[] {
  const segs: Segment[] = [
    { text: "200 OK", className: OK },
    { text: " · verified\n", className: MUTED },
    { text: "{\n", className: MUTED },
  ];

  for (const f of facts) {
    segs.push({ text: "  ", className: MUTED });
    segs.push({ text: `"${toKey(f.label)}"`, className: KEY });
    segs.push({ text: ": ", className: MUTED });
    segs.push({ text: `"${f.value}"`, className: STRING });
    segs.push({ text: ",\n", className: MUTED });
  }

  segs.push({ text: "  ", className: MUTED });
  segs.push({ text: '"verified"', className: KEY });
  segs.push({ text: ": ", className: MUTED });
  segs.push({ text: "true", className: NUM });
  segs.push({ text: "\n", className: MUTED });
  segs.push({ text: "}", className: MUTED });

  return segs;
}

/**
 * Renders the bio's quick facts as a "decoded" API auth response that types
 * itself out character-by-character on scroll — an identity-engineering motif.
 * Falls back to the full static payload under prefers-reduced-motion.
 */
export function IdentityCard({ facts }: { facts: readonly Fact[] }) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const segments = React.useMemo(() => buildSegments(facts), [facts]);
  const total = React.useMemo(
    () => segments.reduce((n, s) => n + s.text.length, 0),
    [segments]
  );

  const [revealed, setRevealed] = React.useState(0);
  const done = revealed >= total;

  React.useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setRevealed(total);
      return;
    }

    let raf = 0;
    const start = performance.now();
    // ~22ms/char, clamped so short and long payloads both feel natural.
    const duration = Math.min(2600, Math.max(1000, total * 22));
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setRevealed(Math.floor(t * total));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setRevealed(total);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, total]);

  // Walk the token stream and render only the revealed prefix.
  let consumed = 0;
  const rendered = segments.map((s, i) => {
    const remaining = revealed - consumed;
    consumed += s.text.length;
    if (remaining <= 0) return null;
    const shown =
      remaining >= s.text.length ? s.text : s.text.slice(0, remaining);
    return (
      <span key={i} className={s.className}>
        {shown}
      </span>
    );
  });

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-2.5">
        <span className="size-3 rounded-full bg-red-400/80" />
        <span className="size-3 rounded-full bg-amber-400/80" />
        <span className="size-3 rounded-full bg-emerald-400/80" />
        <span className="ml-2 truncate font-mono text-xs text-muted-foreground">
          GET /about/james.vo
        </span>
      </div>

      {/* Decoded payload, typed out */}
      <div
        ref={ref}
        className="whitespace-pre-wrap p-5 font-mono text-[13px] leading-relaxed"
      >
        {rendered}
        {!reduce && (
          <motion.span
            aria-hidden
            animate={{ opacity: done ? [1, 0] : 1 }}
            transition={
              done
                ? { duration: 0.8, repeat: Infinity, repeatType: "reverse" }
                : { duration: 0 }
            }
            className="ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[2px] bg-primary"
          />
        )}
      </div>
    </div>
  );
}
