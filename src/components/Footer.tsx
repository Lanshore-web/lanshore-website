import Link from "next/link";
import Image from "next/image";
import { CONTACT, FOOTER_COLUMNS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-site grid grid-cols-2 gap-8 py-12 sm:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2 sm:col-span-3 lg:col-span-5 lg:mb-2">
          <Link href="/" className="inline-block">
            <Image
              src="/images/logo-white.png"
              alt="Lanshore"
              width={220}
              height={76}
              className="h-12 w-auto"
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Sales performance management expertise, converged with agentic AI. US and
            Latin America delivery.
          </p>
          <div className="mt-4 space-y-1 text-sm text-white/60">
            <p>{CONTACT.address}</p>
            <p>San José, Costa Rica</p>
            <p>
              <a href={`tel:${CONTACT.phone}`} className="hover:text-white">
                {CONTACT.phone}
              </a>
              {" · "}
              <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
                {CONTACT.email}
              </a>
            </p>
          </div>
        </div>
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.heading}>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/60">
              {col.heading}
            </h2>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/85 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* Bottom padding keeps this row clear of the fixed MobileContactBar. */}
      <div className="border-t border-white/10 pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <div className="container-site flex flex-wrap items-center justify-between gap-4 py-5 text-sm text-white/60">
          <span>© {new Date().getFullYear()} Lanshore. All rights reserved.</span>
          <span className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="Lanshore on LinkedIn"
            >
              LinkedIn
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
