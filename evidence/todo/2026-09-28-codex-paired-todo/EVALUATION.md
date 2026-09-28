# Todo App Evaluation

Scenario: Todo App, unchanged common brief from `benchmarks/todo-app.md`.

Run: 2026-09-28 paired rendered generation. Model: inherited Codex session model; exact backend identifier and sampling settings unexposed. Evaluator: Codex parent agent, internal and unblinded. Rubric: `docs/EVALUATION_RUBRIC.md` at commit `3d9a6a70c47b7008a47dafd24a4aeef2855b07f2`.

## Verdict

**NEEDS WORK** for both prototypes. All scripted core operations completed, but the baseline has undersized capture/navigation targets and an error-layout shift; the rules-assisted output makes keyboard capture unnecessarily distant. Both resize the capture button during saving. The small rubric difference is a judgment on this pair, not a measured universal effect or proof that the next release improves all outputs.

## Scores

Scores are whole-number evaluator judgments; averages weight the twelve dimensions equally.

| Category | Baseline | AI Design Rules | Notes |
| --- | ---: | ---: | --- |
| Product Thinking | 8 | 8 | Both prioritize Today, task text, and title-only capture. [Baseline](baseline/screenshots/mobile-default.png), [rules](ai-design-rules/screenshots/mobile-default.png). |
| UX | 7 | 7 | Both retain failed input and retry successfully; rules improve touch reach but require 29 Tabs to capture versus 4. [Baseline runtime](baseline/runtime-checks.json), [rules runtime](ai-design-rules/runtime-checks.json). |
| Information Architecture | 8 | 8 | Both use the same task model, Today/All views, optional detail, and completed grouping. [Baseline](baseline/screenshots/desktop-default.png), [rules](ai-design-rules/screenshots/desktop-default.png). |
| Navigation | 8 | 8 | Both return focus to the source task and preserve scroll in the tested detail path; immediate dismissal and reduced motion also preserve function. Runtime `detailClose`, `interruption`, and `reducedMotion` checks. |
| Accessibility | 6 | 7 | Baseline capture input is 34px high on mobile and navigation buttons 43px; rules default controls reach 44px and provide explicit textual validation/focus, but the long keyboard path remains. [Baseline focus](baseline/screenshots/mobile-keyboard-focus.png), [rules focus](ai-design-rules/screenshots/mobile-keyboard-focus.png). |
| Mobile-first | 7 | 8 | Both fit 390px without horizontal overflow; rules keep capture reachable at the bottom while scrolling, baseline capture leaves view. Physical keyboard overlap remains untested. [Baseline completed view](baseline/screenshots/mobile-completed.png), [rules completed view](ai-design-rules/screenshots/mobile-completed.png). |
| Visual Hierarchy | 8 | 8 | Both are restrained, readable, task-first layouts with similar green/neutral styling. There is no convincing visual-hierarchy advantage in this pair. Default and detail screenshots. |
| State Design | 8 | 8 | Empty, pending, failure, success, completion, detail, validation, and retry are observable in both. Failed edits retain drafts and successful edits persist after reload. [Baseline failure](baseline/screenshots/mobile-save-error.png), [rules failure](ai-design-rules/screenshots/mobile-save-error.png). |
| Consistency | 8 | 8 | Repeated task controls and labels are coherent; desktop/mobile retain the same product model. Both have a saving-button width change. [Geometry](layout-metrics.json). |
| Performance Awareness | 6 | 7 | Both provide pending feedback and block duplicate saves. Baseline error shifts the first row down 22px; rules keep it fixed. Both shrink the capture input as the saving label expands. These are geometry observations, not Core Web Vitals measurements. [Geometry](layout-metrics.json). |
| Simplicity | 8 | 8 | Neither adds authentication, analytics, teams, or project management. Optional date and notes stay in details. [Baseline details](baseline/screenshots/mobile-detail.png), [rules details](ai-design-rules/screenshots/mobile-detail.png). |
| Overall Product Quality | 7 | 7 | Both are usable local prototypes with clear core flows and meaningful remaining friction; neither merits a production-readiness claim. |

Baseline total: **89/120**, average **7.42/10**.

AI Design Rules total: **92/120**, average **7.67/10**.

Difference: **+3 rubric points**, or **+0.25/10** in the average. Per-category differences: Accessibility +1, Mobile-first +1, Performance Awareness +1; all other categories 0. This small difference has no statistical significance claim.

## Findings

