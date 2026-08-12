---
id: OBS-00016
alias: OBS-MOBILE-SHEET-CHOICE
slug: mobile-bottom-sheet-choice-contracts
title: Mobile Choice Controls Need A Bottom-Sheet Contract
object_type: observation
status: draft
version: 0.1.0
category: ux
tags:
  - mobile
  - bottom-sheet
  - responsive
  - accessibility
created_at: 2026-08-12
updated_at: 2026-08-12
last_reviewed_at: 2026-08-12
owner: ai-design-rules
maturity: seed
risk_level: medium
platform:
  - mobile-web
product_type:
  - fintech
  - consumer
surface:
  - chooser
  - filter
  - action-sheet
applies_to:
  - compact-mobile-choice-controls
does_not_apply_to:
  - simple-inline-binary-toggles
relationships: []
---

# Mobile Choice Controls Need A Bottom-Sheet Contract

## Source

Mobile dropdown, compact layout, and media-capture planning note captured on 2026-08-12.

## Observed Behavior

Dense choice controls become full-width mobile sheets with safe-area space, reachable rows, labels, close controls, and tested viewport thresholds. In chat/media capture, the attachment sheet owns gallery/file choice while voice and video recording remain part of the existing composer state instead of becoming a parallel composer.

## Why It May Matter

Mobile sheets are often introduced as visual polish, but they define an interaction contract: ownership, focus, safe-area spacing, row target size, dismissal, and relationship to the triggering control.

## Evidence

- Mobile dropdown test note captured on 2026-08-12.
- Compact layout test note captured on 2026-08-12.
- Media-capture planning note captured on 2026-08-12.
