"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronUp, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { navLinks, getProjectBySlug } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/lib/use-active-section";

type NavItem = { label: string; href: string; truncate?: boolean };

export function Nav() {
  const pathname = usePathname();
  const project = pathname?.startsWith("/work/")
    ? getProjectBySlug(pathname.slice("/work/".length))
    : undefined;
  const isProject = !!project;

  // On a project page the nav becomes project-scoped: the section anchors
  // change, and the back-to-top caret becomes a back-to-home caret.
  const links: NavItem[] = isProject
    ? [
        { label: project.navProblemLabel, href: "#problem", truncate: true },
        { label: "Impact", href: "#impact" },
        { label: "Preview", href: "#preview" },
      ]
    : navLinks.map((l) => ({ label: l.label, href: l.href }));

  const active = useActiveSection(links.map((l) => l.href));
  const [mounted, setMounted] = React.useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  React.useEffect(() => setMounted(true), []);

  const caretClass =
    "flex size-9 shrink-0 items-center justify-center rounded-md border border-primary bg-card text-primary opacity-50 shadow-sm transition-opacity hover:opacity-75";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Same layout and spacing at every width — px-4 sm:px-6 matches the
          content column so the nav edges stay flush with the page below it. */}
      <nav className="mx-auto flex h-16 max-w-5xl items-center px-4 sm:px-6">
        {/* Left caret: back-to-home on a project page, back-to-top on home. */}
        {isProject ? (
          <Link
            href="/#projects"
            aria-label="Back to projects"
            className={caretClass}
          >
            <ChevronLeft className="size-4" />
          </Link>
        ) : (
          <a href="#top" aria-label="Back to top" className={caretClass}>
            <ChevronUp className="size-4" />
          </a>
        )}

        {/* Section links + theme toggle, right-aligned. */}
        <div className="ml-auto flex min-w-0 items-center gap-1.5">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "true" : undefined}
              className={cn(
                "whitespace-nowrap px-2 py-2 font-mono text-sm font-medium tracking-wider transition-colors",
                // The literal problem phrase can be long — let it ellipsize on
                // small screens; everything else holds its full width.
                link.truncate
                  ? "min-w-0 max-w-[42vw] truncate sm:max-w-none"
                  : "shrink-0",
                active !== "" && active !== link.href
                  ? "text-primary/50 hover:text-primary"
                  : "text-primary"
              )}
            >
              {link.label}
            </a>
          ))}

          {/* Theme toggle — navy matches the hero "Get in touch" CTA. */}
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
