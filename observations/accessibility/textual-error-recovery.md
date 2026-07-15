---
id: OBS-00001
alias: OBS-A11Y-ERROR-RECOVERY
slug: wcag-textual-error-recovery
title: Textual Error Recovery
object_type: observation
status: draft
version: 0.1.0
category: accessibility
tags:
  - accessibility
  - errors
  - forms
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
  - form
applies_to:
  - input-validation
  - submission-errors
does_not_apply_to:
  - server-error-details-that-expose-sensitive-data
relationships: []
---

# Textual Error Recovery

## Source

W3C WCAG 2.2, Understanding Success Criterion 3.3.1: Error Identification.

## Observed Behavior

When an input error is detected, the affected input and the nature of the error are described in text. Color, icons, or styling may reinforce the message but do not replace it. A useful message can also state how to correct the value.

## Why It May Matter

Users need to know what failed and what to change without relying on color perception or visual scanning. Field-specific text enables recovery for assistive-technology users and reduces repeated, blind resubmission.

## Evidence

- https://www.w3.org/WAI/WCAG22/Understanding/error-identification
