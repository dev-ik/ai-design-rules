import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cli = path.join(root, 'tools/cli.mjs');

function project(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'ai-design-context-cli-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return directory;
}

function run(cwd, ...args) {
  return spawnSync(process.execPath, [cli, ...args], { cwd, encoding: 'utf8', timeout: 10000 });
}

test('context reads the packaged graph rather than the consumer registry', (t) => {
  const cwd = project(t);
  fs.mkdirSync(path.join(cwd, 'registry'));
  fs.writeFileSync(path.join(cwd, 'registry/objects.json'), '{"objects":[]}');
  const result = run(cwd, 'context', '--task', 'quick-capture', '--platform', 'mobile', '--format', 'json');
  assert.equal(result.status, 0, result.stderr);
  const context = JSON.parse(result.stdout);
  assert.equal(context.anchors[0].id, 'PAT-00002');
  assert.equal(context.query.intent, 'implement');
  assert.equal(context.knowledgeRoot, root);
  assert.ok(context.objects.some((object) => object.type === 'research'));
  for (const object of [...context.anchors, ...context.objects]) {
    assert.ok(!path.isAbsolute(object.path), 'graph paths remain relative');
    assert.equal(object.absolutePath, path.join(root, object.path));
    assert.ok(fs.statSync(object.absolutePath).isFile());
  }
});

test('Markdown gives reading paths usable from the consumer project', (t) => {
  const result = run(project(t), 'context', '--object', 'PAT-00002');
  assert.equal(result.status, 0, result.stderr);
  assert.ok(result.stdout.includes(path.join(root, 'patterns/quick-capture.md')));
});

test('init preserves existing product files and appends instructions only once', (t) => {
  const cwd = project(t);
  const existing = '# Project instructions\r\n\r\nUse the existing stack.\r\n';
  fs.writeFileSync(path.join(cwd, 'AGENTS.md'), existing);
  fs.mkdirSync(path.join(cwd, 'docs'));
  fs.writeFileSync(path.join(cwd, 'docs/PRD.md'), 'Real product context\n');
  fs.writeFileSync(path.join(cwd, 'package.json'), '{"private":true}\n');
  const first = run(cwd, 'init');
  assert.equal(first.status, 0, first.stderr);
  const agents = fs.readFileSync(path.join(cwd, 'AGENTS.md'), 'utf8');
  assert.ok(agents.startsWith(existing));
  assert.ok(agents.includes('ai-design-context context --task'));
  assert.equal(fs.readFileSync(path.join(cwd, 'docs/PRD.md'), 'utf8'), 'Real product context\n');
  assert.equal(fs.readFileSync(path.join(cwd, 'package.json'), 'utf8'), '{"private":true}\n');
  for (const file of ['docs/PERSONAS.md', 'docs/USER_FLOWS.md', 'docs/INFORMATION_ARCHITECTURE.md', 'docs/DESIGN_DECISIONS.md', 'templates/FEATURE_TEMPLATE.md', 'templates/TASK_TEMPLATE.md', 'reviews/DESIGN_REVIEW.md', 'benchmarks/BENCHMARK_CHECKLIST.md']) {
    assert.ok(fs.statSync(path.join(cwd, file)).isFile(), file);
  }
  fs.appendFileSync(path.join(cwd, 'docs/PERSONAS.md'), '\nCustom persona.\n');
  const files = fs.readdirSync(cwd, { recursive: true }).filter((file) => fs.statSync(path.join(cwd, file)).isFile());
  const before = files.map((file) => [file, fs.readFileSync(path.join(cwd, file), 'utf8')]);
  const second = run(cwd, 'init');
  assert.equal(second.status, 0, second.stderr);
  for (const [file, content] of before) assert.equal(fs.readFileSync(path.join(cwd, file), 'utf8'), content);
});

test('init creates instructions in an empty project', (t) => {
  const cwd = project(t);
  const result = run(cwd, 'init');
  assert.equal(result.status, 0, result.stderr);
  const agents = fs.readFileSync(path.join(cwd, 'AGENTS.md'), 'utf8');
  assert.ok(agents.includes('--intent implement'));
  assert.ok(agents.includes('--intent qa'));
  assert.ok(agents.includes('absolutePath'));
});

