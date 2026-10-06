# Design and Browser QA

AI Design Context connects product/design reasoning with evidence-based checks of implemented screens. Version `0.5.0` adapts four user-supplied checklists from `Skills.zip` into executable agent workflows: `design-understand`, `visual-qa`, `responsive-check`, and `accessibility-check`. They complement the existing specialist skills; they do not add new design rules or become registry objects.

## Install and discover

```bash
npm install --save-dev --save-exact ai-design-context@0.5.0
npx ai-design-context init
npx ai-design-context skills list
npx ai-design-context skills show visual-qa
```

`init` creates missing namespaced launchers under `.agents/skills/ai-design-context-<name>/SKILL.md` for all 20 bundled skills. It preserves existing launchers and project instructions. Each launcher reads its full workflow from the installed package with `skills show`; upgrading the pinned package updates the workflow without overwriting local customization. `skills list --format json` and `skills show <name> --format json` expose source paths, content, descriptions, and the package version for other tooling.

Codex discovers repository skills in `.agents/skills` and can match their descriptions automatically. If the skill list does not refresh, restart the agent. Other runtimes can load workflows through `skills show` and the `AGENTS.md` routing section; automatic discovery depends on their own supported directories. See [official skill discovery documentation](https://learn.chatgpt.com/docs/build-skills#where-codex-loads-local-skills).

For a project already initialized with `0.4.0`, rerun `init` after the npm update. The original context block stays intact; a separately marked design-and-review routing block is appended once, and missing launchers are installed. Edited blocks and existing local skills remain authoritative. Commit the lockfile, chosen templates, `AGENTS.md`, and `.agents/skills` with your project instructions.

## Workflow

| Stage | Workflow | Evidence |
| --- | --- | --- |
| Understand | `design-understand` for an existing screen; `product-designer` for new product direction | User goal, primary action, existing objects, source components, assumptions. |
| Ground | `agent-context` | Retrieved research, rules, and patterns with explicit maturity limits. |
| Implement | Visual, interaction, mobile, and design-system specialists | Focused changes within the project's existing stack and logic. |
| Inspect | `visual-qa`, `responsive-check`, `accessibility-check` | Browser interactions, screenshots opened by the model, DOM measurements, keyboard/error recovery observations. |
| Review | `design-reviewer` | Scoped verdict, severity-ordered findings, graph traceability, retest results, and coverage gaps. |

Use an available browser connector/tool or the project's existing Playwright setup. Open the actual screen, exercise its primary flow, resize supported viewports, scroll, inspect dialogs and sticky regions, and capture relevant states. Use semantic roles and labels when the browser tool supports them. Inspect the resulting image pixels with an image-capable model. Compare a supplied design reference under matching viewport, state, theme, scale, and content.

Example exploratory CSS viewports are 390x844, 768x1024, and 1440x900; use the product's supported targets and affected breakpoints. Viewport emulation does not establish physical touch, virtual-keyboard resizing, safe areas, or screen-reader behavior. Record those as unverified when not actually exercised.

## What the npm package provides

| Capability | Supplied by the package |
| --- | --- |
| Knowledge graph and workflow instructions | Yes, versioned and local. |
| Discoverable repository skill launchers | Yes, after explicit `init`. |
| Browser connector, Playwright runtime, or browser binaries | No; use tools already available to the agent/project. |
| Image viewing and model vision | No; the agent's runtime/model must support them. |
| Screenshot-based compliance certification or universal design-quality guarantee | No. |

If tools are absent, continue with source or supplied-image inspection and label the scope **PARTIAL**. A static screenshot cannot prove responsive interactions, keyboard behavior, asynchronous state handling, or numerical contrast ratios. Missing evidence is a coverage gap rather than a pass or a confirmed product defect.

## Review output

Keep evidence in the project's established location; otherwise use a dated folder under `output/playwright/`. Each confirmed issue records its severity, screen/component, viewport and state, reproducible actions, observed versus expected behavior, applicable graph/reference basis, screenshot/measurement, impact, proposed fix, and retest result. Label unverified component/file attribution as a hypothesis.

Finish with a table of **surface | viewport | state/input | evidence | checked/unverified/not applicable**. Use `PASS`, `NEEDS WORK`, or `PARTIAL` for the declared scope. After an authorized fix, repeat the failed check and relevant neighboring layouts under matching conditions; run the project's code checks. The existing `examples/todo-reference` fixture can exercise this process but is not a new benchmark pair or evidence of general quality gains.

Tool mechanics: [Playwright screenshots](https://playwright.dev/docs/screenshots), [emulation](https://playwright.dev/docs/emulation), and [role/label locators](https://playwright.dev/docs/locators). Upstream guidance remains `CHECK-00001`, applicable registered rules and research, and explicit user constraints.
