# Lanshore Site Convergence

- **Status:** Draft v1
- **Owner:** Doug Erb
- **Date:** 2026-07-08
- **Repos:** `lanshore-web` (target, Next.js 16.2.10 / React 19 / Tailwind v4) ← ports from `C:\Users\israe\Projects\LanshoreSite` (source, Next.js 15 / Tailwind 3)

## Goal

Make `lanshore-web` the single production Lanshore site by converging the best of both codebases: the old site's landing page and branding (colors, Avenir fonts, logo treatment) ported into this project, while keeping this project's simplified navigation and its three interactive demos — with the persona dashboards upgraded to be genuinely useful per persona. Reposition the whole site around Lanshore's SPM expertise converging with agentic AI, describe the full automation tooling breadth (UiPath, n8n, VS Code, Claude Code, direct API integrations), add eight dedicated SPM-platform pages under `/spm/*`, and make the site GEO-optimized (generative-engine / answer-engine optimization plus geographic LocalBusiness signals). Success looks like: `npm run build` passes, the home page is visually the old landing page in the new brand, every nav path works, all 8 platform pages are live and linked, and structured data / metadata is complete on every route.

## Non-goals

- No port of the old site's CMS/admin stack (Neon Postgres, Drizzle, TipTap admin, next-auth). Content in this repo stays file-based in `src/lib/*.ts`.
- No port of the legacy WordPress media tree (`public/images/uploads/**`, 266 files) — only the specific assets the landing page and partner badges need.
- No new blog/press/events content; existing `src/lib/blog.ts` content stands.
- No i18n/localization (LATAM presence is expressed via schema and contact info, not translated pages).
- No visual redesign of the demos — enhancement of interactivity and persona usefulness only, restyled to the ported brand tokens.
- No changes to the HubSpot contact pipeline (`/api/contact` proxy stays).
- Not rebuilding the old site's mega-menu — the simplified 5-item nav in `src/lib/site.ts` is kept deliberately.

## Assumptions

1. **"GEO optimized" means Generative Engine Optimization** (AI-crawler/answer-engine visibility) first, with geographic schema (LocalBusiness for Katy TX + San José CR) as a secondary, cheap addition. If the user meant purely geographic SEO, the plan over-delivers rather than misses.
2. **Old-site branding wins where the two conflict.** Notably gold: old brand gold is `#C9A84C`; this repo uses `#c9c000` (yellow-green) in tokens *and hardcoded inside all three demo components*. We adopt `#C9A84C` everywhere and de-hardcode the demos to tokens.
3. **Avenir LT Pro woff2 files are licensed for web self-hosting** (they are already self-hosted on the live old site). If licensing is actually unclear, fallback is a Geist/Roboto stack — flagged as a risk below.
4. The Gartner MQ for SPM published 2026-07-06 confirms Varicent, CaptivateIQ, and Xactly as Leaders; SAP/Anaplan/Salesforce/Everstage placements are not yet public. Platform pages must only print analyst claims verified as of writing.
5. `lucide-react` may be added as a dependency (the old landing page depends on it for icons); the lean-deps posture of this repo tolerates one small icon lib.
6. The old site's ~200-entry redirect map in `next.config.ts` is authoritative for legacy URLs; old vendor URLs (`/varicent/`, `/xactly-incent/`, `/sap-commissions/`, `/anaplan/`, `/captivate-iq/`, `/performio/`, `/spiff/`) must 301 to the new `/spm/*` pages.
7. Next.js 16 conventions apply (async `params`, explicit caching, Tailwind v4 CSS-first tokens). All new code follows `node_modules/next/dist/docs/` — especially `01-app/01-getting-started/14-metadata-and-og-images.md` and `08-caching.md`.

## Risks

