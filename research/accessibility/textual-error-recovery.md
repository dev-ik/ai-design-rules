---
id: RESEARCH-00006
alias: TEXTUAL-ERROR-RECOVERY
slug: textual-error-recovery
title: Textual Error Recovery
object_type: research
status: draft
version: 0.1.0
category: accessibility
tags:
  - accessibility
  - errors
  - forms
maturity: seed
risk_level: high
relationships:
  - type: derived_from
    target: observations/accessibility/textual-error-recovery.md
---

# Textual Error Recovery

## Why Study It

Forms and capture flows fail when a user cannot tell which value was rejected or how to recover. This is both an accessibility and task-completion risk.

## Source Signals

- W3C WCAG 2.2 Success Criterion 3.3.1 requires an automatically detected input error to identify the affected item and describe the error in text.
- W3C notes that color or visual styling may supplement, but cannot replace, the textual description.
- W3C distinguishes identifying an error from suggesting how to correct it; a clear message can serve both purposes.

Sources:

- https://www.w3.org/WAI/WCAG22/Understanding/error-identification

## Observed Design Behavior

- An error message names the field and the invalid condition.
- The error remains available in the flow instead of being conveyed only by a transient color change.
- When the correction is known, the message explains the required next input.

## Design Takeaways For Agents

- Treat validation as a recovery state, not a decorative red state.
- Keep the message specific to the affected input and understandable without color.
- Do not prescribe one display location for every form; inline, summary, alert, and dialog patterns depend on context.

## Candidate Rule Directions

- Describe detected input errors in text and identify the affected input.
- Give a correction hint when the valid value or format is known.

## Do Not Copy Blindly

- Do not expose private validation or server details in an error message.
- Do not force every error into a modal; choose the recovery mechanism for the task and platform.
