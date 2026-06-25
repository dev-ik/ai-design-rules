# AI Design Rules Agent Guide

AI Design Rules is an AI-first knowledge base for teaching coding agents how to design modern consumer products.

Do not treat this repository as a documentation dump. Treat it as a knowledge graph.

## Core Flow

Follow this order:

```text
observation -> research -> knowledge -> rules -> patterns -> prompts -> reference projects -> reviews
```

Never skip upstream evidence. Never generate UI from taste alone.

## Architecture Source

Read `docs/KNOWLEDGE_ENGINE.md` before changing repository structure, adding object types, or changing relationships.

Use it as the source of truth for:

- schema-first object metadata;
- global IDs, aliases, and slugs;
- object metadata;
- relationship types;
- registry records;
- navigation;
- DesignLint readiness;
- long-term scalability.

## Working Rules

- Improve architecture before adding volume.
- Prefer improving existing knowledge over creating parallel files.
- Keep every object connected to upstream sources and downstream usage.
- Use schema-compatible YAML front matter for new knowledge objects.
- Preserve schema-compatible YAML front matter on every migrated research, rule, pattern, prompt, and reference project.
- Use typed relationships only.
- Treat manual indexes as transitional context pages.
- Use generated indexes as the preferred navigation layer for the migrated minimal chain.
- Do not add rules without research.
- Do not add patterns without required rules and related research.
- Do not add prompts that invent design advice outside rules and patterns.
- Do not treat reference projects as demos; use them to validate the graph.

## Knowledge Objects

- Observation
- Research
- Rule
- Pattern
- Prompt
- Skill
- Checklist
- Review
- Reference Project

## Local Skill Specs

The current reusable agent skills live in `skills/*/SKILL.md`.

Use them when the task matches their role:

- `skills/product-designer/SKILL.md` for product direction, primary action, object model, and pattern selection.
- `skills/ux-reviewer/SKILL.md` for journey clarity, usability, state coverage, and user friction.
- `skills/information-architect/SKILL.md` for object model, navigation, hierarchy, labels, and status language.
- `skills/mobile-ux-expert/SKILL.md` for touch-first mobile behavior, capture flows, primary actions, and context preservation.
- `skills/interaction-designer/SKILL.md` for flow mechanics, feedback, recovery, previews, and state transitions.
- `skills/design-system-architect/SKILL.md` for semantic tokens, reusable state behavior, and pattern/component boundaries.
- `skills/visual-designer/SKILL.md` for visual hierarchy, spacing, typography, color meaning, and polish.
- `skills/motion-designer/SKILL.md` for purposeful motion and reduced-motion behavior.
- `skills/accessibility-reviewer/SKILL.md` for labels, focus, target size, contrast, errors, and reduced motion.
- `skills/performance-reviewer/SKILL.md` for perceived performance, loading behavior, responsiveness, and layout stability.
- `skills/design-reviewer/SKILL.md` for design QA, traceability checks, and rule/pattern coverage review.
- `skills/prompt-architect/SKILL.md` for graph-backed prompt structure and output contracts.
- `skills/knowledge-graph-architect/SKILL.md` for schema, registry, generated indexes, relationships, and validation scope.

These skill files are not registered knowledge objects yet. Do not add them to `registry/objects.json` until skill metadata migration is explicitly requested.

## Relationship Discipline

Use the relationship types defined in `docs/KNOWLEDGE_ENGINE.md`:

- `derived_from`
- `cites`
- `inspired_by`
- `requires`
- `validates`
- `implements`
- `related_to`
- `supersedes`
- `deprecated_by`
- `replaced_by`

Every new object should be traceable.

## Validation Discipline

Research, rules, patterns, prompts, and reference projects are the first migrated chain.

When changing `research/`, `rules/`, `patterns/`, `prompts/`, `examples/`, `registry/objects.json`, or `registry/relationships.json`:

1. Keep front matter and registry records aligned.
2. Keep relationship targets typed and resolvable.
3. Run `npm run generate:indexes`.
4. Run `npm run validate`.

Do not edit generated indexes manually.

The validator is intentionally limited. It does not replace future DesignLint and does not enforce unmigrated object types yet.

## Quality Bar

Progress means:

- stronger relationships;
- fewer duplicates;
- better discoverability;
- clearer specifications;
- more reliable agent behavior.

Progress does not mean:

- more pages;
- more prompts;
- more rules without evidence;
- more disconnected examples.

## Future Compatibility

Every architectural decision should support:

- 1000+ rules;
- 300+ patterns;
- 200+ prompts;
- multiple reference projects;
- future DesignLint integration;
- IDE and MCP integration.
