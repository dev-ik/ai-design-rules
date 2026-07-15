# Knowledge Engine

AI Design Rules is a schema-first, AI-first engineering knowledge graph for product design decisions.

It is not a documentation archive. Every object should connect to upstream evidence and downstream usage through machine-readable metadata.

```text
observation -> research -> knowledge -> rules -> patterns -> prompts -> reference projects -> reviews
```

## Knowledge Flow

## How Knowledge Enters

Knowledge enters as an observation: a specific product behavior, design decision, failure mode, review finding, or implementation result.

Observations should be concrete:

- product and source;
- screen or workflow;
- behavior observed;
- why it may matter;
- date captured.

Why this matters: raw observations prevent the repository from becoming a set of unsupported opinions.

## Observations Become Research

Research groups observations into product studies or theme studies.

A research file should separate:

- source signals;
- observed behavior;
- design takeaways;
- candidate rule directions;
- what not to copy blindly.

Why this matters: research turns raw evidence into reusable context without becoming a rule too early.

## Research Becomes Rules

Rules are extracted when the same design decision appears stable, reusable, and reviewable.

A rule must:

- point to source research;
- state the design instruction;
- explain why it exists;
- define good and bad output;
- provide an agent checklist.

Why this matters: rules are the smallest reviewable unit of product design guidance.

## Rules Compose Patterns

Patterns are compositions of rules. A pattern solves one product or UX problem by combining required rules, mobile behavior, desktop behavior, states, related research, and related patterns.

Patterns must follow `docs/PATTERN_SPEC.md`.

Why this matters: patterns prevent prompts from reassembling product structure from scratch every time.

## Patterns Drive Prompts

Prompts should reference patterns and rules explicitly.

A prompt should define:

- target product or workflow;
- required patterns;
- required rules;
- reference project, when applicable;
- review expectations.

Why this matters: prompts become application instructions, not a parallel source of design advice.

## Prompts Are Validated By Reference Projects

Reference projects show whether patterns and prompts work in realistic product contexts.

A reference project should list:

- patterns used;
- rules applied;
- research influence;
- validation questions;
- known gaps.

Why this matters: examples keep the knowledge graph grounded in product outcomes.

## Reviews Improve Knowledge

Reviews identify missing evidence, weak rules, overlapping patterns, and prompt failure modes.

A review can:

- add observations;
- recommend research updates;
- change rule status;
- clarify pattern ownership;
- mark prompts as unsafe, weak, or validated.

Why this matters: reviews are feedback loops, not final reports.

## Knowledge Object Metadata

Every knowledge object should use common metadata. Existing files are in migration; new objects should use schema-compatible YAML front matter.

The metadata schema lives in `schema/common.schema.json`.

Object-specific schemas live in `schema/`.

The registry proof-of-format lives in `registry/`.

Recommended machine-readable front matter:

```yaml
---
id: OBJ-000
alias: UX-001
slug: object-slug
title: Object title
object_type: rule
status: draft
version: 0.1.0
category: ux
relationships:
  - type: derived_from
    target: RESEARCH-00001
last_reviewed_at: 2026-06-25
---
```

Common status values:

- `draft`
- `active`
- `deprecated`
- `superseded`

Common maturity values:

- `seed`
- `reviewed`
- `validated`
- `canonical`

Common risk values:

- `low`
- `medium`
- `high`
- `critical`

## Maturity Lifecycle

Maturity expresses the strength of evidence behind an object, not whether its prose sounds complete.

```text
seed -> reviewed -> validated -> canonical
```

- `seed`: a draft object with traceable upstream evidence but no completed review.
- `reviewed`: an object reviewed on the recorded `last_reviewed_at` date; it can remain `draft` while follow-up work is open.
- `validated`: an `active` object with a resolvable `validates` relationship to evidence, a reference project, or a review.
- `canonical`: an `active`, validated object with a stable major version (`1.x.x` or higher). Use sparingly for guidance that should be the default choice.

`tools/validate-knowledge.mjs` enforces these observable lifecycle invariants. It cannot infer historical process, so do not promote maturity without recording the underlying review or validation relationship.

