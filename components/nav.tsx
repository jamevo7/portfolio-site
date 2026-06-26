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

const LINK_BASE =
  "whitespace-nowrap px-2 py-2 font-mono text-sm font-medium tracking-wider transition-colors";

export function Nav() {
  const pathname = usePathname() ?? "/";
  const project = pathname.startsWith("/work/")
    ? getProjectBySlug(pathname.slice("/work/".length))
    : undefined;
  const isProject = !!project;

  // Scroll-spy runs only where there are in-page anchors: a project page (its
  // Problem/Impact/Preview sections) and the home page (Work sits below the
  // hero). Other routes navigate via the route links and need no spy.
  const spyHrefs = isProject
    ? ["#problem", "#impact", "#preview"]
    : pathname === "/"
      ? ["#projects"]
      : [];
  const sectionActive = useActiveSection(spyHrefs);

  // JV mark is full strength only at the very top of the landing page; it dims
  // once you scroll into Work, or on any other route.
  const atLandingTop = pathname === "/" && sectionActive === "";

  // Project pages show in-page anchors; everywhere else shows the route links.
  const projectLinks: NavItem[] = project
    ? [
        { label: project.navProblemLabel, href: "#problem", truncate: true },
        { label: "Impact", href: "#impact" },
        { label: "Preview", href: "#preview" },
      ]
    : [];

  const isRouteActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
      <nav className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6">
        {/* Left group: back caret + JV mark. */}
        <div className="flex items-center gap-1.5">
          {/* Caret: back to Work on a project page, back to top elsewhere. */}
          {isProject ? (
            <Link
              href="/#projects"
              aria-label="Back to work"
              className={caretClass}
            >
              <ChevronLeft className="size-4" />
            </Link>
          ) : (
            <a href="#top" aria-label="Back to top" className={caretClass}>
              <ChevronUp className="size-4" />
            </a>
          )}

          {/* Signature wordmark — PLACEHOLDER. Swap the inner text for an animated
              SVG stroke-drawing signature later (gate its own animation behind
              prefers-reduced-motion). Uses Caveat (font-script): a deliberate
              exception to the Brand Hub rule reserving Caveat for amber margin
              notes — confirmed by James for this brand mark. */}
          <Link
            href="/"
            aria-label="James Vo — home"
            data-signature-placeholder
            className={cn(
              "font-script text-2xl font-semibold leading-none text-primary transition-opacity",
              atLandingTop ? "opacity-100" : "opacity-40"
            )}
          >
            JV
          </Link>
        </div>

        {/* Nav links + theme toggle. On non-project pages at md+ the cluster
            spans a fixed width with justify-between so the words spread out; the
            toggle stays anchored at the right edge. */}
        <div
          className={cn(
            "ml-auto mr-1 flex min-w-0 items-center gap-2.5",
            !isProject && "md:w-[19rem] md:justify-between"
          )}
        >
          {isProject
            ? projectLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={sectionActive === link.href ? "true" : undefined}
                  className={cn(
                    LINK_BASE,
                    // The literal problem phrase can be long — ellipsize on small
                    // screens; everything else holds its full width.
                    link.truncate
                      ? "min-w-0 max-w-[42vw] truncate sm:max-w-none"
                      : "shrink-0",
                    sectionActive !== "" && sectionActive !== link.href
                      ? "text-primary/50 hover:text-primary"
                      : "text-primary"
                  )}
                >
                  {link.label}
                </a>
              ))
            : navLinks.map((link) => {
                const activeRoute = isRouteActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={activeRoute ? "page" : undefined}
                    className={cn(
                      LINK_BASE,
                      "shrink-0",
                      activeRoute
                        ? "text-primary"
                        : "text-primary/50 hover:text-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}

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
