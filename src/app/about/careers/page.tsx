import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Careers at Lanshore | SPM & Agentic AI Consulting",
  description:
    "Join Lanshore: SPM consultants, comp analysts, and agentic AI engineers building the agents that run sales performance management.",
  alternates: { canonical: "/about/careers" },
  openGraph: {
    siteName: "Lanshore",
    locale: "en_US",
    title: "Careers at Lanshore | SPM & Agentic AI Consulting",
    description:
      "Join Lanshore: SPM consultants, comp analysts, and agentic AI engineers building the agents that run sales performance management.",
    url: "/about/careers",
    type: "website",
  },
};

export default function CareersPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            About
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">Careers</h1>
          <p className="mt-6 text-lg text-white/75">
            Agentic SPM by Lanshore is built by people who know comp from the inside —
            consultants, comp analysts, and engineers who want their work in production,
            not in a deck.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <p className="text-lg text-foreground">
          We hire SPM consultants who have implemented Varicent, Xactly, CaptivateIQ,
          SAP SuccessFactors Incentive Management, Anaplan, Salesforce Spiff, Performio,
          or Akeron; comp operations analysts who have run live
          cycles; and engineers building agentic systems on commercial AI models. Most
          roles are remote-friendly with a Houston-area home base.
        </p>
        <p className="mt-6 text-muted">
          No open role listed that fits? Send your background to{" "}
          <a href="mailto:info@lanshore.com" className="font-semibold text-accent">
            info@lanshore.com
          </a>{" "}
          — we read every one.
        </p>
      </section>

      <CtaBand
        heading="Work with us"
        body="Tell us what you've built and what you want to build next."
        ctaLabel="Get in touch"
      />
    </>
  );
}
