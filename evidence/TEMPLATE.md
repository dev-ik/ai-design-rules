# Benchmark Evidence Run Template

Create one directory per scenario and run, then validate it with `npm run benchmark:validate`.

```text
evidence/<scenario>/<yyyy-mm-dd-model>/
  README.md
  EVALUATION.md
  baseline/
    metadata.json
    prompt.md
    generated-output.md
    notes.md
    scores.md
    screenshots/                 # required when evidence_level is rendered
  ai-design-rules/
    metadata.json
    prompt.md
    generated-output.md
    notes.md
    scores.md
    screenshots/                 # required when evidence_level is rendered
```

Both `metadata.json` files must contain the same benchmark setup and differ only in `run_type` (`baseline` or `ai-design-rules`) and run-specific limitations.

```json
{
  "scenario": "Todo App",
  "run_type": "baseline",
  "date": "2026-07-14",
  "model": "Model name",
  "provider": "Provider",
  "generation_surface": "CLI or product surface",
  "temperature": "0.2",
  "tool_access": ["filesystem write"],
  "implementation_target": "Rendered responsive web app",
  "evidence_level": "rendered",
  "screenshots": ["baseline/screenshots/mobile.png", "baseline/screenshots/desktop.png"],
  "limitation": "Any remaining comparability limit"
}
```

Use `directional` only when rendered, local visual evidence does not exist. Do not upgrade the level based on a score alone.
