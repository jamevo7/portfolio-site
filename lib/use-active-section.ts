"use client";

import * as React from "react";

/**
 * Scroll-spy: given a list of in-page anchor hrefs (e.g. ["#about", "#work"]),
 * returns the href of the section currently nearest the top of the viewport, or
 * "" when none are in the active band (e.g. scrolled above the first section).
 *
 * Extracted from the nav so the home page and project pages share one
 * implementation. The href list is keyed by value, so passing a fresh array each
 * render is fine and the observer re-binds when the set actually changes (e.g. on
 * a route change from home → project page).
 */
export function useActiveSection(hrefs: string[]): string {
  const [active, setActive] = React.useState("");
  const key = hrefs.join("|");

  React.useEffect(() => {
    const ids = key.split("|").filter(Boolean);
    const sections = ids
      .map((h) => document.querySelector(h))
      .filter((el): el is Element => el !== null);
    if (sections.length === 0) {
      setActive("");
      return;
    }

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
  }, [key]);

  return active;
}
