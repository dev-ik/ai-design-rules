---
id: OBS-00013
alias: OBS-WALLET-RISK-RECOVERY
slug: high-risk-wallet-recovery-flows
title: Wallet Flows Preserve Context Through Risk Gates
object_type: observation
status: draft
version: 0.1.0
category: ux
tags:
  - finance
  - wallet
  - recovery
  - confirmation
created_at: 2026-08-12
updated_at: 2026-08-12
last_reviewed_at: 2026-08-12
owner: ai-design-rules
maturity: seed
risk_level: high
platform:
  - web
product_type:
  - fintech
  - wallet
surface:
  - withdrawal
  - authentication
  - recovery
applies_to:
  - consequential-user-actions
does_not_apply_to:
  - low-risk-preference-changes
relationships: []
---

# Wallet Flows Preserve Context Through Risk Gates

## Source

Wallet product design review note captured on 2026-08-12.

## Observed Behavior

The wallet design guidance treats withdrawal, KYC, 2FA, passkey, activation, and backend error states as separate recoverable flows. Challenged withdrawals keep provider, amount, and requisites visible and unchanged, then retry with only the server-requested confirmation field added. Backend error codes are stripped from user copy, but useful backend-provided recovery messages are preserved.

## Why It May Matter

High-risk flows become less safe when confirmations erase context, hide the object being acted on, or collapse distinct risk gates into generic error UI. Users need to verify exactly what will happen and recover without re-entering unrelated data.

## Evidence

- Wallet design-decision note captured on 2026-08-12.
- Wallet product-requirement note captured on 2026-08-12.
- Wallet implementation-planning note captured on 2026-08-12.
