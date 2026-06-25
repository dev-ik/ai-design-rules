# Documentation Style Guide

AI Design Rules documentation must help agents act. Write for practical use inside real product codebases.

## Tone

- Concise.
- Practical.
- Rule-based.
- Direct.
- Specific enough to review.

## Content Rules

- Explain why, not only what.
- Prefer short sections over long essays.
- Use examples only when they clarify a decision.
- Keep advice tied to product behavior.
- Separate evidence, rules, patterns, prompts, and reviews.

## Avoid

- Filler paragraphs.
- Generic design slogans.
- Unreviewable taste claims.
- Long prompt dumps.
- Duplicating the same concept under new names.
- Inventing rules without research.

## Good Documentation Answers

Every substantial document should make these clear:

- What problem does this solve?
- Who uses it?
- When should it be applied?
- What should an agent do with it?
- How can the result be reviewed?

## Naming

- Use lowercase plural folder names: `research/`, `rules/`, `patterns/`, `prompts/`, `skills/`.
- Use uppercase topic files in `docs/`: `PRODUCT_THINKING.md`, `MOBILE_FIRST.md`.
- Use stable rule IDs in `rules/`: `UX-001.md`, `A11Y-001.md`.
- Do not create a new folder when an existing folder already owns the concept.

## TODO Placeholders

Use TODO placeholders only when they mark a real missing artifact. Keep them specific and easy to remove.
