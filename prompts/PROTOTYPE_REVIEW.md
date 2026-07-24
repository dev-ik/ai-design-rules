---
id: PROMPT-00002
alias: PROMPT-PROTOTYPE-REVIEW
slug: prototype-review
title: Prototype Review Prompt
object_type: prompt
status: draft
version: 0.2.0
category: review
tags:
  - prompt
  - review
  - prototype
maturity: seed
risk_level: medium
relationships:
  - type: related_to
    target: PAT-00001
  - type: related_to
    target: PAT-00002
  - type: related_to
    target: PAT-00003
  - type: related_to
    target: PAT-00004
  - type: related_to
    target: PAT-00005
  - type: related_to
    target: PAT-00006
  - type: related_to
    target: RULE-00001
  - type: related_to
    target: RULE-00002
  - type: related_to
    target: RULE-00003
  - type: related_to
    target: RULE-00004
  - type: related_to
    target: RULE-00005
  - type: related_to
    target: RULE-00006
  - type: related_to
    target: RULE-00007
  - type: related_to
    target: RULE-00008
  - type: related_to
    target: RULE-00009
  - type: related_to
    target: RULE-00010
  - type: related_to
    target: RULE-00011
  - type: related_to
    target: RULE-00012
  - type: related_to
    target: RULE-00013
  - type: related_to
    target: RULE-00014
  - type: related_to
    target: RULE-00015
  - type: related_to
    target: RULE-00016
  - type: requires
    target: CHECK-00001
---

# Prototype Review Prompt

Review a rendered or runnable prototype before refactoring.

## Objective

Identify the smallest evidence-backed changes that improve product clarity, visual hierarchy, state behavior, responsive quality, and accessibility without inventing a new product direction.

## Required Inputs

- User goal and primary action.
- Prototype path, URL, screenshots, or runnable implementation.
- Target platforms and viewports.
- Existing components, tokens, and product design direction.
- Focused graph context for the reviewed task.
- Reference evidence when the requested change is visual exploration or polish.

## Pattern Coverage

Check whether a documented pattern applies:

- `patterns/daily-home-surface.md`
- `patterns/quick-capture.md`
- `patterns/mobile-primary-action.md`
- `patterns/progressive-detail.md`
- `patterns/object-status-list.md`
- `patterns/context-preserving-preview.md`

## Rule Coverage

- `PRD-001`
- `PRD-002`
- `IA-001`
- `IA-002`
- `UX-001`
- `UX-002`
- `UX-003`
- `VIS-001`
- `A11Y-001`
- `A11Y-002`
- `PERF-001`
- `A11Y-003`
- `A11Y-004`
- `VIS-002`
- `UX-004`
- `UX-005` when delegated or long-running agent work exists

## Review Sequence

1. Confirm the artifact can be rendered or inspected. Mark missing evidence instead of guessing.
2. Describe the current user goal, primary action, secondary actions, and object states.
3. Check applicable patterns and rules.
4. Review the content layer, functional layer, focal emphasis, density, typography, spacing, and semantic visual roles.
5. Review default, loading, empty, error, success, disabled, and permission states that apply.
6. Review desktop and mobile behavior when layout is affected.
7. Review focus, labels, target size, contrast-sensitive choices, textual errors, and reduced motion.
8. Review start state, end state, purpose, timing role, and fallback for meaningful motion.
9. When agentic work applies, review queued, active, blocked, review-ready, complete, failed, cancelled, and intervention behavior.
10. Compare recommendations with supplied references at the level of abstract behavior; do not copy a brand composition or proprietary asset.

## Instruction

Use `CHECK-00001`.

Do not redesign immediately. Do not invent rendered behavior, visual evidence, benchmark results, or unsupported design rules.

Produce a severity-ordered review and a phased change plan. Every recommendation must cite the inspected artifact and an applicable rule, pattern, token, component convention, or explicit research gap.

## Output Contract

```md
## Verdict
- Result: PASS | NEEDS WORK
- Evidence reviewed:
- Evidence gaps:

## Product And Interaction
- User goal:
- Primary action:
- Main friction:

## Visual Direction
- Content layer:
- Functional layer:
- Focal emphasis:
- Generic-AI or overdesign risk:
- Reference evidence:

## State Coverage
- Missing or weak states:
- Agent lifecycle states, when applicable:

## Responsive And Accessibility
- Desktop:
- Mobile:
- Keyboard and focus:
- Contrast and target size:
- Reduced motion:

## Findings
For each finding:
- Severity:
- Evidence:
- Impact:
- Related IDs:
- Smallest safe change:

## Phased Plan
1. Tokens and reusable roles.
2. Components and states.
3. Layout and responsive behavior.
4. Interaction and motion.
5. Visual QA and accessibility verification.

## Knowledge Gaps
- Observation or research needed:
```