| Risk | Mitigation |
|---|---|
| Avenir LT Pro licensing not actually cleared for this domain | Confirm with owner; fallback font stack ready (`Roboto`/system). Font files are a drop-in swap either way. |
| Tailwind 3 → Tailwind v4 port drift (old `tailwind.config.ts` tokens vs. new `@theme` CSS) | Port tokens once into `globals.css` `@theme inline` and grep-audit all hardcoded hex values in components afterward. |
| Analyst claims on vendor pages go stale or are wrong (MQ is 2 days old) | Only print claims with public vendor-confirmed sources; keep an `analystNote` field per platform so copy is centralized and easy to update. |
| Demo enhancement scope creep ("extremely useful" is open-ended) | Time-box to the enhancement list in Phase 5; anything beyond goes to Out-of-scope. |
| Breaking the existing ~200 legacy redirects while adding new ones | Redirects are additive; run `npm run build` and spot-check a sample of legacy URLs in dev. |
| Old landing hero background JPG is large (`Banner-BG-1-scaled.jpg`) | Re-encode/resize during port; serve via `next/image` or CSS with an optimized copy. |
| Two sites' messaging conflict (old H1 "AI Assisted SPM" vs. new "Agentic SPM by Lanshore") | Converge on "Agentic SPM" language per the user's stated agentic-AI direction; keep old hero *structure*, update copy. |

## Exploration findings

### Target repo (`lanshore-web`)
- Next.js **16.2.10**, React 19, Tailwind **v4 CSS-first** (no `tailwind.config`; tokens in `src/app/globals.css` via `@theme inline`). Runtime deps are only next/react/react-dom — no icon, chart, or animation libs. Not a git repo yet.
- **Simplified nav (KEEP):** data-driven `NAV` in `src/lib/site.ts:26`, rendered by `src/components/Header.tsx`. Five items: Agentic SPM (dropdown: Executive Dashboards / SPM Operations / Custom Apps), Services, Case Studies, Resources (dropdown), About (dropdown) + gold Contact CTA. Footer columns in `FOOTER_COLUMNS` (`site.ts:67`).
- **Demos (KEEP + ENHANCE):** three client components with mock data, shared fictitious client "Meridian Trust Bank":
  - `/agentic-spm/executive-dashboards/demo` → `src/components/DemoDashboard.tsx` + `src/lib/demoData.ts`. **4 personas:** CRO, VP Sales, CFO, RevOps — tabs with KPI cards, hand-rolled SVG charts, Q&A accordion. Interactivity today: tab switch + accordion only.
  - `/agentic-spm/operations/demo` → `src/components/OperationsDemo.tsx` (data inlined). Comp-cycle pipeline + Xactly→Varicent migration mode; clickable "Apply suggested fix" exception queue.
  - `/agentic-spm/custom-apps/demo` → `src/components/CustomAppDemo.tsx` (data inlined). "Meridian Comp Hub": statement, scripted dispute chat, approvals, live payout calculator with sliders.
  - All three hardcode hex colors (`#023545`, `#C9C000`, `#1d7082`) instead of using tokens.
- **Current tokens** (`globals.css:5`): ink `#02526a`, ink-deep `#023545`, accent `#00768a`, gold `#c9c000`, paper `#f1f5f9`. Fonts: Geist Sans/Mono via `next/font/google`.
- **Routes:** home, services, case-studies (+slug), industries (+slug), blog (+slug), resources (+glossary), about (+why-lanshore/partners/careers), contact, privacy, 3 pillar pages `/agentic-spm/[slug]` (from `src/lib/pillars.ts`) + 3 demo routes, `/api/contact` (HubSpot), `sitemap.ts`, `robots.ts`.
- **SEO today:** programmatic sitemap/robots, Organization + FAQ + Service JSON-LD (`src/lib/schema.ts`), ~200 legacy 301s in `next.config.ts`. **Gaps:** no OG/twitter metadata, no `opengraph-image`, no canonicals, no WebSite/Breadcrumb schema, no LocalBusiness, nothing GEO-specific.
- **Next 16 gotchas** (per bundled docs, already followed in repo): `params`/`searchParams` are Promises; caching is explicit/opt-in (`use cache`, `cacheLife`, `cacheTag`); `PageProps<'/route'>` helper types are available; Turbopack default.

