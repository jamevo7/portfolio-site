import { Fragment } from "react";

/**
 * Full-bleed marquee of quotes that separates the hero from the About (01)
 * section. CSS-animated (cheap, pauses on hover, disabled by motion-reduce);
 * the list is duplicated so the -50% translate loops seamlessly.
 *
 * Placeholder copy for now — swap `quotes` for real testimonials + attribution.
 */

type Quote = { text: string; by: string };

const quotes: Quote[] = [
  { text: "Turned a vague idea into production in a week", by: "Placeholder · PM" },
  { text: "The most reliable engineer I've worked with", by: "Placeholder · Eng Lead" },
  { text: "Cut our onboarding time in half", by: "Placeholder · Customer" },
  { text: "Sweats the details everyone else skips", by: "Placeholder · Designer" },
  { text: "Made our identity integration painless", by: "Placeholder · CTO" },
  { text: "Ships, then makes it better", by: "Placeholder · Teammate" },
];

export function QuoteStrip() {
  // Duplicated so translateX(-50%) lands exactly one copy over — seamless loop.
  const loop = [...quotes, ...quotes];

  return (
    <section
      aria-hidden
      className="overflow-hidden border-y bg-muted/30 py-3"
    >
      <div className="flex w-max items-center animate-[marquee_49.5s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none">
        {loop.map((q, i) => (
          <Fragment key={i}>
            <span className="whitespace-nowrap px-6 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {q.text}
              <span className="ml-2 text-foreground/40">— {q.by}</span>
            </span>
            <span className="text-brand-amber/70">◆</span>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
