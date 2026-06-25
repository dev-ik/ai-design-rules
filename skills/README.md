# Skills

AI Design Rules skills are reusable agent workflows.

They are not design rules, patterns, prompts, or registry objects yet. Skill metadata migration is deferred until explicitly requested.

Use skills as an agent design team:

| Skill | Responsibility |
| --- | --- |
| `product-designer` | Product goal, primary action, object model, and pattern selection. |
| `ux-reviewer` | Journey clarity, usability, state coverage, and user friction. |
| `information-architect` | Object model, navigation, hierarchy, labels, and status language. |
| `mobile-ux-expert` | Touch-first mobile behavior, primary actions, and context preservation. |
| `interaction-designer` | Flow mechanics, feedback, recovery, previews, and state transitions. |
| `design-system-architect` | Semantic tokens, reusable states, and pattern/component boundaries. |
| `visual-designer` | Visual hierarchy, spacing, typography, color meaning, and polish. |
| `motion-designer` | Purposeful motion that preserves orientation and respects reduced motion. |
| `accessibility-reviewer` | Labels, focus, target size, contrast, errors, and reduced motion. |
| `performance-reviewer` | Perceived performance, loading behavior, responsiveness, and layout stability. |
| `design-reviewer` | Final design QA and rule/pattern traceability review. |
| `prompt-architect` | Graph-backed prompt structure and output contracts. |
| `knowledge-graph-architect` | Schema, registry, generated indexes, relationships, and validation scope. |

## Routing

Start with `product-designer` when product intent is unclear.

Use `information-architect` before screen layout when object structure is unclear.

Use `mobile-ux-expert`, `interaction-designer`, `visual-designer`, `motion-designer`, `accessibility-reviewer`, and `performance-reviewer` for focused specialist review.

Use `design-system-architect` when reusable UI decisions, tokens, or component boundaries are involved.

Use `prompt-architect` when writing or reviewing agent prompts.

Use `knowledge-graph-architect` when schemas, registry records, generated indexes, or validation behavior are affected.

Use `design-reviewer` as the final quality gate.
