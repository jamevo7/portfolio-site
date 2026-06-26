import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";

import { formatPostDate, getPost, getPostSlugs } from "@/lib/blog";
import { mdxComponents } from "@/components/mdx-components";

type Params = { params: Promise<{ slug: string }> };

// Only real post files are valid routes; unknown slugs 404 statically.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.meta.title, description: post.meta.excerpt };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    // Top padding clears the fixed nav (no hero on this route).
    <article className="mx-auto max-w-2xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Blog
      </Link>

      <p className="mt-8 font-mono text-xs uppercase tracking-wider text-primary/70">
        {formatPostDate(post.meta.date)}
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        {post.meta.title}
      </h1>

      <div className="mt-8">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  );
}
