import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { UPDATED } from "@/lib/contentDates";
import { PILLARS } from "@/lib/pillars";
import { CASE_STUDIES } from "@/lib/caseStudies";
import { INDUSTRIES } from "@/lib/industries";
import { BLOG_POSTS } from "@/lib/blog";
import { SPM_PLATFORMS } from "@/lib/spmPlatforms";

/* Every entry carries a real <lastmod> — the date that page's content actually
   changed (see lib/contentDates.ts). Deliberately NOT the build date: Google
   only honors lastmod from sites that report it accurately, and a sitemap that
   restamps every URL on every deploy gets the signal discarded wholesale. */
type Entry = { path: string; lastModified: string };

const staticEntries: Entry[] = [
  { path: "", lastModified: UPDATED.home },
  { path: "/agentic-spm/executive-dashboards/demo", lastModified: UPDATED.pillars },
  { path: "/agentic-spm/operations/demo", lastModified: UPDATED.pillars },
  { path: "/agentic-spm/custom-apps/demo", lastModified: UPDATED.pillars },
  { path: "/spm", lastModified: UPDATED.spm },
  { path: "/spm/compare", lastModified: UPDATED.spm },
  { path: "/services", lastModified: UPDATED.services },
  { path: "/services/automation", lastModified: UPDATED.automation },
  { path: "/case-studies", lastModified: UPDATED.caseStudies },
  { path: "/industries", lastModified: UPDATED.industries },
  { path: "/blog", lastModified: UPDATED.blogIndex },
  { path: "/resources", lastModified: UPDATED.resources },
  { path: "/resources/glossary", lastModified: UPDATED.glossary },
  { path: "/about", lastModified: UPDATED.about },
  { path: "/about/why-lanshore", lastModified: UPDATED.whyLanshore },
  { path: "/about/partners", lastModified: UPDATED.partners },
  { path: "/about/careers", lastModified: UPDATED.careers },
  { path: "/contact", lastModified: UPDATED.contact },
  { path: "/privacy", lastModified: UPDATED.privacy },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [
    ...staticEntries,
    ...PILLARS.map((p) => ({ path: p.path, lastModified: UPDATED.pillars })),
    ...SPM_PLATFORMS.map((p) => ({
      path: `/spm/${p.slug}`,
      lastModified: UPDATED.spm,
    })),
    ...CASE_STUDIES.map((cs) => ({
      path: `/case-studies/${cs.slug}`,
      lastModified: UPDATED.caseStudies,
    })),
    ...INDUSTRIES.map((i) => ({
      path: `/industries/${i.slug}`,
      lastModified: UPDATED.industries,
    })),
    /* Posts carry their own date — freshness is read per article. */
    ...BLOG_POSTS.map((post) => ({
      path: `/blog/${post.slug}`,
      lastModified: post.dateModified,
    })),
  ];

  return entries.map(({ path, lastModified }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority:
      path === ""
        ? 1
        : path.startsWith("/agentic-spm") || path.startsWith("/spm")
          ? 0.9
          : 0.7,
  }));
}