### Source repo (`LanshoreSite`)
- Next.js 15 + Tailwind 3.4 + lucide-react; `trailingSlash: true`; full CMS stack (not ported).
- **Landing page = 9 ordered sections** in `src/app/page.tsx:33-46`, all in `src/components/home/`:
  1. `HeroSection` — full-bleed bg image + `#001E2D`/62% overlay, partner badge, H1 "AI Assisted SPM", focus links, subhead, 2 CTAs, 3-stat strip
  2. `ProblemSolutionSection` — "How It Works": 3 numbered cards (The Gap / The Agents / The Outcome)
  3. `IntroAgenticSPM` — dark teal banner, decorative rings, 3 overlapping feature cards (negative margin)
  4. `DifferentiatorsSection` — dark, 4-stat grid (15+ yrs, 9 platforms, AI-First, Global)
  5. `UiPathDemoSection` — copy + YouTube thumb (video `cX8N9ge1Jrs`)
  6. `SPMComparisonSection` — "From Broken to Best-in-Class" problems→solutions blocks
  7. `TestimonialCarousel` — 3 static cards (Whip Media, Syniverse, L&L Oilfield)
  8. `IndustriesSection` — 6 industry cards
  9. `HomeContactSection` — value-prop list + contact form
  - Effects: CSS-only transitions, header shrink via IntersectionObserver, no animation lib.
- **Brand tokens** (`tailwind.config.ts:11-42`, "exact values from live site CSS"): dark `#003e50`, nav `#173C4D`, primary `#135a76`, button `#125773` (hover `#6492A9`), link-hover `#63b3ed`, **gold `#C9A84C`** (light `#E2C87A`), teal-light `#eef6f9`, cta `#1D7082` (hover `#155f73`), overlay `#001E2D`, section-alt `#F2F6F8`, body `#1a202c`, muted `#868686`; separate validated chart palette: blue `#3d94c9`, gold `#a8862e`, surface `#003e50`, panel `#003245`.
- **Fonts:** self-hosted AvenirLTPro-Book (body) + AvenirLTPro-Black (headings) at `public/fonts/**/font.woff2`, fallback Roboto/system. Helper classes `.btn-primary`, `.container-site` (1200px), `.section-padding` in `globals.css:40-82`.
- **Assets to lift:** `/images/logo/lanshore-logo.png`, white logo `/images/uploads/2023/10/logo-white.png`, hero bg `/images/uploads/2024/04/Banner-BG-1-scaled.jpg`, partner badges (Microsoft Gold, UiPath ×2, Varicent) — no favicon exists in either repo root (new repo has `favicon.ico` only; old has none).
- **Old vendor pages** (redirect sources): `/varicent/`, `/xactly-incent/`, `/sap-commissions/`, `/anaplan/`, `/captivate-iq/`, `/performio/`, `/spiff/`, plus `/akeron/`, `/iconixx/`, `/incentivate/`, `/uipath/`, `/microsoft-power-automate/`.
- **Old SEO to adopt:** per-page canonical + OpenGraph + Twitter metadata, `robots.ts` explicitly allowing AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, cohere-ai), rich `schema.ts` (Organization+ProfessionalService with `knowsAbout`, WebSite, LocalBusiness ×2, Breadcrumb, Article, FAQPage, Service, Person builders; XSS-safe `toJsonLd`). Contact data incl. LATAM office (San José, CR).

### SPM platform research (2026-07)
Top 8 for dedicated pages, with verified analyst standing:
1. **Varicent** — varicent.com — Leader: Forrester Wave Q1 2025 + Gartner MQ 2026 (8th consecutive). AI-native platform (Sales Planning/Designer/Research Assistants).
2. **Xactly** (Incent) — xactlycorp.com — Leader, Gartner MQ 2026. "Fleet of Agents" + Intelligence Studio (2026).
3. **CaptivateIQ** — captivateiq.com — Leader in both (Wave Q1 2025, MQ 2026). CaptivateIQ Agents + MCP server (2026).
4. **SAP SuccessFactors Incentive Management** (ex-CallidusCloud → SAP Commissions) — sap.com/products/hcm/incentive-management.html — enterprise incumbent; Joule copilot. **Services hook: legacy-stack support ends beyond 2026 → migration wave.**
5. **Anaplan** — anaplan.com — connected-planning SPM (territory/quota/capacity/ICM); CoPlanner agents; IDC MarketScape Leader.
6. **Salesforce Spiff** (ICM in Sales Cloud) — salesforce.com/sales/incentive-compensation-management/ — Spiff acquired Feb 2024; Agentforce roadmap.
7. **Performio** — performio.co — Strong Performer Wave Q1 2025; named in MQ 2026; first MCP server in ICM; AI Implementation Agents.
8. **Everstage** — everstage.com — Strong Performer Wave Q1 2025; #1 on G2/Peer Insights; Agent Core agentic layer.
- Slugs: `/spm/varicent`, `/spm/xactly`, `/spm/captivateiq`, `/spm/sap-incentive-management`, `/spm/anaplan`, `/spm/salesforce-spiff`, `/spm/performio`, `/spm/everstage`.
- Near-misses (mention on an index page, no dedicated page): Oracle, beqom, Forma.ai.
- Caveat: only print MQ 2026 placements for Varicent/CaptivateIQ/Xactly (+ "recognized in" for Performio) until others are public.

