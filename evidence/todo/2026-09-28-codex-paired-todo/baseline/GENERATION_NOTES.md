# Baseline generation notes

## Scope and files

Fresh static consumer todo app named Daylight. Implementation files are `index.html`, `styles.css`, and `app.js`. No dependencies, build step, external assets, network calls, repository code, or browser tools were used.

Product behavior:

- Today shows incomplete tasks dated September 28, 2026 or earlier; older dates receive an overdue label.
- All tasks includes undated and future tasks as well.
- The capture field adds a task to the fixed benchmark date. Enter or Add submits it.
- Checkboxes complete or reopen tasks. Completed tasks are in an expandable section.
- Clicking a task title opens an accessible native dialog with title, optional date, and optional notes. Cancel and Escape abandon the current detail draft; save commits it.
- Saves wait for 500 ms by default. Controls for mutations are disabled while a save is pending. Success is reported in the inline status area.
- On failed save, persisted tasks are unchanged. The pending operation is retained for the inline Try again button. Add text and the open edit form remain available; edits can be corrected and resubmitted.
- Data persists in localStorage under `daylight-baseline-v1` on the current origin.

## Local serving

From this output directory run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/`. The generator did not run a server or render the output. No network is needed by the application.

## Evaluator hooks and exact reproduction

Hooks are only exposed on `window.__benchmark`; they have no product UI.

```js
window.__benchmark.reset('seed');
window.__benchmark.reset('empty');
window.__benchmark.setSaveDelay(5000);
window.__benchmark.failNextSave();
window.__benchmark.getState();
```

`reset` replaces local tasks, selects Today, collapses Completed, closes details, clears the capture field and status, cancels any in-flight completion, resets the delay to 500 ms, and clears pending injected failure. It renders immediately and returns a serializable state. The default reset mode is `seed`. `getState()` returns task data, fixed date, view, initial loading flag, pending and failed operations, feedback text/type, editing ID, and save delay.

Reproduction sequences:

1. **Seed/default:** `reset('seed')`. Exact supplied 12 tasks, including one completed task, are restored. Today initially contains 11 incomplete items.
2. **Empty:** `reset('empty')`. The empty state and capture field are visible. Enter a task and submit to leave the empty state.
3. **Initial loading:** reload the document. The app shows a skeleton list and Loading badge for the first 500 ms. The previously saved data is rendered afterward. Calling reset during loading cancels that initial timer's effect.
4. **Pending save:** `reset('seed'); setSaveDelay(5000)` using the methods above. Add a task or toggle a checkbox. For five seconds the status reports saving and mutation controls are disabled. Task data changes only after success.
5. **Failed capture:** reset, invoke `failNextSave()`, type `Buy apples` and submit. After the delay, an inline failure with Try again appears. The title remains in the capture field; tasks remain unchanged. Click Try again without invoking the failure hook again. The task is added once and success is reported.
6. **Failed completion:** reset, invoke `failNextSave()`, then check Book dentist appointment. After failure, the task stays incomplete. Try again completes it and makes it available under Completed.
7. **Failed edit:** reset, open Book dentist appointment, alter notes, invoke `failNextSave()`, and Save changes. The dialog stays open with its draft and failure message. Try saving again retries the current form data. Successful save closes the dialog.
8. **Future/undated details:** change a task date to September 29, 2026 or clear it and save. It leaves Today, remains in All tasks, and the success message identifies where to find it.
9. **Persistence:** save a change and reload. Stored tasks remain on the same origin.

`failNextSave()` affects exactly the next started save, once. Subsequent retries succeed unless browser storage itself is unavailable. A call while a save is already pending affects the following operation. `setSaveDelay` affects later started saves. reset invalidates an outstanding timer so it cannot overwrite newly reset data.

## Checks actually run

- `node --check app.js` — passed JavaScript syntax checking.
- Python HTML parsing — 31 unique element IDs, valid explicit label targets, and all 28 statically referenced JS element IDs present.
- Static CSS brace balance — passed. This is not a full CSS parser or visual check.
- Static HTML asset check — no external resource URLs.
- Node comparison of the embedded seed array against the provided `common/seed.json` — all 12 tasks exactly match every supplied field.
- `git status --short` in the owned output directory — not applicable; the temporary output directory is not a Git repository.

No browser, rendered visual review, viewport verification, keyboard trial, assistive technology trial, or browser interaction tests were performed. These remain for the parent evaluator.

## Known limitations

- Storage is local to the browser origin; there is no backend or synchronization.
- A browser blocking localStorage writes will produce save failures. There is no separate fallback persistence mechanism.
- Today is deliberately fixed at September 28, 2026 for the benchmark; it does not follow the real calendar.
- No task deletion, task reordering, recurring tasks, or notifications were included in this brief.
- Initial loading lasts a fixed 500 ms; the delay hook controls saves, not initial loading.
- The UI was authored for the target widths but was not rendered or measured by the generator.

## Actual sources read

1. `${RUN_ROOT}/baseline/prompt.md`
2. `${RUN_ROOT}/common/seed.json`
3. The generator's own newly authored implementation, solely for static checks.

No AI Design Rules files, design skills, repository examples, sibling output, external references, or network sources were read.

## Timing

Started: 2026-09-28 05:37:31 UTC (first prompt read). Completed and frozen: 2026-09-28 05:44:40 UTC. Actual elapsed time: approximately 7 minutes 9 seconds, within the authorized ten-minute window.
