import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  description:
    "The Lanshore blog on Agentic SPM: agentic AI in sales performance management, platform selection, territory design, and dispute management.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog: Agentic AI & Sales Performance Management | Lanshore",
    description:
      "The Lanshore blog on Agentic SPM: agentic AI in sales performance management, platform selection, territory design, and dispute management.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            Blog
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">
            Agentic SPM, in writing
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/75">
            Practitioner writing on agentic AI, comp operations, and sales performance
            management from the Lanshore team.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="space-y-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-lg border border-line p-6 hover:border-accent"
            >
              <h2 className="text-xl font-bold text-ink group-hover:text-accent">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-muted">{post.description}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-accent">
                Read the post →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
