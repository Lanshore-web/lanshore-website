import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* Explicitly allow AI/answer-engine crawlers (GEO): robots.txt is
   most-specific-wins per user agent, so each bot carries its own rule. */
const AI_CRAWLERS = [
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
