import { describe, expect, it } from "vitest";

import { projects } from "@/lib/data";
import {
  isResumeSection,
  pickSections,
  toJsonResume,
  toPlainText,
} from "@/lib/resume";

describe("resume serialization", () => {
  it("uses the same identity data the site renders", () => {
    const resume = toJsonResume();
    expect(resume.basics.name).toBe("James Vo");
    expect(resume.work.length).toBeGreaterThan(0);
  });

  it("only serializes real projects — placeholders never reach the API", () => {
    const realTitles = projects
      .filter((p) => p.real)
      .map((p) => p.title)
      .sort();
    const apiTitles = toJsonResume()
      .projects.map((p) => p.name)
      .sort();
    expect(apiTitles).toEqual(realTitles);
  });

  it("never leaks placeholder copy into JSON or plain text", () => {
    // The dummy project entries' descriptions start with "Placeholder"; the
    // real-only filter must keep that out of every serialized form.
    expect(JSON.stringify(toJsonResume())).not.toContain("Placeholder");
    expect(toPlainText()).not.toContain("Placeholder");
  });

  it("renders the core plain-text sections", () => {
    const txt = toPlainText();
    expect(txt).toContain("EXPERIENCE");
    expect(txt).toContain("SKILLS");
  });
});

describe("section filtering", () => {
  it("validates section names", () => {
    expect(isResumeSection("work")).toBe(true);
    expect(isResumeSection("bogus")).toBe(false);
  });

  it("returns only the requested sections (plus meta)", () => {
    const picked = pickSections(["work", "skills"]);
    expect(picked.work).toBeDefined();
    expect(picked.skills).toBeDefined();
    expect(picked.education).toBeUndefined();
    expect(picked.meta).toBeDefined();
  });
});
