---
id: PROMPT-00004
alias: PROMPT-QUICK-CAPTURE-STATE-REVIEW
slug: quick-capture-state-review
title: Quick Capture State Review Prompt
object_type: prompt
status: draft
version: 0.1.0
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
---

# Quick Capture State Review Prompt

## Objective

Review an existing quick-capture flow for low friction, accessible recovery, stable loading, and keyboard-operable state behavior.

## Required Inputs

- The capture surface or implementation.
- Default, loading, validation-error, failed-save, and success behavior.
- Target platform and viewport constraints.

## Instruction

```text
Review the provided quick-capture flow using PAT-002 and its required rules.

Do not invent new product features, rules, or patterns. Identify only observable gaps in the current capture path.

Verify that the smallest valid item can be saved with minimal input; controls meet touch and keyboard needs; validation identifies the affected input in text; loading preserves input and layout geometry; and focus remains visible through recovery.

Return a verdict, severity-ordered findings, state coverage, and the rule or pattern supporting every finding.
```

## Output Contract

- Verdict: `PASS` or `NEEDS WORK`.
- Findings: severity, observed issue, supporting ID, and concrete recovery behavior.
- State coverage: default, loading, validation error, failed save, success, and keyboard focus.
- Gaps: missing evidence rather than invented guidance.
