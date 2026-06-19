/**
 * Page-wide ambient aurora. A handful of soft, heavily-blurred blue blobs
 * spread down the full document height, so the glow carries past the hero into
 * the otherwise-empty lower sections. Densest in the name/intro band up top and
 * deliberately sparse below to preserve breathing room.
 *
 * Sits behind the blueprint grid (PageGrid) and all content; purely
 * decorative and hidden from assistive tech. The hero keeps its own *animated*
 * aurora (HeroBackdrop); this layer is static for calm and performance.
 *
 * Tuning: nudge each blob's `top`/side offset to sit in a given section, or
 * raise/lower the `/NN` opacity suffix to make the wash bolder/subtler. All
 * blue per the brand base — primary + blue tints only, no other hues.
 */

// Positioned as a fraction of the full document height, alternating sides so
// the glow weaves down the page rather than stacking in one column.
const blobs = [
  // intro — two overlapping blobs concentrate the wash behind the name/hero
  "right-[6%] top-[5%] size-[460px] bg-primary/25",
  "left-[-6%] top-[12%] size-[420px] bg-blue-500/18",
  // about / quote strip — right
  "right-[2%] top-[32%] size-[400px] bg-blue-600/14",
  // projects / skills — left
  "left-[2%] top-[52%] size-[420px] bg-primary/13",
  // contact — right
  "right-[8%] top-[74%] size-[380px] bg-blue-600/14",
  // bottom-left — a stronger anchor so the lower-left corner isn't bare
  "left-[-8%] top-[88%] size-[480px] bg-primary/16",
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
