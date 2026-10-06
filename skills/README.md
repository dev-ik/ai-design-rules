# Skills

AI Design Context skills are reusable Codex agent workflows. Every `skills/*/SKILL.md` has standalone Codex metadata (`name` and a trigger-rich `description`) in addition to its workflow body.

They are not design rules, patterns, prompts, or registry objects yet. Knowledge-graph registry migration is deferred until explicitly requested.

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
| `reference-driven-design` | Evidence-backed reference selection and abstract visual direction without brand copying. |
| `motion-designer` | Purposeful motion that preserves orientation and respects reduced motion. |
| `accessibility-reviewer` | Labels, focus, target size, contrast, errors, and reduced motion. |
| `performance-reviewer` | Perceived performance, loading behavior, responsiveness, and layout stability. |
| `design-reviewer` | Final design QA and rule/pattern traceability review. |
| `design-evidence-researcher` | Evidence intake, observations, research synthesis, and knowledge-gap identification. |
| `agent-context` | Read-only graph context retrieval for an implementation or review target. |
| `prompt-architect` | Graph-backed prompt structure and output contracts. |
| `knowledge-graph-architect` | Schema, registry, generated indexes, relationships, and validation scope. |
| `design-understand` | Diagnose an existing screen before choosing UI changes. |
| `visual-qa` | Inspect rendered screenshots and interactions; record defects and evidence coverage. |
| `responsive-check` | Execute viewport, overflow, wrapping, sticky-region, and mobile-input checks. |
| `accessibility-check` | Execute semantic, keyboard, dialog, error, target, and reduced-motion checks. |

## Installation and execution

The npm CLI's `init` installs missing namespaced launchers for all 20 skills under `.agents/skills/ai-design-context-<name>/SKILL.md`. Launchers use `npx --no-install ai-design-context skills show <name>` to read the current pinned workflow, so package upgrades do not overwrite customized local skill files. Existing local skills are preserved.

Use `npx ai-design-context skills list` to discover bundled workflows and `skills show visual-qa` to load a specific one. Browser automation and image analysis require tools/model capabilities supplied by the agent or project. See [Design and Browser QA](../docs/BROWSER_DESIGN_QA.md).

## Routing

Start with `product-designer` when product intent is unclear.

Use `agent-context` first when the task needs a focused subset of graph objects before routing to a specialist skill.

Use `design-evidence-researcher` before adding a rule, pattern, prompt, or skill when upstream evidence is missing.

Use `reference-driven-design` before visual exploration or polish when the interface needs a modern, premium, expressive, or product-specific direction.

Use `information-architect` before screen layout when object structure is unclear.

Use `mobile-ux-expert`, `interaction-designer`, `visual-designer`, `motion-designer`, `accessibility-reviewer`, and `performance-reviewer` for focused specialist review.

Use `design-system-architect` when reusable UI decisions, tokens, or component boundaries are involved.

Use `prompt-architect` when writing or reviewing agent prompts.

Use `knowledge-graph-architect` when schemas, registry records, generated indexes, or validation behavior are affected.

Use `design-reviewer` as the final quality gate.

For existing UI, start with `design-understand`. After implementation, use `visual-qa`, `responsive-check`, and `accessibility-check` to collect concrete browser/image evidence, then hand off to `design-reviewer`. Keep unverified states explicit; source inspection alone is not a rendered QA pass.
