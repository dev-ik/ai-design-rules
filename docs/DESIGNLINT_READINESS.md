# DesignLint Readiness

DesignLint v0 is implemented as a small, deterministic relationship checker.

This document defines its current scope and the richer validation that can follow metadata migration.

## Inputs

DesignLint should consume:

- `schema/*.schema.json` for object validation;
- `registry/objects.json` for ID resolution;
- `registry/relationships.json` for graph edges;
- YAML front matter from knowledge objects after migration;
- generated indexes after registry-backed indexing exists.

## Required Metadata

DesignLint requires stable metadata:

- `id`
- `alias`
- `slug`
- `title`
- `object_type`
- `status`
- `version`
- `category`
- `relationships`
- `last_reviewed_at`
- `maturity`
- `risk_level`

Optional metadata such as `platform`, `product_type`, `surface`, `applies_to`, and `does_not_apply_to` will improve context matching.

## DesignLint v0

Run it with:

```bash
npm run lint:design
```

It reads only registered objects and typed registry relationships. It fails when:

- a rule has no upstream research via `derived_from` or `inspired_by`;
- a pattern does not `require` a rule;
- a prompt has no pattern, rule, or checklist reference;
- a checklist has no rule or pattern coverage;
- a reference project does not implement a prompt and validate a prompt or pattern;
- a review does not require a checklist and validate a knowledge object.

It does not judge prose, visual quality, or whether a relationship is substantively well chosen. `npm run validate` remains responsible for synchronizing registry relationships with front matter.

## Future Validation

With the schema-first foundation, DesignLint can later validate:

- object metadata matches the correct schema;
- IDs are globally unique;
- aliases are not reused within the same object type;
- slugs are file-safe;
- relationship types are allowed;
- relationship targets exist;
- deprecated objects are not used by active prompts;
- patterns require rules;
- prompts require patterns and rules;
- reference projects validate patterns and prompts;
- rules trace back to research;
- orphan objects are detected;
- manual indexes match registry output.

## Current Validation Layer

`tools/validate-knowledge.mjs` is the first lightweight validation step.

It currently validates:

- YAML front matter on migrated research, rules, patterns, prompts, checklists, reviews, and reference projects;
- required metadata fields;
- object ID prefixes for migrated object types;
- unique aliases and slugs within the migrated set;
- registry coverage for migrated files;
- registry relationship source and target IDs;
- front matter relationship targets that point to registered IDs or existing files;
- duplicate IDs, aliases, slugs, and raw JSON keys;
- local Codex skill metadata and generated-index freshness.

This is a metadata migration guard. It complements DesignLint v0 rather than replacing it.

## Not Implemented Yet

The current repository does not yet include:

- registry-backed observations;
- schema validation in CI;
- graph traversal;
- stale-object detection;
- relationship-quality evaluation;
- visual or runtime product evaluation.

## Readiness Standard

Before DesignLint rules are implemented, the repository should have:

- metadata front matter on every knowledge object;
- complete registry coverage;
- generated indexes;
- relationship validation;
- a stable ID allocation process.
