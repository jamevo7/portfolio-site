import type { Metadata } from "next";
import Link from "next/link";

import { formatPostDate, getAllPosts } from "@/lib/blog";
import { SECTION_SHELL } from "@/lib/section";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on identity, security, and building useful things.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    // pt-16 clears the fixed nav (this page has no hero to provide the offset).
    <div className="pt-16">
      <section>
        <div className={SECTION_SHELL}>
          <SectionHeading
            eyebrow="Blog"
            title="Writing"
            description="Notes on identity, security, and building useful things."
          />

          {posts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border/80 bg-muted/20 px-6 py-16 text-center">
              <p className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
                No posts yet
              </p>
              <p className="mt-2 text-muted-foreground">
                Check back soon — writing is on the way.
              </p>
            </div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <Card className="flex h-full flex-col p-6 transition-shadow hover:shadow-md">
                      <p className="font-mono text-xs uppercase tracking-wider text-primary/70">
                        {formatPostDate(post.date)}
                      </p>
                      <h2 className="mt-2 font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