test('skills lists bundled workflows and shows their source with usable paths', (t) => {
  const cwd = project(t);
  const listed = run(cwd, 'skills', 'list', '--format', 'json');
  assert.equal(listed.status, 0, listed.stderr);
  const catalog = JSON.parse(listed.stdout);
  for (const name of ['design-understand', 'visual-qa', 'responsive-check', 'accessibility-check', 'product-designer']) {
    assert.ok(catalog.skills.some((skill) => skill.name === name), name);
  }
  const shown = run(cwd, 'skills', 'show', 'visual-qa', '--format', 'json');
  assert.equal(shown.status, 0, shown.stderr);
  const skill = JSON.parse(shown.stdout);
  assert.equal(skill.name, 'visual-qa');
  assert.equal(skill.knowledgeRoot, root);
  assert.equal(skill.content, fs.readFileSync(path.join(root, 'skills/visual-qa/SKILL.md'), 'utf8'));
  assert.equal(skill.absolutePath, path.join(root, 'skills/visual-qa/SKILL.md'));
  assert.equal(run(cwd, 'skills', 'show', '../../AGENTS.md').status, 1);
  assert.equal(run(cwd, 'skills', 'list', '--force').status, 1);
  assert.deepEqual(fs.readdirSync(cwd), []);
});

test('init installs discoverable namespaced skill launchers and preserves local skills', (t) => {
  const cwd = project(t);
  const custom = path.join(cwd, '.agents/skills/ai-design-context-visual-qa');
  fs.mkdirSync(custom, { recursive: true });
  fs.writeFileSync(path.join(custom, 'SKILL.md'), '# My custom QA workflow\n');
  const existingAgents = '# Project\n<!-- ai-design-context:start -->\nExisting context instructions.\n<!-- ai-design-context:end -->\n';
  fs.writeFileSync(path.join(cwd, 'AGENTS.md'), existingAgents);
  const result = run(cwd, 'init');
  assert.equal(result.status, 0, result.stderr);
  assert.equal(fs.readFileSync(path.join(custom, 'SKILL.md'), 'utf8'), '# My custom QA workflow\n');
  for (const name of ['product-designer', 'design-understand', 'responsive-check', 'accessibility-check']) {
    const launcher = fs.readFileSync(path.join(cwd, `.agents/skills/ai-design-context-${name}/SKILL.md`), 'utf8');
    assert.ok(launcher.includes(`name: ai-design-context-${name}`));
    assert.ok(launcher.includes(`ai-design-context skills show ${name}`));
  }
  const agents = fs.readFileSync(path.join(cwd, 'AGENTS.md'), 'utf8');
  assert.ok(agents.startsWith(existingAgents));
  assert.ok(agents.includes('<!-- ai-design-context:skills:start -->'));
  assert.ok(agents.includes('ai-design-context-visual-qa'));
  assert.equal(run(cwd, 'init').status, 0);
  assert.equal(fs.readFileSync(path.join(cwd, 'AGENTS.md'), 'utf8'), agents);
});

test('init validates skill symlinks and routing markers before creating any files', (t) => {
  const cwd = project(t);
  const outside = project(t);
  fs.mkdirSync(path.join(cwd, '.agents'));
  fs.symlinkSync(outside, path.join(cwd, '.agents/skills'));
  const symlinked = run(cwd, 'init');
  assert.equal(symlinked.status, 1);
  assert.match(symlinked.stderr, /symlink/i);
  assert.ok(!fs.existsSync(path.join(cwd, 'AGENTS.md')));
  assert.ok(!fs.existsSync(path.join(cwd, 'docs')));
  assert.deepEqual(fs.readdirSync(outside), []);
  fs.unlinkSync(path.join(cwd, '.agents/skills'));
  fs.writeFileSync(path.join(cwd, 'AGENTS.md'), '<!-- ai-design-context:skills:start -->\n');
  const malformed = run(cwd, 'init');
  assert.equal(malformed.status, 1);
  assert.match(malformed.stderr, /marker/i);
  assert.ok(!fs.existsSync(path.join(cwd, 'docs')));
});

