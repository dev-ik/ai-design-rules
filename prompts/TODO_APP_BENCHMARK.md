---
id: PROMPT-00003
alias: PROMPT-TODO-BENCHMARK
slug: todo-app-benchmark
title: Todo App Benchmark Prompt
object_type: prompt
status: draft
version: 0.1.0
category: generation
tags:
  - prompt
  - benchmark
  - todo
maturity: seed
risk_level: medium
relationships:
  - type: requires
    target: PAT-00001
  - type: requires
    target: PAT-00002
  - type: requires
    target: PAT-00003
  - type: requires
    target: PAT-00004
  - type: requires
    target: PAT-00005
  - type: requires
    target: PAT-00006
  - type: requires
    target: RULE-00001
  - type: requires
    target: RULE-00002
  - type: requires
    target: RULE-00003
  - type: requires
    target: RULE-00004
  - type: requires
    target: RULE-00005
  - type: requires
    target: RULE-00006
  - type: requires
    target: RULE-00007
  - type: requires
    target: RULE-00008
  - type: requires
    target: RULE-00009
---

# Todo App Benchmark Prompt

## Objective

Generate a responsive consumer todo app for the reproducible `benchmarks/todo-app.md` scenario.

## Required Inputs

- The exact Todo App benchmark brief.
- The registered rules and patterns listed in the front matter.
- The benchmark run metadata required by `docs/BENCHMARK.md`.

## Instruction

```text
Design and implement a responsive todo app for everyday personal task management.

Use AI Design Rules from this repository.

Follow the knowledge graph:
research -> rules -> patterns -> prompts -> reference projects -> reviews

Use existing rules and patterns only. Do not invent new rules or patterns.

The app should let a user add tasks, see today's tasks, complete tasks, and edit details.

Prioritize low-friction capture, a stable daily home surface, mobile-first behavior, context-preserving detail, accessible touch targets, and clear empty/loading/error states.
```

## Output Contract

- Keep the `Task` object and its required fields explicit.
- Define default, empty, loading, error, and failed-save recovery states.
- Preserve the same product model across mobile and desktop.
- Publish the raw output and all benchmark metadata; do not claim a quality improvement without comparative evaluation evidence.

## Source

- `benchmarks/todo-app.md`
- `evidence/todo/2026-06-25-codex-gpt-5/ai-design-rules/prompt.md`
