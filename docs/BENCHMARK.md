# Benchmark

AI Design Context must be evaluated by generated product quality, not by how complete the documentation looks.

This benchmark compares two outputs for the same product brief:

```text
Baseline AI -> AI + AI Design Context
```

## Purpose

The benchmark exists to answer one question:

Does using AI Design Context produce better AI-generated consumer product experiences than using the same AI system without this repository?

The benchmark does not prove universal design quality. It tests whether the repository improves output on repeatable product scenarios.

## Evaluation Philosophy

Evaluation should be:

- comparative: score baseline and AI Design Context outputs side by side;
- reproducible: use the same model, brief, temperature, and output target;
- evidence-based: publish prompts, outputs, screenshots or code, and scores;
- conservative: do not claim improvement without measured results;
- practical: score product quality, not adherence to repository wording.

The reviewer should not reward an output for mentioning AI Design Context. Reward only visible product quality.

## Benchmark Process

1. Choose one benchmark scenario from `benchmarks/`.
2. Select one model and one generation surface.
3. Generate the baseline output using only the scenario brief.
4. Generate the AI Design Context output using the same scenario brief plus the repository instructions.
5. Keep model, temperature, context window, tool access, and implementation target the same.
6. Review both outputs using `docs/EVALUATION_RUBRIC.md`.
7. Store prompts, outputs, screenshots or links, evaluator notes, and scores in `evidence/`.
8. Declare `evidence_level` as `directional` or `rendered` in both run metadata files, then run `npm run benchmark:validate`.
9. Report aggregate score and per-category differences.

## Required Run Metadata

Each benchmark run must record:

- benchmark scenario;
- date;
- model name;
- model provider;
- generation surface;
- temperature or sampling settings;
- tools available;
- implementation target;
- baseline prompt;
- AI Design Context prompt;
- evaluator name or handle;
- rubric version;
- links to generated outputs.

If this metadata is missing, the result is not reproducible enough to count.

`rendered` runs must list at least one repository-local screenshot file for both baseline and AI Design Context outputs. Each screenshot must be a regular image file stored inside its matching `baseline/` or `ai-design-rules/` directory. Preview links can be supplementary, but do not replace stored visual evidence. `directional` runs remain useful for learning but must record their limitation.

## Scoring Model

Use `docs/EVALUATION_RUBRIC.md`.

Every dimension is scored from `0` to `10`.

Total score:

```text
sum(all dimensions) / number of dimensions
```

Report:

- baseline total;
- AI Design Context total;
- absolute difference;
- per-category differences;
- reviewer notes.

Do not collapse scores into a single claim without showing category scores.

## Reproducibility Requirements

To make results comparable:

- use the exact scenario file without editing the brief;
- use the same LLM for both runs;
- use the same implementation target for both runs;
- use the same time budget for both runs;
- use the same tool access for both runs;
- use the same evaluator or at least two independent evaluators;
- publish raw outputs and scores;
- do not fix one output manually before scoring.

If implementation fails, record the failure and score the observable output.

## Limitations

This benchmark cannot remove all subjectivity.

Known limitations:

- design scoring has reviewer judgment;
- different models may respond differently to long context;
- implementation quality can affect perceived design quality;
- small scenarios do not prove enterprise-scale validity;
- current rules and patterns are seed-level, not complete.

Benchmark results should guide rule, pattern, prompt, and skill evolution. They should not be used as marketing claims unless the evidence is public and reproducible.

## Result Storage

Store future results in `evidence/`.

Do not add synthetic scores. Do not invent studies. Do not compare against private internal systems.

## Next Rendered Run: Todo

Use `benchmarks/todo-app.md` for the first paired rendered run of the next release. It exercises the updated Daily Home Surface (`PAT-001`, `VIS-002`) and Context-Preserving Preview (`PAT-005`, `UX-004`) alongside existing capture, accessibility, and recovery guidance. This is a run protocol, not a completed experiment or evidence of improvement.

The [first execution on 2026-09-28](../evidence/todo/2026-09-28-codex-paired-todo/README.md) stores a completed pair and an internal unblinded evaluation. Keep this protocol for repeats; the recorded result does not establish general improvement.

