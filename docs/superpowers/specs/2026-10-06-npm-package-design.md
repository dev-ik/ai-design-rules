# AI Design Context npm package

The approved goal is to install the existing knowledge graph into product repositories through npm. The project and package are named AI Design Context / `ai-design-context`; GitHub remains `dev-ik/ai-design-rules`.

- Use the existing dependency-free Node.js ES module tooling, with Node.js 20 or later.
- Publish a versioned graph snapshot, its upstream observations and evidence, schemas, skills, starter kit, and existing validation tooling. Preserve graph IDs, schema URIs, historical release names, and frozen evidence.
- Expose `ai-design-context context` with the existing task, review, and object arguments. Read from the package location, even when the consumer has its own registry. Preserve relative graph paths and add absolute reading paths for installed-package output.
- Expose `ai-design-context init` in the consumer's current directory. Append a clearly marked, optional design-context section to `AGENTS.md`, preserving existing instructions. Create only missing starter-kit product docs, templates, and review/benchmark checklists. Repeat runs must not duplicate instructions or overwrite populated files. Refuse writes through symlink paths and reject malformed integration markers before changing files.
- Installation itself must not mutate the consumer's files. No install hooks, new dependencies, runtime application code, or remote services.
- `--help` and `--version` are read-only. Unknown commands/arguments fail with a nonzero exit code.
- Verify CLI behavior, unchanged existing context behavior, the full repository checks, and installation/use of an actual packed tarball in a temporary consumer project without network access.
- Publication, GitHub renaming, commits, and pushes are outside this implementation.
