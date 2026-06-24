"use client";

import * as React from "react";
import { ChevronUp, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Nav() {
  const [active, setActive] = React.useState<string>("");
  const [mounted, setMounted] = React.useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null);
    if (sections.length === 0) return;

    // Track each section's state so we can correctly clear active when
    // none are in view (e.g. scrolled back to the top past all sections).
    const intersecting = new Map<Element, boolean>(
      sections.map((s) => [s, false])
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => intersecting.set(e.target, e.isIntersecting));
        const visible = sections.filter((s) => intersecting.get(s));
        if (visible.length === 0) {
          setActive("");
          return;
        }
        const top = visible.reduce((a, b) =>
          a.getBoundingClientRect().top < b.getBoundingClientRect().top ? a : b
        );
        setActive(`#${top.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Same layout and spacing at every width — the px-4 sm:px-6 padding
          matches SECTION_SHELL so the nav edges align with the content column,
          and the flexible center gap (ml-auto) absorbs all the size difference
          rather than compressing the items themselves. */}
      <nav className="mx-auto flex h-16 max-w-5xl items-center px-4 sm:px-6">
        {/* Back to top — left side */}
        <a
          href="#top"
          aria-label="Back to top"
          className="flex size-9 shrink-0 items-center justify-center rounded-md border border-primary bg-white text-primary opacity-50 shadow-sm transition-opacity hover:opacity-75"
        >
          <ChevronUp className="size-4" />
        </a>

        {/* Nav links + theme toggle, right-aligned */}
        <div className="ml-auto flex items-center gap-1.5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "true" : undefined}
              className={cn(
                "shrink-0 whitespace-nowrap px-2 py-2 font-mono text-sm font-medium tracking-wider transition-colors",
                active !== "" && active !== link.href
                  ? "text-primary/50 hover:text-primary"
                  : "text-primary"
              )}
            >
              {link.label}
            </a>
          ))}

          {/* Theme toggle — navy matches the hero "Get in touch" CTA */}
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary text-white shadow-sm transition-opacity hover:opacity-90"
          >
            {mounted && isDark ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
