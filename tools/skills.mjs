import fs from 'node:fs';
import path from 'node:path';

export function skillCatalog(root) {
  const directory = path.join(root, 'skills');
  return fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((left, right) => left.name.localeCompare(right.name))
    .map((entry) => {
      const relativePath = `skills/${entry.name}/SKILL.md`;
      const absolutePath = path.join(root, relativePath);
      const content = fs.readFileSync(absolutePath, 'utf8');
      const frontMatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
      const name = frontMatter?.match(/^name:\s*(.+)$/m)?.[1].trim();
      const rawDescription = frontMatter?.match(/^description:\s*(.+)$/m)?.[1].trim();
      const description = rawDescription?.replace(/^(["'])(.*)\1$/, '$2');
      if (name !== entry.name || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name) || !description) {
        throw new Error(`Invalid skill metadata: ${relativePath}`);
      }
      return { name, installedName: `ai-design-context-${name}`, description, path: relativePath, absolutePath, content };
    });
}

export function skillLauncher(skill) {
  return `---
name: ${skill.installedName}
description: ${JSON.stringify(skill.description)}
---

# AI Design Context: ${skill.name}

Load the current workflow from the project's installed, lockfile-pinned package:

\`\`\`bash
npx --no-install ai-design-context skills show ${skill.name}
\`\`\`

Read and apply the returned workflow before acting. Its source location and knowledge root identify where supporting files live. In a product repository, use \`npx --no-install ai-design-context context\` in place of checkout-only \`npm run context --\` examples. Resolve focused graph context and read applicable research and rules before making design decisions.

Preserve existing project instructions and user scope. Use available browser and image tools for rendered checks; record unavailable capabilities and unverified states. This launcher installs instructions, not browser binaries or model vision. Other bundled workflows can be read with \`npx --no-install ai-design-context skills list\` and \`skills show <name>\`.
`;
}

export function runSkills(argv, root) {
  const usage = 'Usage: ai-design-context skills list [--format json]\n       ai-design-context skills show <name> [--format json]';
  if (argv.length === 1 && ['--help', '-h'].includes(argv[0])) {
    console.log(usage);
    return;
  }
  const args = [...argv];
  const formatIndex = args.indexOf('--format');
  let format = 'markdown';
  if (formatIndex >= 0) {
    format = args[formatIndex + 1];
    args.splice(formatIndex, 2);
  }
  if (!['markdown', 'json'].includes(format)) throw new Error('--format must be markdown or json');
  const [action = 'list', name] = args;
  if ((action === 'list' && args.length > 1) || (action === 'show' && args.length !== 2) || !['list', 'show'].includes(action)) {
    throw new Error(usage);
  }
  const skills = skillCatalog(root);
  const { version } = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  const common = { version, knowledgeRoot: root };
  if (action === 'show') {
    const skill = skills.find((entry) => entry.name === name);
    if (!skill) throw new Error(`Unknown skill: ${name}`);
    console.log(format === 'json' ? JSON.stringify({ ...common, ...skill }, null, 2)
      : `Source: ${skill.absolutePath}\nKnowledge root: ${root}\nPackage version: ${version}\n\nIn product repositories, use npx --no-install ai-design-context context for graph retrieval. Resolve paths in this workflow relative to the knowledge root or its source directory.\n\n${skill.content}`);
  } else {
    const entries = skills.map(({ content, ...skill }) => skill);
    console.log(format === 'json' ? JSON.stringify({ ...common, skills: entries }, null, 2)
      : `# AI Design Context Skills (${version})\n\n${entries.map((skill) => `- ${skill.name}: ${skill.description}\n  Source: ${skill.absolutePath}\n  Installed launcher: ${skill.installedName}`).join('\n')}`);
  }
}
