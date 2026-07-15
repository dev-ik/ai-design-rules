import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cp, mkdtemp, rm, unlink } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function withFixture(mutate = async () => {}) {
  const fixtureRoot = await mkdtemp(path.join(os.tmpdir(), 'ai-design-rules-benchmark-'));
  await cp(projectRoot, fixtureRoot, {
    recursive: true,
    filter: (source) => path.basename(source) !== '.git',
  });

  try {
    await mutate(fixtureRoot);
    return spawnSync(process.execPath, ['tools/validate-benchmark-evidence.mjs'], {
      cwd: fixtureRoot,
      encoding: 'utf8',
    });
  } finally {
    await rm(fixtureRoot, { force: true, recursive: true });
  }
}

test('accepts the current directional benchmark run without overstating its evidence', async () => {
  const result = await withFixture();

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /1 run\(s\), 0 rendered, 1 directional/);
  assert.match(result.stderr, /directional evidence only/);
});

test('rejects a benchmark run missing a required raw prompt artifact', async () => {
  const result = await withFixture(async (root) => {
    await unlink(path.join(root, 'evidence/todo/2026-06-25-codex-gpt-5/baseline/prompt.md'));
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /missing baseline\/prompt\.md/);
});
