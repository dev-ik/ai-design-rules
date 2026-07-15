import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function withFixture(mutate = async () => {}) {
  const fixtureRoot = await mkdtemp(path.join(os.tmpdir(), 'ai-design-rules-designlint-'));
  await cp(projectRoot, fixtureRoot, {
    recursive: true,
    filter: (source) => path.basename(source) !== '.git',
  });

  try {
    await mutate(fixtureRoot);
    return spawnSync(process.execPath, ['tools/designlint.mjs'], { cwd: fixtureRoot, encoding: 'utf8' });
  } finally {
    await rm(fixtureRoot, { force: true, recursive: true });
  }
}

test('accepts the current evidence chain', async () => {
  const result = await withFixture();

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /DesignLint v0 passed/);
});

test('rejects a rule without upstream research', async () => {
  const result = await withFixture(async (root) => {
    const filePath = path.join(root, 'registry/relationships.json');
    const registry = JSON.parse(await readFile(filePath, 'utf8'));
    registry.relationships = registry.relationships.filter(
      (relationship) => !(relationship.source === 'RULE-00001' && relationship.type === 'derived_from'),
    );
    await writeFile(filePath, `${JSON.stringify(registry, null, 2)}\n`);
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /RULE-00001: rules must derive from or be inspired by registered research/);
});

test('rejects a reference project without a benchmark prompt', async () => {
  const result = await withFixture(async (root) => {
    const filePath = path.join(root, 'registry/relationships.json');
    const registry = JSON.parse(await readFile(filePath, 'utf8'));
    registry.relationships = registry.relationships.filter(
      (relationship) => !(relationship.source === 'REF-00001' && relationship.type === 'implements'),
    );
    await writeFile(filePath, `${JSON.stringify(registry, null, 2)}\n`);
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /REF-00001: reference projects must implement a registered prompt/);
});
