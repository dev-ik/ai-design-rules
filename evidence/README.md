# Evidence

Future benchmark results will be stored here.

Do not add fabricated scores.

Every benchmark result should include:

- scenario name;
- run date;
- model and provider;
- generation surface;
- temperature or sampling settings;
- tool access;
- baseline prompt;
- AI Design Rules prompt;
- baseline output;
- AI Design Rules output;
- screenshots or preview links;
- completed evaluation rubric;
- evaluator notes.

Validate all stored runs with:

```bash
npm run benchmark:validate
```

## Evidence Levels

- `directional`: raw prompts, outputs, scorecards, and evaluator notes are present, but the implementation is not rendered or has no local visual evidence. It must not be described as proof of product quality.
- `rendered`: both comparison outputs are runnable or rendered, and each run stores at least one local screenshot path. The harness verifies that the declared files exist; it does not score pixels or certify a result as production-ready.

Suggested structure:

```text
evidence/
  todo/
  notes/
  chat/
  settings/
  shopping/
  mobile-home/
```

Each scenario folder should contain one folder per run.

Example:

```text
evidence/todo/2026-06-25-model-name/
  baseline-prompt.md
  rules-prompt.md
  baseline-output/
  rules-output/
  screenshots/
  evaluation.md
  metadata.json
```

Results are evidence only when raw outputs and scoring notes are included.
