<p align="center">
  <img src="assets/logo.svg" alt="AI Design Rules logo" width="96" height="96">
</p>

<h1 align="center">AI Design Rules</h1>

<p align="center">
  <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
  <a href="CHANGELOG.md"><img alt="Status: active" src="https://img.shields.io/badge/status-active-success.svg"></a>
  <a href="evidence/README.md"><img alt="Evidence: benchmark driven" src="https://img.shields.io/badge/evidence-benchmark--driven-orange.svg"></a>
</p>

> **Build products. Not dashboards.**
>
> **Teach AI to think like a product designer.**

**AI Design Rules** is a **vendor-neutral, evidence-driven knowledge base** for AI coding agents.

Instead of teaching AI how to generate interfaces, it teaches AI how to design modern software products through **research**, **design rules**, **reusable patterns**, and **reproducible benchmarks**.

---

## Why AI Design Rules?

Modern AI coding agents are excellent at generating code.

They are far less consistent at making product decisions.

AI Design Rules helps agents move beyond generating screens by providing:

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

AI Design Rules is model-agnostic and works with any AI coding agent capable of reading repository documentation, including:

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

AI Design Rules does **not** assume it improves AI output.

Every significant change should be validated using reproducible benchmarks.

```text
Baseline AI
      ↓
AI + AI Design Rules
```

The first benchmark is **directional**, not conclusive, and serves as the starting point for future public validation.

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

`starter-kit/` can be copied into a product repository that wants to adopt AI Design Rules.

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

AI Design Rules is under active development.

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
