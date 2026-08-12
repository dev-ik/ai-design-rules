---
id: OBS-00015
alias: OBS-AGENT-CONSEQUENTIAL-CONTROLS
slug: agent-consequential-action-controls
title: Agentic Systems Gate Consequential Actions With Control And Auditability
object_type: observation
status: draft
version: 0.1.0
category: ux
tags:
  - ai
  - agentic-ui
  - confirmation
  - audit
created_at: 2026-08-12
updated_at: 2026-08-12
last_reviewed_at: 2026-08-12
owner: ai-design-rules
maturity: seed
risk_level: high
platform:
  - web
product_type:
  - ai-tool
  - productivity
surface:
  - agent-workflow
  - permissions
applies_to:
  - delegated-consequential-actions
does_not_apply_to:
  - read-only-summaries
relationships: []
---

# Agentic Systems Gate Consequential Actions With Control And Auditability

## Source

OpenAI ChatGPT agent, OpenAI Codex safety, Microsoft agent design guidance, Microsoft HAX, and Google PAIR guidance.

## Observed Behavior

Current agentic systems make higher-risk actions explicit through permission prompts, interruption, takeover, sandbox boundaries, approval policies, observable progress, and logs. Human-centered AI guidance also emphasizes lifecycle design, user ownership, correction paths, expectation setting, and recovery when AI output is wrong.

## Why It May Matter

As agents move from advice to action, design systems need rules for consequence-aware control. A generic confirm dialog is not enough when the user must understand scope, source context, side effects, reversibility, and audit trail.

## Evidence

- https://openai.com/index/introducing-chatgpt-agent/
- https://openai.com/index/running-codex-safely/
- https://learn.microsoft.com/en-us/agents/design-guidelines/human-centered-design
- https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/
- https://pair.withgoogle.com/guidebook-v2/
