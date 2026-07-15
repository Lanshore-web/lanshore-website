# HubSpot Integration Expansion

- **Status:** Draft v1
- **Owner:** Doug Erb (business decisions) / Israel Richner (implementation)
- **Date:** 2026-07-14
- **Portal:** HubSpot 6603479, region NA2 (app-na2.hubspot.com), subscription tier **Starter**
- **Repo:** `lanshore-web` (Next.js 16.2.10 / React 19 / Tailwind v4, server-rendered on Vercel)

## Goal

Use everything Lanshore's HubSpot Starter subscription offers on lanshore.com. Today the integration is partial: the tracking script loads globally and the single contact form posts to the Forms API through a server proxy with `hutk` attribution. This plan adds the rest of the Starter-tier surface — cookie consent banner (closing the open convergence-review finding V2: tracker ships with no consent gate), meetings scheduler, live chat, CTA pop-ups, newsletter capture, gated white-paper downloads, and a careers form — plus config hygiene (multi-form env scheme, host-gating the tracker off preview domains). Success looks like: every feature in the "Starter — implement" table below is live or portal-configured, the tracker sets no cookies pre-consent for opted-in regions, and the site degrades gracefully wherever a HubSpot env var is absent.

## HubSpot feature catalog (reviewed July 2026)

### Already live on the site
| Feature | Where |
|---|---|
| Tracking code / web analytics | `src/app/layout.tsx:71-76` — page views, sessions, source attribution, contact timeline after conversion |
| Forms API (contact form) | `src/components/ContactForm.tsx` → `src/app/api/contact/route.ts` → `api-na2.hsforms.com` v3 submit with `hutk`/pageUri/pageName context; requires `HUBSPOT_FORM_ID` (503 if unset) |

### Available on Starter — this plan implements
| Feature | Tier | Delivery |
|---|---|---|
| Cookie consent banner (Privacy & Consent) | All tiers | Portal-configured, served by existing tracker; closes finding V2 |
| Meetings scheduler embed | Free+ | Embed script + new component (Phase 3) |
| Live chat + chatflows (basic bots; Starter removes branding, adds routing) | Free+ | Served by existing tracker; CSS fix for MobileContactBar overlap (Phase 7) |
| CTA pop-ups / banners / sticky CTAs | Starter+ | Served by existing tracker; portal-configured (Phase 7) |
| Email marketing / newsletter (5× contacts send limit, no branding) | Free+ | New capture form + API route (Phase 4) |
| Gated content + automated kickback email (~10 automated emails/form on Starter) | Starter | New form + PDF delivery (Phase 5) |
| Careers application form | Free+ | New form (Phase 6); v3 API has no file upload — mailto stays for résumés |
| Shared inbox / team email | Free+ | Portal-side, pairs with chat |
| Basic reporting dashboards | Free+ | Portal-side |

### Available on Starter — catalog only, not implemented
- **Non-HubSpot forms auto-capture** — our server proxy is strictly better (validation + attribution)
- **HubSpot Payments / payment links** (US) — N/A for a services firm
- **Ads tracking** (2 connected accounts) — relevant only if Lanshore runs paid campaigns
- **Sales tools** (email tracking, templates, snippets, 1:1 video) — CRM-side, no website work

### Requires Professional+ — future roadmap
Breeze AI Customer Agent (~$0.50/resolution), full workflow automation, smart content/personalization, A/B testing, lead scoring, custom behavioral events, multi-touch attribution, Breeze Intelligence enrichment/buyer intent (credits add-on).

### Out of scope by decision
HubSpot CMS/landing-page hosting (site stays Next.js), knowledge base / customer portal (Service Pro), migrating blog content into HubSpot.

## Non-goals

- No CMS migration, no HubSpot-hosted pages; all content stays file-based in `src/lib/*.ts`.
- No new npm dependencies — HubSpot embeds are plain `next/script` + DOM.
- No résumé/file uploads (Forms v3 API limitation); mailto remains the attachment path.
- No changes to demo components; chat is excluded from demo routes via portal targeting, not code.
- No Pro-tier features and no Breeze add-ons in this pass.

## Assumptions

