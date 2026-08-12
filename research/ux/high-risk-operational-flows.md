---
id: RESEARCH-00012
alias: HIGH-RISK-OPERATIONAL-FLOWS
slug: high-risk-operational-flows
title: High-Risk Operational Flows
object_type: research
status: active
version: 0.1.0
category: ux
tags:
  - finance
  - ai
  - confirmation
  - recovery
  - trust
maturity: validated
risk_level: high
last_reviewed_at: 2026-08-12
relationships:
  - type: derived_from
    target: observations/finance/high-risk-wallet-recovery-flows.md
  - type: derived_from
    target: observations/finance/market-interface-adaptive-trading-surfaces.md
  - type: derived_from
    target: observations/ai/agent-consequential-action-controls.md
  - type: related_to
    target: RESEARCH-00011
  - type: related_to
    target: RESEARCH-00006
---

# High-Risk Operational Flows

## Why Study It

AI agents, wallets, trading surfaces, and account-security flows increasingly let users perform actions with real consequences. These surfaces need more than visual polish: they need risk-proportional confirmation, preserved context, interruption, recovery, and auditability.

## Source Signals

- Wallet product notes treat withdrawals, KYC, 2FA, passkeys, activation, and backend challenges as distinct recoverable flows.
- Market-interface notes separate chart domain data from chart-engine data and adapt dense trading controls into mobile sheets or tablet modals instead of compressing desktop UI.
- OpenAI's ChatGPT agent exposes user control through permission before consequential actions, interruption, takeover, stop, and task progress visibility.
- OpenAI's Codex safety guidance uses sandbox boundaries, approval policies, network policy, and telemetry so higher-risk actions stop for review and remain inspectable.
- Microsoft agent guidance frames agent UX as a full lifecycle from expectation setting to correction and recovery.
- Microsoft HAX and Google PAIR both emphasize expectation setting, user control, correction, recovery, and failure planning for human-AI systems.

Sources:

- Wallet design-decision note captured on 2026-08-12.
- Wallet product-requirement note captured on 2026-08-12.
- Market-interface charting note captured on 2026-08-12.
- https://openai.com/index/introducing-chatgpt-agent/
- https://openai.com/index/running-codex-safely/
- https://learn.microsoft.com/en-us/agents/design-guidelines/human-centered-design
- https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/
- https://pair.withgoogle.com/guidebook-v2/

## Observed Design Behavior

- Consequential actions are gated by the action's risk, reversibility, and side effects.
- The object being acted on stays visible through confirmation and challenge states.
- Recovery asks only for the missing or challenged input instead of restarting the whole task.
- Distinct risk gates get distinct language and controls; generic error UI is avoided.
- Users can interrupt, stop, retry, or take over long-running delegated work.
- Mobile presentations preserve decision context with explicit sheet/modal contracts.
- Audit and evidence trails matter when action can affect money, account access, external communication, or other people.

## Design Takeaways For Agents

- Classify actions by consequence before choosing the UI surface.
- Preserve object, amount, recipient, source, scope, and side-effect context through every challenge state.
- Make confirmations proportional: low-risk reversible actions may use lightweight undo; irreversible or external-side-effect actions need review before execution.
- Keep the user's entered data stable while adding only the required challenge field.
- Expose what will happen, what is still editable, what can be cancelled, and what evidence will remain.
- For agentic work, combine lifecycle visibility with explicit approval for consequential actions.

## Candidate Rule Directions

- Confirm consequential actions with preserved context.
- Make challenge and recovery states additive rather than restarting the user journey.
- Treat mobile sheets for dense high-risk controls as contracts, not just responsive styling.

## Do Not Copy Blindly

- Do not add heavyweight confirmation to every harmless action.
- Do not let a confirmation hide the object, amount, recipient, or side effects.
- Do not expose internal backend codes as user-facing risk language.
- Do not imply that AI approval logs or confirmations make unsafe actions acceptable.
- Do not use this research as legal, compliance, trading, banking, or security policy.
