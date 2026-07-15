import fs from 'node:fs';
import path from 'node:path';
import { generateIndexFiles } from './generate-indexes.mjs';

const root = process.cwd();
const requiredFields = [
  'id',
  'alias',
  'slug',
  'title',
  'object_type',
  'status',
  'version',
  'category',
  'tags',
  'maturity',
  'risk_level',
  'relationships',
];

const idPrefixes = {
  observation: 'OBS-',
  research: 'RESEARCH-',
  rule: 'RULE-',
  pattern: 'PAT-',
  prompt: 'PROMPT-',
  checklist: 'CHECK-',
  review: 'REVIEW-',
  reference_project: 'REF-',
};

const registryBackedObjectTypes = new Set([
  'research',
  'rule',
  'pattern',
  'prompt',
  'checklist',
  'review',
  'reference_project',
]);

const allowedRelationshipTypes = new Set([
  'derived_from',
  'cites',
  'inspired_by',
  'requires',
  'validates',
  'implements',
  'related_to',
  'supersedes',
  'deprecated_by',
  'replaced_by',
]);
const maturityLevels = new Set(['seed', 'reviewed', 'validated', 'canonical']);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(path.join(root, filePath), 'utf8'));
}

function findDuplicateJsonKeyErrors(filePath) {
  const raw = fs.readFileSync(path.join(root, filePath), 'utf8');
  const errors = [];

  for (const objectMatch of raw.matchAll(/\{([^{}]*)\}/g)) {
    const keys = new Set();

    for (const keyMatch of objectMatch[1].matchAll(/"([^"\\]+)"\s*:/g)) {
      const key = keyMatch[1];
      if (keys.has(key)) {
        errors.push(`${filePath}: duplicate JSON key ${key}`);
      }
      keys.add(key);
    }
  }

  return errors;
}

function collectMarkdownFiles(dir) {
  const entries = fs.readdirSync(path.join(root, dir), { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectMarkdownFiles(fullPath));
      continue;
    }

    if (!entry.name.endsWith('.md')) {
      continue;
    }

    if (entry.name === 'INDEX.md' || entry.name === 'README.md' || entry.name.startsWith('GENERATED_')) {
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (trimmed === '[]') {
    return [];
  }
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function validateSkillMetadata(filePath, metadata, errors) {
  const skillName = path.basename(path.dirname(filePath));

  if (metadata.name !== skillName) {
    errors.push(`${filePath}: skill name must match directory ${skillName}`);
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(metadata.name ?? '')) {
    errors.push(`${filePath}: skill name must use lowercase kebab-case`);
  }

  if (typeof metadata.description !== 'string' || metadata.description.trim() === '') {
    errors.push(`${filePath}: skill description must be a non-empty string`);
  }
}

function relationshipKey(relationship) {
  return `${relationship.type}:${relationship.source}:${relationship.target}`;
}

function parseFrontMatter(markdown, filePath) {
  if (!markdown.startsWith('---\n')) {
    throw new Error(`${filePath}: missing YAML front matter`);
  }

  const end = markdown.indexOf('\n---', 4);
  if (end === -1) {
    throw new Error(`${filePath}: unterminated YAML front matter`);
  }

  const yaml = markdown.slice(4, end).split('\n');
  const metadata = {};
  let currentKey = null;
  let currentRelationship = null;

  for (const rawLine of yaml) {
    const line = rawLine.replace(/\s+$/, '');
    if (!line.trim()) {
      continue;
    }

    const topLevel = line.match(/^([a-z_]+):(?:\s*(.*))?$/);
    if (topLevel) {
      currentKey = topLevel[1];
      const value = topLevel[2] ?? '';

      if (value === '') {
        metadata[currentKey] = [];
      } else {
        metadata[currentKey] = parseScalar(value);
      }
      currentRelationship = null;
      continue;
    }

    const listItem = line.match(/^  -\s*(.*)$/);
    if (listItem && currentKey) {
      if (!Array.isArray(metadata[currentKey])) {
        throw new Error(`${filePath}: ${currentKey} must be an array`);
      }

      const item = listItem[1];
      const inlinePair = item.match(/^([a-z_]+):\s*(.*)$/);

      if (inlinePair) {
        currentRelationship = {
          [inlinePair[1]]: parseScalar(inlinePair[2]),
        };
        metadata[currentKey].push(currentRelationship);
      } else {
        metadata[currentKey].push(parseScalar(item));
        currentRelationship = null;
      }
      continue;
    }

    const nestedPair = line.match(/^    ([a-z_]+):\s*(.*)$/);
    if (nestedPair && currentRelationship) {
      currentRelationship[nestedPair[1]] = parseScalar(nestedPair[2]);
      continue;
    }

    throw new Error(`${filePath}: unsupported front matter line "${line}"`);
  }

  return metadata;
}

function validateMetadata(filePath, metadata, registryIds, errors) {
  for (const field of requiredFields) {
    if (!(field in metadata)) {
      errors.push(`${filePath}: missing required field ${field}`);
    }
  }

  const prefix = idPrefixes[metadata.object_type];
  if (!prefix) {
    errors.push(`${filePath}: unsupported object_type ${metadata.object_type}`);
  } else if (!String(metadata.id || '').startsWith(prefix)) {
    errors.push(`${filePath}: id ${metadata.id} does not match ${metadata.object_type}`);
  }

  if (!Array.isArray(metadata.tags) || metadata.tags.length === 0) {
    errors.push(`${filePath}: tags must be a non-empty array`);
  }

  if (!maturityLevels.has(metadata.maturity)) {
    errors.push(`${filePath}: unsupported maturity ${metadata.maturity}`);
  }

  if (metadata.maturity === 'seed' && metadata.status !== 'draft') {
    errors.push(`${filePath}: seed maturity requires draft status`);
  }

  if (['reviewed', 'validated', 'canonical'].includes(metadata.maturity)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(metadata.last_reviewed_at ?? '')) {
      errors.push(`${filePath}: ${metadata.maturity} maturity requires last_reviewed_at in YYYY-MM-DD format`);
    }
  }

  if (['validated', 'canonical'].includes(metadata.maturity) && metadata.status !== 'active') {
    errors.push(`${filePath}: ${metadata.maturity} maturity requires active status`);
  }

  if (metadata.maturity === 'canonical' && !/^[1-9]\d*\.\d+\.\d+$/.test(metadata.version ?? '')) {
    errors.push(`${filePath}: canonical maturity requires a stable major version`);
  }

  if (!Array.isArray(metadata.relationships)) {
    errors.push(`${filePath}: relationships must be an array`);
    return;
  }

  for (const relationship of metadata.relationships) {
    if (!relationship.type || !relationship.target) {
      errors.push(`${filePath}: relationship must include type and target`);
      continue;
    }

    if (!allowedRelationshipTypes.has(relationship.type)) {
      errors.push(`${filePath}: unsupported relationship type ${relationship.type}`);
    }

    if (/^[A-Z]+-\d{5}$/.test(relationship.target)) {
      if (!registryIds.has(relationship.target)) {
        errors.push(`${filePath}: relationship target ${relationship.target} is not in registry`);
      }
      continue;
    }

    const targetPath = path.join(root, relationship.target);
    if (!fs.existsSync(targetPath)) {
      errors.push(`${filePath}: relationship target ${relationship.target} does not exist`);
    }
  }
}

const errors = [
  ...findDuplicateJsonKeyErrors('registry/objects.json'),
  ...findDuplicateJsonKeyErrors('registry/relationships.json'),
];
const registryObjects = readJson('registry/objects.json').objects;
const registryRelationships = readJson('registry/relationships.json').relationships;
const registryIds = new Set(registryObjects.map((object) => object.id));
const registryByPath = new Map(registryObjects.map((object) => [object.path, object]));
const files = [
  ...collectMarkdownFiles('observations'),
  ...collectMarkdownFiles('research'),
  ...collectMarkdownFiles('rules'),
  ...collectMarkdownFiles('patterns'),
  ...collectMarkdownFiles('prompts'),
  ...collectMarkdownFiles('checklists'),
  ...collectMarkdownFiles('reviews'),
  ...collectMarkdownFiles('examples'),
].sort();
const skillFiles = collectMarkdownFiles('skills').filter((file) => path.basename(file) === 'SKILL.md').sort();
const aliases = new Map();
const slugs = new Map();
const ids = new Map();
const metadataById = new Map();
const frontMatterRelationshipKeys = new Set();

for (const filePath of files) {
  const markdown = fs.readFileSync(path.join(root, filePath), 'utf8');
  let metadata;

  try {
    metadata = parseFrontMatter(markdown, filePath);
  } catch (error) {
    errors.push(error.message);
    continue;
  }

  validateMetadata(filePath, metadata, registryIds, errors);
  if (metadata.id) {
    metadataById.set(metadata.id, { filePath, metadata });
  }

  if (Array.isArray(metadata.relationships)) {
    for (const relationship of metadata.relationships) {
      if (/^[A-Z]+-\d{5}$/.test(relationship.target)) {
        frontMatterRelationshipKeys.add(
          relationshipKey({ ...relationship, source: metadata.id }),
        );
      }
    }
  }

  for (const [map, keyName] of [
    [ids, 'id'],
    [aliases, 'alias'],
    [slugs, 'slug'],
  ]) {
    const key = metadata[keyName];
    if (!key) {
      continue;
    }
    if (map.has(key)) {
      errors.push(`${filePath}: duplicate ${keyName} ${key}; first seen in ${map.get(key)}`);
    } else {
      map.set(key, filePath);
    }
  }

  if (!registryBackedObjectTypes.has(metadata.object_type)) {
    continue;
  }

  const registryObject = registryByPath.get(filePath);
  if (!registryObject) {
    errors.push(`${filePath}: missing registry object`);
    continue;
  }

  for (const field of ['id', 'alias', 'slug', 'title', 'object_type', 'status', 'version', 'category', 'maturity']) {
    if (registryObject[field] !== metadata[field]) {
      errors.push(
        `${filePath}: registry ${field} is ${registryObject[field] ?? '<missing>'}, expected ${metadata[field]}`,
      );
    }
  }
}

for (const filePath of skillFiles) {
  const markdown = fs.readFileSync(path.join(root, filePath), 'utf8');

  try {
    validateSkillMetadata(filePath, parseFrontMatter(markdown, filePath), errors);
  } catch (error) {
    errors.push(error.message);
  }
}

for (const [field, label] of [
  ['id', 'id'],
  ['alias', 'alias'],
  ['slug', 'slug'],
]) {
  const values = new Map();

  for (const object of registryObjects) {
    const value = object[field];
    if (values.has(value)) {
      errors.push(
        `registry/objects.json: duplicate ${label} ${value}; first seen in ${values.get(value)}`,
      );
    } else {
      values.set(value, object.id);
    }
  }
}

for (const object of registryObjects) {
  if (!registryBackedObjectTypes.has(object.object_type)) {
    continue;
  }

  const filePath = ids.get(object.id);
  if (!filePath) {
    errors.push(`registry/objects.json: ${object.id} has no matching knowledge file`);
  } else if (filePath !== object.path) {
    errors.push(
      `registry/objects.json: ${object.id} path is ${object.path}, expected ${filePath}`,
    );
  }
}

for (const [id, { filePath, metadata }] of metadataById) {
  if (!registryBackedObjectTypes.has(metadata.object_type) || !['validated', 'canonical'].includes(metadata.maturity)) {
    continue;
  }

  const hasValidationRelationship = registryRelationships.some(
    (relationship) => relationship.type === 'validates' && (relationship.source === id || relationship.target === id),
  );
  if (!hasValidationRelationship) {
    errors.push(`${filePath}: ${metadata.maturity} maturity requires a validates relationship`);
  }
}

for (const relationship of registryRelationships) {
  if (!allowedRelationshipTypes.has(relationship.type)) {
    errors.push(`registry/relationships.json: unsupported relationship type ${relationship.type}`);
  }

  if (!registryIds.has(relationship.source)) {
    errors.push(`registry/relationships.json: source ${relationship.source} is not in registry`);
  }

  if (!registryIds.has(relationship.target)) {
    errors.push(`registry/relationships.json: target ${relationship.target} is not in registry`);
  }

  if (!frontMatterRelationshipKeys.has(relationshipKey(relationship))) {
    errors.push(
      `registry/relationships.json: ${relationship.type} ${relationship.source} -> ${relationship.target} is missing from front matter`,
    );
  }
}

for (const relationshipKeyFromFrontMatter of frontMatterRelationshipKeys) {
  if (!registryRelationships.some((relationship) => relationshipKey(relationship) === relationshipKeyFromFrontMatter)) {
    errors.push(
      `knowledge front matter: ${relationshipKeyFromFrontMatter} is missing from registry/relationships.json`,
    );
  }
}

const generatedFiles = generateIndexFiles(root);
for (const [filePath, expectedContent] of Object.entries(generatedFiles)) {
  const fullPath = path.join(root, filePath);

  if (!fs.existsSync(fullPath)) {
    errors.push(`${filePath}: generated index is missing; run npm run generate:indexes`);
    continue;
  }

  const actualContent = fs.readFileSync(fullPath, 'utf8');
  if (actualContent !== expectedContent) {
    errors.push(`${filePath}: generated index is out of sync; run npm run generate:indexes`);
  }
}

if (errors.length > 0) {
  console.error(`Knowledge validation failed with ${errors.length} error(s):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

const ruleCount = files.filter((file) => file.startsWith('rules/')).length;
const patternCount = files.filter((file) => file.startsWith('patterns/')).length;
const researchCount = files.filter((file) => file.startsWith('research/')).length;
const promptCount = files.filter((file) => file.startsWith('prompts/')).length;
const checklistCount = files.filter((file) => file.startsWith('checklists/')).length;
const reviewCount = files.filter((file) => file.startsWith('reviews/')).length;
const referenceProjectCount = files.filter((file) => file.startsWith('examples/')).length;
const observationCount = files.filter((file) => file.startsWith('observations/')).length;

console.log(
  `Knowledge validation passed: ${observationCount} observations, ${researchCount} research, ${ruleCount} rules, ${patternCount} patterns, ${promptCount} prompts, ${checklistCount} checklists, ${reviewCount} reviews, ${referenceProjectCount} reference projects, ${skillFiles.length} skills.`,
);
