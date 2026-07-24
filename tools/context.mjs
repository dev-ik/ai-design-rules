import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const objectOrder = [
  'research',
  'rule',
  'pattern',
  'prompt',
  'checklist',
  'reference_project',
  'review',
];
const typeLabels = {
  research: 'Research',
  rule: 'Rules',
  pattern: 'Patterns',
  prompt: 'Prompts',
  checklist: 'Checklists',
  reference_project: 'Reference Projects',
  review: 'Reviews',
};

function usage() {
  return `Usage:
  npm run context -- --task <query> [--platform <name>] [--intent implement|qa] [--format markdown|json]
  npm run context -- --review <object-id-or-path> [--intent qa] [--format markdown|json]
  npm run context -- --object <object-id-or-slug> [--intent implement|qa] [--format markdown|json]

Examples:
  npm run context -- --task quick-capture --platform mobile --intent implement
  npm run context -- --review examples/todo-reference --intent qa
  npm run context -- --object PAT-00002 --format json`;
}

function parseArgs(argv) {
  const options = { format: 'markdown' };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--help' || argument === '-h') {
      options.help = true;
      continue;
    }
    if (argument === '--json') {
      options.format = 'json';
      continue;
    }
    if (!['--task', '--review', '--object', '--platform', '--intent', '--format'].includes(argument)) {
      throw new Error(`Unknown argument: ${argument}`);
    }
    const value = argv[index + 1];
    if (!value || value.startsWith('--')) {
      throw new Error(`${argument} requires a value`);
    }
    options[argument.slice(2)] = value;
    index += 1;
  }

  if (options.help) return options;
  const modes = ['task', 'review', 'object'].filter((mode) => options[mode]);
  if (modes.length !== 1) {
    throw new Error('Provide exactly one of --task, --review, or --object');
  }
  if (!['markdown', 'json'].includes(options.format)) {
    throw new Error('--format must be markdown or json');
  }
  options.mode = modes[0];
  options.intent ??= options.mode === 'review' ? 'qa' : 'implement';
  if (!['implement', 'qa'].includes(options.intent)) {
    throw new Error('--intent must be implement or qa');
  }
  return options;
}

function normalize(value) {
  return String(value ?? '')
    .normalize('NFKC')
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function tokenise(value) {
  return normalize(value)
    .split(/\s+/u)
    .filter((token) => token.length > 1);
}

function objectText(object) {
  const filePath = path.join(root, object.path);
  const content = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
  return normalize([object.id, object.alias, object.slug, object.title, object.category, object.path, content].join('\n'));
}

function findAnchors(objects, query) {
  const normalizedQuery = normalize(query);
  const tokens = tokenise(query);
  if (!normalizedQuery || tokens.length === 0) return [];

  const scored = objects
    .map((object) => {
      const text = objectText(object);
      const exactFields = [object.id, object.alias, object.slug, object.path].map(normalize);
      const allTokensMatch = tokens.length > 0 && tokens.every((token) => text.includes(token));
      if (!text.includes(normalizedQuery) && !allTokensMatch) return null;

      const score =
        (exactFields.includes(normalizedQuery) ? 100 : 0) +
        (text.includes(normalizedQuery) ? 20 : 0) +
        tokens.filter((token) => text.includes(token)).length;
      return { object, score };
    })
    .filter(Boolean)
    .sort((left, right) => right.score - left.score || left.object.id.localeCompare(right.object.id));

  return scored.slice(0, 1).map(({ object }) => object);
}

function findExactObject(objects, query) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];

  const object = objects.find((candidate) =>
    [candidate.id, candidate.alias, candidate.slug, candidate.path]
      .map(normalize)
      .includes(normalizedQuery),
  );

  return object ? [object] : [];
}

