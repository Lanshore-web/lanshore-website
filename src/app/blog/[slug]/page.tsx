import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { BLOG_POSTS, getPost, type BlogBlock } from "@/lib/blog";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
    },
  };
}

/* Group consecutive li blocks into lists so they render as real <ul>s. */
function groupBlocks(blocks: BlogBlock[]) {
  const groups: ({ type: "h2" | "h3" | "p"; text: string } | { type: "ul"; items: string[] })[] =
    [];
  for (const block of blocks) {
    if (block.type === "li") {
      const last = groups[groups.length - 1];
      if (last && last.type === "ul") {
        last.items.push(block.text);
      } else {
        groups.push({ type: "ul", items: [block.text] });
      }
    } else {
      groups.push({ type: block.type, text: block.text });
    }
  }
  return groups;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ])}
      />
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            Blog
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">{post.title}</h1>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        {groupBlocks(post.blocks).map((group, i) => {
          if (group.type === "ul") {
            return (
              <ul key={i} className="my-4 list-disc space-y-2 pl-6 text-muted">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          }
          if (group.type === "h2") {
            return (
              <h2 key={i} className="mt-10 mb-3 text-2xl font-bold text-ink">
                {group.text}
              </h2>
            );
          }
          if (group.type === "h3") {
            return (
              <h3 key={i} className="mt-8 mb-2 text-xl font-bold text-ink">
                {group.text}
              </h3>
            );
          }
          return (
            <p key={i} className="my-4 text-foreground">
              {group.text}
            </p>
          );
        })}

        <p className="mt-12 border-t border-line pt-6 text-muted">
          See how this works in practice:{" "}
          <Link href="/agentic-spm/executive-dashboards" className="font-semibold text-accent">
            Executive Dashboards
          </Link>
          ,{" "}
          <Link href="/agentic-spm/operations" className="font-semibold text-accent">
            SPM Operations
          </Link>
          , and{" "}
          <Link href="/agentic-spm/custom-apps" className="font-semibold text-accent">
            Custom Apps
          </Link>{" "}
          — the three pillars of Agentic SPM by Lanshore.
        </p>
      </article>

      <CtaBand />
    </>
  );
}
