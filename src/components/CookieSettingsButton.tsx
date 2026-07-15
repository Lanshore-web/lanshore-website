"use client";

import type { ReactNode } from "react";

/**
 * Re-opens the HubSpot cookie consent banner via the tracking script's
 * public `_hsp` queue. Harmless no-op when the tracker is absent (localhost
 * without NEXT_PUBLIC_HUBSPOT_TRACKING=force, or pre-consent host gate).
 */
export default function CookieSettingsButton({
  className,
  children = "Cookie settings",
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        const w = window as Window & { _hsp?: unknown[][] };
        w._hsp = w._hsp || [];
        w._hsp.push(["showBanner"]);
      }}
    >
      {children}
    </button>
  );
}
