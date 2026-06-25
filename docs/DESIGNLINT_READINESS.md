# DesignLint Readiness

DesignLint is not implemented yet.

This document defines what the future tool should consume and what validation becomes possible after metadata migration.

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

## Possible Validation

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

- YAML front matter on migrated research, rules, patterns, prompts, and reference projects;
- required metadata fields;
- object ID prefixes for migrated object types;
- unique aliases and slugs within the migrated set;
- registry coverage for migrated files;
- registry relationship source and target IDs;
- front matter relationship targets that point to registered IDs or existing files.

This is not DesignLint. It is a migration guard for the minimal registry-backed chain.

## Not Implemented Yet

The current repository does not yet include:

- DesignLint runtime;
- CLI commands;
- generated indexes beyond the minimal migrated chain;
- full front matter migration beyond research, rules, patterns, prompts, and reference projects;
- schema validation in CI;
- graph traversal;
- stale-object detection;
- duplicate-object detection.

## Readiness Standard

Before DesignLint rules are implemented, the repository should have:

- metadata front matter on every knowledge object;
- complete registry coverage;
- generated indexes;
- relationship validation;
- a stable ID allocation process.
