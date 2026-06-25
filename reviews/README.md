# Reviews

Reviews are first-class feedback objects.

Use reviews to evaluate research, rules, patterns, prompts, reference projects, and generated product output.

## Object Format

Review objects should follow `schema/review.schema.json`.

Use `templates/REVIEW_TEMPLATE.md` for new reviews.

## Graph Role

```text
observations -> research -> knowledge -> rules -> patterns -> prompts -> reference projects -> reviews
```

Reviews can validate objects, identify missing layers, or create new observations.

## Contribution Rule

Do not treat reviews as comments only. A review should produce traceable findings that can improve the knowledge graph.