function relatedContext(anchors, objectsById, relationships, platform) {
  const selected = new Map(anchors.map((object) => [object.id, object]));
  const add = (id) => {
    const object = objectsById.get(id);
    if (object) selected.set(id, object);
  };
  const outgoing = (id) => relationships.filter((relationship) => relationship.source === id);
  const incoming = (id) => relationships.filter((relationship) => relationship.target === id);

  for (const anchor of anchors) {
    for (const relationship of outgoing(anchor.id)) add(relationship.target);

    if (anchor.object_type === 'rule') {
      for (const relationship of incoming(anchor.id)) {
        if (['pattern', 'prompt', 'checklist'].includes(objectsById.get(relationship.source)?.object_type)) add(relationship.source);
      }
    }
    if (anchor.object_type === 'research') {
      for (const relationship of incoming(anchor.id)) {
        if (objectsById.get(relationship.source)?.object_type === 'rule') add(relationship.source);
      }
    }
    if (anchor.object_type === 'pattern') {
      for (const relationship of incoming(anchor.id)) {
        if (['prompt', 'reference_project'].includes(objectsById.get(relationship.source)?.object_type)) add(relationship.source);
      }
    }
    if (anchor.object_type === 'reference_project') {
      for (const relationship of incoming(anchor.id)) {
        if (objectsById.get(relationship.source)?.object_type === 'review') add(relationship.source);
      }
    }
  }

  for (const object of [...selected.values()]) {
    if (object.object_type === 'rule') {
      for (const relationship of outgoing(object.id)) {
        if (objectsById.get(relationship.target)?.object_type === 'research') add(relationship.target);
      }
      for (const relationship of incoming(object.id)) {
        if (['pattern', 'prompt', 'checklist'].includes(objectsById.get(relationship.source)?.object_type)) add(relationship.source);
      }
    }
    if (object.object_type === 'pattern') {
      for (const relationship of outgoing(object.id)) {
        if (objectsById.get(relationship.target)?.object_type === 'rule') add(relationship.target);
      }
    }
    if (object.object_type === 'review') {
      for (const relationship of outgoing(object.id)) add(relationship.target);
    }
  }

  if (platform) {
    const platformMatches = findAnchors([...objectsById.values()], platform).filter((object) =>
      ['rule', 'pattern'].includes(object.object_type),
    );
    for (const object of platformMatches.slice(0, 2)) add(object.id);
  }

  return [...selected.values()].sort(
    (left, right) => objectOrder.indexOf(left.object_type) - objectOrder.indexOf(right.object_type) || left.id.localeCompare(right.id),
  );
}

function serializeObject(object) {
  return {
    id: object.id,
    alias: object.alias,
    title: object.title,
    type: object.object_type,
    status: object.status,
    maturity: object.maturity,
    path: object.path,
  };
}

function asMarkdown(result) {
  const lines = [
    '# Agent Context',
    '',
    `Mode: ${result.query.mode}`,
    `Query: ${result.query.value}`,
    `Platform: ${result.query.platform ?? 'not specified'}`,
    `Intent: ${result.query.intent}`,
    '',
    '## Anchors',
    '',
    ...result.anchors.map((object) => `- \`${object.id}\` / \`${object.alias}\` — ${object.title}`),
  ];

  for (const type of objectOrder) {
    const objects = result.objects.filter((object) => object.type === type);
    if (objects.length === 0) continue;
    lines.push('', `## ${typeLabels[type]}`, '');
    lines.push(
      ...objects.map(
        (object) =>
          `- \`${object.id}\` / \`${object.alias}\` — ${object.title} (${object.status}, ${object.maturity}) · \`${object.path}\``,
      ),
    );
  }

  const useOrder = result.query.intent === 'qa'
    ? [
        '1. Inspect the selected reference or implementation before judging it.',
        '2. Check the listed rules and patterns against directly observed behavior.',
        '3. Use the listed checklists and reviews as gates; report missing evidence as a gap.',
      ]
    : [
        '1. Read the selected research and rules before changing a product decision.',
        '2. Apply the selected patterns and prompts; do not invent advice beyond them.',
        '3. Use listed checklists and reviews as later gates, and keep their evidence limits explicit.',
      ];
  lines.push(
    '',
    '## Use Order',
    '',
    ...useOrder,
  );
  return `${lines.join('\n')}\n`;
}

function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
    if (options.help) {
      console.log(usage());
      return;
    }

    const registry = JSON.parse(fs.readFileSync(path.join(root, 'registry/objects.json'), 'utf8'));
    const relationshipRegistry = JSON.parse(
      fs.readFileSync(path.join(root, 'registry/relationships.json'), 'utf8'),
    );
    const objectsById = new Map(registry.objects.map((object) => [object.id, object]));
    const query = options[options.mode];
    const anchors = options.mode === 'object'
      ? findExactObject(registry.objects, query)
      : findAnchors(registry.objects, query);
    if (anchors.length === 0) throw new Error(`No graph object matches "${query}"`);

    const result = {
      query: { mode: options.mode, value: query, platform: options.platform ?? null, intent: options.intent },
      anchors: anchors.map(serializeObject),
      objects: relatedContext(anchors, objectsById, relationshipRegistry.relationships, options.platform).map(serializeObject),
    };
    console.log(options.format === 'json' ? JSON.stringify(result, null, 2) : asMarkdown(result));
  } catch (error) {
    if (options?.format === 'json' || process.argv.includes('--json')) {
      console.error(JSON.stringify({ error: error.message }));
    } else {
      console.error(`Context resolution failed: ${error.message}`);
      console.error(usage());
    }
    process.exitCode = 1;
  }
}

main();
