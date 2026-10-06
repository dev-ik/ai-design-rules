import fs from 'node:fs';
import path from 'node:path';
import { skillCatalog, skillLauncher } from './skills.mjs';

const startMarker = '<!-- ai-design-context:start -->';
const endMarker = '<!-- ai-design-context:end -->';
const skillsStartMarker = '<!-- ai-design-context:skills:start -->';
const skillsEndMarker = '<!-- ai-design-context:skills:end -->';
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

const routingInstructions = `${skillsStartMarker}
## Design and browser review skills

AI Design Context installs namespaced workflow launchers under \`.agents/skills/\`. Start with \`ai-design-context-design-understand\` for an existing screen and \`ai-design-context-product-designer\` for product direction. Use visual, interaction, and design-system specialists for implementation within the existing stack.

After UI changes, use \`ai-design-context-visual-qa\`, \`ai-design-context-responsive-check\`, and \`ai-design-context-accessibility-check\`, then \`ai-design-context-design-reviewer\` for the final evidence and traceability review. Open the real UI with available browser tools or the project's Playwright setup, exercise the primary flow and relevant states, capture screenshots, inspect them with an image-capable model, make authorized fixes, and repeat the failed checks.

Use \`npx --no-install ai-design-context skills list\` and \`npx --no-install ai-design-context skills show <name>\` to load workflows from the installed package, including in agents without automatic local-skill discovery. Package upgrades refresh these source workflows without replacing customized launchers.

Report viewport, state, reproduction steps, screenshot paths, applicable graph rules, observed defects, and coverage gaps. A source-only review or single screenshot cannot establish complete visual, responsive, or keyboard QA. Missing browser or image tools must be reported as unverified checks, not passes. The package does not provision those tools or change the project's application dependencies.
${skillsEndMarker}`;

function hasValidBlock(content, start, end) {
  const starts = content.split(start).length - 1;
  const ends = content.split(end).length - 1;
  if (starts !== ends || starts > 1 || (starts === 1 && content.indexOf(start) > content.indexOf(end))) {
    throw new Error('Invalid AI Design Context markers in AGENTS.md; repair the marked block before running init.');
  }
  return starts === 1;
}

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
  const hasInstructions = hasValidBlock(original, startMarker, endMarker);
  const hasRouting = hasValidBlock(original, skillsStartMarker, skillsEndMarker);

  // Preflight all destinations and sources before writing any project files.
  const missing = templates.filter((file) => !inspectTarget(root, file));
  const contents = missing.map((file) => [file, fs.readFileSync(path.join(packageRoot, 'starter-kit', file))]);
  const skillFiles = skillCatalog(packageRoot).map((skill) => ({ skill, file: `.agents/skills/${skill.installedName}/SKILL.md` }));
  const missingSkills = skillFiles.filter(({ file }) => !inspectTarget(root, file));
  contents.push(...missingSkills.map(({ skill, file }) => [file, skillLauncher(skill)]));
  const created = [];
  for (const [file, content] of contents) {
    const target = path.join(root, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content, { flag: 'wx' });
    created.push(file);
  }

  const blocks = [!hasInstructions && instructions, !hasRouting && routingInstructions].filter(Boolean);
  if (blocks.length > 0) {
    const newline = original.includes('\r\n') ? '\r\n' : '\n';
    const block = blocks.join('\n\n').replaceAll('\n', newline);
    if (agentsExists) {
      const separator = original.endsWith(newline) ? newline : `${newline}${newline}`;
      fs.appendFileSync(agentsPath, `${separator}${block}${newline}`);
    } else {
      fs.writeFileSync(agentsPath, `# Project Agent Instructions${newline}${newline}${block}${newline}`, { flag: 'wx' });
      created.unshift('AGENTS.md');
    }
  }

  return { created, instructionsAdded: !hasInstructions, routingAdded: !hasRouting, skillsInstalled: missingSkills.map(({ skill }) => skill.installedName) };
}
