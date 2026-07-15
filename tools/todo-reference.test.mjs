import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('renders task data as text instead of HTML', async () => {
  const app = await readFile(path.join(projectRoot, 'examples/todo-reference/app.js'), 'utf8');

  assert.doesNotMatch(app, /\.innerHTML\s*=/);
  assert.match(app, /title\.textContent = task\.title/);
  assert.match(app, /meta\.textContent = task\.detail/);
});
