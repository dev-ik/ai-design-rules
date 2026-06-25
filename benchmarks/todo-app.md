# Todo App Benchmark

This is the reference benchmark scenario.

Do not generate comparison results in this file.

## Product Brief

Create a modern consumer todo app for everyday personal task management.

The app should help a busy person capture tasks quickly, see what matters today, complete tasks, and inspect optional details without turning the product into a project management dashboard.

## Expected User

- Adult consumer managing personal errands, reminders, and daily tasks.
- Uses mobile frequently and desktop occasionally.
- Wants low friction more than advanced planning.

## Expected Platform

- Responsive web app.
- Must work well at mobile width around 390px.
- Desktop layout may use additional space but must preserve the same product model.

## Constraints

- No authentication flow required.
- No team collaboration required.
- No analytics dashboard.
- No project management concepts such as sprints, roadmaps, or velocity.
- Include realistic empty, loading, and error states.
- Include accessible labels and touch-friendly controls.
- Keep optional metadata secondary.

## Core User Tasks

- Add a task quickly.
- See today's tasks.
- Mark a task complete.
- Inspect or edit task details.
- Recover from a failed save.

## Evaluation Criteria

Use `docs/EVALUATION_RUBRIC.md`.

Pay special attention to:

- Product Thinking;
- UX;
- Information Architecture;
- Mobile-first;
- State Design;
- Simplicity;
- Overall Product Quality.

## Baseline Prompt

```text
Design and implement a responsive todo app for everyday personal task management.

The app should let a user add tasks, see today's tasks, complete tasks, and edit details.

Make it modern, usable, and polished.
```

## AI Design Rules Prompt

```text
Design and implement a responsive todo app for everyday personal task management.

Use AI Design Rules from this repository.

Follow the knowledge graph:
research -> rules -> patterns -> prompts -> reference projects -> reviews

Use existing rules and patterns only. Do not invent new rules or patterns.

The app should let a user add tasks, see today's tasks, complete tasks, and edit details.

Prioritize low-friction capture, a stable daily home surface, mobile-first behavior, context-preserving detail, accessible touch targets, and clear empty/loading/error states.
```

## Expected Outputs

Both benchmark runs should publish:

- prompt used;
- generated source code or artifact;
- screenshots or preview links for mobile and desktop;
- notes about tool access and model settings;
- evaluation table using `docs/EVALUATION_RUBRIC.md`.

The expected product output should include:

- daily task home surface;
- quick add task path;
- completed task behavior;
- detail inspection or edit behavior;
- empty state;
- loading state;
- error state;
- accessible labels;
- mobile layout.

## Evaluation Template

```md
# Todo App Evaluation

Scenario: Todo App
Model:
Date:
Evaluator:

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

## Evidence Links

- Baseline output:
- AI Design Rules output:
- Mobile screenshots:
- Desktop screenshots:

## Notes

```
