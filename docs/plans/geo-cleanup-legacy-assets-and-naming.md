# GEO Cleanup — Legacy WordPress Assets, Stale Index & Naming Consistency

**Task:** Verify an external GEO/SEO critique's four "what's broken" claims against the
live site and repo, then plan the fixes that are actually warranted.
**Repo:** `lanshore-web` (Next.js 16 App Router, `src/app`, React 19) · deployed at
https://lanshore.com · **Branch:** `preview/faq-agentic-spm`
**Date:** 2026-07-22 · **Author:** Lead (planning only — no code changed)

> Guardrail honored: a prior review in this repo nearly deleted true content by acting on
> stale claims. Every claim below carries an explicit verdict + repo/live evidence. Nothing
> is fixed on the critique's say-so alone.

---

## Claim-verification summary

| # | Claim | Verdict | Evidence (repo + live) |
|---|-------|---------|------------------------|
| 1 | Old `/wp-content/` WordPress assets still live/indexed; page URLs redirect but uploads don't | **CONFIRMED** | `next.config.ts` has a ~200-URL 301 map but **zero** `/wp-content/` coverage; grep for `wp-content` across the whole repo (excl. `node_modules`) = **0 matches**. Live `https://lanshore.com/wp-content/uploads/2020/05/SPM_Implementation-1.pdf` and the `.../2020/05/` dir both return **HTTP 403** (WebFetch) — a status Google *retries*, not a deindex signal. So the path is genuinely unmanaged and won't cleanly leave the index. (Nuance: currently 403, not the "200 PDF" stated — but the remediation need is identical.) |
| 2 | Google's cached homepage snippet is stale ("only SPM consultancy… Microsoft Gold Partner… EMEA") vs. live meta | **CONFIRMED (index staleness; live copy is clean)** | Live meta in repo is the new copy (`src/app/page.tsx`, `src/app/layout.tsx`). Grep for `Gold Partner \| only SPM consultancy \| EMEA \| Total Pay` across `src` = **no live-copy hits** (only legit UiPath "Gold Partner" alt-text + an OTE glossary definition). WebSearch on lanshore.com **still** returns the retired "the only SPM consultancy… Microsoft Gold Partner… US, EMEA, and Latin America" positioning and legacy `/what-we-do/...` URLs → Google's index is stale. Fix is off-repo (Search Console), not code. |
| 3 | Category name split: copy "AI Assisted SPM" vs slugs `/agentic-spm/`, anchor `#agentic-spm`, `/services` reads "Agentic SPM" | **PARTIALLY CONFIRMED** | `AI Assisted SPM` = **123 occurrences / 36 files** and is the canonical `ENTITY` (`src/lib/site.ts`). The display phrase `Agentic SPM` = **0 occurrences** anywhere in copy — so "live `/services` reads Agentic SPM" is **REFUTED** (that's Google's stale index again, per Claim 2). The **only** real divergence is structural: URL slug `agentic-spm` (**53 occurrences** — routes, sitemap, nav hrefs) + homepage anchor `#agentic-spm` (`HeroSection.tsx` → target in `IntroAgenticSPM.tsx`). Genuine design fork → **Open Question 1**. |
| 4 | Thin footer/nav: Explore lists only Services/Case Studies/About/Contact; glossary "linked only from Varicent"; no homepage path to blog | **PARTIALLY CONFIRMED (footer thin = true; "orphaned" = REFUTED)** | Footer `FOOTER_LINKS` (`src/components/Footer.tsx`) is indeed only Services / Case Studies / About / Contact. **But** the primary header `NAV` (`src/lib/site.ts`) has **Resources → Blog, White Papers, FAQ & Glossary, Events, Press** on every page. The DefinedTermSet glossary is linked from the global nav, `/resources`, **and every `/spm/[slug]` platform page** (grep) — not "only Varicent." Blog exists (`/blog`, 5 posts) and is in nav + sitemap + `llms.txt`. So glossary/blog are **not** orphaned; only the footer omits them. |

