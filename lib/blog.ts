/**
 * Filesystem-backed blog source. Posts are MDX files in `content/blog/*.mdx`
 * with YAML frontmatter (title, date, excerpt, tags). This module reads them at
 * build time (server-only — uses `fs`) for the index and the per-post pages.
 *
 * Adding a post = drop a new `.mdx` file in `content/blog/`. No code changes.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  excerpt: string;
  tags?: string[];
};

function mdxFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
}

function toMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
  };
}

/** All posts, newest first. */
export function getAllPosts(): PostMeta[] {
  return mdxFiles()
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf8"));
      return toMeta(slug, data);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs(): string[] {
  return mdxFiles().map((f) => f.replace(/\.mdx$/, ""));
}

/** A single post's metadata + raw MDX body (frontmatter stripped). */
export function getPost(
  slug: string
): { meta: PostMeta; content: string } | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { meta: toMeta(slug, data), content };
}

/** "2026-06-26" → "June 26, 2026"; passes through anything unparseable. */
export function formatPostDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
}
