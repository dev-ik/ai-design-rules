---
id: PROMPT-00005
alias: PROMPT-DESIGN-EVIDENCE-REVIEW
slug: design-evidence-review
title: Design Evidence Review Prompt
object_type: prompt
status: draft
version: 0.1.0
category: review
tags:
  - prompt
  - review
  - evidence
maturity: seed
risk_level: medium
relationships:
  - type: requires
    target: CHECK-00001
---

# Design Evidence Review Prompt

## Objective

Turn evidence from a design artifact, benchmark run, reference project, or implementation into a traceable review object.

## Required Inputs

- Target object or product surface.
- Evidence artifacts: implementation, screenshots, benchmark output, or evaluation notes.
- Claimed rules and patterns.

## Instruction

```text
Review the supplied target using CHECK-00001.

Do not invent evidence, design rules, benchmark results, or implementation behavior. Mark any unrendered, unmeasured, or untested claim as a gap.

Produce a REVIEW object with a PASS or NEEDS WORK verdict, severity-ordered findings, coverage of applicable rules and patterns, cited evidence, and concrete next validation steps. A PASS requires direct evidence for the primary action, required states, accessibility behavior, and applicable mobile or performance claims.
```

## Output Contract

- Verdict: `PASS` or `NEEDS WORK`.
- Scope and evidence reviewed.
- Findings: severity, gap, affected object or surface, and related IDs.
- Coverage: checked and unverified rules, patterns, states, and constraints.
- Handoff: exact follow-up evidence or change required.
