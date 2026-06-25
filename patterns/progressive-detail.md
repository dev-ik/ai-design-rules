---
id: PAT-00004
alias: PAT-004
slug: progressive-detail
title: Progressive Detail
object_type: pattern
status: draft
version: 0.1.0
category: ux
tags:
  - ux
  - progressive-disclosure
maturity: seed
risk_level: medium
relationships:
  - type: requires
    target: RULE-00006
  - type: requires
    target: RULE-00002
  - type: requires
    target: RULE-00008
  - type: requires
    target: RULE-00009
  - type: related_to
    target: PAT-00006
---

# Progressive Detail

## Purpose

Keep the default task simple while preserving access to advanced fields.

## User Goal

Complete or understand the item first, then add detail only when needed.

## Product Context

Items that start simple but can gain metadata, settings, states, notes, or scheduling.

## Use When

- Most users need only a small subset of fields at first.
- Advanced metadata is optional or can be added later.
- The product must support both casual and power users.

## Do Not Use When

- Hidden information is required for trust, safety, or accountability.
- Users must compare many items by the hidden metadata.
- Advanced controls are the primary workflow.

## UX Rules

- `UX-002` Progressively Disclose Power
- `PRD-002` Low-Friction Capture Before Organization

## Accessibility Rules

- `A11Y-001` 44x44 Touch Targets

## Mobile Behavior

Show essential fields first. Reveal optional detail through edit, details, expand, or more controls that remain reachable.

## Desktop Behavior

Use available width for secondary detail only when it supports scanning or editing. Do not turn optional metadata into a wall of fields.

## Empty State

Show the minimal item shape and the action to add the first item.

## Loading State

Load essential content first; defer optional detail without shifting the main item.

## Error State

If optional detail fails, keep the core item usable and show targeted recovery.

## Required Rules

- `UX-002` Progressively Disclose Power
- `PRD-002` Low-Friction Capture Before Organization
- `VIS-001` Semantic Tokens Only
- `A11Y-001` 44x44 Touch Targets

## Related Research

- `research/products/things-3.md`
- `research/products/apple-reminders.md`
- `research/products/telegram.md`

## Related Patterns

- Parent: none
- Child: none
- Alternative: `object-status-list.md` when comparison requires visible metadata
- Depends on: none

## Examples

- A task app detail view hides notes, repeat settings, and tags until edit.
- A reminder shows title and due time first, then exposes location and subtasks.

## Agent Checklist

- Which fields are essential at first glance?
- Which fields can wait until edit or inspection?
- Is hidden detail discoverable?
- Does hiding detail harm comparison or accountability?
