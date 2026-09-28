Implement the brief below in your owned output directory: ${OUTPUT_DIR}

You are not alone in the workspace. Never modify, revert, or inspect the other run's files. Do not spawn agents. Use a fresh implementation. You own only this output directory. Work independently with a maximum of 10 minutes from starting this task; record elapsed time and stop with the current output if the budget expires.

Shared technical envelope:
- Static index.html, styles.css, app.js; no dependencies, frameworks, build step, external fonts/images/assets, network or browser tools. Filesystem and shell syntax checks only. Parent will render both frozen outputs afterward.
- Use the exact deterministic task data from ${RUN_ROOT}/common/seed.json; localStorage persistence is allowed. Treat 2026-09-28 as today for the initial seed. Do not edit the common inputs.
- Expose non-product testing hooks on window.__benchmark: reset('seed'|'empty') resets local data and renders; setSaveDelay(milliseconds) sets delay for later save operations; failNextSave() makes the next save fail exactly once; getState() returns a serializable snapshot including tasks. Default delay is 500 ms. Hooks are evaluator-only, not visible product controls.
- Document hook usage, exact state reproduction, local serving, checks, known limitations, and actual sources read in GENERATION_NOTES.md. Do not assign scores or claim rendered validation.
- Include empty, loading, failed-save and successful-save states. The evaluator will use the same viewports (390x844 and 1440x900), data and sequences. Decide the UI and interactions yourself from the brief.
- Save only your own application and notes. Do not inspect an existing implementation or another run's output. Do not modify repository tooling or knowledge files.
