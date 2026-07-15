# Reviews

Reviews are first-class feedback objects.

Use reviews to evaluate research, rules, patterns, prompts, reference projects, and generated product output.

## Object Format

Review objects should follow `schema/review.schema.json` and be registered in `registry/objects.json` with typed relationships in `registry/relationships.json`.

Use `templates/REVIEW_TEMPLATE.md` for new reviews.

Use `reviews/GENERATED_INDEX.md` to discover migrated reviews. The Todo benchmark review is deliberately `NEEDS WORK`: it records evidence limits rather than implying that directional benchmark output is proof of product quality.

## Graph Role

```text
observations -> research -> knowledge -> rules -> patterns -> prompts -> reference projects -> reviews
```

Reviews can validate objects, identify missing layers, or create new observations.

## Contribution Rule

Do not treat reviews as comments only. A review should produce traceable findings that can improve the knowledge graph.