**Net:** Two clean code fixes are warranted (Claim 1 legacy-asset `410`, Claim 4 footer
expansion). Claim 2 is an operator task. Claim 3 has no live-copy defect — only a
slug-vs-brand policy decision that is the owner's to make.

---

## Goal & acceptance criteria

**Goal:** Give retired WordPress URLs a correct permanent-removal signal, and strengthen
on-page discovery of the glossary/blog via the footer — without touching the (already
correct) live copy or the `/agentic-spm/` URL namespace.

**Acceptance criteria (falsifiable):**
1. `npm run build` exits 0; route list unchanged except the new `middleware`.
2. After deploy to a preview URL, `curl -sI <preview>/wp-content/uploads/2020/05/SPM_Implementation-1.pdf`
   returns `410` (Gone). Same for `/wp-includes/anything`, `/xmlrpc.php`, `/wp-login.php`.
3. Real routes are unaffected: `curl -sI <preview>/`, `/services`, `/resources/glossary`,
   `/blog` each return `200` (or their existing status) — middleware does not over-match.
4. The rendered footer HTML on any page contains anchors to `/resources`, `/blog`, and
   `/resources/glossary`.
5. No new "Agentic SPM" display copy is introduced (unless Open Question 1 resolves to the
   bridge-line option, in which case exactly one crawlable alias line is added).

---

## Non-goals (explicit)

- **Do NOT rename the `/agentic-spm/**` URL namespace.** Redirect/ranking risk far exceeds
  the marginal GEO value (matches prior `docs/plans/geo-audit.md` Finding 5 / Open Q B).
  Gated behind Open Question 1; if chosen it is a separate, larger effort — not this plan.
- **Do NOT edit live meta descriptions or hero/services copy** — verified clean; the stale
  snippet is an index-cache problem, not a code problem.
- **Do NOT add `Disallow: /wp-content/` to robots.** Blocking crawl would *prevent* Google
  from seeing the `410` and deindexing. The URLs must stay crawlable to be removed.
- **Do NOT 301-redirect the retired PDFs to the homepage** — content-type mismatch
  (PDF→HTML) reads as a soft-404 and keeps a dead URL "alive." (See Approach.)
- No new pages, no blog authoring, no multi-column footer redesign, no crawler allow-list
  changes.
- No unit/lint/coverage tooling is added (none exists in this repo; build + HTTP is the gate).

---

## Approach & why

### Claim 1 — retire `/wp-content/` with HTTP 410 via middleware

**Chosen: emit `410 Gone` from a new `src/middleware.ts` for the dead WordPress surface.**

410 is the correct signal for "permanently removed" — Google deindexes 410 faster and more
decisively than 404, and far better than the current **403** (which Google treats as
temporary and *retries*, so the old PDF lingers).

**Why not the obvious `redirects()` alternative:** Next.js `redirects()` **cannot emit
410** — it only does 301/302/307/308. A `{ source: "/wp-content/:path*", destination: "/" }`
301 would (a) point a PDF at an HTML page (soft-404 risk, no clean removal) and (b) keep the
URL returning 200-after-redirect instead of signaling it's gone. Middleware is the
conventional App-Router way to return an arbitrary status for arbitrary paths and runs
before routing.

**New pattern justification:** this repo has no `middleware.ts` today. Adding one is a
standard, well-documented Next.js primitive and the *only* in-repo way to emit a true 410;
the matcher is tight (WordPress-only prefixes) so it cannot shadow app routes.

Sketch (implementer confirms against installed Next version):

```ts
// src/middleware.ts
import { NextResponse } from "next/server";

export function middleware() {
  return new NextResponse("410 Gone", {
    status: 410,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export const config = {
  matcher: [
    "/wp-content/:path*",
    "/wp-includes/:path*",
    "/wp-admin/:path*",
    "/wp-json/:path*",
    "/wp-login.php",
    "/xmlrpc.php",
  ],
};
```

