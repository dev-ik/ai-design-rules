# Benchmark

AI Design Rules must be evaluated by generated product quality, not by how complete the documentation looks.

This benchmark compares two outputs for the same product brief:

```text
Baseline AI -> AI + AI Design Rules
```

## Purpose

The benchmark exists to answer one question:

Does using AI Design Rules produce better AI-generated consumer product experiences than using the same AI system without this repository?

The benchmark does not prove universal design quality. It tests whether the repository improves output on repeatable product scenarios.

## Evaluation Philosophy

Evaluation should be:

- comparative: score baseline and AI Design Rules outputs side by side;
- reproducible: use the same model, brief, temperature, and output target;
- evidence-based: publish prompts, outputs, screenshots or code, and scores;
- conservative: do not claim improvement without measured results;
- practical: score product quality, not adherence to repository wording.

The reviewer should not reward an output for mentioning AI Design Rules. Reward only visible product quality.

## Benchmark Process

1. Choose one benchmark scenario from `benchmarks/`.
2. Select one model and one generation surface.
3. Generate the baseline output using only the scenario brief.
4. Generate the AI Design Rules output using the same scenario brief plus the repository instructions.
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
- AI Design Rules prompt;
- evaluator name or handle;
- rubric version;
- links to generated outputs.

If this metadata is missing, the result is not reproducible enough to count.

`rendered` runs must list at least one repository-local screenshot file for both baseline and AI Design Rules outputs. Preview links can be supplementary, but do not replace stored visual evidence. `directional` runs remain useful for learning but must record their limitation.

## Scoring Model

Use `docs/EVALUATION_RUBRIC.md`.

Every dimension is scored from `0` to `10`.

Total score:

```text
sum(all dimensions) / number of dimensions
```

Report:

- baseline total;
- AI Design Rules total;
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
