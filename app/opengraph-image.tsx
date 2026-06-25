import { ImageResponse } from "next/og";

import { profile } from "@/lib/data/profile";

// Branded social-share card (Open Graph + Twitter both use this). Rendered at
// build time as a static PNG. Kept self-contained — imports only `profile`, not
// the data barrel, so the image runtime stays lean.
export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#0a0f1e";
const PRIMARY = "#3b5bdb";
const AMBER = "#e0a24e";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: NAVY,
          // Blueprint grid — same motif as the site's PageGrid.
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row: brand mark + site handle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              border: `5px solid ${PRIMARY}`,
            }}
          />
          <div style={{ display: "flex", fontSize: 26, color: "#94a3b8" }}>
            jamesvo.dev
          </div>
        </div>

        {/* Name + title */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 700 }}>
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 12,
              fontSize: 38,
              color: "#cbd5e1",
            }}
          >
            {profile.title}
          </div>
        </div>

        {/* Bottom: tagline with an amber accent rule */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 96, height: 5, background: AMBER }} />
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 28,
              color: "#94a3b8",
            }}
          >
            {profile.tagline}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
