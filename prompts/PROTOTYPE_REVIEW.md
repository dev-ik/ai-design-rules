---
id: PROMPT-00002
alias: PROMPT-PROTOTYPE-REVIEW
slug: prototype-review
title: Prototype Review Prompt
object_type: prompt
status: draft
version: 0.1.0
category: review
tags:
  - prompt
  - review
  - prototype
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

# Prototype Review Prompt

Review before refactoring.

## Pattern Coverage

Check whether a documented pattern applies:

- `patterns/daily-home-surface.md`
- `patterns/quick-capture.md`
- `patterns/mobile-primary-action.md`
- `patterns/progressive-detail.md`
- `patterns/object-status-list.md`
- `patterns/context-preserving-preview.md`

## Rule Coverage

- `PRD-001`
- `PRD-002`
- `IA-001`
- `IA-002`
- `UX-001`
- `UX-002`
- `UX-003`
- `VIS-001`
- `A11Y-001`

## Instruction

Identify missing research, rule, or pattern support before proposing UI changes.