## Phases

### Phase 1 — Branding foundation
Port the old site's brand system into Tailwind v4 tokens; everything later builds on this.
- [x] Copy Avenir woff2 files into `public/fonts/`; replace Geist with `next/font/local` (Book=body, Black=headings) per Next 16 fonts doc; keep a mono var for demo code accents
- [x] Rewrite `globals.css` `:root`/`@theme inline` tokens to old-site palette (dark `#003e50`, nav `#173C4D`, primary `#135a76`, button `#125773`, gold `#C9A84C`, gold-light `#E2C87A`, cta `#1D7082`, overlay `#001E2D`, section-alt `#F2F6F8`, teal-light `#eef6f9`, body/muted) while keeping token *names* the new repo's components already use (`ink`, `accent`, `gold`, `paper`, `line`) mapped to new values, plus new `chart-*` tokens (`#3d94c9`, `#a8862e`, `#003e50`, `#003245`)
- [x] Port `.btn-primary`/`.btn-secondary`/`.btn-outline-white`/`.container-site`/`.section-padding` component classes
- [x] Copy brand assets: logo, white logo (wire into Footer), hero bg (re-encoded/optimized), partner badges; add `lucide-react`
- [x] Create favicon set + `opengraph-image` (brand-colored, per `14-metadata-and-og-images.md`); remove starter SVGs (`next.svg`, `vercel.svg`, etc.)
- [x] Grep-audit for now-orphaned hex codes (`#c9c000`, `#00768a`, …) across `src/` and swap to tokens (demos get fully de-hardcoded here or in Phase 5 — tracked, not silently skipped)
- **Verify:** `npm run build` passes; home/header/footer render in new palette + Avenir; no hardcoded old-gold hex remains outside `demoData`/demo components (which are queued for Phase 5).

