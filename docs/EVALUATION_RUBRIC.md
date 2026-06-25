# Evaluation Rubric

Use this rubric to score generated products in AI Design Rules benchmarks.

Score every category from `0` to `10`.

## Score Meaning

- `0`: absent or actively harmful.
- `1-2`: mostly missing, confusing, or unusable.
- `3-4`: partially present but weak or inconsistent.
- `5-6`: acceptable baseline with visible gaps.
- `7-8`: strong, coherent, and mostly production-ready.
- `9-10`: excellent, polished, and hard to improve within the benchmark scope.

Use whole numbers only.

## Product Thinking

Measures whether the output understands the user, product job, and primary repeated action.

- `0`: no clear product goal.
- `5`: plausible goal, but weak prioritization.
- `10`: crisp user goal, primary action, and product purpose.

## UX

Measures flow clarity, ease of use, recovery, and task completion.

- `0`: user cannot complete the core task.
- `5`: task is possible but has friction.
- `10`: task flow is direct, clear, and forgiving.

## Information Architecture

Measures object model, hierarchy, labels, grouping, and status clarity.

- `0`: objects and navigation are incoherent.
- `5`: understandable but inconsistent.
- `10`: clear object model and predictable structure.

## Navigation

Measures movement between surfaces, return paths, and wayfinding.

- `0`: user gets lost or trapped.
- `5`: basic navigation exists with weak return paths.
- `10`: navigation is simple, stable, and fast.

## Accessibility

Measures labels, keyboard path, contrast-sensitive choices, target size, focus, and reduced-motion awareness.

- `0`: inaccessible for core actions.
- `5`: basic accessibility is partially addressed.
- `10`: accessibility is built into controls, states, and flow.

## Mobile-First

Measures narrow viewport behavior, touch reach, target size, and mobile flow quality.

- `0`: mobile is unusable or ignored.
- `5`: mobile layout works but feels secondary.
- `10`: mobile behavior is first-class.

## Visual Hierarchy

Measures typography, spacing, density, visual priority, and scanability.

- `0`: hierarchy is chaotic.
- `5`: readable but generic or uneven.
- `10`: clear, restrained, and product-specific.

## State Design

Measures empty, loading, error, disabled, success, and recovery states.

- `0`: states are missing.
- `5`: some states exist but are incomplete.
- `10`: states preserve context and guide action.

## Consistency

Measures consistent patterns, labels, status, controls, and interaction behavior.

- `0`: inconsistent and unpredictable.
- `5`: mostly consistent with visible drift.
- `10`: consistent without becoming rigid.

## Performance Awareness

Measures responsiveness, perceived performance, loading stability, and avoidance of heavy unnecessary UI.

- `0`: performance risks block the task.
- `5`: basic loading exists but may shift or block.
- `10`: feedback is immediate and loading preserves orientation.

## Simplicity

Measures whether the output avoids unnecessary features, screens, fields, and decoration.

- `0`: bloated or overcomplicated.
- `5`: moderate complexity with some unnecessary elements.
- `10`: focused and appropriately simple.

## Overall Product Quality

Measures the integrated product experience.

- `0`: not a usable product.
- `5`: usable prototype with meaningful gaps.
- `10`: coherent, useful, and convincing as a modern consumer product.

## Evaluation Template

```md
# Evaluation

Scenario:
Run:
Model:
Evaluator:
Date:

| Category | Baseline | AI Design Rules | Notes |
| --- | ---: | ---: | --- |
| Product Thinking |  |  |  |
| UX |  |  |  |
| Information Architecture |  |  |  |
| Navigation |  |  |  |
| Accessibility |  |  |  |
| Mobile-first |  |  |  |
| Visual Hierarchy |  |  |  |
| State Design |  |  |  |
| Consistency |  |  |  |
| Performance Awareness |  |  |  |
| Simplicity |  |  |  |
| Overall Product Quality |  |  |  |

Baseline average:
AI Design Rules average:
Difference:

## Evidence

- Baseline prompt:
- AI Design Rules prompt:
- Baseline output:
- AI Design Rules output:
- Screenshots or preview links:

## Reviewer Notes

```
