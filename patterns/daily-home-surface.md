---
id: PAT-00001
alias: PAT-001
slug: daily-home-surface
title: Daily Home Surface
object_type: pattern
status: draft
version: 0.1.0
category: product
tags:
  - product
  - home
maturity: seed
risk_level: medium
relationships:
  - type: requires
    target: RULE-00001
  - type: requires
    target: RULE-00003
  - type: requires
    target: RULE-00006
  - type: requires
    target: RULE-00009
  - type: related_to
    target: PAT-00002
  - type: related_to
    target: PAT-00003
---

# Daily Home Surface

## Purpose

Provide one stable starting surface for repeated daily work.

## User Goal

Start the day or session and act on the most relevant current work.

## Product Context

Consumer products with recurring workflows, such as family tasks, reminders, routines, daily planning, and recurring conversations.

## Use When

- Users return frequently to the same product context.
- One repeated action or current-work view anchors the product.
- Secondary modes exist but should not replace the starting point.

## Do Not Use When

- The product is primarily exploratory.
- The user goal changes completely between sessions.
- Parallel workflows are equally important and cannot share one home.

## UX Rules

- `PRD-001` Daily Actions First
- `IA-001` One Stable Home Surface
- `UX-002` Progressively Disclose Power

## Accessibility Rules

- `A11Y-001` 44x44 Touch Targets

## Mobile Behavior

Show the current work and primary daily action in the first 390px-wide viewport. Keep navigation secondary and reachable.

## Desktop Behavior

Use the extra width for supporting context, not competing entry points. Keep the same home concept as mobile.

## Empty State

Explain what belongs here and provide the primary create or start action.

## Loading State

Keep the home shell and primary action position stable while current work loads.

## Error State

Preserve the home surface and show a recovery action without replacing the whole screen.

## Required Rules

- `PRD-001` Daily Actions First
- `IA-001` One Stable Home Surface
- `UX-002` Progressively Disclose Power
- `A11Y-001` 44x44 Touch Targets

## Related Research

- `research/products/things-3.md`
- `research/products/telegram.md`
- `research/products/apple-reminders.md`

## Related Patterns

- Parent: none
- Child: `quick-capture.md`, `mobile-primary-action.md`
- Alternative: none
- Depends on: none

## Examples

- A consumer task app opens to Today, showing current tasks and the main add action.
- A reminders app opens to the user's current list instead of settings or analytics.

## Agent Checklist

- Is there one recognizable home surface?
- Is the repeated daily action visible without scrolling?
- Can users return after exploring secondary modes?
- Are advanced controls quieter than current work?
