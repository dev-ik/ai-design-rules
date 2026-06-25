# Observations

Observations are raw evidence before synthesis.

Use observations to capture product behavior, review findings, screenshots, implementation outcomes, or failure modes before they become research.

## Object Format

Observation objects should follow `schema/observation.schema.json`.

Use `templates/OBSERVATION_TEMPLATE.md` for new observations.

## Graph Role

```text
observation -> research -> knowledge -> rules -> patterns -> prompts -> reference projects -> reviews
```

Observations are usually connected with `derived_from` relationships when research absorbs them.

## Contribution Rule

Do not turn an observation into a rule until it has been grouped into research and reviewed for reuse.
