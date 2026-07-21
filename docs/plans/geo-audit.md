# GEO Audit & Remediation — lanshore-web

**Task:** "check GEO for this site, let me know if you find any issues"
**Branch:** `preview/faq-agentic-spm` · **Framework:** Next.js 16.2.10 (App Router, `src/app`) · React 19
**Date:** 2026-07-21

---

## Interpretation (assumption of record)

**GEO = Generative Engine Optimization** — how well the site is structured to be
crawled, understood, and cited by AI answer engines (ChatGPT/GPTBot & OAI-SearchBot,
Claude/ClaudeBot, Perplexity, Google AI Overviews/Google-Extended, Bing Copilot).
This is the overwhelmingly likely reading: a marketing site on an FAQ-focused branch.

**Discarded reading:** "geolocation." Nothing in the task or repo (no geo-IP,
i18n, or region-routing work) supports it. If the caller meant geolocation, stop and
re-scope — this plan does not address it.

---

## Goal & scope

**Goal:** Report the site's GEO health with concrete, file-level findings, and provide
a small, low-risk remediation for the genuine gaps.

**Headline result:** The site is in **strong GEO health**. There are **no blockers and
no major issues.** Crawling, indexing, canonicalization, structured data, metadata,
server-rendering, `llms.txt`, and entity naming are all already implemented to a high
standard (details in Audit). Findings are **minor consistency/polish items** plus two
**business decisions** that are the owner's to make, not ours.

**In scope:** structured-data consistency across page templates; the optional
`llms-full.txt` companion file; robots crawl-budget hygiene; surfacing the AI-training
crawler policy and the `/agentic-spm/` URL-slug question as decisions.

**Out of scope (explicit non-goals):**
- Rewriting the `/agentic-spm/**` URL namespace (redirect risk >> GEO value — see F5).
- Blocking/allowing AI **training** crawlers (business decision — see Open Question A;
  we deliberately do **not** change the crawler allow-list in this plan).
- Adding self-serving `Review`/`AggregateRating` markup (against Google policy; risks a
  manual action).
- Off-repo infra (Vercel host redirects, DNS, apex↔www 301s).
- Content writing / net-new pages. Copy is already strong and self-contained.
- Any tooling not present in this repo (no unit/lint/coverage exists; build is the gate).

---

## Audit findings

Severity ceiling across the whole audit is **minor** — stated honestly, not inflated.

### What is already correct (no action — evidence that the ceiling is minor)

- **robots** — `src/app/robots.ts` allows all crawlers (`{ userAgent: "*", allow: "/" }`)
  and additionally names GPTBot, ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot,
  Googlebot, Google-Extended, Applebot-Extended, cohere-ai. **Nothing is blocked.**
  Sitemap is referenced. No conflicting `public/robots.txt` exists.
- **sitemap** — `src/app/sitemap.ts` enumerates every route (static + PILLARS + SPM
  platforms + case studies + industries + blog posts) with honest per-page `lastModified`
  from `lib/contentDates.ts`. No orphans; no restamped build dates.
- **Structured data** — `src/lib/schema.ts` is comprehensive: Organization+ProfessionalService,
  WebSite, LocalBusiness, FAQPage, Service (+OfferCatalog), BreadcrumbList, BlogPosting,
  Blog, Article (case studies), ItemList, WebPage, and DefinedTermSet/DefinedTerm on the
  glossary. Org/WebSite/LocalBusiness are injected site-wide via `layout.tsx`. JSON-LD is
  safely serialized (`toJsonLd` escapes `<`,`>`,`&`,U+2028/9).