### Phase 2 — Landing page port (keep simplified nav)
- [x] Recreate the 9 old-site home sections as components in `src/components/home/`, adapted to Tailwind v4 tokens and Next 16 (`next/image`, RSC by default, client only where interactive)
- [x] Converge copy to agentic positioning: H1 becomes "Agentic SPM" framing (merge old hero structure with `ENTITY` "Agentic SPM by Lanshore"); stats strip updated (15+ years, platforms count, AI providers); "Explore Agentic AI" CTA → `/agentic-spm` pillars; section 5 generalized from "UiPath demo" to "Automation in Action" (keeps the YouTube video, adds the tooling-breadth message, links to Phase 4 page)
- [x] Wire section 3 (IntroAgenticSPM) and pillar cards to the existing three pillar pages + live demos; keep comparison table or old `SPMComparisonSection` — pick one, don't ship both
- [x] Keep `Header.tsx`/`NAV` structure untouched except: restyle to brand (incl. old mega-menu's translucent blur aesthetic on dropdowns if it fits), add "SPM Platforms" link (see Phase 3), port header shrink-on-scroll + `MobileContactBar` if low-effort
- [x] Keep FAQ + JSON-LD emission on home; port testimonials (real names from old site replace/merge current carousel content)
- **Verify:** side-by-side eyeball vs. old site: same section order and feel, new brand + agentic copy; Lighthouse perf not degraded by hero image; all home links resolve.

### Phase 3 — SPM platform pages (top 8)
- [x] Create `src/lib/spmPlatforms.ts`: typed records for the 8 platforms (name, vendor, former names, official URL, positioning paragraph, capabilities, customer profile, AI/agentic features, verified `analystNote`, Lanshore services angle — e.g., SAP migration deadline hook, Xactly→Varicent migration demo tie-in)
- [x] Create `/spm/page.tsx` (index: "SPM Platforms We Implement", technology-agnostic positioning, near-miss vendors mentioned) and `/spm/[slug]/page.tsx` with `generateStaticParams` + `generateMetadata` (canonical, OG, twitter) + Service/Breadcrumb/FAQ JSON-LD per page, linking out to official vendor URLs
- [x] Each page includes a "Lanshore + {platform}" section (implementation, managed services, agentic augmentation) and contact CTA
- [x] Nav: add to `NAV` under a sensible spot (e.g., Services dropdown or new "Platforms" item — keep total top-level ≤ 5 + CTA); add footer column links
- [x] Add 301s in `next.config.ts` from old vendor URLs (`/varicent/`, `/xactly-incent/`, `/sap-commissions/`, `/anaplan/`, `/captivate-iq/`, `/performio/`, `/spiff/`) → `/spm/*`; also `/akeron/`, `/iconixx/`, `/incentivate/` → `/spm` index
- [x] Add `/spm` + 8 slugs to `sitemap.ts` (priority 0.9)
- **Verify:** all 9 routes build statically; every analyst claim on-page traces to a source in this plan; redirects resolve in dev; sitemap includes them.

### Phase 4 — Automation tooling breadth page
- [x] Create an "Automation & Integration" page (route: `/services/automation` or expand `/services` — decide during build, favor dedicated page for GEO) describing tool-agnostic delivery: UiPath, n8n, VS Code, Claude Code, Microsoft Power Automate, and direct API integrations — "whatever tools our customers prefer, we do it all"
- [x] Tie to agentic narrative: RPA → agentic AI roadmap (port the old site's strongest copy from `/rpa-implementation-services/`, `/agentic-ai/`); FAQ + Service schema
- [x] Link from home section 5, Services page, footer; add legacy redirects (`/uipath/`, `/microsoft-power-automate/`, `/rpa-implementation-services/`, `/rpa-support-services/` → here) unless already mapped in the existing redirect table (check first)
- **Verify:** page builds, is in sitemap + nav/footer, names all five tool categories, redirects don't conflict with existing map.

### Phase 5 — Demo enhancement (persona-useful dashboards)
- [x] De-hardcode all demo hex colors to tokens (restyle to ported brand; keep dark dashboard shell using `chart-surface`/`chart-panel`)
- [x] Executive Dashboards (`DemoDashboard.tsx` + `demoData.ts`) — make each persona genuinely decision-useful:
  - CRO: add time-range/district filter that recomputes KPIs + chart; "agent insight" callouts (e.g., spend anomaly flagged with recommended action)
  - VP Sales: clickable histogram buckets → drill into rep list; outlier cards get "ask the agent why" expansion
  - CFO: accrual variance drill-down + downloadable-looking audit trail filter; scenario toggle (e.g., "what if Q3 attainment +5%?") recomputing accrual line
  - RevOps: exception queue with triage actions (approve/route/dismiss mutating local state), agent-suggested resolutions, SLA aging indicator
- [x] Operations demo: add a "run the cycle" play button animating the pipeline stepper stage-by-stage with agent log lines; keep fix-apply interactions
- [x] Custom Apps demo: extend Dispute Bot with 1–2 more branches; payout calculator gains plan-select (2–3 plan designs changing the curve)
- [x] Add a persona-picker entry point ("I'm a CRO / CFO / VP Sales / RevOps lead") on the executive-dashboards pillar page linking into the demo pre-tabbed (`?persona=` param, per Next 16 `use-search-params` doc)
- **Verify:** each persona tab has ≥2 interactive affordances beyond tab-switching; interactions mutate visible state; no console errors; demos still fully client-side mock data.

### Phase 6 — GEO + geographic optimization
- [x] Metadata completeness: `openGraph` + `twitter` + canonical on every route (root template + per-page), `opengraph-image` inheritance verified per Next 16 metadata docs
- [x] Port/expand `schema.ts` from old site: Organization+ProfessionalService with `knowsAbout` (updated to the 8 platforms + n8n/Claude Code/UiPath), WebSite, BreadcrumbList on all nested routes, LocalBusiness ×2 (Katy TX + San José CR with geo coordinates), Person (leadership if available), FAQPage on home/pillars/platform pages; use XSS-safe `toJsonLd`
- [x] `robots.ts`: explicitly allow AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, cohere-ai) as old site did
- [x] Add `llms.txt` (route handler or public file) summarizing the site's entities: Agentic SPM by Lanshore, pillars, 8 platforms, services, contact — the answer-engine index
- [x] GEO content pass: every key page opens with a direct, quotable answer paragraph (who/what/for-whom) so answer engines can extract; glossary already exists — link platform pages ↔ glossary terms
- [x] Sitemap audit: all new routes present with sensible priorities; `changeFrequency` sanity pass
- **Verify:** `npm run build` output inspected — every page emits canonical + OG; validate 3 sample pages' JSON-LD with a schema validator; robots.txt lists AI crawlers; `/llms.txt` serves.

### Phase 7 — Ship checks
- [x] `npm run lint` + `npm run build` clean
- [x] Run `/verify` skill: drive home page, nav, one platform page, all three demos end-to-end in the running app
- [ ] Run `/plan-audit docs/plans/lanshore-site-convergence.md` and reconcile MISSING/UNPLANNED
- [ ] Run `/cold-review docs/plans/lanshore-site-convergence.md` findings resolved (required before PR)
- [ ] Init git repo if still absent (needed for cold-review/PR flow) — confirm with owner first
- **Verify:** all checks green; walkthrough of the site in dev matches the Goal paragraph.

## Verification criteria (whole feature)

1. `npm run build` and `npm run lint` pass with zero errors.
2. Home page reproduces the old landing page's 9-section structure in the ported brand (Avenir, `#003e50`/`#C9A84C` palette) with agentic-SPM copy.
3. Simplified nav retained (≤5 top-level + CTA) and every nav/footer link resolves.
4. `/spm` index + 8 platform pages live, statically generated, each with canonical/OG/JSON-LD and only verified analyst claims; old vendor URLs 301 to them.
5. Automation page names UiPath, n8n, VS Code, Claude Code, and API integrations.
6. Each demo persona dashboard has ≥2 meaningful interactions beyond tab switching; demos use brand tokens, not hardcoded hex.
7. Every route emits canonical + OG + relevant JSON-LD; robots allows AI crawlers; `/llms.txt` serves; LocalBusiness schema for both offices.
8. Lighthouse (dev spot-check) shows no perf regression from the hero image or fonts (font-display swap, optimized JPG/WebP).

## Out-of-scope (deferred)

- CMS/admin, DB-driven careers/roles, gated whitepaper downloads (Turnstile), GA4/LinkedIn analytics tags (add when IDs confirmed for this deployment)
- Dedicated pages for near-miss vendors (Oracle, beqom, Forma.ai) and legacy partners (Akeron, Iconixx, Incentivate)
- Real data feeds for demos (stay mock), demo persistence, or auth
- Spanish/LATAM localized pages
- Blog content expansion, video library, events
- PMO offerings (`/agentic-pmo-by-lanshore/`) — SPM focus only for this pass

## How would this fail to ship?

- **Scope explosion in Phase 5:** "extremely useful dashboards" is unbounded; without the fixed enhancement list, demo polish could consume the whole budget. The checklist is the contract — anything more is deferred.
- **Brand-port whack-a-mole:** hardcoded hex in demos and one-off components silently keeps the old palette, shipping a two-brand Franken-site. Mitigated by the Phase 1 grep-audit as an explicit gate.
- **Analyst-claim liability:** printing unverified 2026 MQ placements for SAP/Anaplan/Salesforce/Everstage could require an embarrassing retraction; the `analystNote` field + verified-claims-only rule prevents it.
- **Font licensing surprise** blocks the whole brand port late in the game — resolve Assumption 3 in Phase 1, not Phase 7.
- **Next.js 16 drift:** writing Tailwind-3-style config or sync-`params` code from training-data habit breaks the build; every phase's first step when touching a new API is the bundled doc in `node_modules/next/dist/docs/`.
- **Redirect regressions:** clobbering the existing 200-entry map while merging new 301s would tank legacy SEO — new entries are appended and the build's redirect table is diffed.
- **No git repo:** cold-review and PR flow assume version control; this repo isn't initialized. If git init is deferred indefinitely, review/rollback discipline fails — hence the Phase 7 checklist item.
