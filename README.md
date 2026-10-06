<p align="center">
  <img src="assets/logo.svg" alt="AI Design Context logo" width="96" height="96">
</p>

<h1 align="center">AI Design Context</h1>

<p align="center">
  <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
  <a href="CHANGELOG.md"><img alt="Status: active" src="https://img.shields.io/badge/status-active-success.svg"></a>
  <a href="evidence/README.md"><img alt="Evidence: benchmark driven" src="https://img.shields.io/badge/evidence-benchmark--driven-orange.svg"></a>
</p>

> **Build products. Not dashboards.**
>
> **Teach AI to think like a product designer.**

**AI Design Context** is a **vendor-neutral, evidence-driven knowledge base** for AI coding agents.

Instead of teaching AI how to generate interfaces, it teaches AI how to design modern software products through **research**, **design rules**, **reusable patterns**, and **reproducible benchmarks**.

Previously named **AI Design Rules**. Historical releases, benchmark artifacts, and stable schema identifiers retain the original name.

---

## Why AI Design Context?

Modern AI coding agents are excellent at generating code.

They are far less consistent at making product decisions.

AI Design Context helps agents move beyond generating screens by providing:

- Research-driven product knowledge
- Reusable design rules
- Composable UI patterns
- Structured design workflows
- Reproducible benchmarks

Instead of relying on prompts alone, agents learn from an evolving knowledge graph.

---

## Core Principles

- Research before implementation
- Rules before prompts
- Evidence over opinion
- Reusable patterns instead of one-off solutions
- Benchmarks instead of subjective claims

---

## Knowledge Pipeline

```text
Observations
      ↓
Research
      ↓
Rules
      ↓
Patterns
      ↓
Prompts
      ↓
Benchmarks
      ↓
Evidence
      ↓
Reviews
```

The repository is built as a **schema-first knowledge graph** for both humans and AI coding agents.

---

## Features

- Vendor-neutral architecture
- Schema-first knowledge graph
- Stable IDs and typed relationships
- Research-driven design rules
- Reusable product and UI patterns
- AI agent skills
- Validation tooling
- Benchmark framework
- DesignLint v0 for evidence-chain relationship checks

---

## Supported AI Coding Agents

AI Design Context is model-agnostic and works with any AI coding agent capable of reading repository documentation, including:

- OpenAI Codex
- Claude Code
- Cursor
- GitHub Copilot
- Gemini CLI
- Cline
- Continue
- Aider

---

## Evidence-Driven Development

AI Design Context does **not** assume it improves AI output.

Every significant change should be validated using reproducible benchmarks.

```text
Baseline AI
      ↓
AI + AI Design Context
```

The first benchmark is **directional**, not conclusive, and serves as the starting point for future public validation.

---

## Add It to a Product Repository

AI Design Context ships as the dependency-free npm package `ai-design-context` with a CLI and a versioned knowledge graph. Requires **Node.js 20 or later**. The GitHub repository stays at [`dev-ik/ai-design-rules`](https://github.com/dev-ik/ai-design-rules).

Install the published package:

```bash
npm install --save-dev --save-exact ai-design-context
npx ai-design-context init
npx ai-design-context context --task quick-capture --platform mobile --intent implement
```

Commit the project's dependency manifest and lockfile to pin the knowledge version. Installation alone does not edit project files: `init` explicitly appends a marked section to `AGENTS.md` and creates only missing product-context docs, feature/task templates, and review/benchmark checklists. It preserves existing instructions, populated files, and edited integration blocks; repeated runs do not duplicate them. Fill new placeholders with actual product context.

`context` reads the graph from the installed package, independently of the project's working directory. Markdown provides absolute reading paths; JSON adds `knowledgeRoot` and each object's `absolutePath` while preserving graph-relative `path`. Read the selected research and rules before implementing UI changes.

```bash
npx ai-design-context context --object PAT-00002 --format json
npx ai-design-context context --review REF-00001 --intent qa
npx ai-design-context --help
```

Review queries retrieve matching graph knowledge; they do not analyze arbitrary application files. Matching is lexical, with known IDs and slugs available when phrases do not match. See [Agent Context](docs/AGENT_CONTEXT.md).

Before publication, build a local tarball from this repository and install it into a product repository:

```bash
# In the AI Design Context checkout. Runs graph checks and tests before packing.
npm pack

# In the product repository; replace the path with the generated tarball path.
npm install --save-dev /path/to/ai-design-context-0.4.0.tgz
npx ai-design-context init
```

For deliberate updates after publication, run `npm install --save-dev --save-exact ai-design-context@<version>`, review the new guidance, and commit the lockfile. There are no install hooks, application runtime dependencies, or new UI frameworks.

Git submodules and sibling checkouts remain supported alternatives. See [Install with a Coding Agent](starter-kit/INSTALL_WITH_AGENT.md) for both npm and Git workflows.

Maintainers: [npm Releases](docs/NPM_RELEASE.md) describes initial publication and automatic publishing from GitHub Releases with npm Trusted Publishing.

---

## Quick Start

```bash
npm install
npm run check
```

This command validates metadata, relationships, generated indexes, and the repository knowledge graph.
It is read-only and fails when generated indexes are stale. After changing registry metadata, run `npm run generate:indexes` before `npm run check`.

For focused checks:

```bash
npm run lint:design
npm run benchmark:validate
```

The benchmark validator checks raw evidence completeness and distinguishes directional runs from rendered runs with local visual artifacts. It never treats scores alone as proof of product quality.

Ask the graph for task-specific context instead of reading every index manually:

```bash
npm run context -- --task quick-capture --platform mobile
npm run context -- --review examples/todo-reference
```

Use `--format json` when another agent or script will consume the result. See `docs/AGENT_CONTEXT.md` for the object-resolution and evidence-boundary contract.

---

## Recommended Workflow

1. Read `AGENTS.md`
2. Follow `docs/INDEX.md`
3. Explore relevant research
4. Select applicable rules
5. Compose patterns
6. Apply prompts
7. Validate with benchmarks
8. Record evidence
9. Improve the knowledge graph

---

## Repository Structure

```text
docs/
research/
rules/
patterns/
prompts/
skills/
benchmarks/
evidence/
starter-kit/
schema/
registry/
templates/
reviews/
observations/
```

Generated indexes are built from repository metadata.

`starter-kit/` can be copied into a product repository that wants to adopt AI Design Context.

---

## Contributing

Start with:

- `CONTRIBUTING.md`
- `AGENTS.md`
- `docs/INDEX.md`

Every contribution should explain:

- where the knowledge came from;
- why it exists;
- when it applies;
- how it relates to existing knowledge.

---

## Project Status

AI Design Context is under active development.

Current public release includes:

- Schema-first architecture
- Knowledge graph
- JSON Schemas
- Stable metadata model
- Generated indexes
- Validation tooling
- Benchmark methodology
- AI agent skills

See `CHANGELOG.md` for release history.

---

## Roadmap

- Expanded benchmark evidence
- Public reference archetypes
- Expanded DesignLint semantics
- IDE integrations
- MCP integrations
- Community-driven rule evolution

---

## License

See `LICENSE`.
