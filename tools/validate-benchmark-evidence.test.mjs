import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cp, mkdir, mkdtemp, readFile, rm, unlink, writeFile } from 'node:fs/promises';
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

test('rejects rendered screenshot paths outside their run type directory', async () => {
  const result = await withFixture(async (root) => {
    for (const runType of ['baseline', 'ai-design-rules']) {
      const metadataPath = path.join(
        root,
        `evidence/todo/2026-06-25-codex-gpt-5/${runType}/metadata.json`,
      );
      const metadata = JSON.parse(await readFile(metadataPath, 'utf8'));
      metadata.evidence_level = 'rendered';
      metadata.screenshots = ['../../README.md'];
      await writeFile(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`);
    }
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /must stay inside baseline\//);
  assert.match(result.stderr, /must stay inside ai-design-rules\//);
});

test('rejects benchmark metadata without evaluator identity', async () => {
  const result = await withFixture(async (root) => {
    const metadataPath = path.join(
      root,
      'evidence/todo/2026-06-25-codex-gpt-5/baseline/metadata.json',
    );
    const metadata = JSON.parse(await readFile(metadataPath, 'utf8'));
    delete metadata.evaluator;
    await writeFile(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`);
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /missing required field evaluator/);
});

test('rejects files with an image extension but invalid image data', async () => {
  const result = await withFixture(async (root) => {
    for (const runType of ['baseline', 'ai-design-rules']) {
      const runPath = path.join(root, 'evidence/todo/2026-06-25-codex-gpt-5');
      const screenshotPath = path.join(runPath, runType, 'screenshots/fake.png');
      await mkdir(path.dirname(screenshotPath), { recursive: true });
      await writeFile(screenshotPath, 'not an image');

      const metadataPath = path.join(runPath, runType, 'metadata.json');
      const metadata = JSON.parse(await readFile(metadataPath, 'utf8'));
      metadata.evidence_level = 'rendered';
      metadata.screenshots = [`${runType}/screenshots/fake.png`];
      await writeFile(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`);
    }
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /has invalid image data/);
});
