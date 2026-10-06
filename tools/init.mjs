import fs from 'node:fs';
import path from 'node:path';

const startMarker = '<!-- ai-design-context:start -->';
const endMarker = '<!-- ai-design-context:end -->';
const templates = [
  'docs/PRD.md',
  'docs/PERSONAS.md',
  'docs/USER_FLOWS.md',
  'docs/INFORMATION_ARCHITECTURE.md',
  'docs/DESIGN_DECISIONS.md',
  'templates/FEATURE_TEMPLATE.md',
  'templates/TASK_TEMPLATE.md',
  'reviews/DESIGN_REVIEW.md',
  'benchmarks/BENCHMARK_CHECKLIST.md',
];

const instructions = `${startMarker}
## AI Design Context

Use the installed, lockfile-pinned AI Design Context knowledge graph for user-facing product, UX, UI, accessibility, motion, and design-prompt tasks. Existing project instructions, business logic, and the project's design system remain authoritative. Skip graph retrieval for backend-only, infrastructure-only, or unrelated maintenance tasks.

Before implementation:

\`\`\`bash
npx --no-install ai-design-context context --task "<task phrase>" --intent implement
npx --no-install ai-design-context context --task "<task phrase>" --platform mobile --intent implement
\`\`\`

Before review, resolve a known graph object or matching task phrase:

\`\`\`bash
npx --no-install ai-design-context context --review "<object ID, graph path, or matching phrase>" --intent qa
\`\`\`

Read the returned research and rules before making product decisions. Markdown lists absolute reading paths; JSON (\`--format json\`) retains graph-relative \`path\` and adds \`absolutePath\`. Review queries resolve graph context; they do not inspect arbitrary application files. Inspect the implementation separately.

Treat \`draft\` and \`seed\` guidance as bounded evidence. Matching is lexical, not translation or semantic search: prefer known slugs or IDs when a phrase does not match. If retrieval fails, record an observation or research need instead of inventing design advice. Report applied rules, patterns, state coverage, mobile assumptions, accessibility checks, and validation limits.

Use existing product documentation first. Fill any newly created starter-kit placeholders with actual product context; use \`reviews/DESIGN_REVIEW.md\` for UI review.
${endMarker}`;

function inspectTarget(root, relativePath) {
  const parts = relativePath.split('/');
  let current = root;
  let result;
  for (const [index, part] of parts.entries()) {
    current = path.join(current, part);
    try {
      result = fs.lstatSync(current);
    } catch (error) {
      if (error.code === 'ENOENT') return undefined;
      throw error;
    }
    if (result.isSymbolicLink()) throw new Error(`Refusing to write through symlink: ${relativePath}`);
    if (index < parts.length - 1 && !result.isDirectory()) {
      throw new Error(`Expected a directory in template path: ${relativePath}`);
    }
  }
  if (!result.isFile()) throw new Error(`Expected a regular file: ${relativePath}`);
  return result;
}

export function initProject(projectRoot, packageRoot) {
  const root = fs.realpathSync(projectRoot);
  const agentsPath = path.join(root, 'AGENTS.md');
  const agentsExists = inspectTarget(root, 'AGENTS.md');
  const original = agentsExists ? fs.readFileSync(agentsPath, 'utf8') : '';
  const starts = original.split(startMarker).length - 1;
  const ends = original.split(endMarker).length - 1;
  if (starts !== ends || starts > 1 || (starts === 1 && original.indexOf(startMarker) > original.indexOf(endMarker))) {
    throw new Error('Invalid AI Design Context markers in AGENTS.md; repair the marked block before running init.');
  }

  // Preflight all destinations and sources before writing any project files.
  const missing = templates.filter((file) => !inspectTarget(root, file));
  const contents = missing.map((file) => [file, fs.readFileSync(path.join(packageRoot, 'starter-kit', file))]);
  const created = [];
  for (const [file, content] of contents) {
    const target = path.join(root, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content, { flag: 'wx' });
    created.push(file);
  }

  if (starts === 0) {
    const newline = original.includes('\r\n') ? '\r\n' : '\n';
    const block = instructions.replaceAll('\n', newline);
    if (agentsExists) {
      const separator = original.endsWith(newline) ? newline : `${newline}${newline}`;
      fs.appendFileSync(agentsPath, `${separator}${block}${newline}`);
    } else {
      fs.writeFileSync(agentsPath, `# Project Agent Instructions${newline}${newline}${block}${newline}`, { flag: 'wx' });
      created.unshift('AGENTS.md');
    }
  }

  return { created, instructionsAdded: starts === 0 };
}
