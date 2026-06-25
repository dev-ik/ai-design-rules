# Pattern Library

Patterns are compositions of rules. They convert rule-level guidance into reusable product structures that agents can apply in prompts, reference projects, and reviews.

Use this folder after `rules/` and before `prompts/`.

```text
observations -> research -> knowledge -> rules -> patterns -> prompts -> reference projects -> reviews
```

## Source Of Truth

All pattern documents must follow `docs/PATTERN_SPEC.md`.

New patterns should start from `templates/PATTERN_TEMPLATE.md`.

Future pattern metadata should follow `docs/KNOWLEDGE_ENGINE.md`.

Manual indexes are transitional. Future indexes should be generated from registry metadata.

## Current Patterns

- `daily-home-surface.md` - screen-level entry point for repeated daily work.
- `quick-capture.md` - creation flow for recording intent before organization.
- `progressive-detail.md` - staged access to metadata and advanced controls.
- `context-preserving-preview.md` - inspection without losing source context.
- `object-status-list.md` - scanable list of structured objects and states.
- `mobile-primary-action.md` - touch-first placement and sizing of one primary action.

## Ownership Boundaries

- `daily-home-surface.md` owns the screen purpose and return point.
- `quick-capture.md` owns the creation flow.
- `mobile-primary-action.md` owns reachability, target size, and physical placement.
- `progressive-detail.md` owns staged disclosure of optional detail.
- `context-preserving-preview.md` owns inspection without navigation loss.
- `object-status-list.md` owns structured object scanning.

## Contribution Rule

Do not add a pattern unless it references existing rules and related research. A pattern without rules or research is a one-off design idea.
