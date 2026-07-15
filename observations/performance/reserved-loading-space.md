---
id: OBS-00002
alias: OBS-PERF-RESERVED-SPACE
slug: asynchronous-content-layout-stability
title: Reserved Loading Space
object_type: observation
status: draft
version: 0.1.0
category: performance
tags:
  - performance
  - loading
  - layout-stability
created_at: 2026-07-14
updated_at: 2026-07-14
last_reviewed_at: 2026-07-14
owner: ai-design-rules
maturity: seed
risk_level: medium
platform:
  - web
product_type:
  - consumer
surface:
  - loading-state
applies_to:
  - asynchronous-media
  - lazy-loaded-content
  - loading-placeholders
does_not_apply_to:
  - user-initiated-layout-changes
relationships: []
---

# Reserved Loading Space

## Source

web.dev, Optimize Cumulative Layout Shift.

## Observed Behavior

Asynchronous images, embeds, and other content move visible controls and text when their layout space is unknown before they load. Reserving space with known dimensions or a layout-matching placeholder keeps nearby content stable.

## Why It May Matter

Unexpected movement makes a product feel unreliable and can cause users to lose their place or activate the wrong control. A placeholder only improves the experience when its reserved space approximates the arriving content.

## Evidence

- https://web.dev/articles/optimize-cls
