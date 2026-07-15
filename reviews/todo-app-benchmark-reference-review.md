---
id: REVIEW-00001
alias: REVIEW-TODO-BENCHMARK
slug: todo-app-benchmark-reference-review
title: Todo App Benchmark Reference Review
object_type: review
status: draft
version: 0.1.0
category: reference-eval
tags:
  - review
  - benchmark
  - todo
maturity: seed
risk_level: high
relationships:
  - type: requires
    target: CHECK-00001
  - type: implements
    target: PROMPT-00005
  - type: validates
    target: REF-00001
  - type: cites
    target: PROMPT-00003
  - type: cites
    target: evidence/todo/2026-06-25-codex-gpt-5/EVALUATION.md
  - type: cites
    target: evidence/todo/2026-06-25-codex-gpt-5/ai-design-rules/generated-output.md
---

# Todo App Benchmark Reference Review

## Verdict

NEEDS WORK

## Scope

Review `REF-00001` and its 2026-06-25 Todo benchmark evidence as a reference-project validation artifact.

## Evidence Reviewed

- `benchmarks/todo-app.md`
- `evidence/todo/2026-06-25-codex-gpt-5/EVALUATION.md`
- `evidence/todo/2026-06-25-codex-gpt-5/ai-design-rules/generated-output.md`
- `PROMPT-00003` / Todo App Benchmark Prompt

## Confirmed Coverage

- The artifact explicitly names the `Task` object, Today surface, quick capture, optional detail, and failed-save recovery.
- It cites all six registered patterns and the initial nine rules used by the benchmark run.
- The output specifies empty, loading, error, mobile, keyboard-label, and touch-target intentions.

## Findings

### High — No rendered interaction evidence

The evidence is a Markdown design artifact. It cannot verify actual keyboard focus, touch target geometry, reduced-motion behavior, layout stability, or recovery behavior in a running interface.

Related: `CHECK-00001`, `A11Y-001`, `A11Y-002`, `A11Y-003`, `A11Y-004`, `PERF-001`.

### High — Benchmark evaluation is not independent

The same model generated and evaluated both outputs, and the baseline ran in a repository-aware conversation. The reported score difference is directional, not a reliable quality claim.

Related: `REF-00001`, `PROMPT-00003`.

### Medium — Performance claims are specified, not measured

The artifact describes a stable loading shell but contains no runtime measurements, slow-network run, or layout-shift evidence.

Related: `PERF-001`.

## Coverage Gaps

- No mobile or desktop screenshots.
- No clean-session baseline.
- No independent evaluator.
- No keyboard, assistive-technology, or reduced-motion test execution.
- No measured loading or layout stability evidence.

## Required Follow-Up

Run the Todo benchmark in a clean session, produce rendered mobile and desktop outputs, capture screenshots and interaction evidence, test keyboard and reduced-motion paths, measure loading behavior, and obtain an independent evaluation before promoting `REF-00001` to `validated`.

The later runnable-fixture review records limited rendered evidence, but it does not validate the historical benchmark claim.