1. **Starter tier confirmed by owner** (2026-07-14). CTA tool, branding removal, and per-form kickback emails are therefore available; Breeze Customer Agent is not.
2. **Consent banner scope:** opt-in for EU/EEA/UK, lighter notice elsewhere — recommended default for a US/LATAM B2B audience; worldwide opt-in would cost pre-consent `hutk` attribution. Owner may override (Risk/Open question).
3. HubSpot form IDs are not secrets, but the server-proxy pattern stays (validation, attribution, no client-side portal coupling).
4. The site must not regress when any `HUBSPOT_*` env var is absent (existing 503 + mailto fallback pattern extends to all new forms; sections hide when unconfigured).
5. Next.js 16 conventions per `node_modules/next/dist/docs/` (verified 2026-07-14): `next/script` unchanged from classic; middleware is `src/proxy.ts` (node runtime only — host-gating the tracker must happen client-side); route handlers classic; server-component `process.env` reads bake at build time (fine on Vercel).
6. White papers ship as unauthenticated PDFs in `public/whitepapers/` behind a polite form gate (industry standard); no signed URLs in this pass. No PDFs exist in the repo yet — the gate UI degrades to current copy while the registry is empty.

## Risks

| Risk | Mitigation |
|---|---|
| Banner geo-targeting untestable from a US IP | Temporarily set the policy to opt-in-all-regions during verification, assert cookie behavior, then re-scope to EU/EEA/UK; use HubSpot's policy preview for geo |
| `#hubspot-messages-iframe-container` CSS offset is a third-party DOM dependency | Documented fallback: disable mobile chat via chatflow device targeting (zero code) |
| Starter limits (kickback emails/form, meetings pages, CTA quotas) differ from research | Confirm in-portal before configuring; caps affect portal config only, not code design |
| Host-gating the tracker silences analytics on the pre-cutover vercel.app production alias | Correct behavior per `src/proxy.ts` intent, but confirm domain cutover status with owner first; `NEXT_PUBLIC_HUBSPOT_TRACKING=force` escape hatch for previews |
| `.gitignore`'s `.env*` pattern swallows the new `.env.example` | Add `!.env.example` negation in the same change |
| Legacy `HUBSPOT_FORM_ID` env rename breaks prod contact form | `getFormId("contact")` falls back to legacy var; Vercel rename is a tracked cleanup, not a prerequisite |
| Chat widget overlaps the fixed MobileContactBar (h-14, bottom-0, z-50) on mobile | CSS bottom offset (Phase 7) + verify at 390×844; fallback above |
| Consent banner + chat cookies interact confusingly | Enable the chatflow's "consent to collect chat cookies" option so both flows compose |

## Exploration findings

- **Tracker:** `src/app/layout.tsx:71-76`, `<Script id="hs-script-loader" src="https://js-na2.hs-scripts.com/6603479.js" strategy="afterInteractive" />` — unconditional, fires on all hosts including previews. `docs/plans/lanshore-site-convergence.review.md` finding V2 (tracker without consent gate) is still open.
- **Contact pipeline:** `src/app/api/contact/route.ts` hardcodes portal ID, reads `HUBSPOT_FORM_ID`, validates name/email, splits name → firstname/lastname, filters empty fields, posts with `hutk`/pageUri/pageName context, 400/503/502/200 contract. `ContactForm.tsx` owns a private `getHutk()` cookie reader and an idle/sending/sent/error state machine with mailto fallback — the template for all new forms.
- **Forms elsewhere:** none. Careers (`src/app/about/careers/page.tsx`) is mailto-only; resources white papers say "request via contact form"; no newsletter anywhere. Every conversion path funnels to `/contact` via `CtaBand` (rendered on nearly every page), Header button, or `MobileContactBar`.
- **No consent stack, no other third-party scripts, no GA/GTM.** Privacy page (`src/app/privacy/page.tsx`) doesn't mention cookies at all.
- **Canonical hosts:** `src/proxy.ts:9` `CANONICAL_HOSTS = new Set(["lanshore.com", "www.lanshore.com"])` — non-canonical hosts get `X-Robots-Tag: noindex` but the tracker still loads there today.
- **Env pattern:** `HUBSPOT_FORM_ID` is the only runtime env var in the repo; no `.env.example` exists.
- **Content dates:** `src/lib/contentDates.ts` `UPDATED` map feeds sitemap lastmod — every touched page bumps its entry.

## Phases

