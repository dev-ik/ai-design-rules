---
id: OBS-00004
alias: OBS-A11Y-REDUCED-MOTION
slug: wcag-reduced-interaction-motion
title: Reduced Interaction Motion
object_type: observation
status: draft
version: 0.1.0
category: accessibility
tags:
  - accessibility
  - motion
  - reduced-motion
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
  - interaction-transition
applies_to:
  - non-essential-motion
does_not_apply_to:
  - essential-motion-that-conveys-required-information
relationships: []
---

# Reduced Interaction Motion

## Source

W3C WCAG 2.2, Understanding Success Criterion 2.3.3: Animation from Interactions.

## Observed Behavior

Non-essential motion initiated by an interaction can distract or make people ill. Interfaces can avoid it, offer a control, or respect a reduced-motion preference; movement essential to the information or function is an exception.

## Why It May Matter

Motion should never be an undisclosed dependency for using a product. Treating reduced motion as an explicit state preserves orientation without forcing decorative animation into interfaces that do not need it.

## Evidence

- https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions
