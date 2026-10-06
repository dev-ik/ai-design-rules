# AI Design Context npm Package Implementation Plan

**Goal:** Make the graph installable as `ai-design-context` with safe initialization and package-local retrieval.

**Architecture:** Keep the graph and current tools in place. Add one CLI dispatcher and one initializer; expose the existing resolver with an explicit graph root. Package the upstream evidence with the graph rather than severing its source links.

**Tech stack:** Node.js >=20, ES modules, npm, node:test; no dependencies.

**Spec:** `docs/superpowers/specs/2026-10-06-npm-package-design.md`

## Constraints and review focus

- Preserve GitHub URL, existing resolver output, stable identifiers, historical releases, and frozen evidence.
- Preserve populated project files, including custom instruction blocks and existing templates.
- Exercise a consumer with a conflicting registry, repeated initialization, symlink paths, malformed markers, and invalid command arguments.
- Execute locally in this session; do not publish or commit.

## Task 1: Consumer CLI and safe initializer

Files: create `tools/cli.mjs`, `tools/init.mjs`, `tools/cli.test.mjs`; modify `tools/context.mjs`.

- [x] Write real-process tests for retrieval from another working directory and safe, repeatable initialization.
- [x] Run `node --test tools/cli.test.mjs` and confirm the new behavior is missing.
- [x] Export `runContext(argv, { root, readingPaths, command })`, retaining standalone cwd-based behavior. Add absolute reading paths only for the package CLI.
- [x] Implement `initProject(projectRoot, packageRoot)` with preflight validation, exclusive creation of missing templates, and marked instruction appending.
- [x] Add CLI command dispatch, help, version, and error exit codes.
- [x] Run CLI and existing context tests.

## Task 2: Installable artifact and documentation

Files: modify `package.json`, `README.md`, `docs/AGENT_CONTEXT.md`, `starter-kit/INSTALL_WITH_AGENT.md`, `starter-kit/README.md`, `starter-kit/PROJECT_INTEGRATION.md`, `skills/agent-context/SKILL.md`, `SECURITY.md`, `CHANGELOG.md`; create `tools/package.test.mjs`.

- [x] Test packing and installing the tarball in an offline temporary consumer; run its installed binary and check graph/evidence paths exist.
- [x] Configure version, bin, engines, license, repository, explicit files allowlist, and release checks. Preserve the GitHub URL.
- [x] Document installation, explicit initialization, reading paths, version pinning, lexical review matching, and local tarball testing before publication.
- [x] Run `npm run generate:indexes`, `npm run check`, and `npm test`.
- [x] Review the final diff and report publication as an outstanding step.
