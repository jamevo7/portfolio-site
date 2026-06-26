import type { Metadata } from "next";

import { About } from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "A bit about James Vo — background in identity, security, and customer success.",
};

export default function AboutPage() {
  // pt-16 clears the fixed nav (this route has no hero to provide the offset).
  return (
    <div className="pt-16">
      <About />
    </div>
  );
}
