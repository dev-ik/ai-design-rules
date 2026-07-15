---
id: PAT-00005
alias: PAT-005
slug: context-preserving-preview
title: Context-Preserving Preview
object_type: pattern
status: draft
version: 0.1.0
category: ux
tags:
  - ux
  - preview
maturity: seed
risk_level: medium
relationships:
  - type: requires
    target: RULE-00007
  - type: requires
    target: RULE-00004
  - type: requires
    target: RULE-00003
  - type: requires
    target: RULE-00009
  - type: requires
    target: RULE-00013
  - type: related_to
    target: PAT-00006
---

# Context-Preserving Preview

## Purpose

Let users inspect detail without losing their source context.

## User Goal

Compare, inspect, or triage items while keeping place in the list or workspace.

## Product Context

Lists, workspaces, conversations, and browsers where users inspect multiple items in sequence.

## Use When

- Users need to open several items quickly.
- The source context, filters, or scroll position matter.
- Detail is inspection-heavy rather than a long edit flow.

## Do Not Use When

- The detail view is a long editing workflow.
- The preview would hide critical primary actions.
- The source list is not important after selection.

## UX Rules

- `UX-003` Preserve Context During Inspection
- `IA-002` Define The Object Model Before Screens
- `IA-001` One Stable Home Surface

## Accessibility Rules

- `A11Y-001` 44x44 Touch Targets
- `A11Y-004` Reduce Non-Essential Interaction Motion

## Motion Behavior

If opening or closing preview uses non-essential motion, respect a reduced-motion preference or provide an equivalent way to disable it. The reduced-motion state may switch directly to the same sheet, panel, or preview state; it must not remove the preview or its return path.

## Mobile Behavior

Use a sheet, drawer, or temporary detail view that preserves return state. Avoid resetting filters or scroll on close.

## Desktop Behavior

Prefer side panel, split view, peek, or preview pane when space allows.

## Empty State

Show the source list empty state and avoid opening an empty preview by default.

## Loading State

Keep the source context visible while preview content loads.

## Error State

Show preview-level error and keep the source list usable.

## Required Rules

- `UX-003` Preserve Context During Inspection
- `IA-002` Define The Object Model Before Screens
- `IA-001` One Stable Home Surface
- `A11Y-001` 44x44 Touch Targets
- `A11Y-004` Reduce Non-Essential Interaction Motion

## Related Research

- `research/products/arc.md`
- `research/products/linear.md`
- `research/products/telegram.md`

## Related Patterns

- Parent: none
- Child: none
- Alternative: full detail page when editing is the main task
- Depends on: `object-status-list.md` when previewing structured objects

## Examples

- A consumer task app opens task detail from Today without losing the Today list.
- An issue tracker opens issue detail beside the filtered issue list.

## Agent Checklist

- Does opening detail preserve source context?
- Can users inspect several items quickly?
- Is the return path obvious?
- Does preview stay smaller than a full workspace?
- When motion exists, can reduced motion reach the same preview and return state?
