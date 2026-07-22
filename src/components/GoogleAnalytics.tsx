"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/analytics-config";

/* Keep in sync with CANONICAL_HOSTS in src/proxy.ts and HubSpotLoader —
   host-gating lives client-side so preview hosts (*.vercel.app) and local
   dev do not pollute the production GA4 property. */
const CANONICAL_HOSTS = new Set(["lanshore.com", "www.lanshore.com"]);

function shouldLoadTracker(): boolean {
  if (process.env.NEXT_PUBLIC_GA_TRACKING === "force") return true;
  if (typeof window === "undefined") return false;
  return CANONICAL_HOSTS.has(window.location.hostname.toLowerCase());
}

/* Host is fixed for the page lifetime; no real subscription needed. */
const subscribe = () => () => {};
const getServerSnapshot = () => process.env.NEXT_PUBLIC_GA_TRACKING === "force";

export default function GoogleAnalytics() {
  const load = useSyncExternalStore(subscribe, shouldLoadTracker, getServerSnapshot);

  if (!load) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
