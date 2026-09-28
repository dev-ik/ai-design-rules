# Generation notes

Condition: AI Design Rules. Fresh static implementation in this owned directory only.

## Timing and scope

- Started: 2026-09-28 05:37:39 UTC.
- Finished: 2026-09-28 05:45:13 UTC (7 minutes 34 seconds; below the 10-minute cap).
- Files: `index.html`, `styles.css`, `app.js`, this note, three raw context JSON files, and the source inventory in `context/sources-read.txt`.
- No sibling output, prior generated app, `examples/todo-reference`, network, browser, or subagent was inspected or used.
- Repository knowledge and shared inputs were not edited. `git status --short` was run before implementation; the repository already contained modified knowledge/tooling files, treated as the frozen input.

## Product direction and evidence boundary

User goal: capture everyday work, act on today's list, and inspect a task without rebuilding list context. The core object is the supplied task: id, title, notes, dueDate, completed. Today is the stable home; All tasks is another view of the same objects. Capture needs only a title, defaults visibly to Today, and keeps notes/date in task details. Today includes due-today tasks and unfinished overdue tasks; All tasks keeps later/undated tasks discoverable after date edits.

`PAT-00001` guides the daily home. `PAT-00002` and `PAT-00003` guide a fixed, reachable input and one submit action. `PAT-00005` guides temporary task detail with source scroll and focus restoration. `PAT-00006` is used only for simple done/undone meaning, not administrative metadata or columns.

Applied rules: PRD-001/002, IA-001/002, UX-001/002/003, VIS-001/002, A11Y-001/002/003/004, PERF-001. UX-004 was considered: no nonessential motion is introduced; open and close immediately reach the same functional state, including with reduced motion. Semantic CSS roles organize neutral content, supporting surfaces, teal primary actions, error and success. Task text dominates; no analytics, projects, teams, decorative cards, or external assets.

All retrieved research, rules, patterns, and review objects are **draft / seed**. These are bounded design inputs, not evidence of validated usability, performance, accessibility compliance, or benchmark outcomes. Review instructions informed the state inventory and the explicit unrendered-evidence gap. Their optional advice to ask for design alternatives was not applicable to the authorized independent single-output benchmark. No knowledge objects or rules were invented.

## Local serving

