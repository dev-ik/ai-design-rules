import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function runContext(...args) {
  return runContextAt(projectRoot, ...args);
}

function runContextAt(cwd, ...args) {
  return spawnSync(process.execPath, [path.join(projectRoot, 'tools/context.mjs'), ...args], {
    cwd,
    encoding: 'utf8',
    timeout: 10000,
  });
}

function fixture(t, definitions, relationships = []) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'design-context-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  fs.mkdirSync(path.join(directory, 'registry'));
  const objects = definitions.map(({ content = '', ...definition }) => {
    const object = { status: 'draft', maturity: 'seed', category: 'ux', slug: definition.title.toLowerCase().replaceAll(' ', '-'), ...definition, path: `${definition.id}.md` };
    fs.writeFileSync(path.join(directory, object.path), content);
    return object;
  });
  fs.writeFileSync(path.join(directory, 'registry/objects.json'), JSON.stringify({ objects }));
  fs.writeFileSync(path.join(directory, 'registry/relationships.json'), JSON.stringify({ relationships }));
  return directory;
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

test('resolves research-led visual tasks into downstream rules and review gates', () => {
  const result = runContext('--task', 'modern UI visual quality', '--format', 'json');

  assert.equal(result.status, 0, result.stderr);
  const context = JSON.parse(result.stdout);
  assert.ok(context.anchors.some((object) => object.id === 'RESEARCH-00009'));
  assert.ok(context.objects.some((object) => object.id === 'RULE-00014'));
  assert.ok(context.objects.some((object) => object.id === 'PROMPT-00002'));
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

test('does not turn a non-ASCII unmatched query into an empty wildcard', () => {
  const result = runContext('--task', 'быстрый захват', '--format', 'json');

  assert.equal(result.status, 1);
  assert.deepEqual(JSON.parse(result.stderr), { error: 'No graph object matches "быстрый захват"' });
});

test('object mode resolves only exact stable fields', () => {
  const exact = runContext('--object', 'PAT-00002', '--format', 'json');
  const fuzzy = runContext('--object', 'pattern', '--format', 'json');

  assert.equal(exact.status, 0, exact.stderr);
  assert.equal(JSON.parse(exact.stdout).anchors[0].id, 'PAT-00002');
  assert.equal(fuzzy.status, 1);
  assert.deepEqual(JSON.parse(fuzzy.stderr), { error: 'No graph object matches "pattern"' });
});

test('resolves ordinary task phrasing without dropping unknown subject terms', () => {
  const direct = runContext('--task', 'shopping list', '--format', 'json');
  assert.equal(direct.status, 0, direct.stderr);
  const expected = JSON.parse(direct.stdout);
  assert.ok(expected.objects.some((object) => object.id === 'PAT-00002'), 'shopping lists include quick capture');
  for (const query of ['shopping list', 'build a shopping list', 'please create the shopping list for me']) {
    const result = runContext('--task', query, '--format', 'json');
    assert.equal(result.status, 0, result.stderr);
    const context = JSON.parse(result.stdout);
    assert.deepEqual(context.anchors, expected.anchors);
    assert.deepEqual(context.objects, expected.objects);
  }
  for (const query of ['please build', 'shopping qzxvzz-notfound']) {
    const result = runContext('--task', query, '--format', 'json');
    assert.equal(result.status, 1);
    assert.match(JSON.parse(result.stderr).error, /No graph object matches/);
  }
});

test('ranks a focused motion title above incidental checklist mentions', () => {
  const result = runContext('--task', 'motion', '--format', 'json');
  assert.equal(result.status, 0, result.stderr);
  const context = JSON.parse(result.stdout);
  assert.equal(context.anchors[0].id, 'RESEARCH-00010');
  assert.equal(context.anchors[0].reason.field, 'title');
  assert.ok(context.objects.some((object) => object.id === 'RULE-00015'));
  assert.ok(context.objects.some((object) => object.id === 'CHECK-00001'));
  assert.ok(context.objects.length <= 10, 'motion context must stay focused');
});

test('quick capture excludes unrelated consumers and explains every selection', () => {
  const result = runContext('--task', 'quick-capture', '--format', 'json');
  assert.equal(result.status, 0, result.stderr);
  const context = JSON.parse(result.stdout);
  const ids = new Set(context.objects.map((object) => object.id));
  assert.ok(ids.has('PROMPT-00004'), 'include the directly applicable review');
  assert.ok(!ids.has('PROMPT-00003'), 'do not pull in the entire Todo benchmark');
  assert.ok(!ids.has('PAT-00007'), 'shared rules do not imply consequential actions');
  assert.ok(context.objects.length <= 20);
  for (const object of context.objects) {
    assert.ok(object.reason.kind);
    if (object.reason.source) assert.ok(ids.has(object.reason.source));
  }
  const markdown = runContext('--task', 'quick-capture');
  assert.equal(markdown.status, 0, markdown.stderr);
  assert.match(markdown.stdout, /matched slug: quick, capture/);
  assert.match(markdown.stdout, /PAT-00002 requires this object/);
});

test('every registered anchor includes all transitive dependencies', () => {
  const { objects } = JSON.parse(fs.readFileSync(path.join(projectRoot, 'registry/objects.json'), 'utf8'));
  const { relationships } = JSON.parse(fs.readFileSync(path.join(projectRoot, 'registry/relationships.json'), 'utf8'));
  for (const anchor of objects) {
    const result = runContext('--object', anchor.id, '--platform', 'mobile', '--format', 'json');
    assert.equal(result.status, 0, result.stderr);
    const context = JSON.parse(result.stdout);
    const ids = new Set(context.objects.map((object) => object.id));
    for (const edge of relationships) {
      if (ids.has(edge.source) && ['requires', 'derived_from', 'inspired_by', 'implements', 'validates'].includes(edge.type)) {
        assert.ok(ids.has(edge.target), `${anchor.id}: missing ${edge.source} ${edge.type} ${edge.target}`);
      }
    }
  }
});

test('dependency cycles terminate and optional relations do not expand recursively', (t) => {
  const directory = fixture(t, [
    { id: 'PAT-00001', object_type: 'pattern', title: 'Capture' },
    { id: 'RULE-00001', object_type: 'rule', title: 'Input' },
    { id: 'RESEARCH-00001', object_type: 'research', title: 'Evidence' },
    { id: 'PAT-00002', object_type: 'pattern', title: 'Unrelated' },
  ], [
    { source: 'PAT-00001', type: 'requires', target: 'RULE-00001' },
    { source: 'RULE-00001', type: 'derived_from', target: 'RESEARCH-00001' },
    { source: 'RESEARCH-00001', type: 'requires', target: 'PAT-00001' },
    { source: 'RULE-00001', type: 'related_to', target: 'PAT-00002' },
    { source: 'PAT-00002', type: 'requires', target: 'RULE-00001' },
  ]);
  const result = runContextAt(directory, '--object', 'PAT-00001', '--format', 'json');
  assert.equal(result.status, 0, result.stderr);
  const ids = JSON.parse(result.stdout).objects.map((object) => object.id);
  assert.deepEqual(new Set(ids), new Set(['PAT-00001', 'RULE-00001', 'RESEARCH-00001']));
  assert.equal(ids.length, 3);
});

test('platform selection filters eligible types before ranking and includes their dependencies', (t) => {
  const directory = fixture(t, [
    { id: 'RESEARCH-00001', object_type: 'research', title: 'Mobile' },
    { id: 'PAT-00001', object_type: 'pattern', title: 'Capture' },
    { id: 'PAT-00002', object_type: 'pattern', title: 'Mobile Action' },
    { id: 'RULE-00001', object_type: 'rule', title: 'Touch Targets' },
    { id: 'RESEARCH-00002', object_type: 'research', title: 'Touch Evidence' },
  ], [
    { source: 'PAT-00002', type: 'requires', target: 'RULE-00001' },
    { source: 'RULE-00001', type: 'derived_from', target: 'RESEARCH-00002' },
  ]);
  const result = runContextAt(directory, '--object', 'PAT-00001', '--platform', 'mobile', '--format', 'json');
  assert.equal(result.status, 0, result.stderr);
  const context = JSON.parse(result.stdout);
  assert.equal(context.anchors[0].id, 'PAT-00001');
  assert.equal(context.objects.find((object) => object.id === 'PAT-00002').reason.kind, 'platform');
  assert.ok(context.objects.some((object) => object.id === 'RESEARCH-00002'));
  assert.ok(!context.objects.some((object) => object.id === 'RESEARCH-00001'));
});

test('matches whole Unicode words and prefers an exact identifier over a title', (t) => {
  const directory = fixture(t, [
    { id: 'PAT-00001', alias: 'SPECIAL', object_type: 'pattern', title: 'Capture', content: 'Start capturing' },
    { id: 'PAT-00002', object_type: 'pattern', title: 'Special' },
    { id: 'PAT-00003', object_type: 'pattern', title: 'Быстрый ввод' },
  ]);
  const exact = runContextAt(directory, '--task', 'SPECIAL', '--format', 'json');
  assert.equal(exact.status, 0, exact.stderr);
  assert.equal(JSON.parse(exact.stdout).anchors[0].id, 'PAT-00001');
  const unicode = runContextAt(directory, '--task', 'БЫСТРЫЙ ввод', '--format', 'json');
  assert.equal(unicode.status, 0, unicode.stderr);
  assert.equal(JSON.parse(unicode.stdout).anchors[0].id, 'PAT-00003');
  const partial = runContextAt(directory, '--task', 'art', '--format', 'json');
  assert.equal(partial.status, 1, 'art must not match Start');
});

test('reports a missing required target instead of returning incomplete context', (t) => {
  const directory = fixture(t, [{ id: 'PAT-00001', object_type: 'pattern', title: 'Capture' }], [
    { source: 'PAT-00001', type: 'requires', target: 'RULE-99999' },
  ]);
  const result = runContextAt(directory, '--object', 'PAT-00001', '--format', 'json');
  assert.equal(result.status, 1);
  assert.deepEqual(JSON.parse(result.stderr), { error: 'Context relationship target is not registered: RULE-99999' });
});
