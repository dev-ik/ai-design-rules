---
id: RESEARCH-00011
alias: CONTEXTUAL-AGENTIC-INTERFACE
slug: contextual-agentic-interface
title: Contextual And Observable Agentic Interfaces
object_type: research
status: draft
version: 0.1.0
category: ux
tags:
  - ai
  - agentic-ui
  - context
  - trust
maturity: seed
risk_level: high
relationships:
  - type: derived_from
    target: observations/ai/figma-agent-context-and-skills.md
  - type: derived_from
    target: observations/ai/agent-work-visibility-and-intervention.md
  - type: related_to
    target: RESEARCH-00004
---

# Contextual And Observable Agentic Interfaces

## Why Study It

AI product surfaces increasingly coordinate tools, long-running tasks, and shared work. A prompt box alone does not expose enough context, progress, or control for these workflows.

## Source Signals

- Figma's agent uses structured files, components, tokens, attachments, connectors, shared prompt history, and reusable skills.
- Figma's agentic-work case study shows active, completed, review-ready, and intervention-required work outside the chat thread.
- Existing Linear research supports visible state and calm handling of high information density.

Sources:

- https://www.figma.com/blog/agent-custom-tools-context-skills/
- https://www.figma.com/blog/the-figma-canvas-is-now-open-to-agents/
- https://www.figma.com/blog/how-to-design-agentic-tools-for-work/

## Observed Design Behavior

- The agent is grounded in product and system context instead of only prompt text.
- Delegated work exposes status, scope, result, and whether human input is required.
- Users can inspect and intervene without managing every internal agent step.
- Shared history makes decisions and iterations available to collaborators.

## Design Takeaways For Agents

- Identify the user's goal before exposing agent mechanics.
- Show stable states for queued, active, blocked, review-ready, complete, failed, and cancelled work when those states exist.
- Make scope, source context, result, and intervention points inspectable.
- Keep recovery and cancellation proportional to the risk and duration of the work.
- Do not make chat the only place where users can understand ongoing work.

## Candidate Rule Directions

- Expose agent work state and intervention points for delegated or long-running work.
- Ground agent output in inspectable product and design-system context.

## Do Not Copy Blindly

- Do not add an operations dashboard for an instant deterministic action.
- Do not expose internal chain-of-thought or irrelevant implementation detail.
- Do not imply that visibility alone makes an unsafe agent action trustworthy.