### Freeze The Setup

Before either generation starts, record one shared setup in the run notes:

- The scenario file, its hash, the knowledge revision, and any uncommitted knowledge patch used by the rules run.
- The exact common brief: the Product Brief, Expected User, Expected Platform, Constraints, and Core User Tasks sections from `benchmarks/todo-app.md`, unchanged and identical in both prompts.
- One model/provider/version, generation surface, exposed sampling settings, tool set, and time budget. Record unexposed settings as unexposed; do not invent values.
- The implementation target: static HTML, CSS, and JavaScript served locally, with no build dependencies or external assets. Use the same target for both runs.
- The same deterministic task data, browser/version, viewport sizes, and storage-reset procedure for both evaluations.

Give both runs the same technical requirement to document how the evaluator can reproduce empty, loading, failed-save, and successful-save states. Local test hooks are acceptable; do not expose test controls as product features. Let each run design its interface from the same brief.

Use two fresh generation sessions with no shared conversation or output access. Give the baseline only the common brief and shared technical setup. Give the rules session those same inputs plus the pinned knowledge source and instructions to retrieve context for `daily-home-surface`, `quick-capture`, and `context-preserving-preview`, with `--platform mobile`, before implementation. Save the exact returned context and actual prompts. Both sessions must have equivalent tool access; document any isolation limitations.

Do not use the existing runnable Todo fixture as either generated result. Do not manually improve one output before scoring. A failure to build, render, or reproduce a required state is a recorded result.

### Capture The Same Tasks

Evaluate both outputs at **390 × 844** and **1440 × 900** CSS pixels, at the same browser zoom and device scale. Reset storage and use the same task data before each sequence. Save these local artifacts inside each run type's `screenshots/` directory:

| Artifact suffix | Action and observable evidence |
| --- | --- |
| `default.png` | Open the populated daily surface; inspect current work and the primary action. |
| `empty.png` | Reset to no tasks; inspect the starting action. |
| `saving.png` | Submit a task under controlled delay; inspect input retention and layout stability. |
| `save-error.png` | Cause a failed save; inspect error text, retained input, and retry. |
| `saved.png` | Retry successfully; inspect feedback and duplicate prevention. |
| `completed.png` | Mark a task complete; inspect state clarity and remaining work. |
| `detail.png` | Open task details after scrolling; inspect the relation to the source list. |
| `keyboard-focus.png` | Reach a core action by keyboard; inspect visible focus and accessible naming. |
| `detail-reduced-motion.png` | Repeat detail opening with reduced motion; inspect equivalent information and controls. |

Prefix each filename with `mobile-` or `desktop-`. Record the exact reproduction steps with each capture. If a state cannot be reached, record it as missing; do not create a substitute screenshot that pretends to show the state.

Screenshots do not prove timing, focus restoration, or interruption behavior. Record interaction results separately: close the preview and verify source position/focus; close or change selection during opening and check for stale content; repeat with reduced motion; verify retry and task completion. Performance observations remain qualitative unless measurements are actually collected.

### Score And Publish Evidence

Use the same evaluator and `docs/EVALUATION_RUBRIC.md` for both outputs. Score visible behavior, include a note and artifact reference for each category, and report all category differences as well as the averages. If possible, score anonymous A/B outputs before revealing their conditions. Disclose whether evaluation was blinded and whether the evaluator participated in generation; a parent agent reviewing its own team's output is not independent evaluation.

Store completed runs using `evidence/TEMPLATE.md`, including raw source, prompts, settings, screenshots, state coverage, evaluator identity, and limitations. Run `npm run benchmark:validate`. The validator currently checks artifact presence, metadata consistency, and image signatures; it does not enforce this state matrix or judge visual quality. The evaluator must check those manually.

Do not create scored evidence entries or change rule maturity while preparation is incomplete. One completed pair remains a small-sample result; it cannot establish universal improvement or isolate the effect of context retrieval from pattern changes. Repeated pairs or a separate previous-version comparison are needed for those stronger claims.
