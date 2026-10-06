# AI Design Context v0.5.0

This release connects the installed knowledge graph to discoverable design workflows and concrete browser/image QA.

## Included

- Adapt four supplied checklist skills: `design-understand`, `visual-qa`, `responsive-check`, and `accessibility-check`, with metadata, graph grounding, tool requirements, and evidence-based report contracts.
- Install missing namespaced launchers for all 20 workflows under `.agents/skills` through explicit `init`.
- Add `skills list` and `skills show <name>`, including JSON output with paths, descriptions, content, and package version.
- Load current workflow instructions from the lockfile-pinned package rather than overwriting customized local skills on upgrades.
- Preserve the original `0.4.0` context block and append a separately marked design/browser-review routing block once.
- Cover installed-package retrieval, launcher creation, customized skills, malformed markers, symlink preflight, repeated initialization, and offline tarball installation.

## Install or upgrade

```bash
npm install --save-dev --save-exact ai-design-context@0.5.0
npx ai-design-context init
npx ai-design-context skills list
npx ai-design-context skills show visual-qa
```

Use the installed launchers or `skills show` to apply the workflow: understand the screen, retrieve research/rules, implement within the existing stack, exercise browser interactions, capture and inspect screenshots, check responsive/accessibility behavior, fix authorized issues, and retest.

## Capability and evidence limits

The package supplies knowledge and agent workflows. Browser tools or the project's Playwright setup, browser binaries, image viewing, and an image-capable model must be supplied by the agent/project environment. Missing capabilities are unverified scope, not a QA pass. One screenshot does not establish responsive, keyboard, virtual-keyboard, screen-reader, or asynchronous-state behavior.

The new skills use existing graph-backed guidance and are not registered knowledge objects. Existing draft/seed research and rules retain their maturity. Skill application scenarios and the reference fixture check validate the workflow's operation; they do not establish a general quality gain or replace paired benchmark evidence.

See [Design and Browser QA](https://github.com/dev-ik/ai-design-rules/blob/v0.5.0/docs/BROWSER_DESIGN_QA.md).
