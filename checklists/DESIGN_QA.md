---
id: CHECK-00001
alias: CHECK-DESIGN-QA
slug: design-qa
title: Design QA Checklist
object_type: checklist
status: draft
version: 0.2.0
category: design-qa
tags:
  - checklist
  - review
  - design-qa
maturity: seed
risk_level: medium
relationships:
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
---

# Design QA Checklist

Use this checklist after applying research, rules, and patterns.

## Rule Coverage

- `PRD-001` - Is the repeated daily action prioritized?
- `PRD-002` - Can users capture before organizing?
- `IA-001` - Is there one stable home surface?
- `IA-002` - Are core objects, states, and relationships clear?
- `UX-001` - Are primary mobile actions thumb-reachable?
- `UX-002` - Are advanced controls progressively disclosed?
- `UX-003` - Can users inspect without losing context?
- `VIS-001` - Are semantic tokens used for visual decisions?
- `A11Y-001` - Are touch targets at least 44x44 CSS pixels?
- `A11Y-002` - Are validation errors specific, textual, and recoverable?
- `A11Y-003` - Does every keyboard-operable control retain visible focus?
- `A11Y-004` - When non-essential motion exists, can users reduce or disable it?
- `PERF-001` - Does asynchronous content preserve surrounding layout geometry?
- `VIS-002` - Do expressive materials preserve content and primary-action priority?
- `UX-004` - Does motion explain state continuity with reduced-motion and platform fallbacks?
- `UX-005` - When work is delegated to an agent, are status, result, and intervention points observable?

## Pattern Coverage

- Does the screen use a documented pattern when one applies?
- Is the pattern appropriate for the product context?
- Did the pattern preserve the user's primary job?
- Did the pattern avoid copying a source product blindly?

## Final Checks

- Product goal is clear.
- Primary and secondary actions are visually distinct.
- Empty, loading, error, success, and disabled states are accounted for.
- Mobile layout works at 390px width.
- Accessibility basics are present: labels, focus, contrast, target size, and textual error recovery.
- State changes avoid unexpected layout shifts.
- Motion, when present, has a reduced-motion equivalent.
- Platform-specific visual effects and interaction APIs have appropriate fallbacks.
- Visual direction cites observable references instead of imitating a brand.

## Evidence Boundary

- Mark unrendered, unmeasured, or untested behavior as a gap rather than a pass.
- Cite the reviewed artifact, prompt, reference project, or benchmark evidence in the resulting review object.
