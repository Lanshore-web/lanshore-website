# Agentic team install handoff

- **Date:** 2026-07-16
- **Template version:** 1.7
- **git_mode:** full
- **Companion rules (unchanged):** CLAUDE.md

## Project Test Commands status

- **Build:** REAL — `npm run build` (evidence: package.json)
- **Unit tests:** NONE — NONE — no tool in repo
- **Coverage:** NONE — NONE — no tool in repo (evidence: no pytest-cov / --cov in scan)
- **Regression / full suite:** NONE — NONE — no tool in repo
- **Lint:** NONE — NONE — no tool in repo

## Actions

- `skip_identical` `docs/plans/` — directory exists
- `mkdir` `docs/waivers/`
- `mkdir` `docs/metrics/`
- `create` `.grok/docs/coverage-policy.md`
- `create` `.grok/docs/plan-quality-standards.md`
- `create` `.grok/docs/privacy-safety.md`
- `create` `.grok/docs/test-accuracy-standards.md`
- `create` `.grok/docs/ui-design-standards.md`
- `create` `.grok/personas/gf-backend.toml`
- `create` `.grok/personas/gf-frontend.toml`
- `create` `.grok/personas/gf-plan-reviewer.toml`
- `create` `.grok/personas/gf-qa.toml`
- `create` `.grok/personas/instructions/gf-backend.md`
- `create` `.grok/personas/instructions/gf-frontend.md`
- `create` `.grok/personas/instructions/gf-plan-reviewer.md`
- `create` `.grok/personas/instructions/gf-qa.md`
- `create` `.grok/README.md`
- `create` `.grok/roles/gf-backend.toml`
- `create` `.grok/roles/gf-frontend.toml`
- `create` `.grok/roles/gf-plan-reviewer.toml`
- `create` `.grok/roles/gf-qa.toml`
- `create` `.grok/rules/accuracy-coverage.md`
- `create` `.grok/rules/spawn.md`
- `create` `.grok/skills/install-agentic-team/SKILL.md`
- `create` `.grok/skills/parallel-fullstack-feature/SKILL.md`
- `create` `.grok/skills/plan-review-loop/SKILL.md`
- `create` `.grok/skills/post-change-accuracy-protocol/SKILL.md`
- `create` `.grok/skills/regression-test-loop/SKILL.md`
- `create` `.grok/skills/targeted-unit-test-loop/SKILL.md`
- `create` `.grok/workflows/post-change-testing-protocol.md`
- `create` `fixtures/agentic-template-acceptance/bad-plan.md`
- `create` `fixtures/agentic-template-acceptance/README.md`
- `create` `fixtures/agentic-template-acceptance/sample-ui/app.js`
- `create` `fixtures/agentic-template-acceptance/sample-ui/index.html`
- `create` `fixtures/agentic-template-acceptance/sample-ui/styles.css`
- `create` `fixtures/agentic-template-acceptance/seeded-bug-notes.md`
- `create` `fixtures/agentic-template-acceptance/seeded-design-defect-notes.md`
- `create` `docs/waivers/README.md`
- `create` `docs/metrics/README.md`
- `create` `scripts/prepare_commit_metrics.py`
- `create` `scripts/record_token_usage.py`
- `create` `scripts/install_git_hooks.py`
- `create` `scripts/githooks/pre-commit`
- `create` `docs/metrics/token-ledger.md` — seed empty ledger
- `create` `VERSION` — seed from template
- `update` `.git/hooks/pre-commit` — metrics hook installed
- `backup` `AGENTS.md.bak-before-agentic-template-20260716` — from AGENTS.md
- `update` `AGENTS.md`

## Next steps

1. Confirm Project Test Commands in root `AGENTS.md` (fill TODOs or write durable waivers).
2. If Coverage is NONE: add tooling or `docs/waivers/` before merge claims coverage gate.
3. Confirm `docs/metrics/token-ledger.md` + `VERSION` exist; **every commit** must run `python scripts/prepare_commit_metrics.py --model … --input N --output M` (or `--unmeasured`). Install hooks: `python scripts/install_git_hooks.py`.
4. Optional: `grok inspect --json` and confirm project skills + spawn rule.
5. Optional: Fixture A — copy `fixtures/agentic-template-acceptance/bad-plan.md` → `docs/plans/acceptance-bad-plan.md` and run `/plan-review-loop` (optional `/cold-review` only if listed in grok inspect).
6. Prefer bundled `/review`, `/check-work`, `/implement` for product work.

## Reminders

- Prepend persona instruction files on every spawn; tags are UI-only.
- Always set `capability_mode` on spawn (QA: execute/all).
- Lead-only spawn (depth 1); see `.grok/rules/spawn.md`.
- Roles/persona defaults are catalog only — not spawn binding.
- Template feature train: 1.7; product `VERSION` patch-bumps every commit
- Never invent token counts; use --unmeasured when stats unavailable
