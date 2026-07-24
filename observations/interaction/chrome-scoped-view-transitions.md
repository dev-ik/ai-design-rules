---
id: OBS-00009
alias: OBS-CHROME-SCOPED-TRANSITIONS
slug: chrome-scoped-view-transitions
title: Scoped View Transitions Preserve Context During Local State Change
object_type: observation
status: draft
version: 0.1.0
category: ux
tags:
  - motion
  - web
  - state-transition
  - context
created_at: 2026-07-24
updated_at: 2026-07-24
last_reviewed_at: 2026-07-24
owner: ai-design-rules
maturity: seed
risk_level: medium
platform:
  - web
product_type:
  - consumer
  - productivity
surface:
  - state-transition
applies_to:
  - local-state-change
does_not_apply_to:
  - unsupported-browser-assumptions
relationships: []
---

# Scoped View Transitions Preserve Context During Local State Change

## Source

Chrome 147 element-scoped View Transition documentation.

## Observed Behavior

Element-scoped transitions can animate a specific subtree while the rest of the page remains interactive. Chrome positions this capability as useful for local state morphing and micro-interactions that preserve context.

## Why It May Matter

The product value of motion is continuity, not animation volume. A transition should make an object's state or location easier to follow without blocking unrelated work, and implementation guidance must account for platform support.

## Evidence

- https://developer.chrome.com/blog/element-scoped-view-transitions
- https://developer.chrome.com/docs/css-ui/view-transitions/element-scoped-view-transitions
