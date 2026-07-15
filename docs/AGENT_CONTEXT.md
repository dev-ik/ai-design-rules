# Agent Context CLI

`npm run context` converts a task, review target, or known graph object into a compact, traceable context bundle. It is a read-only local tool: no network, authentication, or registry writes are involved.

## Commands

```bash
# Design or implement a feature.
npm run context -- --task quick-capture --platform mobile --intent implement

# Review an implementation, benchmark artifact, or reference fixture.
npm run context -- --review examples/todo-reference --intent qa

# Resolve an exact stable object.
npm run context -- --object PAT-00002 --format json
```

Exactly one of `--task`, `--review`, or `--object` is required.

## Output Contract

Markdown is the human default. `--format json` emits only this stable shape on stdout:

```json
{
  "query": { "mode": "task", "value": "quick-capture", "platform": "mobile", "intent": "implement" },
  "anchors": [],
  "objects": []
}
```

The resolver searches stable registry fields and object Markdown. From its anchors it follows typed relationships to include directly applicable rules, upstream research, patterns, prompts, checklists, reference projects, and reviews. Platform matching is additive: it can include mobile-relevant rules or patterns, but does not replace the task's graph context.

`--intent implement` gives an implementation-first use order. `--intent qa` gives an evidence-and-checklist-first use order. Task mode defaults to `implement`; review mode defaults to `qa`.

An unmatched query returns a non-zero exit code; with `--format json` the error is a JSON object on stderr.

## Agent Use

1. Resolve context before proposing product or UI changes.
2. Read the listed research and rules before applying a pattern or prompt.
3. Treat `draft` and `seed` objects as guidance with explicit limits, not as validated truth.
4. Use listed checklists and reviews as quality gates.
5. If no context matches, capture an observation or research need; do not invent a rule to fill the gap.
