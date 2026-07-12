import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Lanshore | Get an SPM Assessment",
  description:
    "Contact Lanshore for an SPM assessment. We respond within one business day; first step is a 30-minute assessment call. Houston-area presence, clients nationwide.",
  alternates: { canonical: "/contact" },
  openGraph: {
    siteName: "Lanshore",
    locale: "en_US",
    title: "Contact Lanshore | Get an SPM Assessment",
    description:
      "Contact Lanshore for an SPM assessment. We respond within one business day; first step is a 30-minute assessment call. Houston-area presence, clients nationwide.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            Contact
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">Get an SPM Assessment</h1>
          <p className="mt-6 text-lg text-white/75">
            We respond within one business day. First step is a 30-minute assessment
            call.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_320px]">
        <ContactForm />
        <aside className="space-y-6 text-sm">
          <div>
            <h2 className="font-bold text-ink">Email</h2>
            <a href={`mailto:${CONTACT.email}`} className="text-accent">
              {CONTACT.email}
            </a>
          </div>
          <div>
            <h2 className="font-bold text-ink">Phone</h2>
            <a href={`tel:+1${CONTACT.phone.replace(/-/g, "")}`} className="text-muted">
              {CONTACT.phone}
            </a>
          </div>
          <div>
            <h2 className="font-bold text-ink">United States</h2>
            <p className="text-muted">{CONTACT.address}</p>
            <p className="mt-1 text-muted">Consultants across the US.</p>
          </div>
          <div>
            <h2 className="font-bold text-ink">Latin America</h2>
            <p className="text-muted">San José, Costa Rica</p>
            <p className="mt-1 text-muted">
              Nearshore delivery teams operating in your time zone.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
