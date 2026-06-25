# AI Design Rules Starter Kit

This starter kit bootstraps a product repository that wants to use AI Design Rules.

Copy this folder into a target project, then adapt the files to that product.

It does not include a UI kit, components, or generated rules. It gives agents a working structure for applying research, rules, patterns, prompts, reviews, benchmarks, and evidence.

## Included

- `PROJECT_INTEGRATION.md` - how the project should adopt AI Design Rules.
- `AGENTS.md` - local agent instructions for feature work.
- `BOOTSTRAP.md` - first setup checklist.
- `docs/` - product context documents.
- `templates/` - feature and task templates.
- `reviews/` - design review checklist.
- `benchmarks/` - benchmark checklist.

## Recommended Workflow

```text
research -> rules -> patterns -> prompts -> prototype -> review -> code -> benchmark -> evidence
```

## How To Use

1. Fill `docs/PRD.md`.
2. Define users in `docs/PERSONAS.md`.
3. Map the core journey in `docs/USER_FLOWS.md`.
4. Define objects, screens, and navigation in `docs/INFORMATION_ARCHITECTURE.md`.
5. Record key decisions in `docs/DESIGN_DECISIONS.md`.
6. Use `templates/FEATURE_TEMPLATE.md` before implementing a feature.
7. Run `reviews/DESIGN_REVIEW.md` before merging UI work.
8. Store benchmark evidence for meaningful product changes.

## Agent Rule

Agents should not jump from a feature request directly to code. They should identify the user goal, select applicable AI Design Rules, compose patterns, review states, and validate the result.
