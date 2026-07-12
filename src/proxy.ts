import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* Every page canonicalizes to lanshore.com (metadataBase), so any other host
   serving this build — *.vercel.app previews AND the production deployment's
   vercel.app alias before domain cutover — must not be indexed, or crawlers
   see two conflicting Lanshores. Host-based (not env-based) on purpose: the
   pre-cutover vercel.app alias runs with VERCEL_ENV=production. */
const CANONICAL_HOSTS = new Set(["lanshore.com", "www.lanshore.com"]);

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const host = (request.headers.get("host") ?? "").toLowerCase();
  if (!CANONICAL_HOSTS.has(host)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}
