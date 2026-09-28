---
id: PAT-00001
alias: PAT-001
slug: daily-home-surface
title: Daily Home Surface
object_type: pattern
status: draft
version: 0.2.0
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
  - type: requires
    target: RULE-00008
  - type: requires
    target: RULE-00014
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

Keep current-work labels readable beside the primary action. Use the same semantic content, action, and supporting-surface roles as desktop; reducing width must not give every row or navigation control the same emphasis as the main action (`VIS-001`, `VIS-002`).

## Desktop Behavior

Use the extra width for supporting context, not competing entry points. Keep the same home concept as mobile.

Identify the content layer (current work), functional layer (navigation and controls), focal emphasis (the repeated daily action), and quiet supporting surfaces. Reuse existing typography, spacing, and color roles. Strong material, shape, or color treatments must clarify that hierarchy; removing decorative effects must leave content order and the primary action understandable (`VIS-001`, `VIS-002`).

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
- `VIS-001` Semantic Tokens Only
- `VIS-002` Keep Expression Subordinate To Content

## Related Research

- `research/products/things-3.md`
- `research/products/telegram.md`
- `research/products/apple-reminders.md`
- `research/visual/expressive-system-ui-2026.md`

## Related Patterns

- Parent: none
- Child: `quick-capture.md`, `mobile-primary-action.md`
- Alternative: none
- Depends on: none

## Examples

- A consumer task app opens to Today, showing current tasks and the main add action.
- A reminders app opens to the user's current list instead of settings or analytics.

For a household shopping list, the current items form the content layer, list switching belongs to the functional layer, and Add item is the focal action. Bought items remain readable but quieter. Giving every item, navigation control, and background the same strong accent would obscure this hierarchy. This is an application of `VIS-002`, not a required brand style or a new component system.

## Agent Checklist

- Is there one recognizable home surface?
- Is the repeated daily action visible without scrolling?
- Can users return after exploring secondary modes?
- Are advanced controls quieter than current work?
- Can the content, functional layer, focal emphasis, and supporting surfaces be identified on both mobile and desktop?
- Does the hierarchy remain clear without transparency, shadows, or decorative motion?
- Do repeated visual decisions reuse the project's semantic roles?

The visual guidance remains `draft` / `seed`; this revision adds an application contract, not rendered benchmark validation.
