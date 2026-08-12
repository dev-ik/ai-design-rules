---
id: PROMPT-00006
alias: PROMPT-CONSEQUENTIAL-ACTION-REVIEW
slug: consequential-action-review
title: Consequential Action Review Prompt
object_type: prompt
status: active
version: 0.1.0
category: review
tags:
  - prompt
  - review
  - confirmation
  - recovery
  - agentic-ui
maturity: validated
risk_level: high
last_reviewed_at: 2026-08-12
relationships:
  - type: requires
    target: PAT-00007
  - type: requires
    target: RULE-00017
  - type: requires
    target: RULE-00007
  - type: requires
    target: RULE-00010
  - type: related_to
    target: RULE-00016
---

# Consequential Action Review Prompt

## Objective

Review a high-consequence action flow for context preservation, risk-proportional confirmation, recoverable challenge states, and agent approval boundaries.

## Required Inputs

- The action being reviewed and its consequence.
- The affected object, critical inputs, side effects, and reversibility.
- Screens, implementation, screenshots, or runnable prototype.
- Default, confirmation, challenge, loading, error, retry, success, and cancelled states.
- Whether the action is human-initiated, agent-initiated, or agent-assisted.

## Instruction

```text
Review the provided flow using PAT-007, UX-006, UX-003, A11Y-002, and UX-005 when agentic work exists.

Do not invent legal, compliance, security, financial, trading, or backend policy. Mark missing policy or implementation evidence as a gap.

Verify that the flow preserves the affected object, critical inputs, side effects, reversibility, and recovery path through confirmation, challenge, loading, error, retry, success, and cancellation. For agentic work, verify that consequential side effects require explicit approval, remain interruptible before execution, and leave inspectable evidence.

Return a verdict, severity-ordered findings, state coverage, and the rule or pattern supporting every finding.
```

## Output Contract

```md
## Verdict
- Result: PASS | NEEDS WORK
- Evidence reviewed:
- Evidence gaps:

## Consequence Map
- Action:
- Affected object:
- Critical inputs:
- Side effects:
- Reversibility:
- Required authority or challenge:

## State Coverage
- Default:
- Confirmation:
- Challenge:
- Loading:
- Error:
- Retry:
- Success:
- Cancelled:

## Agent Boundary
- Agent involvement:
- Approval point:
- Interruption path:
- Evidence or audit trail:

## Findings
For each finding:
- Severity:
- Evidence:
- Impact:
- Related IDs:
- Smallest safe change:

## Knowledge Gaps
- Missing policy, evidence, or research:
```
