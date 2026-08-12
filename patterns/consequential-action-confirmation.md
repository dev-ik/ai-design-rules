---
id: PAT-00007
alias: PAT-007
slug: consequential-action-confirmation
title: Consequential Action Confirmation
object_type: pattern
status: active
version: 0.1.0
category: ux
tags:
  - ux
  - confirmation
  - recovery
  - finance
  - ai
maturity: validated
risk_level: high
last_reviewed_at: 2026-08-12
relationships:
  - type: requires
    target: RULE-00017
  - type: requires
    target: RULE-00007
  - type: requires
    target: RULE-00010
  - type: requires
    target: RULE-00016
  - type: related_to
    target: PAT-00005
  - type: related_to
    target: PAT-00006
---

# Consequential Action Confirmation

## Purpose

Let users verify and recover from actions with meaningful side effects without losing the object, inputs, or scope they are acting on.

## User Goal

Make a high-consequence decision with enough context to confirm, cancel, edit, retry, or hand control back from an agent.

## Product Context

Wallets, trading products, admin tools, account-security flows, publishing flows, destructive durable-data actions, and agentic systems that can act on the user's behalf.

## Use When

- The action can move money, change account access, publish externally, delete durable data, or affect other people.
- The action requires 2FA, passkey, KYC, server approval, permissions, or human approval.
- An agent is about to perform a consequential action outside a read-only summary.
- The user must compare critical inputs before execution.

## Do Not Use When

- The action is low-risk, reversible, and better handled with undo.
- The confirmation would interrupt a safe repeated expert workflow without adding review value.
- The UI cannot truthfully describe the side effects or recovery path yet.
- Legal, compliance, security, or trading policy is unclear and must be resolved outside design.

## UX Rules

- `UX-006` Confirm Consequential Actions With Preserved Context
- `UX-003` Preserve Context During Inspection
- `UX-005` Expose Agent Work And Intervention

## Accessibility Rules

- `A11Y-002` Textual Input Error Recovery
- `A11Y-001` 44x44 Touch Targets when controls are present
- `A11Y-003` Visible Keyboard Focus when the confirmation is keyboard-operable

## Mobile Behavior

Use a focused screen, bottom sheet, or modal that keeps critical context readable: object, amount, recipient, destination, scope, side effects, and primary recovery action. Preserve safe-area spacing and reachable controls. Do not hide the acted-on object behind a generic confirmation title.

## Desktop Behavior

Use a modal, side panel, inline challenge step, or review page depending on consequence and density. Keep the source context visible when it helps comparison. Dense operational products may use a review pane beside the original form.

## Empty State

Do not open a confirmation without a selected object or valid action. Show the missing prerequisite and a route back to the required selection or setup step.

## Loading State

Keep the reviewed object and critical inputs visible while the challenge or submission is pending. Disable only controls that would create duplicate execution. Show cancelability truthfully.

## Error State

Preserve entered data and add only the missing or failed challenge field. Explain what failed, what remains unchanged, and what the user can do next. Avoid raw backend codes as product copy.

## Required Rules

- `UX-006` Confirm Consequential Actions With Preserved Context
- `UX-003` Preserve Context During Inspection
- `A11Y-002` Textual Input Error Recovery
- `UX-005` Expose Agent Work And Intervention

## Related Research

- `research/ux/high-risk-operational-flows.md`
- `research/ux/contextual-agentic-interface.md`
- `research/accessibility/textual-error-recovery.md`

## Related Patterns

- Parent: none
- Child: none
- Alternative: lightweight undo for low-risk reversible actions
- Depends on: `context-preserving-preview.md` when source context must remain inspectable
- Adjacent: `object-status-list.md` when multiple affected objects must be reviewed

## Examples

- A wallet withdrawal challenge keeps provider, amount, destination, fee, and selected asset visible while requesting 2FA.
- An admin bulk delete confirmation lists affected objects and explains reversibility before execution.
- An agent asks approval before sending a message, changing permissions, running a paid operation, or publishing externally.

## Agent Checklist

- What is the consequence and how reversible is it?
- Which object, amount, recipient, scope, or side effects must remain visible?
- Can the user cancel, edit critical inputs, and retry without restarting unrelated work?
- Does the error state preserve entered data and ask only for the missing challenge?
- For agentic work, is explicit approval required before the side effect and is interruption still available?