- **FAQPage** — emitted on home, all three pillar pages, every SPM platform page,
  `/spm/compare`, `/services/automation`, and blog posts that carry `faq`. Every schema
  FAQ is also rendered visibly via `FaqSection` (Google's visible-content requirement met).
- **Metadata** — `metadataBase` set; **all 24 page files** set title, description,
  `alternates.canonical`, and per-page `openGraph` (title/description/url). Root
  `src/app/opengraph-image.tsx` supplies an og:image inherited by every route.
  `twitter.card` is set globally (X falls back to og: tags).
- **Rendering** — Zero page-level `"use client"`. All pages are server-rendered/static;
  `"use client"` is confined to leaf components (forms, demos, analytics, header). Content
  is fully present without JS. Even the interactive demo pages carry substantial
  server-rendered explanatory prose.
- **Content signals** — exactly one `<h1>` per page; semantic `<dl>`/`<dt>`/`<dd>` for
  FAQ and glossary; descriptive alt text on all informational images (the single `alt=""`
  is the decorative hero background — correct). NAP is consistent across `lib/site.ts` and
  `lib/schema.ts` (`+1-408-899-0140`, `1795 N Fry Rd Suite 289, Katy, TX 77449`).
- **Entity naming** — "AI Assisted SPM by Lanshore" is used consistently; **no leftover
  "Agentic SPM" product-name text** anywhere (the recent normalization is clean).
  ("Agentic AI" as a general concept remains, correctly, in the glossary/blog.)
- **`llms.txt`** — present and well-formed via `src/app/llms.txt/route.ts`
  (`force-static`), advertised with a `<link rel="alternate" type="text/plain">`.
- **Preview-host protection** — `src/proxy.ts` sets `X-Robots-Tag: noindex, nofollow` on
  non-canonical hosts. **Verified this works:** Next 16 renamed middleware to `proxy.ts`;
  the build compiles it to `.next/server/middleware.js` (present), with no `config.matcher`
  so it runs on all routes. Preview/`*.vercel.app` hosts will not be indexed.

### Finding 1 — Flagship pillar pages omit BreadcrumbList schema — **minor**
- **Files:** `src/components/PillarPage.tsx` (renders `/agentic-spm/executive-dashboards`,
  `/agentic-spm/operations`, `/agentic-spm/custom-apps`).
- **Evidence:** `PillarPage.tsx` emits `serviceSchema(...)` and `faqSchema(...)` (lines
  72–73) but **no `breadcrumbSchema`**, and renders no visible breadcrumb nav. Every peer
  detail/index template *does* emit it: `spm/[slug]`, `industries/[slug]`,
  `case-studies/[slug]`, `blog/[slug]`, `spm/page`, `industries/page`, `case-studies/page`,
  `blog/page`, `resources/glossary`, `about/*`. The three most important product pages are
  the sole gap, which weakens the site-hierarchy signal answer engines use for these pages.

### Finding 2 — Demo pages emit no structured data — **minor**
- **Files:** `src/app/agentic-spm/operations/demo/page.tsx`,
  `src/app/agentic-spm/executive-dashboards/demo/page.tsx`,
  `src/app/agentic-spm/custom-apps/demo/page.tsx`.
- **Evidence:** these three pages render no `<JsonLd>` at all — no BreadcrumbList, no
  WebPage. They are in the sitemap and have real crawlable content, but carry no schema to
  locate them in the hierarchy. Lower priority than F1 (demos are secondary pages).

### Finding 3 — No `llms-full.txt` companion — **minor (optional enhancement)**
- **Files:** none yet (`src/app/llms.txt/route.ts` exists; no full variant).
- **Evidence:** the llmstxt.org convention pairs `llms.txt` (a link index — present) with
  `llms-full.txt` (the site's substantive text inlined into one document) so an answer
  engine can ingest the full corpus in a single fetch. Only the index exists. Net-new
  value; not a defect.

### Finding 4 — robots has no `Disallow` for non-content routes — **minor (hygiene)**
- **Files:** `src/app/robots.ts`.
- **Evidence:** the POST-only API handlers under `/api/*` (newsletter, contact, careers,
  whitepaper) are allowed. They are unlinked and not in the sitemap, so real impact is
  marginal, but a `Disallow: /api/` is standard crawl-budget hygiene and costs nothing.

### Finding 5 — `/agentic-spm/**` URL slug vs "AI Assisted SPM" brand — **informational (recommend no-fix)**
- **Files:** route folders under `src/app/agentic-spm/`, `lib/pillars.ts` paths.
- **Evidence:** pages branded "AI Assisted SPM" live under the older `/agentic-spm/` path.
  URL slugs are a weak entity signal, and renaming would require a fresh redirect map
  (the existing one in `next.config.ts` already 301s legacy `agentic` URLs). **Recommend
  leaving as-is;** listed for completeness, not remediation.

### Finding 6 — Site affirmatively allows AI *training* crawlers — **informational (business decision)**
- **Files:** `src/app/robots.ts`.
- **Evidence:** the allow-list explicitly names Google-Extended and Applebot-Extended —
  which exist specifically as *training-consent* signals — and GPTBot (OpenAI training).
  This is a deliberate-looking opt-in to model training. Good for citation reach; whether
  it's the desired posture is a business call, not a technical defect → **Open Question A.**

---

## Remediation approach

Bundle the concrete, non-gated fixes (F1, F2, F4) plus the optional enhancement (F3) into
a **single work package**. They share one domain (structured-data + discovery files),
touch adjacent files, carry near-zero risk, and are provable by one `npm run build` plus a
few manual fetches — so one implementer completes the batch end-to-end. Splitting per file
would burn extra agent contexts for trivial edits with no verification benefit.

**Why match the existing pattern rather than invent one:** F1/F2 reuse the *existing*
`breadcrumbSchema()` helper and the site's established "index + detail emit BreadcrumbList"
convention — no new abstraction. F3 mirrors the existing `llms.txt` route handler
(`force-static` GET returning `text/plain`) rather than adding a static `public/` file, so
it stays in sync with the same `lib/*` content sources the current `llms.txt` already
consumes (single source of truth; no drift). F5, F6, and the crawler allow-list are left
untouched pending the owner's decisions (Open Questions A & B).

---

## Change surface

- `src/components/PillarPage.tsx` — add one `<JsonLd data={breadcrumbSchema([...])} />`
  alongside the existing Service/FAQ JSON-LD. Trail: `[{Home, "/"}, {pillar.name,
  pillar.path}]` (no `/agentic-spm` hub page exists to link a middle crumb; two levels is
  correct and matches how `spm/[slug]` builds its trail from real pages).
- `src/app/agentic-spm/{operations,executive-dashboards,custom-apps}/demo/page.tsx` —
  add a BreadcrumbList `<JsonLd>` (`Home > <pillar name> > Live Demo`, using the pillar
  landing path for the middle crumb). Import `breadcrumbSchema` from `@/lib/schema`.
- `src/app/robots.ts` — add `disallow: "/api/"` to the `{ userAgent: "*" }` rule. Leave
  the AI-crawler allow-list unchanged (Open Question A).
- `src/app/llms-full.txt/route.ts` *(new)* — `force-static` GET returning
  `text/plain; charset=utf-8`, mirroring `llms.txt/route.ts`. Compose the fuller document
  from the existing content libs (`PILLARS`, `SPM_PLATFORMS`, `INDUSTRIES`, `GLOSSARY`,
  the home/pillar FAQ arrays, and the Gartner citation from `lib/site.ts`) so it never
  drifts from the pages. Advertise it with a second `<link rel="alternate">` in
  `layout.tsx` next to the existing `llms.txt` link.
- `src/lib/schema.ts` — **no change expected** (`breadcrumbSchema` already exists).

---

## Test / verification strategy

No unit/lint/coverage tooling exists in this repo; the build is the gate. Verification is
`npm run build` (must succeed) plus concrete manual checks against a local run
(`npm run start` after build, or `npm run dev`):

1. **Build green** — `npm run build` completes with no type/route errors; all four
   `/agentic-spm/*/demo` routes and the new `/llms-full.txt` route appear in the route list.
2. **Breadcrumb JSON-LD present (F1/F2)** — view source of
   `/agentic-spm/executive-dashboards` and one demo page; confirm a
   `<script type="application/ld+json">` containing `"@type":"BreadcrumbList"` with the
   expected `itemListElement` positions/URLs. Paste each into the Schema.org validator or
   Google Rich Results Test → **zero errors** (regression check that Service/FAQPage JSON-LD
   still validate too, i.e., we added rather than broke).
3. **robots (F4)** — fetch `/robots.txt`; confirm `Disallow: /api/` under `User-agent: *`,
   the `Sitemap:` line is still present, and no AI crawler line changed.
4. **llms-full.txt (F3)** — fetch `/llms-full.txt`; confirm HTTP 200,
   `Content-Type: text/plain; charset=utf-8`, non-empty body containing the pillars, SPM
   platforms, glossary terms, and Gartner citation. Confirm the `<link rel="alternate">`
   for it renders in the document head.
5. **No regression** — spot-check that `/llms.txt`, `/sitemap.xml`, and `/robots.txt` still
   return their prior content, and that an unchanged page (e.g. `/spm`) still emits its
   BreadcrumbList + ItemList JSON-LD.

---

## Risks & open questions

**Open Question A (business decision — do not silently choose).** The site currently
*opts into* AI training: `robots.ts` explicitly allows Google-Extended, Applebot-Extended,
and GPTBot, and `*` allows everything (including CCBot, Bytespider, Amazonbot). Do you want
to **keep allowing AI-training crawlers** (maximizes citation reach and dataset presence),
or **allow only answer-engine/citation bots** (e.g. OAI-SearchBot, PerplexityBot, ClaudeBot)
**while disallowing bulk-training UAs** (GPTBot, CCBot, Bytespider, Google-Extended,
Applebot-Extended)? This is a licensing/brand stance, not a technical one. If you choose to
restrict, it's a trivial follow-up edit to the same `robots.ts` (add `disallow` rules per
UA); this plan leaves the allow-list untouched until you decide.

**Open Question B (product/SEO decision).** Confirm you want to **leave the `/agentic-spm/**`
URL slugs as-is** (recommended — F5). Renaming to an `/ai-assisted-spm/**` namespace would
need a new 301 map and risks transient ranking loss for marginal GEO gain. If you'd rather
rename, that becomes a separate, larger package (new routes + redirects + sitemap + internal
links) — out of scope here by default.

**Risk — JSON-LD graph consistency.** Adding BreadcrumbList must not duplicate `@id`s or
conflict with existing Service/FAQPage nodes on the same page. Mitigation: BreadcrumbList
here has no `@id` (matches how peer pages emit it) and is independent of the Service node;
validator check in step 2 catches any collision.

**Risk — `llms-full.txt` drift.** A hand-written full file would rot. Mitigation: generate
it from the same `lib/*` sources the pages use, exactly as `llms.txt` already does.

**Decision record:** none of these rise to an ADR. Open Question A (AI-training crawler
policy) is the only choice with long-lived consequences — if you want it captured durably,
record it as a short ADR (`adr` skill) once you decide; otherwise the answer can live in
the `robots.ts` comment as the existing GEO comment already does.

---

## Work packages

> **One implementer handles this one package, end to end** — code, the manual verification
> above, and the `layout.tsx` link update it implies. The package count (1) is deliberate:
> the findings are minor and share a single domain, so a second agent context would add
> re-read cost with no benefit.

### Package 1 — GEO structured-data & discovery-file polish

Fixes F1, F2, F4 and the optional F3. Leaves crawler allow-list (Open Q A) and URL slugs
(Open Q B) untouched.

- [x] **Deviation (F1 premise was wrong):** `PillarPage.tsx` itself has no
      `breadcrumbSchema`, but its sole caller, `src/app/agentic-spm/[slug]/page.tsx`,
      already wraps it with a `BreadcrumbList` JSON-LD (`Home > AI Assisted SPM >
      <pillar name>`) — the audit missed the route wrapper. Added, then reverted, a
      second `breadcrumbSchema` inside `PillarPage.tsx`: two `BreadcrumbList` nodes on
      one rendered page would be the exact JSON-LD graph-consistency risk this plan
      itself calls out. No code change made for F1; verified via rendered-page JSON-LD
      parse that the existing route-level `BreadcrumbList` is present and valid instead.
- [x] Add a BreadcrumbList `<JsonLd>` to each of the three
      `src/app/agentic-spm/*/demo/page.tsx` files: `Home > <pillar name> > Live Demo`, using
      the pillar landing path (e.g. `/agentic-spm/operations`) for the middle crumb and the
      demo path for the last.
- [x] In `src/app/robots.ts`, add `disallow: "/api/"` to the `{ userAgent: "*" }` rule only.
      Do **not** change the AI-crawler allow-list.
- [x] Add `src/app/llms-full.txt/route.ts`: `export const dynamic = "force-static"`, GET
      returning `text/plain; charset=utf-8`, mirroring `llms.txt/route.ts`. Compose the full
      body from `PILLARS`, `SPM_PLATFORMS`, `INDUSTRIES`, `GLOSSARY`, the home/pillar FAQ
      content, and the Gartner citation/disclaimer from `lib/site.ts` — no hand-copied prose
      that could drift from the pages.
- [x] In `src/app/layout.tsx`, add a second
      `<link rel="alternate" type="text/plain" href="/llms-full.txt" />` beside the existing
      `llms.txt` link.
- [x] Run the full **Test / verification strategy** above; paste the pillar and demo pages'
      JSON-LD into a schema validator to confirm zero errors and no regression on the
      existing Service/FAQPage nodes.

**Ships with:** the manual verification evidence (build log, `/robots.txt` and
`/llms-full.txt` fetch outputs, validator results for one pillar + one demo page).

**Verify command:** `npm run build` — then the manual fetch/validator checks in steps 1–5
(no automated test suite exists in this repo).
