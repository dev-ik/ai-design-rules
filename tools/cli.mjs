#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runContext } from './context.mjs';
import { initProject } from './init.mjs';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const usage = `AI Design Context

Usage:
  ai-design-context init
  ai-design-context context --task <query> [--platform mobile] [--intent implement] [--format json]
  ai-design-context context --review <object-id-or-phrase> [--intent qa]
  ai-design-context context --object <object-id-or-slug>
  ai-design-context --version

init appends agent instructions and creates only missing starter-kit templates.
context reads the knowledge graph shipped with this installed package.
Requires Node.js 20 or later. See context --help for all retrieval options.`;

const [command, ...args] = process.argv.slice(2);
try {
  if (!command || (['--help', '-h'].includes(command) && args.length === 0)) {
    console.log(usage);
  } else if (command === '--version' && args.length === 0) {
    const { version } = JSON.parse(fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8'));
    console.log(version);
  } else if (command === 'context') {
    runContext(args, { root: packageRoot, readingPaths: true, command: 'ai-design-context context' });
  } else if (command === 'init') {
    if (args.length === 1 && ['--help', '-h'].includes(args[0])) {
      console.log('Usage: ai-design-context init\nAppend agent instructions and create only missing product templates in the current directory.');
    } else {
      if (args.length > 0) throw new Error(`Unknown init argument: ${args[0]}`);
      const result = initProject(process.cwd(), packageRoot);
      console.log(result.instructionsAdded ? 'Added AI Design Context instructions to AGENTS.md.' : 'AI Design Context instructions already present; preserved the existing block.');
      console.log(result.created.length ? `Created: ${result.created.join(', ')}` : 'No missing templates; existing files preserved.');
    }
  } else {
    throw new Error(`Unknown command or argument: ${command}\n${usage}`);
  }
} catch (error) {
  console.error(`AI Design Context: ${error.message}`);
  process.exitCode = 1;
}
