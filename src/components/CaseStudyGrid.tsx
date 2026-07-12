"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CaseStudy } from "@/lib/caseStudies";

/* No offering filter: every current study carries the same pillar value, so
   the control would filter nothing. Reinstate it when offering tags diverge. */
export default function CaseStudyGrid({ studies }: { studies: CaseStudy[] }) {
  const [industry, setIndustry] = useState<string>("All");

  const industries = useMemo(
    () => ["All", ...Array.from(new Set(studies.map((s) => s.industry))).sort()],
    [studies]
  );

  const filtered = studies.filter(
    (s) => industry === "All" || s.industry === industry
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-6">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-ink">Filter by industry</span>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="rounded-md border border-line px-3 py-2 text-base"
          >
            {industries.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((study) => (
          <Link
            key={study.slug}
            href={`/case-studies/${study.slug}`}
            className="group flex flex-col rounded-lg border border-line p-6 hover:border-accent"
          >
            <div className="mb-3 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="rounded-full bg-paper px-2.5 py-1 text-muted">
                {study.industry}
              </span>
            </div>
            <h2 className="font-bold text-ink group-hover:text-accent">{study.client}</h2>
            <p className="mt-2 flex-1 text-sm text-muted">{study.outcome}</p>
            <span className="mt-4 text-sm font-semibold text-accent">Read the story →</span>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted">
          No case studies match those filters yet.
        </p>
      )}
    </div>
  );
}
