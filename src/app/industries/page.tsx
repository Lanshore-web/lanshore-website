import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import { INDUSTRIES } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Industries | Agentic SPM by Lanshore",
  description:
    "Agentic SPM by Lanshore serves healthcare, telecom, technology, retail, oil & gas, and financial services sales organizations.",
  alternates: { canonical: "/industries" },
  openGraph: {
    siteName: "Lanshore",
    locale: "en_US",
    title: "Industries | Agentic SPM by Lanshore",
    description:
      "Agentic SPM by Lanshore serves healthcare, telecom, technology, retail, oil & gas, and financial services sales organizations.",
    url: "/industries",
    type: "website",
  },
};

export default function IndustriesIndexPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            Industries
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">Where we work</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/75">
            Agentic SPM by Lanshore serves sales organizations whose comp complexity
            comes with the territory.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group rounded-lg border border-line p-6 hover:border-accent"
            >
              <h2 className="font-bold text-ink group-hover:text-accent">
                {industry.name}
              </h2>
              <p className="mt-2 text-sm text-muted">{industry.problems[0]}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-accent">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
