# Todo App Benchmark Run

Date: 2026-06-25

Model: Codex GPT-5

Scenario: `benchmarks/todo-app.md`

## Contents

- `baseline/` - baseline AI run using only the raw benchmark prompt.
- `ai-design-rules/` - run using the AI Design Rules prompt.
- `EVALUATION.md` - comparative rubric scoring and notes.

## Result Summary

| Run | Average Score |
| --- | ---: |
| Baseline AI | 5.58 |
| AI + AI Design Rules | 7.67 |

Difference: +2.09

## Interpretation

This run gives directional evidence that AI Design Rules improved the generated Todo App artifact in this setting.

It does not prove general improvement.

The main limitations are:

- same model generated both outputs;
- same evaluator scored both outputs;
- baseline was generated in a repository-aware conversation;
- outputs are Markdown UI artifacts, not rendered implementations;
- no screenshots were captured.

## Next Run Recommendation

Repeat this benchmark in a clean session with rendered implementations, screenshots, and at least one independent evaluator.