test('init rejects malformed markers before creating templates', (t) => {
  const cwd = project(t);
  const existing = '# Local\n<!-- ai-design-context:start -->\nUnfinished block\n';
  fs.writeFileSync(path.join(cwd, 'AGENTS.md'), existing);
  const result = run(cwd, 'init');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /marker/i);
  assert.equal(fs.readFileSync(path.join(cwd, 'AGENTS.md'), 'utf8'), existing);
  assert.deepEqual(fs.readdirSync(cwd), ['AGENTS.md']);
});

test('init rejects symlinked instruction files and template directories before writing', (t) => {
  for (const target of ['AGENTS.md', 'docs']) {
    const cwd = project(t);
    const outside = project(t);
    const original = path.join(outside, 'instructions.md');
    fs.writeFileSync(original, 'Outside instructions\n');
    fs.symlinkSync(target === 'docs' ? outside : original, path.join(cwd, target));
    const result = run(cwd, 'init');
    assert.equal(result.status, 1);
    assert.match(result.stderr, /symlink/i);
    assert.deepEqual(fs.readdirSync(cwd), [target]);
    assert.deepEqual(fs.readdirSync(outside), ['instructions.md']);
    assert.equal(fs.readFileSync(original, 'utf8'), 'Outside instructions\n');
  }
});

test('init preserves a customized marked instruction block', (t) => {
  const cwd = project(t);
  const original = '# Project\n<!-- ai-design-context:start -->\nMy reviewed integration instructions.\n<!-- ai-design-context:end -->\n';
  fs.writeFileSync(path.join(cwd, 'AGENTS.md'), original);
  const result = run(cwd, 'init');
  assert.equal(result.status, 0, result.stderr);
  const updated = fs.readFileSync(path.join(cwd, 'AGENTS.md'), 'utf8');
  assert.ok(updated.startsWith(original), 'custom instructions remain byte-for-byte intact before the added routing section');
  assert.equal(run(cwd, 'init').status, 0);
  assert.equal(fs.readFileSync(path.join(cwd, 'AGENTS.md'), 'utf8'), updated);
  assert.ok(fs.statSync(path.join(cwd, 'docs/PRD.md')).isFile());
});

test('init rejects incompatible template destinations before changing instructions', (t) => {
  for (const target of ['docs', 'docs/DESIGN_DECISIONS.md']) {
    const cwd = project(t);
    fs.writeFileSync(path.join(cwd, 'AGENTS.md'), '# Preserve me\n');
    if (target.includes('/')) {
      fs.mkdirSync(path.join(cwd, target), { recursive: true });
    } else {
      fs.writeFileSync(path.join(cwd, target), 'A file in place of the docs directory\n');
    }
    const result = run(cwd, 'init');
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Expected a (directory|regular file)/);
    assert.equal(fs.readFileSync(path.join(cwd, 'AGENTS.md'), 'utf8'), '# Preserve me\n');
    assert.ok(!fs.existsSync(path.join(cwd, 'templates')));
    if (target.includes('/')) assert.deepEqual(fs.readdirSync(path.join(cwd, 'docs')), ['DESIGN_DECISIONS.md']);
  }
});

test('help and invalid commands do not modify the project', (t) => {
  const cwd = project(t);
  for (const args of [['--help'], ['init', '--help'], ['context', '--help']]) {
    const result = run(cwd, ...args);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /ai-design-context/);
  }
  for (const args of [['unknown'], ['init', '--force'], ['init', 'extra']]) {
    assert.equal(run(cwd, ...args).status, 1);
  }
  assert.deepEqual(fs.readdirSync(cwd), []);
});

test('packaged context retains machine-readable no-match errors', (t) => {
  const result = run(project(t), 'context', '--task', 'qzxvzz-notfound', '--format', 'json');
  assert.equal(result.status, 1);
  assert.deepEqual(JSON.parse(result.stderr), { error: 'No graph object matches "qzxvzz-notfound"' });
  assert.equal(result.stdout, '');
});
