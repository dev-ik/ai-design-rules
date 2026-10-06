# Browser QA workflow smoke check

Date: 2026-10-06. Target: the unchanged `examples/todo-reference` fixture, served locally. Purpose: exercise the browser/image workflow documented by the new v0.5.0 skills. This is a smoke check, not a paired benchmark, quality score, accessibility certification, or promotion of graph maturity.

## Scope and reproduction

Open the fixture in Playwright's browser at 390x844 CSS pixels. Capture the default state. Submit the empty capture input, observe the alert `Enter a task before adding it.`, and capture the error state. Fill the input with `Review a long grocery list item and verify that its complete title remains readable on a narrow screen`; press Tab, capture keyboard focus on the submit button, then press Enter and capture the saved list.

Resize the same browser to 1440x900 and capture the list. Open `Pick up fruit for breakfast`, capture desktop details, then resize the open detail surface to 390x844 and capture the mobile layout. All seven resulting images were opened and visually inspected. The fixture's static header date is sample content, not the run date.

## Coverage

| Surface | Viewport | State/input | Evidence | Result |
| --- | --- | --- | --- | --- |
| List and capture | 390x844 | Default | `mobile-default.png` | Inspected; primary capture action and list readable. |
| Capture | 390x844 | Empty submission | `mobile-error.png`, browser alert snapshot | Observed textual error and input focus. |
| Capture | 390x844 | Fill, Tab | `mobile-keyboard-focus.png`, active-element observation | Visible submit-button focus inspected. |
| List | 390x844 | Enter to save long title | `mobile-saved.png`, updated browser snapshot | Item inserted; title wraps in list. DOM observation: viewport and document scroll width both 390px. |
| List | 1440x900 | Saved state | `desktop-default.png` | Inspected; title wraps without visible collision. |
| Details | 1440x900 | Pointer opens item | `desktop-detail.png`, browser snapshot | Source list remains visible beside details. |
| Details | 390x844 | Resize open details | `mobile-detail.png` | Inspected mobile detail geometry; not proof of modal focus management. |

No confirmed blocking visual defect was established in the inspected captures. Overall verdict is **PARTIAL** for complete UI QA: tablet/neighboring breakpoints, physical touch, real virtual keyboard, full dialog keyboard cycle, loading timing/layout, retry, reduced motion, numeric contrast, clickable target measurements, and screen-reader behavior were not tested. No supplied design reference existed for layout comparison. The single input's horizontal text scroll is distinct from accidental page overflow.

## Skill behavior and package checks

The four skill documents passed metadata validation. Read-only application scenarios exercised missing browser/image evidence, existing-screen diagnosis, responsive emulation limits, and accessibility limitations. Reports separated observed evidence from unverified states and avoided inventing defects or broad passes. These are scenario checks, not estimates of population-level agent performance.

Automated tests separately verify packed installation, graph/source retrieval, discoverable launcher creation, preservation of local files, marker validation, and symlink preflight. See `tools/cli.test.mjs` and `tools/package.test.mjs`. Grounding uses existing `CHECK-00001` and applicable rules/research; the new skills remain outside the knowledge registry.
