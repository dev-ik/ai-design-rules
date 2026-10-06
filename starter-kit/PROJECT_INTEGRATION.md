# Project Integration

Integrate AI Design Context before implementation.

## Workflow

1. Understand the product problem.
2. Capture relevant research or product context.
3. Select applicable rules.
4. Select applicable patterns.
5. Explain design decisions.
6. Prototype the smallest useful solution.
7. Review UX, IA, accessibility, mobile behavior, states, and consistency.
8. Implement after review.
9. Benchmark meaningful product changes.
10. Feed learnings back into project docs.

## Design Options Checkpoint

Before broad visual design, new screen direction, visual exploration, or product polish, ask whether the user wants:

- multiple design options for comparison; or
- one conservative implementation path that fits the existing product system.

Skip this checkpoint for narrow bug fixes, already approved designs, small accessibility fixes, copy-only changes, or tasks where the user explicitly asked for immediate implementation.

## Integration Modes

Choose the lightest integration mode that gives agents enough context without weakening local project rules.

- npm package: install `ai-design-context` as a dev dependency, run `npx ai-design-context init`, and use `npx ai-design-context context` for lockfile-pinned graph retrieval. See `INSTALL_WITH_AGENT.md` for publication status and local tarball installation.
- Direct graph: use this repository directly when the product repo is the same workspace or can run the local context CLI.
- Pinned snapshot: copy a reviewed snapshot into the product repo when agents need reproducible offline guidance.
- Bridge skill: create a small local skill that points agents at the snapshot, local design docs, and applicable AI Design Context skills.
- Optional reasoning layer: reference AI Design Context only for UI, UX, accessibility, responsive behavior, design review, or visual polish while keeping local architecture, API, security, routing, and test rules higher priority.

Do not copy the starter kit wholesale into mature product repositories. Adapt only the parts that improve design reasoning and keep local product constraints authoritative.

## Required Project Files

For broad product work, prefer:

- `docs/PRD.md`
- `docs/PERSONAS.md`
- `docs/USER_FLOWS.md`
- `docs/INFORMATION_ARCHITECTURE.md`
- `docs/DESIGN_DECISIONS.md`

For narrow UI fixes, do not require a full document set. Capture the user goal, affected state, applicable rule or pattern, responsive assumption, accessibility check, and visual QA result in the task or review.

## Contributor Expectation

Every UI or UX change should state:

- user goal;
- applicable AI Design Context;
- applicable patterns;
- states handled;
- review result;
- validation or benchmark evidence when relevant.
