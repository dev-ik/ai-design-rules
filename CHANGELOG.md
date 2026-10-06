# Changelog

## Unreleased

## v0.5.0 — Discoverable Design Skills And Browser QA

- Adapt the four supplied UI checklist skills with standalone metadata, existing graph references, concrete browser/image workflows, and explicit evidence boundaries.
- Add read-only `skills list` / `skills show` CLI commands with Markdown and JSON output.
- Install missing namespaced `.agents/skills` launchers for all 20 bundled workflows through `init`, preserving existing local files.
- Load current workflows from the pinned npm package so package updates do not overwrite customized launchers.
- Append design/browser-review routing separately from the original context block for safe upgrades from `0.4.0`.
- Extend initialization and packed-install verification for skill discovery, source retrieval, local customization, malformed markers, and symlink paths.
- Document browser and image-model prerequisites, reproducible findings, scoped verdicts, and unverified coverage.

## npm v0.4.0 — AI Design Context Package

- Rename the project to AI Design Context and use `ai-design-context` as the package name; keep the GitHub URL at `dev-ik/ai-design-rules`.
- Preserve historical releases, frozen benchmark evidence, stable graph identifiers, and schema URIs under their original names.
- Package the complete graph and upstream evidence with a dependency-free Node.js 20+ CLI and an explicit publish allowlist.
- Add `init` for preserving existing agent instructions and creating only missing templates, with repeated-run and symlink protections.
- Add installed-package `context` retrieval with absolute reading paths while preserving the existing checkout CLI contract.
- Verify offline installation and use of the actual npm tarball; run repository checks and tests before packing.
- Publish the first npm package as `ai-design-context@0.4.0`; preserve the existing historical GitHub `v0.4.0` tag.
- Add automatic npm publishing from matching GitHub Releases through OIDC Trusted Publishing, with validation-only manual runs.

## v0.4.0 — Focused Context And Applied Patterns

- Add an agent-led installation guide for pinned knowledge integration into existing product repositories.
- Add the consequential-action guidance chain: observations, research, `UX-006`, a confirmation pattern, a review prompt, and a reference specification with specification-level validation.
- Rank task context by exact identifiers and focused titles before incidental mentions, with whole-word matching and support for simple English task phrasing.
- Resolve all transitive required and upstream knowledge dependencies while limiting optional graph expansion; include an explanation for every selected object.
- Select platform context from eligible rules and patterns before ranking, and preserve JSON object fields with additive selection reasons.
- Apply `VIS-001` and `VIS-002` in Daily Home Surface and `UX-004` in Context-Preserving Preview, with concrete hierarchy, focus, interruption, and fallback contracts.
- Add regression coverage for realistic queries, dependency completeness, cycles, platform selection, and missing targets.
- Define the next paired rendered Todo run, with identical generation conditions, mobile/desktop state captures, interaction checks, and evaluation limits.
- Record the first paired rendered Todo run with frozen source, forty screenshots, exact context bundles, runtime measurements, and an internal unblinded evaluation.
- Extend Quick Capture State Review with populated-list keyboard paths and geometry checks for saving, wrapped errors, and retry, based on the observed benchmark gaps.

### Evidence Boundary

The updated patterns and review prompt remain `draft` / `seed`. The [rendered Todo pair](evidence/todo/2026-09-28-codex-paired-todo/EVALUATION.md) scored 7.42 versus 7.67 in an internal unblinded evaluation, with equal visual-hierarchy scores and a worse sequential keyboard capture path in the rules-assisted output. One pair does not establish a general quality gain, independent validation, or an improvement over the previous release. The resulting review-prompt revision still needs a new paired run.

## v0.3.0 — Expressive Systems And Agent Context

- Added primary-source observations for expressive platform materials, adaptive web UI, systematic motion, and observable agentic workflows.
- Added research on expressive system UI, motion as state continuity, and contextual agentic interfaces.
- Added `VIS-002`, `UX-004`, and `UX-005` for content-first expression, purposeful motion, and visible agent work.
- Added the `reference-driven-design` skill for evidence-backed reference selection without brand copying.
- Expanded Prototype Review and Design QA with visual layers, responsive behavior, complete state coverage, motion fallbacks, and agent lifecycle review.
- Improved research-led context retrieval so matching research can resolve downstream rules, prompts, and review gates.

### Evidence Boundary

The new visual, motion, and agentic knowledge remains `draft` and `seed`. It is traceable to primary-source observations, but it does not yet have paired rendered benchmark evidence or independent evaluation. This release improves the knowledge and review workflow; it does not claim measured visual-quality gains.

## v0.2.1 — Validation Hardening

- Fixed Unicode task lookup and exact object resolution in the agent context CLI.
- Removed unsafe HTML rendering from the runnable Todo fixture.
- Made the main validation command read-only so stale generated indexes fail CI.
- Hardened rendered benchmark screenshot path, file, and metadata validation.
- Improved malformed knowledge-object diagnostics and expanded regression coverage.

## v0.2.0 — Evidence-Aware QA and Context Retrieval

- Added focused agent context retrieval for implementation and QA tasks.
- Added DesignLint v0 for evidence-chain relationship checks.
- Added benchmark-evidence validation with explicit directional-versus-rendered boundaries.
- Extended the graph with accessibility and performance observations, research, rules, prompts, reviews, and templates.
- Added a runnable Todo reference fixture with responsive and accessibility QA coverage.
- Expanded registry validation, generated indexes, and automated test coverage.

### Evidence Boundary

The current Todo benchmark remains directional only. It does not claim paired rendered benchmark evidence, independent evaluation, or measured performance validation.

## v0.1.0 — Foundation + Benchmark Ready

- Established the schema-first knowledge graph foundation.
- Migrated research, rules, patterns, and prompts to metadata-backed objects.
- Added generated indexes for research, rules, patterns, prompts, examples, and graph reporting.
- Added validation tooling for metadata, registry coverage, relationships, and generated index sync.
- Added benchmark methodology and evaluation rubric.
- Added first todo benchmark evidence.
- Completed OSS cleanup with no personal project references.
