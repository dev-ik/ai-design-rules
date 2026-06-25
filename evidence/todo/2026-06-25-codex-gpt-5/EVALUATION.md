# Todo App Evaluation

Scenario: Todo App
Run: 2026-06-25-codex-gpt-5
Model: Codex GPT-5
Evaluator: Codex GPT-5, single evaluator
Date: 2026-06-25

## Score Table

| Category | Baseline | AI Design Rules | Difference | Notes |
| --- | ---: | ---: | ---: | --- |
| Product Thinking | 6 | 8 | +2 | AI Design Rules output centers the daily surface and primary action more clearly. |
| UX | 6 | 8 | +2 | AI Design Rules output reduces capture friction and improves recovery. |
| Information Architecture | 6 | 8 | +2 | AI Design Rules output names the task object and separates required from optional fields. |
| Navigation | 6 | 7 | +1 | AI Design Rules output keeps Today stable and uses context-preserving detail. |
| Accessibility | 5 | 7 | +2 | AI Design Rules output specifies labels, target size, keyboard order, and text errors. |
| Mobile-first | 5 | 8 | +3 | AI Design Rules output defines mobile bottom sheet and reachable primary action behavior. |
| Visual Hierarchy | 6 | 7 | +1 | AI Design Rules output is clearer but not visually rendered. |
| State Design | 5 | 8 | +3 | AI Design Rules output gives specific empty, loading, failed save, and retry behavior. |
| Consistency | 6 | 8 | +2 | AI Design Rules output keeps one product model across mobile and desktop. |
| Performance Awareness | 5 | 7 | +2 | AI Design Rules output preserves the shell during loading; no measured performance data. |
| Simplicity | 5 | 8 | +3 | AI Design Rules output avoids dashboard cards and keeps metadata secondary. |
| Overall Product Quality | 6 | 8 | +2 | AI Design Rules output is more coherent as a consumer todo product. |

Baseline average: 5.58
AI Design Rules average: 7.67
Difference: +2.09

## Evidence Links

- Baseline prompt: `baseline/prompt.md`
- Baseline output: `baseline/generated-output.md`
- Baseline metadata: `baseline/metadata.json`
- Baseline notes: `baseline/notes.md`
- Baseline scores: `baseline/scores.md`
- AI Design Rules prompt: `ai-design-rules/prompt.md`
- AI Design Rules output: `ai-design-rules/generated-output.md`
- AI Design Rules metadata: `ai-design-rules/metadata.json`
- AI Design Rules notes: `ai-design-rules/notes.md`
- AI Design Rules scores: `ai-design-rules/scores.md`

## Strongest Improvements

- Mobile-first behavior improved from generic responsive stacking to explicit reachable actions and bottom-sheet detail.
- State design improved from generic empty/loading/error states to input-preserving failed-save recovery.
- Simplicity improved by removing dashboard summary cards and keeping optional metadata secondary.
- Product thinking improved by centering the Today surface and low-friction capture.

## Weaknesses

- This run produced Markdown UI artifacts, not rendered implementations.
- No screenshots were captured.
- The same model and evaluator generated and scored both outputs.
- The conversation already contained repository context, so the baseline is not perfectly isolated.
- Performance was judged from described behavior, not measured runtime data.

## Does This Support The Project Claim?

This benchmark provides directional support, not proof.

The AI Design Rules output scored higher in every category in this single run, especially mobile-first behavior, state design, simplicity, and product thinking.

However, the evidence is not strong enough for broad claims because it uses one model, one evaluator, no screenshots, no rendered implementation, and an imperfectly isolated baseline.

The next experiment should use a clean session, produce rendered implementations, capture screenshots, and include at least one independent evaluator.
