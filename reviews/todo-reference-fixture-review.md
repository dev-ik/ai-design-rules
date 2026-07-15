---
id: REVIEW-00002
alias: REVIEW-TODO-RUNNABLE-FIXTURE
slug: todo-reference-fixture-review
title: Todo Runnable Fixture Review
object_type: review
status: draft
version: 0.1.0
category: reference-eval
tags:
  - review
  - fixture
  - visual-qa
  - todo
maturity: seed
risk_level: medium
relationships:
  - type: requires
    target: CHECK-00001
  - type: implements
    target: PROMPT-00005
  - type: validates
    target: REF-00001
  - type: cites
    target: examples/todo-reference/index.html
  - type: cites
    target: examples/todo-reference/review-evidence/2026-07-15/desktop-default.png
  - type: cites
    target: examples/todo-reference/review-evidence/2026-07-15/desktop-detail.png
  - type: cites
    target: examples/todo-reference/review-evidence/2026-07-15/mobile-error.png
  - type: cites
    target: examples/todo-reference/review-evidence/2026-07-15/mobile-detail.png
---

# Todo Runnable Fixture Review

## Verdict

NEEDS WORK for benchmark validation; observed fixture flows pass this limited rendered review.

## Scope

Review `examples/todo-reference/` at 1440×1000 and 390×844 against `CHECK-00001`.

## Evidence Reviewed

- Desktop default and desktop detail screenshots.
- Mobile empty-submit error screenshot.
- Mobile detail-sheet screenshot.
- Playwright accessibility snapshots for names, `alert`, invalid input state, and focus transfer to the detail close control.

## Confirmed Coverage

- The first viewport prioritizes Today, task list, and quick capture over dashboard summaries (`PRD-001`, `IA-001`, `PAT-001`, `PAT-002`).
- Empty submission preserves the input, marks it invalid, returns focus, and exposes textual recovery through an alert (`A11Y-002`, `A11Y-003`).
- Mobile controls use 44px minimum dimensions and the primary capture action remains reachable (`UX-001`, `A11Y-001`, `PAT-003`).
- Detail inspection keeps the desktop list visible and leaves part of the mobile list visible behind the sheet (`UX-003`, `PAT-005`).
- The fixture uses semantic tokens and reserves the task surface during its simulated save state (`VIS-001`, `PERF-001`).

## Findings

### High — No paired rendered benchmark

The reviewed fixture is not a clean baseline-vs-rules experiment. It cannot validate the `+2.09` benchmark difference or promote `REF-00001` beyond `draft` / `reviewed`.

### Medium — Keyboard and reduced-motion paths are not executed end to end

Visible focus and reduced-motion CSS exist, and the review captured focus transfer after an interaction. A full keyboard-only traversal and a browser run with `prefers-reduced-motion: reduce` were not captured.

### Medium — No measured loading evidence

The fixture simulates a save state, but no slow-network run, layout-shift metric, or runtime performance measurement was recorded.

## Handoff

Create a clean paired benchmark run with both rendered outputs, then capture independent evaluator notes, keyboard/reduced-motion evidence, and performance measurements before setting `REF-00001` to `validated`.
