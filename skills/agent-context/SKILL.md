---
name: agent-context
description: Resolve concise, graph-backed AI Design Rules context with the local context CLI. Use before implementing or reviewing a user-facing flow, reference fixture, prompt output, or known knowledge object when an agent needs relevant research, rules, patterns, checklists, and evidence limits without reading every index.
---

# Agent Context

Run this skill before a user-facing implementation or review when the applicable knowledge is not already explicit.

## Workflow

1. Verify context resolution with `npm run context -- --help`.
2. Resolve the task, review target, or stable object:

   ```bash
   npm run context -- --task quick-capture --platform mobile --intent implement --format json
   npm run context -- --review examples/todo-reference --intent qa
   npm run context -- --object PAT-00002 --format json
   ```

3. Read the selected files before proposing product guidance or code.
4. Apply only the returned rules and patterns that fit the task.
5. Preserve every returned evidence boundary; `draft` and `seed` do not justify broad product claims.
6. If the resolver returns no match, create an observation or research need rather than inventing a rule.

## Boundaries

- The CLI is read-only and does not replace `npm run check`.
- `--platform` adds relevant context; it does not prove that a pattern applies.
- Use `--format json` for another agent or script; errors are machine-readable on stderr.
