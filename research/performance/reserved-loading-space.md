---
id: RESEARCH-00007
alias: RESERVED-LOADING-SPACE
slug: reserved-loading-space
title: Reserved Loading Space
object_type: research
status: draft
version: 0.1.0
category: performance
tags:
  - performance
  - loading
  - layout-stability
maturity: seed
risk_level: medium
relationships:
  - type: derived_from
    target: observations/performance/reserved-loading-space.md
---

# Reserved Loading Space

## Why Study It

Slow or asynchronous content should not move the surrounding interface after users have begun reading or acting. This is a perceived-performance and interaction-safety concern.

## Source Signals

- web.dev defines Cumulative Layout Shift as a measure of visible-content instability.
- The guidance identifies media and late content with unknown dimensions as common sources of unexpected movement.
- Reserving the expected space lets the browser and interface keep nearby content in place while the content loads.

Sources:

- https://web.dev/articles/optimize-cls

## Observed Design Behavior

- Media and embeds reserve dimensions before their content arrives.
- Loading placeholders occupy the same structural space as the resolved content.
- Late content does not insert above a user’s current task unless it follows an explicit user action.

## Design Takeaways For Agents

- Specify loading-state geometry together with the resolved layout.
- Prefer stable placeholders over spinners that cause the final content to reflow the screen.
- Treat layout stability as part of the primary action’s feedback loop.

## Candidate Rule Directions

- Reserve layout space for asynchronous content and loading placeholders.

## Do Not Copy Blindly

- Do not hold a large empty region when the eventual content has no predictable size; choose a stable, bounded fallback instead.
- Do not suppress user-initiated expansion or reordering solely to avoid movement.
