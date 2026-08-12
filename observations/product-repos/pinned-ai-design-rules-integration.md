---
id: OBS-00012
alias: OBS-PINNED-RULES-INTEGRATION
slug: pinned-ai-design-rules-integration
title: Mature Codebases Use Pinned AI Design Rules Snapshots
object_type: observation
status: draft
version: 0.1.0
category: product
tags:
  - adoption
  - agent-workflow
  - design-rules
created_at: 2026-08-12
updated_at: 2026-08-12
last_reviewed_at: 2026-08-12
owner: ai-design-rules
maturity: seed
risk_level: medium
platform:
  - repository
product_type:
  - agent-instructions
surface:
  - project-integration
applies_to:
  - product-repository-agent-guidance
does_not_apply_to:
  - backend-only-maintenance
relationships: []
---

# Mature Codebases Use Pinned AI Design Rules Snapshots

## Source

Implementation review notes for AI Design Rules adoption.

## Observed Behavior

AI Design Rules does not need one fixed integration mode. One adoption mode keeps a pinned snapshot under a local design-rules directory. Another uses a local bridge skill that points agents at a minimal snapshot. A third treats the repository as an optional product/design reasoning layer and explicitly keeps local architecture, API, security, routing, testing, and verification rules higher priority.

## Why It May Matter

Adoption works better when AI Design Rules offers integration modes instead of assuming one full starter-kit copy. Product repositories need reproducibility, local precedence, and a lightweight path for narrow UI changes.

## Evidence

- Implementation review note captured on 2026-08-12.
