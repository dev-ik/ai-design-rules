# Traceability

Traceability proves that a design decision is connected to the knowledge graph.

Use this chain:

```text
feature -> observation -> research -> rule -> pattern -> prompt -> reference implementation -> review
```

## Purpose

Traceability prevents agents from designing from taste. If a decision cannot be traced, the missing layer should be named instead of inventing new guidance.

## Traceability Fields

- Feature: product area being validated.
- Observation: concrete product or reference-project behavior.
- Research: source research that supports the observation.
- Rule: reviewable instruction derived from research.
- Pattern: reusable composition of rules.
- Prompt: agent instruction that applies the pattern.
- Reference implementation: reference project surface or workflow.
- Review: checklist or review question used to validate the result.
- Gap: missing layer, if any.

## Coverage Levels

- Covered: every layer exists and links to the next layer.
- Partial: some layers exist, but one or more links are weak or missing.
- Missing: the feature cannot be supported by the current graph.

## Validation Rule

Do not create new rules, patterns, or prompts during traceability review. Record missing layers and decide later whether the architecture needs new objects.

## DesignLint Relevance

Future DesignLint should use traceability to detect:

- orphan rules;
- patterns without rules;
- prompts without patterns;
- reference projects without validation links;
- feature decisions without source research.
