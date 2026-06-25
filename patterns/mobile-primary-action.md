---
id: PAT-00003
alias: PAT-003
slug: mobile-primary-action
title: Mobile Primary Action
object_type: pattern
status: draft
version: 0.1.0
category: mobile
tags:
  - mobile
  - action
maturity: seed
risk_level: high
relationships:
  - type: requires
    target: RULE-00005
  - type: requires
    target: RULE-00001
  - type: requires
    target: RULE-00009
  - type: related_to
    target: PAT-00002
---

# Mobile Primary Action

## Purpose

Make one repeated mobile action physically reachable and safely tappable.

## User Goal

Trigger the main action quickly with one hand.

## Product Context

Touch-first screens with one dominant repeated action, such as add, send, complete, or start.

## Use When

- One action is clearly more frequent than others.
- The screen is used on mobile.
- The action is safe enough to make prominent.

## Do Not Use When

- Multiple actions are equally important.
- The action is destructive or high-risk.
- The screen is primarily for reading or comparison.

## UX Rules

- `UX-001` Thumb-Zone Primary Actions
- `PRD-001` Daily Actions First

## Accessibility Rules

- `A11Y-001` 44x44 Touch Targets

## Mobile Behavior

Place the action in a thumb-friendly zone. Keep the clickable area at least 44x44 CSS pixels and separate it from destructive controls.

## Desktop Behavior

Keep the same primary action visible, but position it according to desktop hierarchy and keyboard access instead of thumb reach.

## Empty State

Keep the action available and pair it with concise start guidance.

## Loading State

Keep the action position stable. Disable or show progress only while duplicate actions would be harmful.

## Error State

Show recovery near the action and preserve the user's context.

## Required Rules

- `UX-001` Thumb-Zone Primary Actions
- `PRD-001` Daily Actions First
- `A11Y-001` 44x44 Touch Targets

## Related Research

- `research/products/things-3.md`
- `research/products/apple-reminders.md`

## Related Patterns

- Parent: none
- Child: none
- Alternative: none
- Depends on: none
- Adjacent: `quick-capture.md` owns the creation flow after tap

## Examples

- A mobile todo app places Add Task in the reachable bottom area.
- A messaging screen keeps Send reachable without placing Delete nearby.

## Agent Checklist

- Is there one clear primary action?
- Is it reachable at 390px width?
- Is the target at least 44x44 CSS pixels?
- Is the destructive path spatially separate?
