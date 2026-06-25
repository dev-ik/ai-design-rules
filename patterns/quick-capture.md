---
id: PAT-00002
alias: PAT-002
slug: quick-capture
title: Quick Capture
object_type: pattern
status: draft
version: 0.1.0
category: workflow
tags:
  - workflow
  - capture
maturity: seed
risk_level: medium
relationships:
  - type: requires
    target: RULE-00002
  - type: requires
    target: RULE-00005
  - type: requires
    target: RULE-00006
  - type: requires
    target: RULE-00009
  - type: related_to
    target: PAT-00003
---

# Quick Capture

## Purpose

Let users record intent before they organize details.

## User Goal

Add a task, note, reminder, message, or idea before it is forgotten.

## Product Context

Everyday consumer workflows where speed matters more than complete metadata at creation time.

## Use When

- The smallest valid item can be saved with minimal input.
- Metadata can be added after creation.
- Capture is more frequent than organization.

## Do Not Use When

- Compliance or safety requires required fields before creation.
- The captured item is invalid without structured data.
- The workflow is primarily comparison or review.

## UX Rules

- `PRD-002` Low-Friction Capture Before Organization
- `UX-001` Thumb-Zone Primary Actions
- `UX-002` Progressively Disclose Power

## Accessibility Rules

- `A11Y-001` 44x44 Touch Targets

## Mobile Behavior

Provide a reachable create action and a short input path. Do not force category, date, owner, or priority before save.

## Desktop Behavior

Support keyboard-first entry and quick submit. Keep optional metadata adjacent but secondary.

## Empty State

Show the create action and one concise cue for what can be captured.

## Loading State

Preserve entered content and show saving progress without moving the input.

## Error State

Keep the user's input, explain what failed, and offer retry.

## Required Rules

- `PRD-002` Low-Friction Capture Before Organization
- `UX-001` Thumb-Zone Primary Actions
- `UX-002` Progressively Disclose Power
- `A11Y-001` 44x44 Touch Targets

## Related Research

- `research/products/apple-reminders.md`
- `research/products/things-3.md`
- `research/products/telegram.md`

## Related Patterns

- Parent: `daily-home-surface.md`
- Child: none
- Alternative: none
- Depends on: `mobile-primary-action.md` for touch-first placement

## Examples

- A shopping list app lets a user add "Buy milk" before assigning list, owner, or due time.
- A reminder app saves a title first and lets scheduling happen later.

## Agent Checklist

- What is the smallest valid item?
- How many decisions are required before saving?
- Can optional metadata be added later?
- Is failed save recoverable without losing input?