From this output directory:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/`. This command is provided for evaluation; no server/browser was launched by the generator. All assets are local and no build step or dependency installation is needed. The initial loading shell lasts 350 ms. Local state uses the key `daylight-adr-benchmark-v1` on the serving origin.

## Evaluator hooks

Hooks are available only via `window.__benchmark`; there are no product test controls.

```js
window.__benchmark.reset('seed')
window.__benchmark.reset('empty')
window.__benchmark.setSaveDelay(2500)
window.__benchmark.failNextSave()
window.__benchmark.getState()
```

- `reset` cancels stale pending results using an epoch, closes details, clears draft/error/view state, resets delay to 500 ms, clears the failure flag, persists the requested dataset where storage is available, and renders immediately. Seed matches the shared JSON exactly. Empty uses no tasks.
- `setSaveDelay` changes the delay for operations initiated afterward; default 500 ms. It does not affect the initial 350 ms loading shell.
- `failNextSave` fails exactly the next initiated save once; invalid blank submission does not consume the failure flag.
- `getState` returns a JSON-serializable copy of tasks, view, loading, selection, status, pending/failed operation, delay, one-shot failure flag, capture draft, detail drafts, and completed-section visibility.

## Exact state reproduction

1. Default: reset seed; Today contains 11 incomplete tasks and one completed task. The first task has the supplied note.
2. Empty: reset empty. The empty explanation and Add a task control focus the persistent capture input.
3. Initial loading: reset seed, then reload the page. For 350 ms the home shell and row placeholders remain in place; capture is temporarily disabled. No browser/network condition is needed.
4. Save loading: reset seed; set delay to 2500; type `Buy milk` into the bottom title input; press Enter or Add. Title remains visible, Add reads Saving, submission is disabled, existing tasks stay in place. After 2500 ms the saved task appears at the top.
5. Capture failure: reset seed; call failNextSave; type `Buy milk`; submit. After 500 ms the title remains, the message says it was not saved, and the same button reads Retry. Retry succeeds once and adds exactly one task. The next ordinary save succeeds.
6. Validation: reset empty; submit a blank/whitespace title. A textual Task title error is exposed and input focus remains available. Enter a title and submit to recover.
7. Completion: reset seed; click the check target beside Book dentist appointment. After the save delay it appears under Completed; uncheck to restore it. For failed completion, call failNextSave first; the original task state remains and the bottom Retry repeats that exact action.
8. Details: reset seed; scroll to Order coffee beans; click its title. Desktop uses a right-side dialog; mobile uses a bottom sheet. Close button, Close action, Escape, and clicking outside dismiss it. Source view/scroll is retained, focus returns to the surviving task control. No opening animation can cause stale selection or focus.
9. Edit success: open a task; change title, date, or notes; Save changes. Feedback appears inside details and in the page status. Clearing the date makes a task visible in All tasks; closing details returns to a surviving control.
10. Edit failure: open a task; change notes; call failNextSave; Save changes. The form values remain with recovery text. Save changes retries using the current inputs. Close and reopen also retains the draft during the same session.
11. Reduced motion: enable the operating-system/browser preference. There is no interaction animation; all information and controls remain immediate.

## Checks actually run

- `node --check app.js` — passed after implementation and after the final static corrections.
- Python filesystem checks — passed: unique HTML ids, label-to-input targets, literal JS element references, exact embedded seed equality, parseable raw context JSON, and no external asset URLs in HTML.
- The context CLI help and all three requested context resolutions completed successfully.
- No runtime interaction tests, browser tools, visual rendering, viewport screenshots, target-size measurements, contrast measurements, keyboard navigation tests, or assistive-technology tests were run because the envelope permits filesystem and shell syntax checks only. No rendered validation is claimed.
- Repository build/validation was not run because no repository knowledge or tooling was changed.

## Known limitations and follow-ups

- Modern native HTML dialog support is assumed. Cross-browser focus/scroll behavior and virtual-keyboard placement remain unverified.
- Tasks persist on this device/origin only; there is no backend, synchronization, or reminder notification service. Unsaved detail drafts stay in memory during the session and are not preserved through a reload.
- Storage-write failure is treated as a real failed save with retained input and retry; storage availability was not runtime-tested.
- Saves are serialized. During a pending operation mutation controls are disabled; task inspection and closing details remain available.
- Dates and Today are intentionally anchored to 2026-09-28 for reproducibility. Generated task ids use the local timestamp; the supplied seed is unchanged.
- Parent evaluation should measure 390×844 and 1440×900, inspect sticky capture overlap/keyboard behavior, verify dialog focus restoration, and exercise the documented pending/failure/retry paths. This is a verification gap, not a claim of successful rendered behavior.

## Actual inputs and sources read

Common input: `${RUN_ROOT}/common/seed.json`.
Instructions: this run's `prompt.md` and repository `AGENTS.md`.

Context commands (npm's silent option suppresses its wrapper while preserving raw CLI JSON):

```sh
npm run --silent context -- --task daily-home-surface --platform mobile --intent implement --format json
npm run --silent context -- --task quick-capture --platform mobile --intent implement --format json
npm run --silent context -- --task context-preserving-preview --platform mobile --intent implement --format json
```

Their exact JSON is saved under `context/` with matching task slugs. Every returned object path was read. The first concatenated read exceeded output limits, so research and the affected patterns, prompts, accessibility, IA, and performance rule files were read again in bounded batches. Two local skills were additionally read and applied. No external links within research were fetched.

Repository-relative source inventory:

- `AGENTS.md`
- `checklists/DESIGN_QA.md`
- `patterns/context-preserving-preview.md`
- `patterns/daily-home-surface.md`
- `patterns/mobile-primary-action.md`
- `patterns/object-status-list.md`
- `patterns/quick-capture.md`
- `prompts/PROTOTYPE_REVIEW.md`
- `prompts/QUICK_CAPTURE_STATE_REVIEW.md`
- `research/accessibility/keyboard-focus-and-interaction-motion.md`
- `research/accessibility/textual-error-recovery.md`
- `research/performance/reserved-loading-space.md`
- `research/products/apple-reminders.md`
- `research/products/arc.md`
- `research/products/linear.md`
- `research/products/telegram.md`
- `research/products/things-3.md`
- `research/ux/motion-as-state-continuity.md`
- `research/visual/expressive-system-ui-2026.md`
- `rules/accessibility/A11Y-001.md`
- `rules/accessibility/A11Y-002.md`
- `rules/accessibility/A11Y-003.md`
- `rules/accessibility/A11Y-004.md`
- `rules/ia/IA-001.md`
- `rules/ia/IA-002.md`
- `rules/performance/PERF-001.md`
- `rules/product/PRD-001.md`
- `rules/product/PRD-002.md`
- `rules/ux/UX-001.md`
- `rules/ux/UX-002.md`
- `rules/ux/UX-003.md`
- `rules/ux/UX-004.md`
- `rules/visual/VIS-001.md`
- `rules/visual/VIS-002.md`
- `skills/agent-context/SKILL.md`
- `skills/product-designer/SKILL.md`
