"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { HUBSPOT_PORTAL_ID } from "@/lib/hubspot-config";

/* Keep in sync with CANONICAL_HOSTS in src/proxy.ts:9 — host-gating lives
   client-side because proxy.ts only sets headers (node runtime) and cannot
   strip scripts from the document. Non-canonical hosts (*.vercel.app previews
   and the pre-cutover production alias) must not load the tracker. */
const CANONICAL_HOSTS = new Set(["lanshore.com", "www.lanshore.com"]);

function shouldLoadTracker(): boolean {
  if (process.env.NEXT_PUBLIC_HUBSPOT_TRACKING === "force") return true;
  if (typeof window === "undefined") return false;
  return CANONICAL_HOSTS.has(window.location.hostname.toLowerCase());
}

/* Host is fixed for the page lifetime; no real subscription needed. */
const subscribe = () => () => {};
const getServerSnapshot = () => process.env.NEXT_PUBLIC_HUBSPOT_TRACKING === "force";

export default function HubSpotLoader() {
  const load = useSyncExternalStore(subscribe, shouldLoadTracker, getServerSnapshot);

  if (!load) return null;

  return (
    <Script
      id="hs-script-loader"
      src={`https://js-na2.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`}
      strategy="afterInteractive"
    />
  );
}
