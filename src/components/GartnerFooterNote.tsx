"use client";

import { usePathname } from "next/navigation";
import { GARTNER_2019 } from "@/lib/site";

/* Gartner's required trademark attribution, rendered as footer fine print on
   exactly the pages that mention Gartner. The path list is computed
   server-side in Footer.tsx; only the strings cross to the client. */
export default function GartnerFooterNote({ paths }: { paths: string[] }) {
  const pathname = usePathname();
  if (!paths.includes(pathname)) return null;
  return (
    <div className="container-site pb-5">
      <p className="max-w-4xl text-[11px] leading-relaxed text-white/35">
        {GARTNER_2019.disclaimer}
      </p>
    </div>
  );
}
