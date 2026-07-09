"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { CONTACT } from "@/lib/site";

export default function MobileContactBar() {
  const pathname = usePathname();

  if (pathname === "/contact") return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-ink md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex h-14">
        <a
          href={`tel:${CONTACT.phone}`}
          className="flex w-1/2 items-center justify-center gap-2 border-r border-white/10 text-sm font-medium text-white/80 transition-colors hover:text-white active:bg-white/10"
        >
          <Phone className="h-4 w-4 flex-shrink-0" />
          {CONTACT.phone}
        </a>
        <Link
          href="/contact"
          className="flex w-1/2 items-center justify-center bg-button text-sm font-semibold text-white transition-all hover:bg-button-hover active:scale-[0.98]"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