### Claim 4 — expand the footer "Explore" list

**Chosen: extend the flat `FOOTER_LINKS` array** in `Footer.tsx` to add **Resources**
(`/resources`), **Blog** (`/blog`), and **Glossary** (`/resources/glossary`), reusing the
existing list markup/styles. This puts the glossary + blog inlinks on *every* page's footer
(a second, always-present discovery path) at near-zero risk. Not a rescue of orphaned pages
(they're already in the header nav) — a reasonable secondary-discovery reinforcement, which
is the genuinely-true core of Claim 4.

**Why not a multi-column footer redesign:** larger UI surface, more states to design, for no
additional discovery benefit over three extra list items.

### Claim 3 — no code change without a decision

Copy is already 100% canonical on "AI Assisted SPM"; the only artifact of the old name is the
URL slug. There is **no copy inconsistency to fix**. The choice — leave slugs / add a crawlable
"formerly Agentic SPM" alias / migrate slugs — is a product decision surfaced as
**Open Question 1**. Only the lightweight bridge-line option (if chosen) touches code, and it
is a single line folded into WP-1 as a conditional step. Consider an ADR if the owner picks a
long-lived direction (esp. slug migration).

---

## Change surface (files)

| File | Change |
|------|--------|
| `src/middleware.ts` *(new)* | 410 handler + `config.matcher` for WordPress prefixes (Claim 1). |
| `src/components/Footer.tsx` | Add Resources / Blog / Glossary entries to `FOOTER_LINKS` (Claim 4). |
| `src/components/home/IntroAgenticSPM.tsx` *(conditional)* | **Only if** Open Q1 → bridge-line: add one crawlable "AI Assisted SPM (formerly Agentic SPM)" alias sentence near the `#agentic-spm` section. Otherwise untouched. |

No changes to `next.config.ts`, `robots.ts`, `sitemap.ts`, or any live meta/copy.

---

## UI/UX (Claim 4 touches UI)

- **Surface:** footer `Explore` list (`Footer.tsx`), rendered site-wide.
- **States:** static internal links only — no empty/loading/error/disabled states. Existing
  hover (`hover:text-white`) and focus styling from the current list items are reused verbatim
  by mapping over the same `FOOTER_LINKS` array; no new interaction states introduced.
- **Design reference:** the existing `FOOTER_LINKS.map(...)` pattern — additions are new array
  entries, not new markup.
- **A11y:** links inherit the current `<nav aria-label="Footer">` + `<ul>/<li>` semantics and
  visible focus ring already present; contrast unchanged (same token classes).
- **Falsifiable design acceptance:** footer renders 7 Explore links in source order Services,
  Case Studies, Resources, Blog, Glossary, About, Contact (final order at implementer's
  discretion but all three new links present and reachable by keyboard).

---

## Test strategy

**This repo has NO unit/lint/coverage tooling** (per `AGENTS.md` "Project Test Commands: NONE"
and `docs/plans/geo-audit.md`). Per the coverage policy this is **NO COVERAGE TOOL** — the
observable gate is `npm run build` **plus concrete HTTP/DOM assertions**, not a fabricated
coverage number.

1. **Build gate:** `npm run build` exits 0; new `middleware` appears in the build output;
   no route regressions.
2. **410 assertions (post-deploy to preview):**
   - `curl -sI https://<preview>/wp-content/uploads/2020/05/SPM_Implementation-1.pdf` → `HTTP/2 410`
   - `curl -sI https://<preview>/wp-includes/version.php` → `410`
   - `curl -sI https://<preview>/xmlrpc.php` → `410`
   - `curl -sI https://<preview>/wp-login.php` → `410`
3. **Over-match regression (must stay unaffected):**
   - `curl -sI https://<preview>/` → `200`
   - `curl -sI https://<preview>/services` → `200`
   - `curl -sI https://<preview>/resources/glossary` → `200`
   - `curl -sI https://<preview>/blog` → `200`
   - `curl -sI https://<preview>/llms.txt` → `200` (route handler still served)
4. **Footer DOM check:** `curl -s https://<preview>/ | grep -o 'href="/resources"\|href="/blog"\|href="/resources/glossary"'`
   returns all three; or visually confirm the three links render and are keyboard-focusable.
5. **Edge/negative case:** confirm a *near-miss* path that is NOT WordPress is untouched —
   e.g. a hypothetical `/wp-something-that-is-a-real-route` does not exist here, but verify
   `/spm` and `/about` (paths that merely start differently) still 200, proving the matcher
   is prefix-correct and not a broad `/wp` catch.

---

## Failure modes & risks

- **A platform/WAF layer 403s `/wp-content/` before middleware runs.** The current 403 (vs.
  the expected Next 404) hints something may intercept early (Vercel challenge or WAF). If, in
  step-2 verification, the path still returns 403 after deploy, the 410 isn't taking effect →
  the operator must add a platform-level rule (e.g. `vercel.json` route or Vercel redirect) to
  emit 410. **Verification via real `curl` is mandatory — do not assume the middleware won.**
- **Over-broad matcher** could 410 a real route. Mitigated by explicit WordPress-only prefixes
  and the step-3 regression curls. Never use a bare `/wp` or catch-all matcher.
- **robots blocking would defeat the fix** (URLs must stay crawlable to be seen as 410).
  Captured as a non-goal; do not add a Disallow.
- **Middleware cost:** matcher is limited to dead paths, so normal traffic never invokes it.
- **Footer change is site-wide** but purely additive links; blast radius = one component.

---

## Operator tasks (off-repo — NOT work packages)

These require Google Search Console / host access and cannot be done from the repo. Do them
**after** WP-1 deploys.

1. **Claim 2 — force homepage reindex.** In Search Console → URL Inspection for
   `https://lanshore.com/` → *Request Indexing*. Repeat for `/services` and any page whose
   snippet still shows retired positioning. Confirm the live rendered snippet later reflects
   the new "AI Assisted SPM…" meta.
2. **Claim 1 — remove the retired PDFs.** Once WP-1 returns `410`, submit the specific legacy
   URLs (starting with `/wp-content/uploads/2020/05/SPM_Implementation-1.pdf`) via the Search
   Console **Removals** tool for fast temporary suppression; the `410` handles permanent
   deindex. Verify with `curl -sI` that each returns `410` before submitting.
3. **Related visual check (not in the four claims):** the `/about/partners` page renders
   `public/images/partners/microsoft-gold.png` with alt text "Microsoft Certified Partner." If
   the badge image itself visually reads "Microsoft **Gold** Partner," that is live retired
   positioning — swap the asset. Operator to eyeball the rendered badge; flag back if it needs
   a code follow-up (out of scope until confirmed).

---

## Open questions (decide before / during WP-1)

**Open Question 1 (product/SEO — do not silently choose).** All *copy* already says
"AI Assisted SPM"; only the `/agentic-spm/` URL slugs + `#agentic-spm` anchor carry the old
name. Which do you want?
- **(a) Leave slugs, add one crawlable "formerly Agentic SPM" alias line** (low-risk entity
  reconciliation for engines still holding the old term). → adds the conditional step to WP-1.
- **(b) Leave everything as-is** (recommended-safe; matches prior geo-audit F5). No code.
- **(c) Migrate `/agentic-spm/**` → `/ai-assisted-spm/**` with a 301 map.** *Not recommended*
  (redirect chains + transient ranking loss for marginal gain); if chosen it is a **separate,
  larger plan**, not WP-1, and warrants an ADR.

Recommendation: **(b)**, or **(a)** if you want to actively unify the entity for AI engines.

**Open Question 2 (minor).** Include `/wp-admin/` and `/wp-json/` in the 410 matcher (yes,
per sketch — they're unambiguously dead) or scope strictly to `/wp-content/` per the critique?
Recommendation: include them; zero downside, all are dead WordPress surface.

---

## Work packages

> **One implementer handles this single package end-to-end** (code + verification). The two
> fixes are tiny and thematically one job (GEO legacy cleanup); splitting them would spawn a
> second agent to re-read the codebase for ~15 lines — not warranted.

### WP-1 — Legacy-asset 410 + footer discovery expansion

**Owner:** one implementer dispatch. **Files:** `src/middleware.ts` (new),
`src/components/Footer.tsx`, and *conditionally* `src/components/home/IntroAgenticSPM.tsx`.

- [x] Create `src/middleware.ts` returning `410` (text/plain body) with a `config.matcher`
      covering `/wp-content/:path*`, `/wp-includes/:path*`, `/wp-admin/:path*`,
      `/wp-json/:path*`, `/wp-login.php`, `/xmlrpc.php`. Confirm the `NextResponse` import and
      matcher syntax against the installed Next version.
      **Deviation:** Next 16.2.10 renamed `middleware.ts` → `proxy.ts`, and this repo already
      has a `src/proxy.ts` (host-canonicalization noindex tagging, no `config.matcher` — runs on
      every request). Next refuses to build with both a `middleware.ts` and a `proxy.ts` present.
      Merged the 410 logic into the existing `proxy()` function instead (inline pathname
      prefix/exact-match check, no `config.matcher` added — adding one would have scoped the
      *existing* noindex logic down to only the WordPress paths, breaking it). Net behavior for
      the six WordPress paths is identical to the sketch.
- [x] Add **Resources** (`/resources`), **Blog** (`/blog`), and **Glossary**
      (`/resources/glossary`) entries to `FOOTER_LINKS` in `src/components/Footer.tsx`,
      reusing the existing `<li>`/`<Link>` markup (no new styles/states).
- [x] **Conditional — only if Open Question 1 resolved to (a):** add one crawlable alias
      sentence near the `#agentic-spm` section in `IntroAgenticSPM.tsx`, e.g. "AI Assisted SPM
      (formerly referred to as Agentic SPM)…". If OQ1 is unresolved or (b)/(c), skip this step
      and note it skipped.
      **Skipped per owner decision:** OQ1 resolved to (b) — leave slugs as-is. `IntroAgenticSPM.tsx`
      not touched.
- [x] Run `npm run build`; confirm exit 0 and that `middleware` shows in the build output with
      no route regressions.
- [x] Deploy to a preview URL and run the **Test strategy** curls: assert `410` on the four
      WordPress paths and `200` on `/`, `/services`, `/resources/glossary`, `/blog`, `/llms.txt`.
      Paste the status lines as evidence. If any WordPress path still returns `403`, stop and
      escalate — a platform-level rule is needed (see Failure modes).
      **Note:** verified against `npm run start` on localhost (production build), not a deployed
      preview URL — preview-deploy curls remain a post-deploy operator check (see report).
- [x] Confirm the footer on `/` renders the three new links and they are keyboard-focusable.

**Tests it ships with:** the build gate + the HTTP/DOM assertions above (this repo's
observable gate; no unit tooling exists — NO COVERAGE TOOL).

**Verify command:**
`npm run build` **and** the documented `curl -sI` assertions against the preview deploy
(410 on WordPress paths, 200 on real routes, footer links present).

---

## Prior art & alignment

- `docs/plans/geo-audit.md` (2026-07-21) already flagged the `/agentic-spm/` slug question
  (Finding 5 / Open Q B) and recommended leaving slugs as-is — this plan stays consistent and
  does not reopen it beyond Open Question 1.
- No ADR is required for WP-1. Open Question 1 option (c) (slug migration) is the only choice
  with long-lived consequences and should be captured as an ADR if pursued.
