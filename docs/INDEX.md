# Documentation Index

Read these files in order when you are new to AI Design Rules or when an agent needs repository context.

AI Design Rules is a connected knowledge graph. Each layer depends on the previous one:

```text
observations -> research -> knowledge -> rules -> patterns -> prompts -> evidence -> reviews
```

This order matters because agents should not generate UI from taste. Observations capture raw evidence, research groups it, knowledge documents explain interpretation, rules extract reusable decisions, patterns compose rules into product structures, prompts teach agents how to apply patterns, benchmark evidence validates claims, and reviews feed improvements back into the graph.

The `docs/` folder is the current knowledge layer.

## 1. Project Overview

Start with `README.md`.

It explains what AI Design Rules is, what it is not, who it is for, how agents should use it, and how benchmark evidence validates the project.

## 2. Philosophy

Read `docs/PHILOSOPHY.md`.

Use it to understand the baseline: good design reduces user effort.

## 3. Product Thinking

Read `docs/PRODUCT_THINKING.md`.

Use it before UI decisions. The product job, user context, and repeated action come first.

## 4. Mobile First

Read `docs/MOBILE_FIRST.md`.

Use it when the product experience includes common consumer workflows, daily actions, or touch-first behavior.

## 5. Design System

Read `docs/DESIGN_SYSTEM.md`.

Use it to understand how tokens, themes, components, and screens relate. This repository is not a component library.

## 6. Knowledge Engine

Read `docs/KNOWLEDGE_ENGINE.md` before adding new object types or changing repository structure.

Use it as the architectural source of truth for object metadata, relationships, navigation, and future DesignLint readiness.

## 7. Traceability

Read `docs/TRACEABILITY.md` before validating benchmark evidence, a future reference archetype, or a design decision.

Use it to identify which knowledge layer is missing instead of inventing rules or patterns.

## 8. Pattern Specification

Read `docs/PATTERN_SPEC.md` before creating or editing patterns.

Use it as the source of truth for every pattern document.

## 9. DesignLint Readiness

Read `docs/DESIGNLINT_READINESS.md` before proposing validation tooling or generated indexes.

Use it to understand what is machine-readable today and what remains intentionally unimplemented.

## 10. Benchmark

Read `docs/BENCHMARK.md` before running or publishing product generation comparisons.

Use `docs/EVALUATION_RUBRIC.md` to score outputs.

## 11. Style Guide

Read `docs/STYLE_GUIDE.md` before editing documentation.

Use it to keep contributions concise, practical, rule-based, and free of filler.

## 12. Glossary

Read `docs/GLOSSARY.md` when terms are unclear.

Use shared vocabulary before adding new concepts.

## 13. Operational Files

- `AGENTS.md` - instructions for Codex, Cursor, Claude Code, and similar agents.
- `CONTRIBUTING.md` - contribution workflow.
- `ROADMAP.md` - planned phases.
- `starter-kit/INSTALL_WITH_AGENT.md` - agent-driven adoption guide for an existing product repository.

## 14. Working Folders

- `research/` - product observations. Start with `research/GENERATED_INDEX.md`.
- `docs/` - knowledge layer and authoring specifications.
- `schema/` - JSON Schema definitions for knowledge object metadata.
- `registry/` - transitional machine-readable object and relationship registry.
- `observations/` - first-class raw evidence objects.
- `rules/` - reviewable design rules. Start with `rules/GENERATED_INDEX.md`.
- `patterns/` - repeatable solutions derived from rules. Start with `patterns/GENERATED_INDEX.md`.
- `prompts/` - task-specific instructions for agents. Start with `prompts/GENERATED_INDEX.md`.
- `examples/` - reserved space for future public reference archetypes. Start with `examples/README.md`.
- `benchmarks/` - reproducible benchmark scenarios.
- `evidence/` - future benchmark results and raw outputs.
- `starter-kit/` - copyable project bootstrap kit for adopting AI Design Rules in another repository.
- `reviews/` - first-class review and validation objects.
- `checklists/` and `templates/` - review and authoring artifacts.