### Phase 1 — Config foundation (no visible change)
- [ ] New `src/lib/hubspot.ts`: `HUBSPOT_PORTAL_ID` constant; `getFormId("contact" | "newsletter" | "whitepaper" | "careers")` reading `HUBSPOT_FORM_ID_CONTACT` (falls back to legacy `HUBSPOT_FORM_ID`), `_NEWSLETTER`, `_WHITEPAPER`, `_CAREERS` as static property accesses; `submitHubSpotForm(formId, fields, context)` lifted verbatim from `route.ts`
- [ ] Refactor `src/app/api/contact/route.ts` onto the lib — response contract byte-identical (400/503/502/200, same log messages)
- [ ] New `src/lib/hutk.ts`: extract `getHutk()` from `ContactForm.tsx`; import it there
- [ ] New `src/components/HubSpotLoader.tsx` (`"use client"`): renders the tracker `<Script>` only when `window.location.hostname` ∈ canonical hosts (mirror `src/proxy.ts:9` with a cross-reference comment) or `process.env.NEXT_PUBLIC_HUBSPOT_TRACKING === "force"`; swap into `layout.tsx` replacing lines 71-76
- [ ] New `.env.example` documenting all `HUBSPOT_*` vars + `NEXT_PUBLIC_HUBSPOT_TRACKING`; add `!.env.example` to `.gitignore`
- **Verify:** `npm run build` clean; with no envs, `POST /api/contact` → 503; `script#hs-script-loader` absent on localhost, present under `NEXT_PUBLIC_HUBSPOT_TRACKING=force`; zero console errors site-wide; contact form error path still shows mailto fallback.

### Phase 2 — Cookie consent banner (closes convergence finding V2)
- [ ] Portal: Settings → Privacy & Consent → Cookies → policy for lanshore.com/www; opt-in for EU/EEA/UK per Assumption 2 (temporarily opt-in-all-regions for verification)
- [ ] New `src/components/CookieSettingsButton.tsx` (`"use client"`): pushes `["showBanner"]` onto `window._hsp`; harmless no-op where tracker absent
- [ ] `src/app/privacy/page.tsx`: add "Cookies & tracking" section — HubSpot named as processor; cookies listed (`hubspotutk`, `__hstc`, `__hssc`, `__hssrc`, `messagesUtk`); opt-in/opt-out explained; `<CookieSettingsButton />` embedded. Bump `UPDATED.privacy` in `src/lib/contentDates.ts`
- [ ] `src/components/Footer.tsx`: "Cookie settings" entry next to Privacy
- [ ] Update `docs/plans/lanshore-site-convergence.review.md` V2 status once verified
- **Verify:** (force build, all-regions opt-in temporarily) no `hubspotutk` cookie pre-consent; banner container renders; Accept sets cookie, Decline doesn't; privacy-page and footer buttons re-open the banner; then re-scope policy to EU/EEA/UK.

### Phase 3 — Meetings scheduler
- [ ] Portal: create "SPM Assessment — 30 min" scheduling page; URL → Vercel `HUBSPOT_MEETINGS_URL`
- [ ] New `src/components/MeetingsEmbed.tsx`: server wrapper reads `HUBSPOT_MEETINGS_URL`, returns `null` if unset; client child renders `<div className="meetings-iframe-container" data-src={url + "?embed=true"} />` + `<Script src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js" strategy="lazyOnload" />`, min-height ~650px against CLS
- [ ] `src/app/contact/page.tsx`: new `id="book"` section ("Prefer to grab time directly?") below the form grid; bump `UPDATED.contact`
- [ ] `src/components/CtaBand.tsx`: optional `secondaryHref`/`secondaryLabel` props (outline style, e.g. `border-white/30`); defaults undefined so all existing call sites are untouched; opt in on pillar + `/spm/[slug]` pages with "Book a call" → `/contact#book`
- [ ] Defer `/book-a-call` standalone route unless paid campaigns need a landing URL
- **Verify:** env unset → no `#book` section, no layout gap; set → `iframe[src*="meetings-na2.hubspot.com"]` loads without CLS; secondary CTA appears only on opted-in pages; all other CtaBands render unchanged.

