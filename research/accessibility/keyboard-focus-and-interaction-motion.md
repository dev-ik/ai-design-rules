---
id: RESEARCH-00008
alias: KEYBOARD-FOCUS-AND-MOTION
slug: keyboard-focus-and-interaction-motion
title: Keyboard Focus And Interaction Motion
object_type: research
status: draft
version: 0.1.0
category: accessibility
tags:
  - accessibility
  - keyboard
  - focus
  - motion
maturity: seed
risk_level: high
relationships:
  - type: derived_from
    target: observations/accessibility/visible-keyboard-focus.md
  - type: derived_from
    target: observations/accessibility/reduced-interaction-motion.md
---

# Keyboard Focus And Interaction Motion

## Why Study It

Controls, sheets, and transitions are part of task completion. A user must be able to locate keyboard focus and opt out of non-essential interaction motion without losing access to the same product function.

## Source Signals

- WCAG 2.2 SC 2.4.7 requires a mode where each keyboard-operable control has a visible focus indicator.
- W3C notes that the indicator must remain visible while focus is shown; removing or hiding it is a failure mode.
- WCAG 2.2 SC 2.3.3 states that interaction-triggered motion can be disabled unless it is essential to the function or information.
- W3C identifies avoidance, an explicit control, and a reduced-motion preference as valid approaches to non-essential motion.

Sources:

- https://www.w3.org/WAI/WCAG22/Understanding/focus-visible
- https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions

## Observed Design Behavior

- Inputs, buttons, rows, and close controls keep a visible keyboard focus state.
- Motion is used only to clarify a transition or relationship, never as the only way to understand state.
- A reduced-motion preference replaces non-essential movement with an immediate or non-moving state change.

## Design Takeaways For Agents

- Specify focus behavior for every keyboard-operable control in a critical flow.
- Treat reduced motion as a conditional requirement when interaction motion exists.
- Do not use a motion rule to justify decorative animation.

## Candidate Rule Directions

- Keep keyboard focus visible for keyboard-operable controls.
- Allow non-essential interaction motion to be reduced or disabled.

## Do Not Copy Blindly

- Do not prescribe one visual focus style across all platforms; preserve a visible platform-appropriate indicator.
- Do not remove motion that is essential to conveying required information without providing an equivalent static presentation.
