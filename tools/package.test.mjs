import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('a packed package installs offline and supports context, init, and graph validation', { timeout: 60000 }, (t) => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'ai-design-context-package-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const cache = path.join(directory, 'cache');
  const npm = (cwd, ...args) => spawnSync('npm', [...args, '--cache', cache], { cwd, encoding: 'utf8', timeout: 30000 });
  // Skip prepack here because the release hook itself runs this test suite.
  const packed = npm(root, 'pack', '--json', '--ignore-scripts', '--pack-destination', directory);
  assert.equal(packed.status, 0, packed.stderr);
  const [artifact] = JSON.parse(packed.stdout);
  const files = artifact.files.map((file) => file.path);
  assert.ok(files.includes('tools/cli.mjs'), 'the tarball needs the executable CLI');
  assert.ok(files.includes('observations/accessibility/textual-error-recovery.md'));
  assert.ok(files.includes('evidence/todo/2026-06-25-codex-gpt-5/EVALUATION.md'));
  assert.ok(files.includes('examples/todo-reference/review-evidence/2026-07-15/mobile-error.png'));
  assert.ok(!files.some((file) => file.endsWith('.test.mjs') || file.startsWith('.github/') || file.startsWith('docs/superpowers/') || file.endsWith('.tgz')));

  const consumer = path.join(directory, 'consumer');
  fs.mkdirSync(consumer);
  fs.writeFileSync(path.join(consumer, 'package.json'), '{"name":"consumer-fixture","private":true}\n');
  const installed = npm(consumer, 'install', '--offline', '--ignore-scripts', '--no-audit', '--no-fund', '--save-dev', path.join(directory, artifact.filename));
  assert.equal(installed.status, 0, installed.stderr);
  assert.ok(!fs.existsSync(path.join(consumer, 'AGENTS.md')), 'installation alone must not initialize the project');
  assert.ok(!fs.existsSync(path.join(consumer, 'docs')));
  const dependency = path.join(consumer, 'node_modules/ai-design-context');
  const knowledgeRoot = fs.realpathSync(dependency);
  const manifest = JSON.parse(fs.readFileSync(path.join(dependency, 'package.json'), 'utf8'));
  assert.equal(manifest.repository.url, 'git+https://github.com/dev-ik/ai-design-rules.git');
  assert.ok(!manifest.dependencies || Object.keys(manifest.dependencies).length === 0);
  assert.ok(JSON.parse(fs.readFileSync(path.join(consumer, 'package.json'), 'utf8')).devDependencies['ai-design-context']);

  const cli = path.join(consumer, 'node_modules/.bin/ai-design-context');
  const run = (...args) => spawnSync(cli, args, { cwd: consumer, encoding: 'utf8', timeout: 10000 });
  const version = run('--version');
  assert.equal(version.status, 0, version.stderr);
  assert.equal(version.stdout.trim(), manifest.version);
  for (const args of [['--task', 'quick-capture', '--platform', 'mobile'], ['--review', 'REF-00001']]) {
    const result = run('context', ...args, '--format', 'json');
    assert.equal(result.status, 0, result.stderr);
    const context = JSON.parse(result.stdout);
    assert.equal(context.knowledgeRoot, knowledgeRoot);
    for (const object of context.objects) {
      assert.ok(object.absolutePath.startsWith(knowledgeRoot + path.sep), object.absolutePath);
      assert.ok(fs.statSync(object.absolutePath).isFile());
    }
  }
  const init = run('init');
  assert.equal(init.status, 0, init.stderr);
  assert.ok(fs.readFileSync(path.join(consumer, 'AGENTS.md'), 'utf8').includes('ai-design-context context'));
  const catalogResult = run('skills', 'list', '--format', 'json');
  assert.equal(catalogResult.status, 0, catalogResult.stderr);
  const catalog = JSON.parse(catalogResult.stdout);
  assert.equal(catalog.version, manifest.version);
  assert.equal(catalog.skills.length, 20);
  for (const name of ['design-understand', 'visual-qa', 'responsive-check', 'accessibility-check']) {
    const source = run('skills', 'show', name, '--format', 'json');
    assert.equal(source.status, 0, source.stderr);
    assert.ok(JSON.parse(source.stdout).content.startsWith(`---\nname: ${name}\n`));
    const launcher = fs.readFileSync(path.join(consumer, `.agents/skills/ai-design-context-${name}/SKILL.md`), 'utf8');
    assert.ok(launcher.includes(`name: ai-design-context-${name}`));
    assert.ok(launcher.includes(`skills show ${name}`));
  }
  const agents = fs.readFileSync(path.join(consumer, 'AGENTS.md'), 'utf8');
  assert.equal(run('init').status, 0);
  assert.equal(fs.readFileSync(path.join(consumer, 'AGENTS.md'), 'utf8'), agents);
  const check = npm(dependency, 'run', 'check');
  assert.equal(check.status, 0, check.stderr + check.stdout);
});
