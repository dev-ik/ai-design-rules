---
id: REF-00001
alias: REF-TODO-BENCHMARK
slug: todo-app-benchmark-reference
title: Todo App Benchmark Reference Project
object_type: reference_project
status: draft
version: 0.1.0
category: consumer
tags:
  - reference-project
  - benchmark
  - todo
last_reviewed_at: 2026-07-15
maturity: reviewed
risk_level: high
relationships:
  - type: implements
    target: PROMPT-00003
  - type: implements
    target: PAT-00001
  - type: implements
    target: PAT-00002
  - type: implements
    target: PAT-00003
  - type: implements
    target: PAT-00004
  - type: implements
    target: PAT-00005
  - type: implements
    target: PAT-00006
  - type: validates
    target: PROMPT-00003
  - type: validates
    target: PAT-00001
  - type: validates
    target: PAT-00002
  - type: validates
    target: PAT-00003
  - type: validates
    target: PAT-00004
  - type: validates
    target: PAT-00005
  - type: validates
    target: PAT-00006
---

# Todo App Benchmark Reference Project

## Product Context

This reference project records the AI Design Rules output for the public Todo App benchmark: a responsive consumer product for quickly capturing, seeing, completing, and inspecting everyday tasks.

The core object is `Task`. Its required fields are a title and completion state; note, due time, repeat, list, and priority remain optional and secondary.

## Benchmark Evidence

- Scenario: `benchmarks/todo-app.md`
- Run: `evidence/todo/2026-06-25-codex-gpt-5/`
- AI Design Rules artifact: `evidence/todo/2026-06-25-codex-gpt-5/ai-design-rules/generated-output.md`
- Comparative evaluation: `evidence/todo/2026-06-25-codex-gpt-5/EVALUATION.md`

The evaluation reports a directional score difference of `+2.09` for this run. It is not evidence of general product-quality improvement.

## Runnable Reference Fixture

`examples/todo-reference/` is a local HTML, CSS, and JavaScript fixture for inspecting the documented task flow at mobile and desktop widths. It is a QA aid for the rule and pattern coverage below, not a replacement for the historical benchmark output and not comparative benchmark evidence.

## Fixture Review Evidence

- Review: `reviews/todo-reference-fixture-review.md`
- Desktop default: `examples/todo-reference/review-evidence/2026-07-15/desktop-default.png`
- Desktop detail: `examples/todo-reference/review-evidence/2026-07-15/desktop-detail.png`
- Mobile error recovery: `examples/todo-reference/review-evidence/2026-07-15/mobile-error.png`
- Mobile detail sheet: `examples/todo-reference/review-evidence/2026-07-15/mobile-detail.png`

This evidence confirms rendered fixture behavior for the reviewed flows. It does not turn the historical Markdown benchmark output into a rendered, independently evaluated benchmark result.

## Patterns Used

- `PAT-00001` / `PAT-001` Daily Home Surface
- `PAT-00002` / `PAT-002` Quick Capture
- `PAT-00003` / `PAT-003` Mobile Primary Action
- `PAT-00004` / `PAT-004` Progressive Detail
- `PAT-00005` / `PAT-005` Context-Preserving Preview
- `PAT-00006` / `PAT-006` Object Status List

## Rules Applied

- `RULE-00001` / `PRD-001` Daily Actions First
- `RULE-00002` / `PRD-002` Low-Friction Capture Before Organization
- `RULE-00003` / `IA-001` One Stable Home Surface
- `RULE-00004` / `IA-002` Define The Object Model Before Screens
- `RULE-00005` / `UX-001` Thumb-Zone Primary Actions
- `RULE-00006` / `UX-002` Progressively Disclose Power
- `RULE-00007` / `UX-003` Preserve Context During Inspection
- `RULE-00008` / `VIS-001` Semantic Tokens Only
- `RULE-00009` / `A11Y-001` 44x44 Touch Targets

## Validation Questions

- Does the first viewport prioritize Today and quick capture over dashboard summaries?
- Can a user add, complete, and inspect a task while optional metadata remains secondary?
- Does failed save preserve task text and expose a specific retry or edit path?
- Does the same `Task` model survive the mobile bottom-sheet and desktop side-panel variants?
- Does a rendered implementation preserve these claims under mobile, desktop, slow-network, keyboard, and assistive-technology testing?

## Evidence Limits

- The historical benchmark artifact is Markdown, not a rendered implementation.
- The fixture screenshots are not paired baseline-vs-rules benchmark evidence and include no runtime performance measurements.
- The same model generated and evaluated both outputs.
- The baseline ran in a repository-aware conversation, so isolation is incomplete.

## Next Validation

Repeat the scenario in a clean session with paired rendered outputs, mobile and desktop screenshots, measured loading behavior, and at least one independent evaluator. Keep this object at `draft` / `reviewed` until that evidence exists.
