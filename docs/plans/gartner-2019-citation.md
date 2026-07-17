# Gartner 2019 citation (G00380338) — placement & compliance record

**Report:** "Include Implementation Partners to Successfully Deploy Sales Performance Management Solutions" — Melissa Hilbert, Patrick Sullivan, published 2019-03-18 (revised 2019-03-25), Gartner doc G00380338.
**License status:** none (no reprint license). Everything below operates under Gartner's standard quote/citation policy.
**Canonical source of truth in code:** `GARTNER_2019` in `src/lib/site.ts`. Pages render its `claims` sentences verbatim — never paraphrase, extend, or hand-copy them.

## Ground rules (binding on all future edits)

- Safe verbs only: **named in / listed in / included in / cited in**. Never "recognized by", "recommended by", "endorsed by", "top", "leading", "Gartner-certified".
- Never reproduce the report's tables or figures (not even "just Lanshore's row"), never host/link/embed the PDF, never name the other vendors or competitors it lists.
- Always show the 2019 date; never imply currency.
- Gartner® with the ® on first mention per page; plain "Gartner" after.
- Every page that mentions Gartner (these claims **or** the Magic Quadrant analyst notes) shows the trademark attribution once, as fine print in the global footer. `GARTNER_PATHS` in `Footer.tsx` controls this: platform and blog pages are computed from their data; pages that hardcode a claim are listed statically — extend the list when adding a claim to a new page.
- No ad copy / paid-media use of the Gartner name — that requires licensing.
- Platform pages: the claim may appear **only** on `/spm/xactly` and `/spm/sap-incentive-management` (the report listed Lanshore against Xactly and SAP (CallidusCloud)). Deliberately excluded: Varicent — the report listed "IBM", and although IBM's SPM product later became Varicent, the claim must match what Gartner printed.

## Placements (as implemented 2026-07-16)

| Where | Claim | Notes |
|---|---|---|
| `/about` | `claims.standard` | The one canonical full citation, anchored `#analyst-recognition` after the history paragraph |
| Homepage `DifferentiatorsSection` | `claims.short` | Links to `/about#analyst-recognition` |
| Homepage FAQ (`HOME_FAQ`) | `claims.standard` + topic sentence | Visible text and FAQPage JSON-LD read the same array, so the exact-match rule holds structurally |
| `/about/why-lanshore` | `claims.heritage` | The site has no Agentic SPM index page; this page carries the "why Lanshore for Agentic SPM" narrative |
| `/spm/xactly`, `/spm/sap-incentive-management` | lead-in + `claims.short` | Via `gartnerPartnerLeadIn` in `spmPlatforms.ts`, rendered in the "Lanshore + platform" box |
| `/llms.txt` | one Key-facts line | Composed from `GARTNER_2019` fields |
| Organization JSON-LD | `subjectOf` Article | `src/lib/schema.ts`; deliberately no `url` |
| Attribution ride-along | — | Footer fine print (via `GARTNER_PATHS`) also covers `/spm`, `/spm/compare`, Gartner-noting `/spm/[slug]` pages, and blog posts whose content mentions Gartner — those pages already used Gartner® with no trademark attribution |

## Open item (owner-gated)

The blog post on dispute resolution cites "Gartner. (2024). Dispute Resolution Cycle Time Benchmarking Report." A 2026-07-16 web search found no Gartner document by that title. If it can't be located in a Gartner subscription, the citation (and the "3 to 5 times longer" statistic attributed to it) should be removed or re-sourced — an unverifiable named Gartner citation is a bigger exposure than anything else on the site.
