# AI Design Rules v0.4.0

## Focused Context And Applied Patterns

This release makes task context more focused and explainable, applies visual and motion guidance in existing patterns, and adds the first paired rendered Todo benchmark with inspectable evidence.

## Included

- Context retrieval prioritizes exact identifiers and focused titles, matches whole Unicode words, and handles simple English task phrasing.
- Required and upstream dependencies are fully resolved, optional graph expansion is bounded, and each selected object includes a selection reason. Existing JSON fields are preserved.
- Daily Home Surface applies `VIS-001` / `VIS-002` through concrete hierarchy contracts; Context-Preserving Preview applies `UX-004` through motion, interruption, focus-return, and fallback contracts.
- A paired Todo run stores frozen source, prompts, context bundles, forty screenshots, runtime checks, and an internal evaluation.
- Quick Capture State Review checks keyboard access with realistic list lengths and layout geometry across saving, error, retry, and success states.
- Consequential-action guidance connects observations and research to `UX-006`, a confirmation pattern, a review prompt, and a reference specification with specification-level validation.
- An agent-led installation guide explains pinned integration into existing repositories while preserving project instructions and application behavior.

## Validation

- `npm run check` passes metadata, registry, generated-index, DesignLint, and benchmark-evidence checks.
- All 32 automated tests pass, including context matching, dependency closure, cycle handling, platform selection, and malformed evidence cases.
- Both Todo outputs were exercised at 390×844 and 1440×900. Capture retry, completion, detail return, edit recovery, persistence, and reduced-motion behavior were checked.

## Evidence Boundary

The paired run scored **7.42/10 for baseline and 7.67/10 with AI Design Rules** in an internal, unblinded evaluation. Touch targets and error-state layout improved, visual hierarchy tied, and sequential keyboard access to capture worsened from 4 to 29 Tab presses. Both prototypes remain **NEEDS WORK**.

This single pair does not establish a general quality gain or compare the previous release against this one. Physical mobile keyboard behavior, independent evaluation, and a new paired run of the revised review prompt remain outstanding. Updated patterns and the review prompt retain their draft/seed maturity. Consequential-action validation remains specification-level and does not validate production domain policy or security controls.

Read the [paired Todo evaluation](https://github.com/dev-ik/ai-design-rules/blob/v0.4.0/evidence/todo/2026-09-28-codex-paired-todo/EVALUATION.md) and [installation guide](https://github.com/dev-ik/ai-design-rules/blob/v0.4.0/starter-kit/INSTALL_WITH_AGENT.md).