1. **Medium — rules-assisted keyboard capture is distant.** From a fresh page with twelve seed tasks, sequential Tab reaches capture after 29 presses on both viewports; baseline takes 4. The dock is visually prominent but follows all task controls in DOM order. The existing Skip to tasks link targets the list rather than capture. Evidence: runtime `keyboard.tabsToCapture`, [rules HTML](ai-design-rules/index.html), focus screenshots. Related guidance: `PRD-002` / `PAT-002` low-friction capture, `A11Y-003` visible focus. Follow-up: review a direct keyboard path to capture and its discoverability without positive tabindex ordering; test it with realistic list length. There is no new universal numeric Tab limit.
2. **Medium — baseline controls miss the repository's touch target bar.** The mobile capture input is 34px high, Today/All controls 43px. Completion hit areas were measured using their enclosing labels and do meet 44px. Rules-assisted default controls have no below-44px target in the recorded audit. Evidence: runtime `targets`, [layout measurements](layout-metrics.json). Related guidance: `A11Y-001`. Follow-up: expand actual input/navigation hit areas, not just the drawn icon or container.
3. **Medium — baseline error feedback moves the list.** At 390×844, the first row moves from y=426.671875 to y=448.671875 after the injected save failure, a 22px shift. The rules-assisted row stays at y=306.5. Evidence: [geometry](layout-metrics.json), mobile error screenshots. Related guidance: `PERF-001`, `PAT-002`. Follow-up: reserve the recovery message/action geometry, including wrapped text.
4. **Low — both saving labels change capture geometry.** Baseline input width falls from 239.3125 to 209.6875px; rules input falls from 242.546875 to 207.78125px. Add/Adding/Saving/Retry buttons consume different widths. Evidence: [geometry](layout-metrics.json). Related guidance: `PERF-001`. Follow-up: test all label states and reserve a stable action width without harming narrow-screen input usability.

Frozen outputs were not patched. These findings guide the next knowledge/review iteration.

## Coverage And Evidence

Both variants were observed at 390×844 and 1440×900 in the same Headless Chrome build. Each stores twenty screenshots: ten per viewport, including the nine protocol states and one additional validation screenshot.

| Check | Baseline | AI Design Rules |
| --- | --- | --- |
| Seed data / default overflow | 12 tasks; no horizontal overflow | 12 tasks; no horizontal overflow |
| Failed capture | Input kept, count remains 12 | Input kept, count remains 12 |
| Successful retry | Exactly one Buy apples task | Exactly one Buy apples task |
| Completion | Persisted complete state | Persisted complete state |
| Detail close | Source focus restored, scroll delta 0 | Source focus restored, scroll delta 0 |
| Immediate open/dismiss | Stays closed; source focus restored | Stays closed; source focus restored |
| Reduced motion | Same details/return; 0 active animations at capture | Same details/return; 0 active animations at capture |
| Failed edit / retry / reload | Draft kept, correct committed notes survive reload | Draft kept, correct committed notes survive reload |
| Blank title | Native required-field message | Explicit Task title error |
| JavaScript page errors during scripted passes | None observed | None observed |

The initial local server produced a favicon 404; this was not an application failure. Native validation messages and focus indicators were visually inspected. Formal contrast, assistive technology, physical mobile keyboard, alternative browsers, and quantitative performance remain untested. Target measurements above cover default-page controls, not a complete accessibility audit of every state.

Traceability: the rules run saved its three [context bundles](ai-design-rules/context/) and [source inventory](ai-design-rules/context/sources-read.txt). Applied areas include `PAT-001`, `PAT-002`, `PAT-003`, `PAT-005`, `PAT-006`; `PRD-001/002`, `IA-001/002`, `UX-001/002/003/004`, `VIS-001/002`, `A11Y-001/002/003/004`, and `PERF-001`. No rule was scored merely because its identifier was mentioned.

## Limits And Next Validation

This is one pair from the same inherited agent configuration with a shared host and an unblinded internal evaluator. Exact backend version and sampling settings were unavailable. It compares baseline with the whole current knowledge treatment; it does not isolate context retrieval changes or compare the previous release against this one. Both runs converged on a similar name and visual style, so this is especially weak evidence of visual diversity or distinct visual quality.

Repeat after tightening keyboard-path and state-geometry review, add independent or blinded evaluation, and test a real mobile keyboard before broader release claims. Keep existing rule/pattern maturity unchanged. See [run setup](common/setup.json), [baseline prompt](baseline/prompt.md), [rules prompt](ai-design-rules/prompt.md), and each variant's generation notes for exact inputs and limitations.
