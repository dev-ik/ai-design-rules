# Release Readiness

Target: `v0.3.0 — Expressive Systems And Agent Context`

Verdict: PASS

AI Design Rules is ready to release a larger but still bounded knowledge update: primary-source observations, traceable seed research and rules, a reference-driven visual workflow, stronger prototype review, and improved agent context retrieval.

## Blockers

None.

## Evidence Boundary

- The new visual, motion, and agentic objects are `draft` and `seed`.
- The sources support candidate guidance and review behavior, not a claim of universal design quality.
- The Todo benchmark remains directional.
- There is no paired rendered benchmark or independent evaluation for `VIS-002`, `UX-004`, or `UX-005`.
- Release messaging must describe improved knowledge coverage and workflow, not measured output-quality gains.

## Non-Blocking Improvements

- Add rendered benchmark scenarios for consumer utility, dense operations, and agentic workspace surfaces.
- Independently review the first rendered runs before promoting new rules beyond `seed`.
- Expand `CODE_OF_CONDUCT.md` and `SECURITY.md`; both exist but remain minimal.
- Decide when observation intake volume justifies registry migration.
- Keep skills outside the registry until skill metadata migration is explicitly scoped.

## Branding And Scope

Status: PASS

- Project name remains `AI Design Rules`.
- Tagline remains `Build products. Not dashboards.`
- The new material stays vendor-neutral at the rule level while citing Apple, Google, Chrome, and Figma as evidence.
- Reference guidance explicitly prohibits copying brand composition or proprietary assets.
- The public Todo reference project remains directional and is not presented as proof of visual quality.

## Repository Hygiene

Status: PASS

- No local home-directory paths are stored in repository content.
- No private product names or private roadmap references are introduced.
- Generated indexes are updated through repository tooling.
- New skills use standalone Codex front matter and remain intentionally outside the registry.

## Schema And Registry

Status: PASS

- `npm run check` passes.
- `npm test` passes.
- Generated indexes are synchronized with registry metadata.
- The graph reports no orphan objects and no missing relationship targets.

Current graph counts:

- Observations: 11, validated but not registry-backed.
- Research: 11.
- Rules: 16.
- Patterns: 6.
- Prompts: 4.
- Checklists: 1.
- Reviews: 2.
- Reference projects: 1.
- Skills: 16, validated but not registry-backed.
- Registered objects: 41.
- Relationships: 156.

## Documentation Quality

Status: PASS

- `README.md` remains public-facing and does not overstate benchmark evidence.
- `CHANGELOG.md` includes the `v0.3.0` scope and evidence boundary.
- `RELEASE_NOTES_v0.3.0.md` explains included changes and limitations.
- `docs/KNOWLEDGE_ENGINE.md` remains the architecture source of truth.
- `docs/DESIGNLINT_READINESS.md` documents the current DesignLint v0 boundary and future scope.

## GitHub Readiness

Status: PASS

- `.github/workflows/validate.yml` runs `npm run check` and `npm test` on pull requests and pushes to `main`.
- Pull request and issue templates exist.
- `LICENSE`, `CODE_OF_CONDUCT.md`, and `SECURITY.md` exist.

## Recommended Release Positioning

Ship as `v0.3.0 — Expressive Systems And Agent Context`.

Include:

- research-backed modern UI signals from current platform guidance;
- content-first expressive visual rules;
- purposeful motion and agent lifecycle rules;
- reference-driven visual direction skill;
- evidence-aware prototype review and Design QA;
- research-led context retrieval.

Do not position the release as complete modern-design coverage or a statistically validated improvement to generated UI. Position it as a stronger evidence and execution layer ready for rendered benchmark validation.
