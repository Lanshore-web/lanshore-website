import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import CtaBand from "@/components/CtaBand";
import { SPM_PLATFORMS, NEAR_MISS_VENDORS } from "@/lib/spmPlatforms";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  description:
    "Lanshore implements and operates the leading sales performance management platforms — Varicent, Xactly, CaptivateIQ, SAP, Anaplan, Salesforce Spiff, Performio, and Everstage — technology-agnostic, with agentic AI on top.",
  alternates: { canonical: "/spm" },
  openGraph: {
    title: "SPM Platforms We Implement | Lanshore",
    description:
      "Technology-agnostic implementation, managed operations, and agentic augmentation across the leading SPM platforms.",
    url: "/spm",
    type: "website",
  },
};

export default function SpmIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "SPM Platforms", href: "/spm" },
        ])}
      />

      <section className="bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            SPM Platforms
          </p>
          <h1 className="text-4xl font-black sm:text-5xl">
            SPM Platforms We Implement
          </h1>
          <p className="mt-6 text-lg text-white/75">
            Lanshore is technology-agnostic: we implement, operate, and extend the leading
            sales performance management platforms, and we recommend the one that fits your
            comp plans — not a reseller quota. Every platform below can be augmented with
            Agentic SPM by Lanshore.
          </p>
        </div>
      </section>

      <section className="container-site py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {SPM_PLATFORMS.map((platform) => (
            <Link
              key={platform.slug}
              href={`/spm/${platform.slug}`}
              className="group flex flex-col rounded-lg border border-line p-6 shadow-card transition-all hover:border-accent hover:shadow-card-hover"
            >
              <h2 className="text-xl font-black text-ink group-hover:text-accent">
                {platform.name}
              </h2>
              {platform.formerNames && (
                <p className="mt-1 text-xs text-muted">
                  Formerly {platform.formerNames.join(", ")}
                </p>
              )}
              <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground">
                {platform.positioning}
              </p>
              {platform.analystNote && (
                <p className="mt-3 text-xs italic leading-relaxed text-muted">
                  {platform.analystNote}
                </p>
              )}
              <span className="mt-4 text-sm font-bold text-accent">
                Lanshore + {platform.name} →
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted">
          Also supported through our partner network: {NEAR_MISS_VENDORS.join(", ")}, and
          legacy estates on Akeron, Iconixx, and Incentivate. If your platform isn&apos;t
          listed, <Link href="/contact" className="font-semibold text-accent hover:text-accent-hover">talk to us</Link> — odds are we&apos;ve worked in it.
        </p>
      </section>

      <CtaBand />
    </>
  );
}
