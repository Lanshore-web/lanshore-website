import type { Metadata } from "next";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Lanshore",
  description: "How Lanshore collects, uses, and protects information on this site.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Lanshore",
    description:
      "How Lanshore collects, uses, and protects information on this site.",
    url: "/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-ink">Privacy Policy</h1>
      <div className="mt-6 space-y-4 text-muted">
        <p>
          Lanshore collects only the information you submit through this site — typically
          your name, work email, company, and message — and uses it to respond to your
          inquiry. We do not sell or share this information with third parties for
          marketing purposes.
        </p>
        <p>
          Client data handled in the course of an engagement is governed by the
          engagement agreement, stays in the client&rsquo;s environment, and is not used
          to train AI models.
        </p>
        <p>
          Questions about this policy or requests to access or delete your information:{" "}
          <a href={`mailto:${CONTACT.email}`} className="font-semibold text-accent">
            {CONTACT.email}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
