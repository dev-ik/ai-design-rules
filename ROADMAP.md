# Roadmap

AI Design Rules grows from research-backed foundations into rules, patterns, prompts, skills, and review tooling. Each phase should produce usable artifacts without generating filler content.

## v0.1 Foundation

- Clarify repository structure and naming conventions.
- Define the documentation reading order.
- Document the agent pipeline: `research -> knowledge -> rules -> patterns -> prompts -> examples -> review`.
- Establish contribution style and review expectations.

## v0.2 Research

- Expand product research under `research/products/`.
- Capture observations from strong consumer products.
- Separate evidence from opinion.
- Identify which observations can become rules.

## v0.3 Rules

- Normalize rule format using `templates/RULE_TEMPLATE.md`.
- Add only research-backed rules.
- Keep rules practical, reviewable, and product-oriented.
- Cover product, UX, IA, mobile, visual, accessibility, and performance domains.

## v0.4 Patterns

- Derive reusable patterns from validated rules.
- Keep patterns product-facing, not component-library documentation.
- Document when a pattern should and should not be used.

## v0.5 Prompts

- Create prompts that help agents apply the rules to real product tasks.
- Keep prompts concise and task-specific.
- Use benchmark scenarios as the first validation target.

## v0.6 Skills

- Package stable workflows into agent skills.
- Keep skills aligned with the repository pipeline.
- Avoid skills that bypass research, rules, or review.

## v0.7 Reviews

- Improve design QA checklists and review templates.
- Add review criteria for product fit, UX, mobile, accessibility, and rule coverage.
- Validate output against benchmark scenarios and future public reference archetypes.

## v1.0 Public Release

- Publish a coherent public knowledge base.
- Provide a stable contribution workflow.
- Include enough benchmarks, generated indexes, and skills for agents to use the system without guessing.

## v2.0 DesignLint

- Explore automated checks for rule coverage and design QA.
- Detect common agent-generated design failures.
- Keep automation explainable and tied to documented rules.
