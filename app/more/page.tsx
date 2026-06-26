import type { Metadata } from "next";

import { Community } from "@/components/sections/community";

export const metadata: Metadata = {
  title: "More",
  description: "Beyond the work — community, interests, and what matters to James Vo.",
};

export default function MorePage() {
  // pt-16 clears the fixed nav (this route has no hero to provide the offset).
  return (
    <div className="pt-16">
      <Community />
    </div>
  );
}
