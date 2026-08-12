---
id: REF-00002
alias: REF-CONSEQUENTIAL-ACTION-CONFIRMATION
slug: consequential-action-confirmation-reference
title: Consequential Action Confirmation Reference Project
object_type: reference_project
status: active
version: 0.1.0
category: fintech
tags:
  - reference-project
  - confirmation
  - wallet
  - agentic-ui
last_reviewed_at: 2026-08-12
maturity: validated
risk_level: high
relationships:
  - type: implements
    target: PROMPT-00006
  - type: implements
    target: PAT-00007
  - type: validates
    target: RESEARCH-00012
  - type: validates
    target: RULE-00017
  - type: validates
    target: PAT-00007
  - type: validates
    target: PROMPT-00006
---

# Consequential Action Confirmation Reference Project

## Product Context

This reference project defines a reviewable wallet withdrawal and agent-approval flow for validating high-risk operational guidance. It is a specification reference, not a runnable financial product and not legal, compliance, trading, or security policy.

The core object is a `WithdrawalRequest`. Its critical fields are asset, amount, fee, provider, destination, selected account, server-requested challenge, execution state, and final request identifier.

## Patterns Used

- `PAT-00007` / `PAT-007` Consequential Action Confirmation
- `PAT-00005` / `PAT-005` Context-Preserving Preview when the source form or object list must remain inspectable
- `PAT-00006` / `PAT-006` Object Status List when multiple affected objects or challenge states must be compared

## Rules Applied

- `RULE-00017` / `UX-006` Confirm Consequential Actions With Preserved Context
- `RULE-00007` / `UX-003` Preserve Context During Inspection
- `RULE-00010` / `A11Y-002` Textual Input Error Recovery
- `RULE-00016` / `UX-005` Expose Agent Work And Intervention when an agent assists or initiates the action

## Research Influence

- `RESEARCH-00012` / High-Risk Operational Flows
- `RESEARCH-00011` / Contextual And Observable Agentic Interfaces
- `RESEARCH-00006` / Textual Error Recovery

## Reference Flow

1. The user enters withdrawal details: asset, amount, provider, destination, and optional note.
2. The product computes fee, limit, balance impact, and available execution path.
3. The confirmation surface repeats the critical object and consequence: asset, amount, fee, destination, provider, account, expected status, and reversibility.
4. If the server requires 2FA, passkey, KYC, email approval, or another challenge, the challenge is added without clearing withdrawal details.
5. During pending execution, the reviewed object remains visible and duplicate submission is blocked.
6. On error, the failed challenge or blocked prerequisite is named in product language, entered data remains available, and the recovery action is explicit.
7. On success, the terminal state shows the request identifier, next status, expected user action, and route to history.
8. If an agent prepared the action, the agent cannot execute the withdrawal or external side effect without explicit approval and an interruptible pre-execution state.

## Validation Questions

- Does every confirmation keep the affected object and side effects visible?
- Does every challenge add only the missing confirmation field?
- Can the user cancel, edit critical inputs, retry, or inspect the terminal result?
- Does the flow avoid raw backend codes as product copy?
- For agent-assisted work, is explicit approval required before execution and is the audit trail inspectable?

## Evidence Limits

- This validates a specification-level contract and review prompt, not a shipped wallet implementation.
- It does not validate backend policy, financial compliance, fraud controls, custody safety, or trading suitability.
- A future rendered fixture should test keyboard traversal, mobile sheet behavior, focus recovery, reduced motion, and failure copy before promoting this pattern toward canonical maturity.
