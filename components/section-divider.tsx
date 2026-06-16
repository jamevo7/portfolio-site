/**
 * Decorative dotted rule between page sections. Spans the content column so the
 * separators line up with section padding. Purely visual — hidden from a11y tree.
 */
export function SectionDivider() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6" aria-hidden="true">
      <div className="border-t border-dotted border-border/70" />
    </div>
  );
}
