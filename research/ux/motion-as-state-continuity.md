---
id: RESEARCH-00010
alias: MOTION-AS-STATE-CONTINUITY
slug: motion-as-state-continuity
title: Motion As State Continuity
object_type: research
status: draft
version: 0.1.0
category: ux
tags:
  - motion
  - state
  - continuity
  - design-system
maturity: seed
risk_level: high
relationships:
  - type: derived_from
    target: observations/interaction/figma-motion-as-system-capability.md
  - type: derived_from
    target: observations/interaction/chrome-scoped-view-transitions.md
  - type: related_to
    target: RESEARCH-00008
  - type: related_to
    target: RESEARCH-00005
---

# Motion As State Continuity

## Why Study It

Motion is often requested as generic polish after screens are assembled. Current tooling and platform capabilities instead make it possible to define motion as a reusable, inspectable part of state behavior.

## Source Signals

- Figma Motion places timing, easing, and keyframes beside components and variables and exposes them for implementation.
- Element-scoped View Transitions can preserve page interactivity while explaining local state change.
- Existing accessibility research requires equivalent function when non-essential motion is reduced.
- Arc product research already identifies orientation and context preservation as legitimate motion purposes.

Sources:

- https://www.figma.com/blog/introducing-figma-motion/
- https://developer.chrome.com/blog/element-scoped-view-transitions
- https://developer.chrome.com/docs/css-ui/view-transitions/element-scoped-view-transitions

## Observed Design Behavior

- Motion connects a known start state to a known end state.
- Local transitions preserve unrelated context and interactivity.
- Reusable timing and easing values improve consistency and handoff.
- Reduced-motion behavior preserves the same information, focus, and action outcome.

## Design Takeaways For Agents

- Specify the state relationship before duration or easing.
- Reuse named motion roles rather than creating unrelated animation values.
- Keep feedback transitions short enough that they do not delay expert work.
- Define reduced-motion and unsupported-platform fallbacks in the same contract.
- Verify focus, loading, error, and completion states without relying on movement alone.

## Candidate Rule Directions

- Use motion to explain state continuity, not to decorate.
- Store repeated motion behavior as system roles with explicit fallbacks.

## Do Not Copy Blindly

- Do not treat every component as an animation opportunity.
- Do not require a browser API without a progressive fallback.
- Do not remove necessary feedback when reduced motion is active.
