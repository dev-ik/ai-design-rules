# Install with a Coding Agent

Use this guide to connect AI Design Context to an existing product repository without replacing its application code, UI library, or current agent instructions.

After setup, the product repository has:

- a pinned AI Design Context knowledge source;
- project-local agent instructions;
- product context and review templates where they are missing;
- a repeatable command for retrieving task-specific graph context.

## Choose a Connection

| Connection | Use when | Trade-off |
| --- | --- | --- |
| npm dev dependency `ai-design-context` | A Node.js project wants CLI access and lockfile-pinned guidance. | Requires Node.js 20+; upgrades are explicit dependency updates. |
| Git submodule at `.ai-design-rules/` | A team needs a reviewable, reproducible version. | The parent repository must update the pinned commit deliberately. |
| Sibling checkout | One developer wants to evaluate the workflow locally. | The path is machine-specific and is not shared with the team. |
| Starter kit only | The project needs the workflow and templates but not live graph retrieval. | The agent cannot resolve current research, rules, or patterns automatically. |

## npm Installation

The package is published on npm. Run these commands from the product repository:

```bash
npm install --save-dev --save-exact ai-design-context
npx ai-design-context init
npx ai-design-context context --task quick-capture --platform mobile --intent implement
```

Before publication, run `npm pack` in the knowledge-source checkout, then install that generated `.tgz` with `npm install --save-dev /path/to/ai-design-context-0.4.0.tgz` in the product repository. The same `init` and `context` commands work with the local tarball.

`init` appends an optional, marked section to the existing `AGENTS.md` and creates only missing files under `docs/`, `templates/`, `reviews/`, and `benchmarks/`. It preserves existing project-specific instructions, populated documents, and edited integration blocks. Repeat it safely to create newly missing templates; it does not refresh an existing block. Review any newly created placeholders and fill them with actual product context. There are no install hooks and no runtime dependencies.

Ask the agent to use the returned absolute reading paths, read research and rules, and preserve evidence limits. JSON output includes `knowledgeRoot`, relative `path`, and `absolutePath`. `--review` matches graph identifiers or phrases rather than analyzing arbitrary product files.

Commit the package manifest and lockfile. Adopt future guidance deliberately with `npm install --save-dev --save-exact ai-design-context@<version>` after reviewing its changes.

The GitHub URL remains `https://github.com/dev-ik/ai-design-rules`. The instructions below describe the Git submodule alternative; its existing `.ai-design-rules/` path remains valid.

## Give the Agent This Task

Run the agent from the root of the product repository and give it this prompt:

```text
Connect AI Design Context to this repository.

Knowledge source:
https://github.com/dev-ik/ai-design-rules.git

Use the repository's existing conventions and make only integration changes.

1. Inspect the repository instructions, documentation structure, package manager,
   and current git status before changing files.
2. If `.ai-design-rules` is absent, add the knowledge source there as a Git
   submodule. If that path already exists, inspect and reuse it; do not replace it.
3. Read `.ai-design-rules/starter-kit/README.md`,
   `.ai-design-rules/starter-kit/PROJECT_INTEGRATION.md`, and
   `.ai-design-rules/starter-kit/AGENTS.md`.
4. Merge the relevant starter-kit instructions into the repository's existing
   `AGENTS.md`. Preserve all existing project-specific and higher-priority rules.
   If the repository uses another instruction file, adapt the integration to it
   and explain the choice.
5. Reuse existing product documentation. Create only missing PRD, persona,
   user-flow, information-architecture, design-decision, feature-template,
   design-review, and benchmark files. Never overwrite populated files with
   starter-kit placeholders.
6. Add these commands to the project instructions for user-facing product, UX,
   UI, accessibility, motion, and design-prompt work:

   npm --prefix .ai-design-rules run context -- --task "<task phrase>" --intent implement
   npm --prefix .ai-design-rules run context -- --task "<task phrase>" --platform mobile --intent implement
   npm --prefix .ai-design-rules run context -- --review "<path>" --intent qa

   Tell agents to read the returned research and rules before making product
   decisions. If no context resolves, they must record a knowledge gap instead of
   inventing a rule. Skip graph retrieval for backend-only, infrastructure-only,
   or unrelated maintenance work.
7. Verify the knowledge source and run:

   npm --prefix .ai-design-rules run check
   npm --prefix .ai-design-rules run context -- --task quick-capture --platform mobile --intent implement

8. Report the files created or merged, checks run, unresolved conflicts, and the
   pinned AI Design Context commit.

Do not change application behavior, dependencies, or product code as part of this
integration.
```

The prompt intentionally tells the agent to merge rather than copy. Existing product context is more authoritative than starter-kit placeholders.

## Verify the Connection

From the product repository root, run:

```bash
git submodule status .ai-design-rules
npm --prefix .ai-design-rules run check
npm --prefix .ai-design-rules run context -- --task quick-capture --platform mobile --intent implement
git status --short
```

The context command should return matched anchors, research, rules, and a recommended reading order. Review `git status` before committing: the integration should change only `.gitmodules`, the pinned submodule, agent instructions, and explicitly selected project documentation.

## Use It on Product Work

Before implementing a user-facing task:

```bash
npm --prefix .ai-design-rules run context -- --task "describe the task" --intent implement
```

Add `--platform mobile` when narrow-screen or touch behavior matters.

Before reviewing an implementation or reference fixture:

```bash
npm --prefix .ai-design-rules run context -- --review "path/to/implementation" --intent qa
```

The agent should use the returned objects as bounded evidence, preserve the product's existing logic and design system, and report which rules and patterns influenced the result.

## Update the Pinned Knowledge Source

Update intentionally, then validate before committing the new submodule pointer:

```bash
git submodule update --remote .ai-design-rules
npm --prefix .ai-design-rules run check
```

Review upstream changes before adopting them. A knowledge-source update can change the guidance an agent retrieves even when product code is unchanged.
