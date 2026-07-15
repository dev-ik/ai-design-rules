import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function runContext(...args) {
  return spawnSync(process.execPath, ['tools/context.mjs', ...args], {
    cwd: projectRoot,
    encoding: 'utf8',
  });
}

test('resolves a task into patterns, rules, and upstream research', () => {
  const result = runContext('--task', 'quick-capture', '--platform', 'mobile', '--format', 'json');

  assert.equal(result.status, 0, result.stderr);
  const context = JSON.parse(result.stdout);
  assert.equal(context.query.intent, 'implement');
  assert.ok(context.objects.some((object) => object.id === 'PAT-00002'));
  assert.ok(context.objects.some((object) => object.id === 'RULE-00002'));
  assert.ok(context.objects.some((object) => object.type === 'research'));
  assert.ok(context.objects.some((object) => object.id === 'CHECK-00001'));
});

test('resolves a runnable fixture path into its reference project and review', () => {
  const result = runContext('--review', 'examples/todo-reference', '--format', 'json');

  assert.equal(result.status, 0, result.stderr);
  const context = JSON.parse(result.stdout);
  assert.equal(context.query.intent, 'qa');
  assert.ok(context.anchors.some((object) => object.id === 'REF-00001'));
  assert.ok(context.objects.some((object) => object.id === 'REVIEW-00001'));
  assert.ok(context.objects.some((object) => object.id === 'CHECK-00001'));
});

test('fails with a machine-readable error when no object matches', () => {
  const result = runContext('--task', 'qzxvzz-notfound', '--format', 'json');

  assert.equal(result.status, 1);
  assert.deepEqual(JSON.parse(result.stderr), { error: 'No graph object matches "qzxvzz-notfound"' });
});
