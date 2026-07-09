import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import CtaBand from "@/components/CtaBand";
import { GLOSSARY } from "@/lib/glossary";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "SPM & Agentic AI Glossary | Lanshore",
  description:
    "Plain-English definitions of sales performance management and agentic AI terms — Agentic SPM, ICM, crediting, clawbacks, SPIFs, true-ups, and more.",
  alternates: { canonical: "/resources/glossary" },
  openGraph: {
    title: "SPM & Agentic AI Glossary | Lanshore",
    description:
      "Plain-English definitions of sales performance management and agentic AI terms — Agentic SPM, ICM, crediting, clawbacks, SPIFs, true-ups, and more.",
    url: "/resources/glossary",
    type: "website",
  },
};

const definedTermSetSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "SPM & Agentic AI Glossary",
  url: `${SITE_URL}/resources/glossary`,
  hasDefinedTerm: GLOSSARY.map((entry) => ({
    "@type": "DefinedTerm",
    name: entry.term,
    description: entry.definition,
    inDefinedTermSet: `${SITE_URL}/resources/glossary`,
  })),
};

export default function GlossaryPage() {
  return (
    <>
      <JsonLd data={definedTermSetSchema} />

      <section className="bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            FAQ & Glossary
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">
            SPM & agentic AI, defined
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/75">
            The terms behind Agentic SPM by Lanshore — sales performance management,
            incentive compensation, and agentic AI, in plain English.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <dl className="space-y-8">
          {GLOSSARY.map((entry) => (
            <div key={entry.term} className="border-b border-line pb-6">
              <dt className="text-lg font-bold text-ink">{entry.term}</dt>
              <dd className="mt-2 text-muted">
                {entry.definition}
                {entry.linkTo && (
                  <>
                    {" "}
                    <Link
                      href={entry.linkTo}
                      className="font-semibold text-accent hover:text-accent-hover"
                    >
                      Learn more about Agentic SPM →
                    </Link>
                  </>
                )}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 text-sm text-muted">
          Looking for a specific platform?{" "}
          <Link href="/spm" className="font-semibold text-accent hover:text-accent-hover">
            See the SPM platforms Lanshore implements
          </Link>{" "}
          — Varicent, Xactly, CaptivateIQ, SAP, Anaplan, Salesforce Spiff, Performio, and
          Everstage.
        </p>
      </section>

      <CtaBand />
    </>
  );
}
