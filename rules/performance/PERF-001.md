---
id: RULE-00011
alias: PERF-001
slug: reserve-layout-space-for-asynchronous-content
title: Reserve Layout Space For Asynchronous Content
object_type: rule
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
    target: RESEARCH-00007
---

# PERF-001 Reserve Layout Space For Asynchronous Content

Status: Draft
Domain: Performance

## Source Research

- `research/performance/reserved-loading-space.md`

## Why

When loading media, embeds, or delayed content unexpectedly moves controls and text, users lose orientation and may act on the wrong target. Stable loading geometry makes waiting predictable.

## Rule

Reserve the expected layout space for asynchronous content before it arrives. Loading placeholders must preserve the structure and approximate dimensions of the resolved content whenever those dimensions are known.

## Good

- An image card declares or derives its aspect ratio before the image is painted.
- A list row skeleton has the same height and action placement as the loaded row.
- An embed or dynamic slot reserves a bounded, expected region instead of pushing active content down on arrival.

## Bad

- A spinner occupies a smaller region than the content that will replace it, shifting nearby controls after load.
- Lazy-loaded media appears above an active form or list item without reserved space.
- A placeholder reserves an arbitrary large area that collapses dramatically when content loads.

## Review

- Test slow-network and cache-cold loading states.
- Compare the loading and resolved layout around primary actions and visible controls.
- Check media, embeds, list rows, and late-loaded status blocks for unexpected movement.
- Exclude deliberate user-initiated expansion or reordering from layout-shift findings.
