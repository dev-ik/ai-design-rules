# Agent Context CLI

`npm run context` converts a task, review target, or known graph object into a compact, traceable context bundle. It is a read-only local tool: no network, authentication, or registry writes are involved.

## Installed npm Package

After installing `ai-design-context` as a dev dependency, run the packaged CLI from the product repository:

```bash
npx --no-install ai-design-context context --task quick-capture --platform mobile --intent implement
npx --no-install ai-design-context context --review REF-00001 --intent qa
npx --no-install ai-design-context context --object PAT-00002 --format json
```

The installed CLI always reads its own graph, not a `registry/` directory in the consuming project. Markdown lists absolute paths so the agent can open the selected files. JSON preserves the relative graph `path`, adds an `absolutePath` to anchors and objects, and adds the package's `knowledgeRoot` at the top level. These reading paths depend on the installation location and must not be used as stable object identifiers.

`npx ai-design-context init` appends marked context and design-review blocks to `AGENTS.md` and creates only missing starter-kit files and namespaced `.agents/skills` launchers. It preserves current project instructions, populated files, customized launchers, and existing marked blocks. It rejects malformed markers, symlinked destinations, and incompatible file/directory destinations before creating files. Installation itself performs no initialization. See [Design and Browser QA](BROWSER_DESIGN_QA.md) for discovery, the `skills` CLI, and browser/image capability requirements.

Retrieval is lexical and read-only. A `--review` query matches a known graph object or phrase; it does not inspect or judge arbitrary files in the product repository. Resolve relevant context, then inspect the implementation separately. See [installation](../starter-kit/INSTALL_WITH_AGENT.md) for pre-publication tarball use.

## Commands

```bash
# Design or implement a feature.
npm run context -- --task quick-capture --platform mobile --intent implement
npm run context -- --task "build a shopping list" --intent implement

# Review an implementation, benchmark artifact, or reference fixture.
npm run context -- --review examples/todo-reference --intent qa

# Resolve an exact stable object.
npm run context -- --object PAT-00002 --format json
```

Exactly one of `--task`, `--review`, or `--object` is required.

## Output Contract

Markdown is the human default. `--format json` emits only this stable shape on stdout:

```json
{
  "query": { "mode": "task", "value": "quick-capture", "platform": "mobile", "intent": "implement" },
  "anchors": [],
  "objects": []
}
```

Every entry in `anchors` and `objects` retains `id`, `alias`, `title`, `type`, `status`, `maturity`, and `path`, and now adds a `reason` object. Consumers should allow additive fields. For example:

```json
{
  "id": "RULE-00002",
  "alias": "PRD-002",
  "title": "Low-Friction Capture Before Organization",
  "type": "rule",
  "status": "draft",
  "maturity": "seed",
  "path": "rules/product/PRD-002.md",
  "reason": { "kind": "dependency", "source": "PAT-00002", "relationship": "requires" }
}
```

## Matching And Scope

Task and review modes search stable registry fields and object Markdown. An exact ID, alias, slug, or registry path wins first. Otherwise, whole Unicode words must match; titles rank above slugs, aliases, categories, and incidental body mentions. Shorter focused titles break otherwise equal title matches. One highest-ranked anchor is selected, with stable ID ordering as the final tie-breaker.

The small English filler set (`a`, `an`, `the`, `please`, `build`, `create`, `implement`, `make`, `for`, `me`) is ignored in non-exact queries. Thus `build a shopping list` and `shopping list` resolve alike. Unknown subject terms are not dropped. This is lexical retrieval, not translation or semantic search: use a known slug or ID when a paraphrase or another language has no matching words. A query containing only fillers fails instead of selecting arbitrary knowledge.

Object mode matches only an exact ID, alias, slug, or registry path and does not apply filler handling.

From the anchor the resolver includes:

- Direct `related_to` neighbors for research, rules, and patterns, without recursively following optional neighbors.
- Rules derived from a research anchor through `derived_from` or `inspired_by`.
- Direct review prompts and checklists for anchors and those derived rules; reviews that `validate` a reference-project anchor.
- All transitive registered `requires`, `derived_from`, `inspired_by`, and `implements` dependencies of every selected object; `validates` targets of selected reviews and reference projects.

Dependencies are followed to completion even across cycles. A missing registered dependency is an error. The resolver does not walk backward from every shared rule into every consuming pattern or generation prompt. Broad review checklists remain available as gates, but their optional `related_to` links do not automatically select the whole graph. Follow those links explicitly when broadening a review. Non-registry observation sources remain in the research files and must be read there.

Platform matching is additive. It selects at most one matching rule or pattern from eligible types **before** ranking, then includes its dependencies and direct context under the same rules. A platform with no match adds nothing. Platform matching does not replace the task anchor or prove applicability.

There is no hard object-count cap: completeness of required dependencies takes priority over a fixed limit. Large mandatory graphs may still produce large bundles.

## Selection Reasons

Markdown explains the selection beside each object. JSON records the first deterministic inclusion reason:

| `reason.kind` | Meaning | Additional fields |
| --- | --- | --- |
| `match` | Exact match or highest-ranked lexical match | `field`, `terms` matched in that field |
| `platform` | Added by the platform query | `value`, `field`, `terms` |
| `dependency` | Outgoing mandatory or validation edge from a selected object | `source`, `relationship` |
| `related` | Direct optional neighbor of a seed object | `source`, `relationship` |
| `derived_rule` | Rule points back to selected research | `source` (research), `relationship` |
| `review` | Review gate points back to the selected object | `source` (reviewed object), `relationship` |

For `derived_rule` and `review`, the stored graph edge points from the returned object to `reason.source`. For `dependency` and `related`, it points from `reason.source` to the returned object. A reason explains inclusion; it is not a confidence score or a claim of validation.

`--intent implement` gives an implementation-first use order. `--intent qa` gives an evidence-and-checklist-first use order. Task mode defaults to `implement`; review mode defaults to `qa`.

An unmatched query returns a non-zero exit code; with `--format json` the error is a JSON object on stderr.

## Agent Use

1. Resolve context before proposing product or UI changes.
2. Read the listed research and rules before applying a pattern or prompt.
3. Treat `draft` and `seed` objects as guidance with explicit limits, not as validated truth.
4. Use listed checklists and reviews as quality gates.
5. If no context matches, capture an observation or research need; do not invent a rule to fill the gap.
6. Use `reason` to distinguish task matches, required knowledge, and review gates. Apply only guidance relevant to the current task.
