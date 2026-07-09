---
name: verify
description: Build, run, and drive the lanshore-web Next.js site to verify changes at the browser surface.
---

# Verifying lanshore-web

## Build & launch

```bash
npm run build            # must pass clean; Turbopack, ~60s cold
npm run dev -- --port 3799   # dev server; ready in ~10s
```

## Drive (browser surface)

Playwright is NOT a project dep. Install it in a scratch dir (`npm i playwright@1.61`) —
Chromium is already cached in `%LOCALAPPDATA%\ms-playwright`. Drive `http://localhost:3799`.

Flows worth driving:
- Home `/` — 9-section landing; hero H1 "Agentic SPM by Lanshore"; hover nav "Services" → dropdown must show "SPM Platforms".
- Status-check every `header a, footer a` href (all must be 200).
- `/spm` + `/spm/varicent` (analyst note block), bad slug → 404.
- Exec demo `/agentic-spm/executive-dashboards/demo?persona=cro|cfo|vp-sales|revops` — persona pre-tabs (needs Suspense; bogus persona must not crash). Interactions: CRO district pills, CFO scenario toggle + audit filter, VP histogram drill-in, RevOps triage buttons.
- `/agentic-spm/operations/demo` — "Run the cycle" button animates stepper + streams agent log lines.
- `/agentic-spm/custom-apps/demo` — Payout Calculator tab has 3 plan buttons; Dispute Bot has branching question buttons.
- Capture console/pageerror on every page — must be zero.

SEO surfaces: `curl /llms.txt`, `/robots.txt` (AI crawlers listed), `/sitemap.xml`,
and grep any page for `rel="canonical"` + `og:title`. Legacy redirects (e.g. `/varicent`,
`/xactly-incent`, `/uipath`) must 308 to `/spm/*` / `/services/automation`.

## Gotchas

- Windows/PowerShell host; the Bash tool is Git Bash.
- No git repo (as of 2026-07) — plan-audit/diff-based tooling won't work until `git init`.
- `next.config.ts` holds ~200 legacy 301s — order matters, specific before wildcards.
