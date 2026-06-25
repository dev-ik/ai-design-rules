---
id: RESEARCH-00004
alias: LINEAR
slug: linear
title: Linear
object_type: research
status: draft
version: 0.1.0
category: product
tags:
  - product-research
  - workflow
  - operational-ui
maturity: seed
risk_level: medium
relationships:
---

# Linear

## Why Study It

Linear is useful for studying perceived performance, dense operational UI, issue workflow structure, and how professional tools can feel fast without becoming visually noisy.

## Source Signals

- Linear organizes work around teams, issues, projects, initiatives, cycles, views, filtering, integrations, and analytics.
- Projects are units of work with clear outcomes or planned completion dates.
- Issue workflows are team-specific and commonly move through Backlog, Todo, In Progress, Done, and Canceled.
- Triage acts as an inbox for incoming work from integrations and other teams.

Sources:

- https://linear.app/docs
- https://linear.app/docs/projects
- https://linear.app/docs/configuring-workflows

## Observed Design Behavior

- The product gives every work item a strong place in the system: issue, project, cycle, team, view.
- Navigation and filtering are treated as core product actions, not secondary utilities.
- Dense data is made scannable through consistent status, priority, ownership, and grouping.
- Workflow language stays operational and concrete.
- Views let different users inspect the same work from different angles without duplicating data.

## Design Takeaways For Agents

- Operational products need speed and structure before decoration.
- Clear object models reduce UI complexity.
- Dense screens can still feel calm when hierarchy, grouping, and actions are predictable.
- Inbox-style triage is useful when work enters from many sources.

## Candidate Rule Directions

- Define the product object model before designing screens.
- Give recurring work states stable names and positions.
- Let users switch views without changing the underlying data.

## Do Not Copy Blindly

- Do not apply Linear's density to consumer workflows where emotional clarity matters more than throughput.
- Do not introduce projects, cycles, or triage unless the product has real operational complexity.
