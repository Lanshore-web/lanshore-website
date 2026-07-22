import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* Every page canonicalizes to lanshore.com (metadataBase), so any other host
   serving this build — *.vercel.app previews AND the production deployment's
   vercel.app alias before domain cutover — must not be indexed, or crawlers
   see two conflicting Lanshores. Host-based (not env-based) on purpose: the
   pre-cutover vercel.app alias runs with VERCEL_ENV=production. */
const CANONICAL_HOSTS = new Set(["lanshore.com", "www.lanshore.com"]);

/* Retired WordPress surface (pre-migration CMS). These paths are unmanaged in
   next.config.ts's redirect map and currently 403 at the platform layer, which
   Google retries instead of deindexing. Emit a true 410 so crawlers drop them
   for good. Checked inline (not via a separate config.matcher) because this
   file has no matcher — it must keep running on every request for the
   host-canonicalization check above; a matcher here would narrow that too. */
const WORDPRESS_DIRECTORIES = ["/wp-content", "/wp-includes", "/wp-admin", "/wp-json"];
const WORDPRESS_FILES = new Set(["/wp-login.php", "/xmlrpc.php"]);

function isRetiredWordPressPath(pathname: string): boolean {
  if (WORDPRESS_FILES.has(pathname)) return true;
  return WORDPRESS_DIRECTORIES.some(
    (dir) => pathname === dir || pathname.startsWith(`${dir}/`)
  );
}

export function proxy(request: NextRequest) {
  if (isRetiredWordPressPath(request.nextUrl.pathname)) {
    return new NextResponse("410 Gone", {
      status: 410,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const response = NextResponse.next();
  const host = (request.headers.get("host") ?? "").toLowerCase();
  if (!CANONICAL_HOSTS.has(host)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}
