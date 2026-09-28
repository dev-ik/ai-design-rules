---
id: PROMPT-00004
alias: PROMPT-QUICK-CAPTURE-STATE-REVIEW
slug: quick-capture-state-review
title: Quick Capture State Review Prompt
object_type: prompt
status: draft
version: 0.2.0
category: review
tags:
  - prompt
  - review
  - capture
  - states
maturity: seed
risk_level: medium
relationships:
  - type: requires
    target: PAT-00002
  - type: requires
    target: RULE-00002
  - type: requires
    target: RULE-00009
  - type: requires
    target: RULE-00010
  - type: requires
    target: RULE-00011
  - type: requires
    target: RULE-00012
  - type: cites
    target: evidence/todo/2026-09-28-codex-paired-todo/EVALUATION.md
---

# Quick Capture State Review Prompt

## Objective

Review an existing quick-capture flow for low friction, accessible recovery, stable loading, and keyboard-operable state behavior.

## Required Inputs

- The capture surface or implementation.
- Default, loading, validation-error, failed-save, and success behavior.
- Target platform and viewport constraints.
- A realistic populated list as well as an empty list, and a way to reproduce save failure and retry.

## Instruction

```text
Review the provided quick-capture flow using PAT-002 and its required rules.

Do not invent new product features, rules, or patterns. Identify only observable gaps in the current capture path.

Verify that the smallest valid item can be saved with minimal input; controls meet touch and keyboard needs; validation identifies the affected input in text; loading preserves input and layout geometry; and focus remains visible through recovery.

Test capture from a fresh page using only the keyboard with a realistically populated list. Record the navigation steps, including the Tab count, and any discoverable direct route to capture. A reachable input can still impose avoidable friction when it follows every list control; assess the user task under PRD-002 rather than inventing a universal Tab-count limit. Verify focus visibility separately under A11Y-003.

Compare the input, submit control, feedback region, and first list row across default, saving, failed-save, retry, and success states. Include wrapping error text and changing action labels when checking geometry under PERF-001. Measure actual touch areas, including associated labels, under A11Y-001.

Return a verdict, severity-ordered findings, state coverage, and the rule or pattern supporting every finding.
```

## Output Contract

- Verdict: `PASS` or `NEEDS WORK`.
- Findings: severity, observed issue, supporting ID, and concrete recovery behavior.
- State coverage: default, loading, validation error, failed save, success, and keyboard focus.
- Keyboard route: starting state, populated item count, Tab count, direct routes tried, and observed friction.
- Geometry evidence: viewport, input/action hit areas, and measured or visibly observed movement across saving/error/retry states.
- Gaps: missing evidence rather than invented guidance.

## Review Evidence

The [paired rendered Todo evaluation](../evidence/todo/2026-09-28-codex-paired-todo/EVALUATION.md) found a 29-versus-4 Tab capture path, a 22px baseline error-layout shift, and changing save-button widths in both outputs. These observations motivate more concrete checks of the existing rules; they do not establish new universal thresholds. This prompt revision was made after that run and has not itself been validated by a new paired generation.
