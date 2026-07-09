import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About Lanshore | SPM Consultancy & Agentic AI Builders",
  description:
    "Lanshore is a Houston-area consultancy that has implemented sales performance management for enterprises for 15+ years — and now builds the AI agents that run it.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Lanshore | SPM Consultancy & Agentic AI Builders",
    description:
      "Lanshore is a Houston-area consultancy that has implemented sales performance management for enterprises for 15+ years — and now builds the AI agents that run it.",
    url: "/about",
    type: "website",
  },
};

const VALUES = [
  {
    title: "Do the work, not the deck",
    body: "We're practitioners. Our consultants have run comp cycles, fixed broken calculations at 2 a.m. before payroll, and sat across from angry reps. That experience is in everything we build.",
  },
  {
    title: "Own the outcome",
    body: "Managed services means we're still here after go-live. If the cycle doesn't close on time, that's our problem too.",
  },
  {
    title: "Build for handover",
    body: "Everything we deliver is documented and owned by the client. No black boxes, no dependency by design.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            About
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">Company</h1>
          <p className="mt-6 text-lg text-white/75">
            Lanshore is a Houston-area consultancy that has implemented sales performance
            management for enterprises for 15+ years — and now builds the AI agents that
            run it.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <p className="text-lg text-foreground">
          We started as an SPM implementation shop: Varicent, Xactly, CaptivateIQ,
          Performio, and SAP Commissions, delivered for enterprises across healthcare,
          telecom, technology, retail, oil and gas, and financial services. Along the way
          we added RPA and automation practice, then managed services — running comp
          operations for clients, not just building them. Agentic SPM is the next step of
          the same trajectory: the AI agents we build today do the work our consultants
          have done by hand for fifteen years, which is exactly why they work.
        </p>

        <h2 className="mt-12 text-2xl font-bold text-ink">How we work</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {VALUES.map((value) => (
            <div key={value.title} className="rounded-lg border border-line p-6">
              <h3 className="font-bold text-ink">{value.title}</h3>
              <p className="mt-2 text-sm text-muted">{value.body}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
