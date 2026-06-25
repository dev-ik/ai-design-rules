---
id: PAT-00006
alias: PAT-006
slug: object-status-list
title: Object Status List
object_type: pattern
status: draft
version: 0.1.0
category: ia
tags:
  - ia
  - status
maturity: seed
risk_level: medium
relationships:
  - type: requires
    target: RULE-00004
  - type: requires
    target: RULE-00007
  - type: requires
    target: RULE-00008
  - type: requires
    target: RULE-00009
  - type: related_to
    target: PAT-00005
  - type: related_to
    target: PAT-00004
---

# Object Status List

## Purpose

Make structured objects scanable by state, owner, and next action.

## User Goal

Understand what exists, what state it is in, and what needs attention.

## Product Context

Products with stable objects and states, such as issues, projects, shared tasks, requests, or household workflows.

## Use When

- Items have stable states.
- Users need to scan or filter many objects.
- Ownership, status, or next action affects decisions.

## Do Not Use When

- Items are mostly unstructured notes or messages.
- The product does not have stable states.
- A dense list would make a consumer workflow feel administrative.

## UX Rules

- `IA-002` Define The Object Model Before Screens
- `UX-003` Preserve Context During Inspection

## Accessibility Rules

- `A11Y-001` 44x44 Touch Targets

## Mobile Behavior

Show object name and most important status first. Move secondary metadata into detail or progressive disclosure.

## Desktop Behavior

Use columns, grouping, filters, or side panels for scanability without duplicating objects.

## Empty State

Explain what object will appear here and provide the relevant create or import action.

## Loading State

Preserve row structure or grouping while loading to avoid scan disruption.

## Error State

Show list-level recovery and preserve filters when possible.

## Required Rules

- `IA-002` Define The Object Model Before Screens
- `UX-003` Preserve Context During Inspection
- `VIS-001` Semantic Tokens Only
- `A11Y-001` 44x44 Touch Targets

## Related Research

- `research/products/linear.md`
- `research/products/arc.md`

## Related Patterns

- Parent: none
- Child: `context-preserving-preview.md`
- Alternative: `progressive-detail.md` when metadata should stay hidden
- Depends on: none

## Examples

- A household task archetype shows tasks with owner, status, and due cue.
- A project tool lists issues with status, owner, priority, and next action.

## Agent Checklist

- What object does each row represent?
- Are statuses stable and consistently named?
- Is ownership visible when it affects action?
- Can users change view without duplicating data?
