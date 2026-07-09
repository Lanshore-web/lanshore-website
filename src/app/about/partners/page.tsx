import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Partners | Microsoft, UiPath & SPM Platform Partnerships | Lanshore",
  description:
    "Lanshore's partnerships: Microsoft Gold, UiPath Fast Track, and platform partnerships with Varicent, Xactly, CaptivateIQ, Performio, and SAP.",
  alternates: { canonical: "/about/partners" },
  openGraph: {
    title: "Partners | Microsoft, UiPath & SPM Platform Partnerships | Lanshore",
    description:
      "Lanshore's partnerships: Microsoft Gold, UiPath Fast Track, and platform partnerships with Varicent, Xactly, CaptivateIQ, Performio, and SAP.",
    url: "/about/partners",
    type: "website",
  },
};

const PARTNERS = [
  {
    name: "Microsoft Gold Partner",
    body: "Gold-level competency across the Microsoft stack means the Power Automate flows, Azure infrastructure, and integrations we build for clients follow supported patterns Microsoft will stand behind — and your IT team can maintain them.",
  },
  {
    name: "UiPath Fast Track Partner",
    body: "Fast Track status gives our clients early access to UiPath capabilities and direct escalation paths. For automation work that sits alongside agents, it means faster delivery and vendor-backed support.",
  },
  {
    name: "Varicent",
    body: "Implementation and operations partnership on Varicent ICM. Our team implements new Varicent environments, rescues troubled ones, and runs ongoing operations under managed services.",
  },
  {
    name: "Xactly",
    body: "Partnership covering Xactly Incent implementations, plan migrations, and managed operations. Clients get consultants who have configured Xactly for enterprise plan complexity, not just certified on it.",
  },
  {
    name: "CaptivateIQ",
    body: "Implementation partnership for CaptivateIQ's modeling-first approach to comp. We help clients move from spreadsheets to CaptivateIQ without losing the flexibility that drew them to it.",
  },
  {
    name: "Performio",
    body: "Implementation and support partnership for Performio's ICM platform, including data integration and ongoing plan administration.",
  },
  {
    name: "SAP",
    body: "Partnership on SAP Commissions (formerly CallidusCloud) for enterprises running comp inside the SAP ecosystem — implementations, upgrades, and managed operations.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            About
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">Partners</h1>
          <p className="mt-6 text-lg text-white/75">
            Lanshore partners across the platforms Agentic SPM runs on — so clients get
            supported patterns, vendor escalation paths, and consultants the vendors
            know.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        {/* Partner badges */}
        <div className="mb-12 flex flex-wrap items-center gap-x-10 gap-y-6">
          <Image
            src="/images/partners/microsoft-gold.png"
            alt="Microsoft Gold Partner"
            width={220}
            height={96}
            className="h-14 w-auto"
          />
          <Image
            src="/images/partners/uipath-gold.png"
            alt="UiPath Gold Partner"
            width={288}
            height={62}
            className="h-10 w-auto"
          />
          <Image
            src="/images/partners/uipath-fast-track.png"
            alt="UiPath Fast Track Partner"
            width={200}
            height={96}
            className="h-14 w-auto"
          />
          <Image
            src="/images/partners/varicent.png"
            alt="Varicent Partner"
            width={220}
            height={64}
            className="h-9 w-auto"
          />
        </div>
        <div className="space-y-8">
          {PARTNERS.map((partner) => (
            <div key={partner.name} className="border-b border-line pb-6">
              <h2 className="text-xl font-bold text-ink">{partner.name}</h2>
              <p className="mt-2 text-muted">{partner.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-muted">
          Looking for platform detail?{" "}
          <Link href="/spm" className="font-semibold text-accent hover:text-accent-hover">
            See the SPM platforms we implement
          </Link>
          .
        </p>
      </section>

      <CtaBand />
    </>
  );
}
