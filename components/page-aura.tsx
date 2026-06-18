/**
 * Page-wide ambient aurora. A handful of soft, heavily-blurred colour blobs
 * spread down the full document height, so the blue→violet→pink glow carries
 * past the hero into the otherwise-empty lower sections. Deliberately sparse
 * and low-opacity to preserve breathing room (~⅓ of the page stays clean).
 *
 * Sits behind the blueprint grid (PageGrid) and all content; purely
 * decorative and hidden from assistive tech. The hero keeps its own *animated*
 * aurora (HeroBackdrop); this layer is static for calm and performance.
 *
 * Tuning: nudge each blob's `top`/side offset to sit in a given section, or
 * raise/lower the `/NN` opacity suffix to make the wash bolder/subtler.
 *
 * NOTE: violet/fuchsia are not yet defined brand tokens — they're used here at
 * low opacity per the "blue/pinkish" experiment and should be reconciled with
 * the Brand Hub palette before this ships.
 */

// Positioned as a fraction of the full document height, alternating sides so
// the glow weaves down the page rather than stacking in one column.
const blobs = [
  // upper-right — balances the hero's left-anchored name
  "right-[6%] top-[9%] size-[420px] bg-primary/20",
  // about / quote strip — violet, bleeding off the left edge
  "left-[-5%] top-[25%] size-[460px] bg-violet-500/15",
  // projects — blue, right
  "right-[2%] top-[43%] size-[400px] bg-blue-600/15",
  // community / skills — pink, left
  "left-[4%] top-[61%] size-[440px] bg-fuchsia-500/12",
  // contact — primary, right
  "right-[8%] top-[80%] size-[380px] bg-primary/18",
];

export function PageAura() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-[100px] ${blob}`}
        />
      ))}
    </div>
  );
}
