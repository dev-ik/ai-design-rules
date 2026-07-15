import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile, cp } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function withFixture(mutate = async () => {}) {
  const fixtureRoot = await mkdtemp(path.join(os.tmpdir(), 'ai-design-rules-validator-'));

  await cp(projectRoot, fixtureRoot, {
    recursive: true,
    filter: (source) => path.basename(source) !== '.git',
  });

  try {
    await mutate(fixtureRoot);

    return spawnSync(process.execPath, ['tools/validate-knowledge.mjs'], {
      cwd: fixtureRoot,
      encoding: 'utf8',
    });
  } finally {
    await rm(fixtureRoot, { force: true, recursive: true });
  }
}

async function readJson(root, filePath) {
  return JSON.parse(await readFile(path.join(root, filePath), 'utf8'));
}

async function writeJson(root, filePath, value) {
  await writeFile(path.join(root, filePath), `${JSON.stringify(value, null, 2)}\n`);
}

test('accepts the repository fixture, including observations and skills', async () => {
  const result = await withFixture();

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Knowledge validation passed:/);
  assert.match(result.stdout, /\d+ observations/);
  assert.match(result.stdout, /\d+ skills/);
});

test('rejects a registry object whose path has no matching knowledge file', async () => {
  const result = await withFixture(async (root) => {
    const registry = await readJson(root, 'registry/objects.json');
    registry.objects[0].path = 'research/products/missing.md';
    await writeJson(root, 'registry/objects.json', registry);
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /registry\/objects\.json: RESEARCH-00001 path is research\/products\/missing\.md/);
});

test('rejects a registry relationship that disagrees with object front matter', async () => {
  const result = await withFixture(async (root) => {
    const relationships = await readJson(root, 'registry/relationships.json');
    const relationship = relationships.relationships.find(
      (item) => item.source === 'PROMPT-00002' && item.target === 'PAT-00001',
    );
    relationship.type = 'requires';
    await writeJson(root, 'registry/relationships.json', relationships);
  });

  assert.equal(result.status, 1);
  assert.match(
    result.stderr,
    /registry\/relationships\.json: requires PROMPT-00002 -> PAT-00001 is missing from front matter/,
  );
});

test('rejects an unregistered migrated checklist', async () => {
  const result = await withFixture(async (root) => {
    const registry = await readJson(root, 'registry/objects.json');
    registry.objects = registry.objects.filter((item) => item.id !== 'CHECK-00001');
    await writeJson(root, 'registry/objects.json', registry);
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /checklists\/DESIGN_QA\.md: missing registry object/);
});

test('rejects reviewed knowledge without a review date', async () => {
  const result = await withFixture(async (root) => {
    const filePath = path.join(root, 'patterns/quick-capture.md');
    const pattern = await readFile(filePath, 'utf8');
    await writeFile(filePath, pattern.replace('maturity: seed', 'maturity: reviewed'));
  });

  assert.equal(result.status, 1);
  assert.match(
    result.stderr,
    /patterns\/quick-capture\.md: reviewed maturity requires last_reviewed_at in YYYY-MM-DD format/,
  );
});

test('rejects duplicate keys in raw registry JSON', async () => {
  const result = await withFixture(async (root) => {
    const filePath = path.join(root, 'registry/relationships.json');
    const relationships = await readFile(filePath, 'utf8');
    const duplicateKey = '"source": "RULE-00001",';
    await writeFile(
      filePath,
      relationships.replace(duplicateKey, `${duplicateKey}\n      ${duplicateKey}`),
    );
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /registry\/relationships\.json: duplicate JSON key source/);
});

test('rejects a skill without Codex front matter', async () => {
  const result = await withFixture(async (root) => {
    const skillPath = path.join(root, 'skills/product-designer/SKILL.md');
    const skill = await readFile(skillPath, 'utf8');
    await writeFile(skillPath, skill.replace(/^---\n[\s\S]*?\n---\n\n/, ''));
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /skills\/product-designer\/SKILL\.md: missing YAML front matter/);
});
