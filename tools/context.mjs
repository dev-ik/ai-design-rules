import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

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

function usage(command) {
  if (command) return `Usage:
  ${command} --task <query> [--platform <name>] [--intent implement|qa] [--format markdown|json]
  ${command} --review <object-id-or-path> [--intent qa] [--format markdown|json]
  ${command} --object <object-id-or-slug> [--format markdown|json]`;
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
    .filter(Boolean);
}

const taskFillers = new Set(['a', 'an', 'the', 'please', 'build', 'create', 'implement', 'make', 'for', 'me']);
const dependencyTypes = new Set(['requires', 'derived_from', 'inspired_by', 'implements']);

function searchIndex(objects, root) {
  return objects.map((object) => {
    const filePath = path.join(root, object.path);
    const content = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
    return {
      object,
      terms: new Set(tokenise([object.id, object.alias, object.slug, object.title, object.category, object.path, content].join('\n'))),
      fields: [
        ['title', object.title, 100],
        ['slug', object.slug, 90],
        ['alias', object.alias, 80],
        ['category', object.category, 20],
      ],
    };
  });
}

function findAnchors(index, query) {
  const normalizedQuery = normalize(query);
  const exact = findExactObject(index.map(({ object }) => object), query);
  if (exact.length > 0) return exact;
  const tokens = [...new Set(tokenise(query).filter((token) => !taskFillers.has(token)))];
  if (!normalizedQuery || tokens.length === 0) return [];

  const scored = index
    .map(({ object, terms, fields }) => {
      if (!tokens.every((token) => terms.has(token))) return null;
      let score = 0;
      let field = 'content';
      let matchedTerms = tokens;
      for (const [name, value, weight] of fields) {
        const fieldTerms = new Set(tokenise(value));
        const matched = tokens.filter((token) => fieldTerms.has(token)).length;
        const fieldScore = matched === 0 ? 0 : weight * matched / tokens.length + matched / fieldTerms.size;
        if (fieldScore > score) {
          score = fieldScore;
          field = name;
          matchedTerms = tokens.filter((token) => fieldTerms.has(token));
        }
      }
      return { object, score, reason: { kind: 'match', field, terms: matchedTerms } };
    })
    .filter(Boolean)
    .sort((left, right) => right.score - left.score || left.object.id.localeCompare(right.object.id));

  return scored.slice(0, 1);
}

function findExactObject(objects, query) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];

  for (const object of objects) {
    const field = ['id', 'alias', 'slug', 'path'].find((name) => normalize(object[name]) === normalizedQuery);
    if (field) return [{ object, reason: { kind: 'match', field, terms: tokenise(query) } }];
  }
  return [];
}