## Global IDs, Aliases, And Slugs

Use three identifiers:

- `id`: stable machine identifier. It must not change after publication.
- `alias`: human-friendly identifier such as `UX-001`, `VIS-001`, or `A11Y-001`.
- `slug`: URL-safe and file-friendly name.

Global ID prefixes:

- `OBS-00001`
- `RESEARCH-00001`
- `RULE-00001`
- `PAT-00001`
- `PROMPT-00001`
- `SKILL-00001`
- `REVIEW-00001`
- `CHECK-00001`
- `REF-00001`

Do not rename all existing files yet. Current files may keep human-readable names while metadata and registry entries introduce global IDs.

## Registry

The registry is the transitional source for machine-readable object discovery.

- `registry/objects.json` lists known object IDs, aliases, slugs, titles, types, statuses, versions, categories, and paths.
- `registry/relationships.json` lists typed edges between objects.

Generated indexes are the preferred navigation layer for migrated objects:

- `research/GENERATED_INDEX.md`
- `rules/GENERATED_INDEX.md`
- `patterns/GENERATED_INDEX.md`
- `prompts/GENERATED_INDEX.md`
- `checklists/GENERATED_INDEX.md`
- `examples/GENERATED_INDEX.md`
- `reviews/GENERATED_INDEX.md`
- `graph/GENERATED_GRAPH.md`

Manual indexes are temporary context pages. They should not become the source of truth for migrated objects.

Run `npm run generate:indexes` after changing registry metadata.

## Migration Status

The migrated knowledge flow is now registry-backed:

```text
research -> rules -> patterns -> prompts -> reference projects -> reviews
                              \-> checklists -/
```

Every current product research file, rule, pattern, prompt, checklist, reference project, and review in the migrated flow has schema-compatible YAML front matter with:

- global machine ID;
- human alias;
- slug;
- object type;
- status and version;
- category and tags;
- maturity and risk level;
- typed relationships.

`tools/validate-knowledge.mjs` validates schema-compatible observation front matter, every migrated directory (including `checklists/`, `examples/`, and `reviews/`), local Codex skill metadata, and registry relationship targets in both directions.

It also checks that generated indexes are in sync with registry metadata.

Observations are validated but are not registry-backed yet. Skills use standalone Codex metadata and are intentionally not registry objects until skill metadata migration is explicitly requested.

## Object Types

## Observation

Raw evidence captured before synthesis.

Required metadata:

- ID: stable `OBS-00001`.
- Title: concise observation name.
- Status: `draft`, `active`, `deprecated`, or `superseded`.
- Version: usually `0.1.0`.
- Category: product area or theme.
- Source: product, URL, screenshot, review, or implementation.
- Related Objects: linked research or review.
- Depends On: usually none.
- Used By: research files that absorb it.
- Last Reviewed: date.

## Research

Synthesis of observations from one product or theme.

Required metadata:

- ID: stable `RESEARCH-00001`.
- Title: product or theme name.
- Status: `draft`, `active`, `deprecated`, or `superseded`.
- Version: semantic version.
- Category: product, ux, ia, visual, accessibility, performance.
- Source: observations and external sources.
- Related Objects: adjacent research.
- Depends On: observations.
- Used By: rules and patterns.
- Last Reviewed: date.

## Rule

Reviewable design instruction extracted from research.

Required metadata:

- ID: stable `RULE-00001`.
- Title: rule name.
- Status: `draft`, `active`, `deprecated`, or `superseded`.
- Version: semantic version.
- Category: product, ia, ux, visual, accessibility, performance.
- Source: research files.
- Related Objects: adjacent or conflicting rules.
- Depends On: research.
- Used By: patterns, prompts, checklists, reference projects.
- Last Reviewed: date.

## Pattern

Reusable product structure composed from rules.

Required metadata:

- ID: stable `PAT-00001`.
- Title: pattern name.
- Status: `draft`, `active`, `deprecated`, or `superseded`.
- Version: semantic version.
- Category: product, ia, ux, mobile, workflow, accessibility.
- Source: required rules and related research.
- Related Objects: parent, child, alternative, adjacent patterns.
- Depends On: rules.
- Used By: prompts, reference projects, reviews.
- Last Reviewed: date.

## Prompt

Agent instruction that applies patterns and rules to a target task.

Required metadata:

- ID: stable `PROMPT-00001`.
- Title: prompt name.
- Status: `draft`, `active`, `deprecated`, or `superseded`.
- Version: semantic version.
- Category: generation, review, refactor, reference-project.
- Source: patterns and rules.
- Related Objects: examples, checklists, skills.
- Depends On: patterns and rules.
- Used By: skills and reference projects.
- Last Reviewed: date.

## Skill

Packaged agent workflow using prompts, patterns, rules, and checks.

Required metadata:

- ID: stable `SKILL-00001`.
- Title: skill name.
- Status: `draft`, `active`, `deprecated`, or `superseded`.
- Version: semantic version.
- Category: product, review, implementation, QA.
- Source: prompts, patterns, rules.
- Related Objects: checklists, reference projects.
- Depends On: prompts and checklists.
- Used By: agents.
- Last Reviewed: date.

## Checklist

Review artifact used to validate output.

Required metadata:

- ID: stable `CHECK-00001`.
- Title: checklist name.
- Status: `draft`, `active`, `deprecated`, or `superseded`.
- Version: semantic version.
- Category: review, accessibility, mobile, design-qa.
- Source: rules and patterns.
- Related Objects: reviews, prompts.
- Depends On: rules and patterns.
- Used By: reviews, prompts, skills.
- Last Reviewed: date.

## Review

Evaluation of a product, prompt output, rule set, or reference project.

Required metadata:

- ID: stable `REVIEW-00001`.
- Title: review name.
- Status: `draft`, `active`, `deprecated`, or `superseded`.
- Version: semantic version.
- Category: quality-gate, design-qa, prompt-eval, reference-eval.
- Source: reviewed object.
- Related Objects: issues found and patches proposed.
- Depends On: checklists, rules, patterns.
- Used By: research updates, rule updates, roadmap.
- Last Reviewed: date.

## Reference Project

Product context used to validate the graph.

Required metadata:

- ID: stable `REF-00001`.
- Title: reference project name.
- Status: `draft`, `active`, `deprecated`, or `superseded`.
- Version: semantic version.
- Category: consumer, productivity, collaboration, mobile-first.
- Source: product brief and prompts.
- Related Objects: patterns, rules, research.
- Depends On: prompts, patterns, rules.
- Used By: reviews and future DesignLint tests.
- Last Reviewed: date.

## Relationship Types

Use these relationship names consistently. Do not use broad untyped `related_objects`.

## `derived_from`

Use when an object is extracted from evidence.

Examples:

- Rule `derived_from` research.
- Research `derived_from` observations.

## `requires`

Use when an object cannot be valid without another object.

Examples:

- Pattern `requires` rules.
- Prompt `requires` patterns.

## `validates`

Use when an object proves another object works in context.

Examples:

- Reference project `validates` patterns.
- Review `validates` or rejects prompt output.

## `implements`

Use when a concrete artifact applies an abstract object.

Examples:

- Reference project `implements` patterns.
- Skill `implements` prompts.

## `related_to`

Use for non-required conceptual proximity.

Examples:

- Pattern `related_to` alternative pattern.
- Rule `related_to` adjacent rule.

## `supersedes`

Use when a newer object replaces an older one.

Examples:

- Rule version `supersedes` older rule.
- Prompt `supersedes` weak prompt.

## `deprecated_by`

Use when an object should no longer be used and points to a replacement.

Examples:

- Pattern `deprecated_by` stronger pattern.
- Research `deprecated_by` newer research.

## `cites`

Use when an object references a source without being derived from it.

Examples:

- Research `cites` a product documentation page.
- Review `cites` a checklist.

## `inspired_by`

Use when an object is influenced by a source but not directly extracted from it.

Examples:

- Observation `inspired_by` product behavior.
- Pattern `inspired_by` a product study.

## `replaced_by`

Use as the forward pointer from a deprecated object to its replacement.

Examples:

- Deprecated prompt `replaced_by` newer prompt.
- Deprecated pattern `replaced_by` canonical pattern.

## Repository Navigation

New contributors should be able to answer four questions quickly:

- Where is the rule?
- What research supports it?
- Which patterns use it?
- Which examples validate it?

Current navigation strategy:

- `docs/INDEX.md` explains the graph.
- `research/GENERATED_INDEX.md` lists current migrated research from registry metadata.
- `rules/GENERATED_INDEX.md` lists current migrated rules from registry metadata.
- `patterns/GENERATED_INDEX.md` lists current migrated patterns from registry metadata.
- `prompts/GENERATED_INDEX.md` lists current migrated prompts from registry metadata.
- `checklists/GENERATED_INDEX.md` lists current migrated checklists from registry metadata.
- `examples/GENERATED_INDEX.md` lists current migrated reference projects from registry metadata.
- `reviews/GENERATED_INDEX.md` lists current migrated reviews from registry metadata.
- `graph/GENERATED_GRAPH.md` reports graph coverage, orphans, missing targets, and chain usage.
- Manual `INDEX.md` files remain transitional human context pages.

At scale, every index should be sortable by ID, status, category, and last reviewed date.

Manual indexes are transitional. Generated indexes read `registry/objects.json` and `registry/relationships.json`.

For migrated research, rules, patterns, prompts, checklists, reference projects, and reviews, update metadata and registry records first, then regenerate indexes. Do not edit generated files manually.

## DesignLint Readiness

DesignLint should not inspect prose heuristically. It should read stable IDs, metadata, schemas, registry records, and typed relationships.

DesignLint will require:

- stable IDs for all objects;
- machine-readable object type;
- status and version;
- category;
- source links;
- required relationships;
- deprecation relationships;
- last reviewed dates;
- checklist coverage.

See `docs/DESIGNLINT_READINESS.md`.

Repository conventions to enforce:

- one object per file;
- stable IDs never reused;
- lowercase kebab-case filenames;
- object metadata at the top of each file;
- relationship values use known relationship types;
- required links point to existing files or IDs;
- deprecated objects name their replacement;
- active prompts reference active patterns and rules;
- reference projects list implemented patterns and rules.

Machine-readable relationships should support:

- rule coverage checks;
- pattern dependency checks;
- prompt dependency checks;
- reference project validation checks;
- stale object detection;
- orphan object detection;
- deprecated object usage warnings.

## Repository Audit

## Strengths

- Clear top-level graph: research, docs, rules, patterns, prompts, examples, benchmarks, and evidence.
- Research, rules, patterns, prompts, checklists, reference projects, and reviews now have generated indexes.
- Patterns have a strict specification and template.
- Benchmarks provide the current public validation mechanism.
- Rules already reference source research.

## Weaknesses

- Observations are validated but not registry-backed.
- The Todo App benchmark reference project is directional evidence only: it has no rendered output, screenshots, or independent evaluation.
- Rules need severity, category normalization, and checklist naming.
- The first review validates benchmark evidence, not a rendered product surface.

## Technical Debt

- Decide when to migrate observations into the registry.
- Decide which manual `INDEX.md` files should remain as human guides after generated navigation stabilizes.
- Add future reference archetypes only after benchmark-backed public validation exists.
- Expand generated indexes when more object metadata becomes enforceable.
- Add schema validation in CI after the lightweight validator stabilizes.

## Missing Architectural Pieces

- Observation intake format.
- Prompt specification.
- Skill specification.
- DesignLint schema.

## Recommended Roadmap After Phase 5

1. Phase 5.1: Migrate observations into the registry when intake volume justifies it.
2. Phase 5.2: Add rendered, independently evaluated reference projects.
3. Phase 5.3: Add schema validation in CI after the lightweight validator stabilizes.
4. Phase 5.4: Prototype DesignLint without prose heuristics.