### Phase 4 — Newsletter
- [ ] Portal: email-only "Newsletter" form, subscription type "Marketing Information", consider double opt-in; GUID → `HUBSPOT_FORM_ID_NEWSLETTER`
- [ ] New `src/app/api/newsletter/route.ts`: email-only validation (reuse contact route's regex), `getFormId("newsletter")`, same 400/503/502/200 contract, hutk/pageUri/pageName context
- [ ] New `src/components/NewsletterForm.tsx` (`"use client"`): single email input; state machine copied from `ContactForm.tsx`; mailto fallback on error; dark-footer variant (`white/10` borders on `bg-ink`) + light variant
- [ ] `src/components/Footer.tsx`: render `<NewsletterForm />` only when `process.env.HUBSPOT_FORM_ID_NEWSLETTER` is set (build-time conditional — no dead form)
- [ ] `src/app/blog/[slug]/page.tsx`: end-of-article slot, same conditional ("Get new SPM & agentic AI posts by email")
- **Verify:** API matrix — missing email 400, bad email 400, env unset 503; footer/blog forms absent when env unset, present when set; test submission creates a contact in the portal (then delete it).

### Phase 5 — Gated white papers
- [ ] Portal: dropdown contact property `whitepaper_requested` (one option per paper); "White paper download" form (name, email, property); kickback email per option; GUID → `HUBSPOT_FORM_ID_WHITEPAPER`
- [ ] New `src/lib/whitePapers.ts`: typed registry `{ slug, title, description, file: "/whitepapers/<slug>.pdf", hubspotValue }[]`; PDFs land in `public/whitepapers/` when assets exist
- [ ] New `src/app/api/whitepaper/route.ts`: validates name/email/`paper` against the registry (server-side allowlist — never trust a client path); success returns `{ ok: true, url }`
- [ ] New `src/components/WhitePaperGate.tsx` (`"use client"`): card → inline name+email form → download link + auto `window.location.assign(url)`; mailto fallback on error
- [ ] `src/app/resources/page.tsx`: replace "request via contact form" white-papers copy with the gate grid; keep current copy while the registry is empty; bump `UPDATED.resources`
- **Verify:** unknown `paper` slug → 400; happy path returns a URL that 200s from `public/whitepapers/`; gate UI transitions card → form → download; kickback email lands at a test address.

### Phase 6 — Careers form
- [ ] Portal: "Careers" form (name, email, `linkedin_profile` property or default LinkedIn URL property, message) + internal notification to hiring inbox; GUID → `HUBSPOT_FORM_ID_CAREERS`
- [ ] New `src/app/api/careers/route.ts`: name + email required, optional LinkedIn URL (validate `https://` prefix), required message; contact-object fields only
- [ ] New `src/components/CareersForm.tsx` (`"use client"`): ContactForm pattern
- [ ] `src/app/about/careers/page.tsx`: replace mailto-only paragraph with the form; keep "Attaching a résumé? Email it to info@lanshore.com" (Forms v3 API cannot upload files); bump `UPDATED.careers`
- **Verify:** form renders with validation matrix (missing message → 400 etc.); mailto line retained; submission creates contact + notification.

### Phase 7 — Live chat + CTA pop-ups (portal-side + one CSS fix)
- [ ] Portal: Conversations inbox (owners, availability hours, away message); chatflow targeting all pages except `/agentic-spm/*/demo*`; enable "consent to collect chat cookies"; consider left-side widget placement (MobileContactBar's Contact button is bottom-right)
- [ ] Portal: CTA pop-ups — white-paper pop-up on `/blog/*` (scroll- or exit-intent, frequency-capped) → `/resources`; optional newsletter slide-in
- [ ] `src/app/globals.css`: mobile chat offset clearing the fixed MobileContactBar — `@media (max-width: 767px) { #hubspot-messages-iframe-container { bottom: calc(3.5rem + env(safe-area-inset-bottom)) !important; } }` (HubSpot's documented stable container id; `!important` required vs. inline styles)
- [ ] Vercel env sweep: all four `HUBSPOT_FORM_ID_*` + `HUBSPOT_MEETINGS_URL` set; retire legacy `HUBSPOT_FORM_ID` after `_CONTACT` verified in prod
- **Verify:** on canonical host (or force build): chat launcher visible; at 390×844 the launcher's bounding box clears MobileContactBar; launcher absent on all three demo routes; blog pop-up fires per targeting; console clean everywhere.

## Verification criteria (whole feature)

1. `npm run build` + `npm run lint` clean at every phase; `/verify` skill sweep (header/footer links 200, zero console errors, canonical/OG intact) after Phases 1, 2, and 7 since `layout.tsx`/`Footer` are touched.
2. Tracker loads only on canonical hosts (or forced previews); no `hubspotutk`/`__hstc` cookies before consent in opted-in regions; privacy page discloses all HubSpot cookies with a working preferences button.
3. Every new form (newsletter, white paper, careers) follows the contact form's contract: server proxy, 400/503/502/200, hutk attribution, mailto fallback, invisible when its env var is unset.
4. Meetings embed books a real meeting end-to-end on the canonical host.
5. Chat, pop-ups, and banner all compose: declining consent blocks tracking cookies but the site remains fully usable; chat never overlaps the mobile contact bar.
6. Convergence review finding V2 marked resolved with evidence.

## Out-of-scope (deferred)

- Breeze AI Customer Agent and all Professional-tier features (workflows, smart content, A/B testing, lead scoring, attribution) — revisit on plan upgrade
- `/book-a-call` standalone landing route (add if paid campaigns need it: thin page wrapping `MeetingsEmbed` + sitemap/`UPDATED` entries)
- Signed-token white-paper downloads (polite gate accepted; escalate only if leakage matters)
- Ads account connection, HubSpot Payments
- GA4/LinkedIn tags (unchanged from convergence plan deferral)

## How would this fail to ship?

- **Consent scope stalls on an owner decision:** EU-only vs. worldwide opt-in is a business/legal call (Assumption 2). If unanswered, ship EU/EEA/UK opt-in as the documented default rather than blocking Phase 2 — it strictly improves the status quo (no gate at all).
- **Portal config drifts from code:** four form GUIDs + a meetings URL live only in Vercel env; a typo yields silent 503s. Mitigated by the per-phase API verification matrix and the `.env.example` contract.
- **Chat CSS whack-a-mole:** HubSpot widget DOM changes could break the mobile offset. The fallback (device targeting) is portal-side and takes minutes — don't burn time fighting inline styles.
- **Preview blindness:** host-gating means nobody notices a broken chat/banner until production. `NEXT_PUBLIC_HUBSPOT_TRACKING=force` on a preview environment is the designated test path — use it in Phase 2 and 7 verification.
- **Starter-tier surprise:** if a researched capability (kickback emails, CTA quotas) turns out gated differently in-portal, the affected checklist item moves to Out-of-scope with a note — code design is unaffected.
- **Next.js 16 drift:** all embed/script patterns were checked against `node_modules/next/dist/docs` 2026-07-14 (`next/script` unchanged; client-only host gating; classic route handlers). Any new API touched during implementation gets the same doc check first.

## Process

- Run `/plan-audit docs/plans/hubspot-expansion.md` after each phase; `/cold-review docs/plans/hubspot-expansion.md` required before PR to main.
- Phases 1–2 ship first (compliance-critical pair). Phases 3–7 are independent after Phase 1 and can land in any order.

## Sources

- [Set up cookie tracking settings and consent banners](https://knowledge.hubspot.com/privacy-and-consent/set-up-a-consent-banner-with-the-new-editor) — all tiers, works on external sites with tracking code
- [Cookies HubSpot sets in a visitor's browser](https://knowledge.hubspot.com/privacy-and-consent/what-cookies-does-hubspot-set-in-a-visitor-s-browser)
- [Install the HubSpot tracking code](https://knowledge.hubspot.com/reports/install-the-hubspot-tracking-code)
- [Create calls-to-action (CTAs)](https://knowledge.hubspot.com/ctas/create-calls-to-action) / [Embed CTAs on an external site](https://knowledge.hubspot.com/ctas/embed-calls-to-action-cta-on-an-external-site) — Starter+
- [HubSpot free vs paid plans 2026](https://www.thewebplant.com/blog/hubspot-free-vs-paid-plans-what-should-you-choose) / [Marketing Hub pricing guide](https://blog.hubspot.com/marketing/hubspot-marketing-hub-pricing)
- [Breeze AI Customer Agent](https://www.hubspot.com/products/artificial-intelligence/ai-customer-service-agent) — Professional+, roadmap only