function relatedContext(anchors, objectsById, relationships, platform, index) {
  const selected = new Map();
  const queue = [];
  const outgoing = new Map();
  const incoming = new Map();
  for (const edge of [...relationships].sort((a, b) =>
    a.source.localeCompare(b.source) || a.type.localeCompare(b.type) || a.target.localeCompare(b.target))) {
    if (!outgoing.has(edge.source)) outgoing.set(edge.source, []);
    if (!incoming.has(edge.target)) incoming.set(edge.target, []);
    outgoing.get(edge.source).push(edge);
    incoming.get(edge.target).push(edge);
  }
  const add = (id, reason) => {
    const object = objectsById.get(id);
    if (!object) throw new Error(`Context relationship target is not registered: ${id}`);
    if (selected.has(id)) return;
    selected.set(id, { object, reason });
    queue.push(object);
  };
  const seeds = [...anchors];
  if (platform) {
    const matches = findAnchors(
      index.filter(({ object }) => ['rule', 'pattern'].includes(object.object_type)), platform,
    );
    seeds.push(...matches.map(({ object, reason }) => ({ object, reason: { ...reason, kind: 'platform', value: platform } })));
  }
  for (const { object, reason } of seeds) add(object.id, reason);

  // Only seed objects select optional neighbors; dependencies cannot pull in every consumer.
  const reviewTargets = new Set(seeds.map(({ object }) => object.id));
  for (const { object } of seeds) {
    for (const edge of outgoing.get(object.id) ?? []) {
      if (edge.type === 'related_to' && ['research', 'rule', 'pattern'].includes(object.object_type)) {
        add(edge.target, { kind: 'related', source: edge.source, relationship: edge.type });
      }
    }
    for (const edge of incoming.get(object.id) ?? []) {
      const source = objectsById.get(edge.source);
      if (object.object_type === 'research' && source?.object_type === 'rule' && ['derived_from', 'inspired_by'].includes(edge.type)) {
        add(source.id, { kind: 'derived_rule', source: object.id, relationship: edge.type });
        reviewTargets.add(source.id);
      }
      if (object.object_type === 'reference_project' && source?.object_type === 'review' && edge.type === 'validates') {
        add(source.id, { kind: 'review', source: object.id, relationship: edge.type });
      }
    }
  }
  for (const id of reviewTargets) {
    for (const edge of incoming.get(id) ?? []) {
      const source = objectsById.get(edge.source);
      if (['requires', 'related_to'].includes(edge.type) &&
          (source?.object_type === 'checklist' || (source?.object_type === 'prompt' && source.category === 'review'))) {
        add(source.id, { kind: 'review', source: id, relationship: edge.type });
      }
    }
  }

  // A growing queue computes the dependency closure and terminates even when the graph has cycles.
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const object = queue[cursor];
    for (const edge of outgoing.get(object.id) ?? []) {
      if (dependencyTypes.has(edge.type) ||
          (edge.type === 'validates' && ['reference_project', 'review'].includes(object.object_type))) {
        add(edge.target, { kind: 'dependency', source: edge.source, relationship: edge.type });
      }
    }
  }

  return [...selected.values()].sort(
    (left, right) => objectOrder.indexOf(left.object.object_type) - objectOrder.indexOf(right.object.object_type) || left.object.id.localeCompare(right.object.id),
  );
}

function serializeObject({ object, reason }) {
  return {
    id: object.id,
    alias: object.alias,
    title: object.title,
    type: object.object_type,
    status: object.status,
    maturity: object.maturity,
    path: object.path,
    reason,
  };
}

function explainReason(reason) {
  if (reason.kind === 'match') return `matched ${reason.field}: ${reason.terms.join(', ')}`;
  if (reason.kind === 'platform') return `platform ${reason.value}, matched ${reason.field}`;
  if (['review', 'derived_rule'].includes(reason.kind)) return `${reason.kind === 'review' ? 'review gate' : 'derived rule'} for ${reason.source} (${reason.relationship})`;
  return `${reason.source} ${reason.relationship} this object`;
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
          `- \`${object.id}\` / \`${object.alias}\` — ${object.title} (${object.status}, ${object.maturity}) · \`${object.absolutePath ?? object.path}\` — ${explainReason(object.reason)}`,
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

export function runContext(argv, { root = process.cwd(), readingPaths = false, command } = {}) {
  let options;
  try {
    options = parseArgs(argv);
    if (options.help) {
      console.log(usage(command));
      return;
    }

    const registry = JSON.parse(fs.readFileSync(path.join(root, 'registry/objects.json'), 'utf8'));
    const relationshipRegistry = JSON.parse(
      fs.readFileSync(path.join(root, 'registry/relationships.json'), 'utf8'),
    );
    const objectsById = new Map(registry.objects.map((object) => [object.id, object]));
    const index = searchIndex(registry.objects, root);
    const query = options[options.mode];
    const anchors = options.mode === 'object'
      ? findExactObject(registry.objects, query)
      : findAnchors(index, query);
    if (anchors.length === 0) throw new Error(`No graph object matches "${query}"`);

    const result = {
      query: { mode: options.mode, value: query, platform: options.platform ?? null, intent: options.intent },
      anchors: anchors.map(serializeObject),
      objects: relatedContext(anchors, objectsById, relationshipRegistry.relationships, options.platform, index).map(serializeObject),
    };
    if (readingPaths) {
      result.knowledgeRoot = path.resolve(root);
      for (const object of [...result.anchors, ...result.objects]) {
        object.absolutePath = path.resolve(root, object.path);
      }
    }
    console.log(options.format === 'json' ? JSON.stringify(result, null, 2) : asMarkdown(result));
  } catch (error) {
    if (options?.format === 'json' || argv.includes('--json')) {
      console.error(JSON.stringify({ error: error.message }));
    } else {
      console.error(`Context resolution failed: ${error.message}`);
      console.error(usage(command));
    }
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  runContext(process.argv.slice(2));
}
