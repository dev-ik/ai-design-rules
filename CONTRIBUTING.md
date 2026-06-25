# Contributing

AI Design Rules accepts concise, practical contributions that help AI coding agents design better consumer products.

## Contribution Pipeline

Use the same order as the repository:

```text
observation -> research -> knowledge -> rules -> patterns -> prompts -> reference projects -> reviews
```

Start with evidence. Do not add a rule, pattern, or prompt if the underlying product behavior is not clear.

## What To Contribute

- Product research in `research/`.
- Design rules in `rules/`.
- Reusable patterns in `patterns/`.
- Product prompts in `prompts/`.
- Review checklists or templates in `checklists/` and `templates/`.
- Agent skills in `skills/` when a workflow is stable enough to reuse.

## Rule Contributions

Use `templates/RULE_TEMPLATE.md`.

Every rule must include:

- why the rule exists;
- what good output looks like;
- what bad output looks like;
- how to review it.

Do not submit rules that are only taste, preference, or vague advice.

Rules are migrated objects. New or changed rule files must include schema-compatible YAML front matter and be listed in `registry/objects.json`.

If a rule changes upstream sources, update its typed `relationships` front matter.

## Pattern Contributions

Use `templates/PATTERN_TEMPLATE.md`.

Every pattern must follow `docs/PATTERN_SPEC.md` and include schema-compatible YAML front matter.

Patterns are migrated objects. New or changed pattern files must:

- use a stable `PAT-00000` machine ID;
- keep a human-friendly alias;
- list required rule relationships;
- be listed in `registry/objects.json`;
- have required and related edges in `registry/relationships.json`.

## Documentation Style

Follow `docs/STYLE_GUIDE.md`.

Write for agents that need to act inside a codebase. Prefer direct rules, clear examples, and reviewable criteria.

## Knowledge Object Metadata

New object types and future metadata migrations should follow `docs/KNOWLEDGE_ENGINE.md`.

Do not create disconnected files. Every research, rule, pattern, prompt, checklist, skill, review, or reference project should link upstream sources and downstream usage.

## Schema-First Contributions

New knowledge objects should include YAML front matter compatible with the relevant schema in `schema/`.

Research, rules, patterns, prompts, and reference projects are the first enforced migrated chain. Run:

```sh
npm run generate:indexes
npm run validate
```

before submitting changes to `research/`, `rules/`, `patterns/`, `prompts/`, `examples/`, `registry/objects.json`, or `registry/relationships.json`.

Use global machine IDs for new objects:

- `OBS-00001`
- `RESEARCH-00001`
- `RULE-00001`
- `PAT-00001`
- `PROMPT-00001`
- `REVIEW-00001`
- `CHECK-00001`
- `REF-00001`

Use `alias` for human-friendly IDs such as `UX-001`.

Use `slug` for file-safe names.

Relationships must be typed. Use only the relationship types defined in `schema/common.schema.json`.

Generated indexes are the preferred navigation layer for the migrated minimal chain:

- `research/GENERATED_INDEX.md`
- `rules/GENERATED_INDEX.md`
- `patterns/GENERATED_INDEX.md`
- `prompts/GENERATED_INDEX.md`
- `examples/GENERATED_INDEX.md`
- `graph/GENERATED_GRAPH.md`

Do not edit generated files manually. Update front matter and registry metadata, then run `npm run generate:indexes`.

Manual indexes are transitional. Keep them useful for human context, but do not treat them as the source of truth.

## Reference Projects

Reference projects are intentionally omitted from the first OSS release.

Use `benchmarks/` and `evidence/` when validating new rules, prompts, or review checklists.

Future reference projects are not demos for decoration. They should use generic product archetypes and benchmark-backed evidence.

## Review Checklist

Before opening a contribution:

- The content fits the repository pipeline.
- The file is in the correct folder.
- The naming follows existing conventions.
- The contribution explains why, not only what.
- There is no filler content.
- The change does not create a duplicate concept under a different name.
- Generated indexes are updated when registry metadata changes.
