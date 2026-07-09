import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { PILLARS } from "@/lib/pillars";
import { CASE_STUDIES } from "@/lib/caseStudies";
import { INDUSTRIES } from "@/lib/industries";
import { BLOG_POSTS } from "@/lib/blog";
import { SPM_PLATFORMS } from "@/lib/spmPlatforms";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/agentic-spm/executive-dashboards/demo",
    "/agentic-spm/operations/demo",
    "/agentic-spm/custom-apps/demo",
    "/spm",
    "/services",
    "/services/automation",
    "/case-studies",
    "/industries",
    "/blog",
    "/resources",
    "/resources/glossary",
    "/about",
    "/about/why-lanshore",
    "/about/partners",
    "/about/careers",
    "/contact",
    "/privacy",
  ];

  const pillarPaths = PILLARS.map((p) => p.path);
  const spmPaths = SPM_PLATFORMS.map((p) => `/spm/${p.slug}`);
  const casePaths = CASE_STUDIES.map((cs) => `/case-studies/${cs.slug}`);
  const industryPaths = INDUSTRIES.map((i) => `/industries/${i.slug}`);
  const blogPaths = BLOG_POSTS.map((post) => `/blog/${post.slug}`);

  return [
    ...staticPaths,
    ...pillarPaths,
    ...spmPaths,
    ...casePaths,
    ...industryPaths,
    ...blogPaths,
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority:
      path === ""
        ? 1
        : path.startsWith("/agentic-spm") || path.startsWith("/spm")
          ? 0.9
          : 0.7,
  }));
}
