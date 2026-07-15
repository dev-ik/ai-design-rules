---
id: OBS-00003
alias: OBS-A11Y-FOCUS-VISIBLE
slug: wcag-visible-keyboard-focus
title: Visible Keyboard Focus
object_type: observation
status: draft
version: 0.1.0
category: accessibility
tags:
  - accessibility
  - keyboard
  - focus
created_at: 2026-07-14
updated_at: 2026-07-14
last_reviewed_at: 2026-07-14
owner: ai-design-rules
maturity: seed
risk_level: high
platform:
  - web
product_type:
  - consumer
surface:
  - interactive-controls
applies_to:
  - keyboard-operable-controls
does_not_apply_to:
  - non-interactive-content
relationships: []
---

# Visible Keyboard Focus

## Source

W3C WCAG 2.2, Understanding Success Criterion 2.4.7: Focus Visible.

## Observed Behavior

Keyboard-operable controls retain a visible focus indicator while focused. Removing or visually hiding browser focus leaves keyboard users unable to determine where their next action will apply.

## Why It May Matter

Focus is a state in the user journey, not a decoration. A visible, persistent indicator lets keyboard users complete capture and recovery flows without guessing which control is active.

## Evidence

- https://www.w3.org/WAI/WCAG22/Understanding/focus-visible
