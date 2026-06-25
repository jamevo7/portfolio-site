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
//
// Each blob is a soft *radial gradient* rather than a blurred solid. Visually
// near-identical to a heavy `blur-[100px]` circle, but it skips the filter
// pipeline entirely — six full-page blur filters were the page's biggest paint
// cost and the main source of scroll lag. Gradients paint cheaply and compose
// for free. Colors are CSS-var driven so the wash still adapts to light/dark.
const blobs = [
  // intro — two overlapping blobs concentrate the wash behind the name/hero
  { pos: "right-[6%] top-[5%]", size: 460, color: "var(--primary)", alpha: 25 },
  { pos: "left-[-6%] top-[12%]", size: 420, color: "#3b82f6", alpha: 18 },
  // about / quote strip — right
  { pos: "right-[2%] top-[32%]", size: 400, color: "#2563eb", alpha: 14 },
  // projects / skills — left
  { pos: "left-[2%] top-[52%]", size: 420, color: "var(--primary)", alpha: 13 },
  // contact — right
  { pos: "right-[8%] top-[74%]", size: 380, color: "#2563eb", alpha: 14 },
  // bottom-left — a stronger anchor so the lower-left corner isn't bare
  { pos: "left-[-8%] top-[88%]", size: 480, color: "var(--primary)", alpha: 16 },
];

export function PageAura() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {blobs.map((b, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${b.pos}`}
          style={{
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle, color-mix(in oklch, ${b.color} ${b.alpha}%, transparent) 0%, transparent 70%)`,
          }}
        />
      ))}
    </div>
  );
}
