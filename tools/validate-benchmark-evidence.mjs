import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const evidenceRoot = path.join(root, 'evidence');
const requiredMetadataFields = [
  'scenario',
  'run_type',
  'date',
  'model',
  'provider',
  'generation_surface',
  'temperature',
  'tool_access',
  'implementation_target',
  'evidence_level',
  'screenshots',
  'limitation',
];
const requiredArtifacts = ['metadata.json', 'prompt.md', 'generated-output.md', 'notes.md', 'scores.md'];
const rubricCategories = [
  'Product Thinking',
  'UX',
  'Information Architecture',
  'Navigation',
  'Accessibility',
  'Mobile-first',
  'Visual Hierarchy',
  'State Design',
  'Consistency',
  'Performance Awareness',
  'Simplicity',
  'Overall Product Quality',
];
const errors = [];
const warnings = [];
const runs = [];

function listDirectories(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
    .map((entry) => entry.name)
    .sort();
}

function readMetadata(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    errors.push(`${path.relative(root, filePath)}: invalid JSON (${error.message})`);
    return null;
  }
}

function validateArtifacts(runPath, runType) {
  for (const artifact of requiredArtifacts) {
    const artifactPath = path.join(runPath, runType, artifact);
    if (!fs.existsSync(artifactPath)) {
      errors.push(`${path.relative(root, runPath)}: missing ${runType}/${artifact}`);
    }
  }
}

function validateMetadata(runPath, runType) {
  const metadataPath = path.join(runPath, runType, 'metadata.json');
  if (!fs.existsSync(metadataPath)) {
    return null;
  }

  const metadata = readMetadata(metadataPath);
  if (!metadata) {
    return null;
  }

  for (const field of requiredMetadataFields) {
    if (!(field in metadata)) {
      errors.push(`${path.relative(root, metadataPath)}: missing required field ${field}`);
    }
  }

  if (metadata.run_type !== runType) {
    errors.push(`${path.relative(root, metadataPath)}: run_type must be ${runType}`);
  }

  if (!Array.isArray(metadata.tool_access)) {
    errors.push(`${path.relative(root, metadataPath)}: tool_access must be an array`);
  }

  if (!['directional', 'rendered'].includes(metadata.evidence_level)) {
    errors.push(`${path.relative(root, metadataPath)}: evidence_level must be directional or rendered`);
  }

  if (metadata.evidence_level === 'rendered') {
    if (!Array.isArray(metadata.screenshots) || metadata.screenshots.length === 0) {
      errors.push(`${path.relative(root, metadataPath)}: rendered evidence requires non-empty screenshots`);
    } else {
      for (const screenshot of metadata.screenshots) {
        if (typeof screenshot !== 'string' || path.isAbsolute(screenshot)) {
          errors.push(`${path.relative(root, metadataPath)}: screenshot paths must be relative strings`);
          continue;
        }

        const screenshotPath = path.join(runPath, screenshot);
        if (!fs.existsSync(screenshotPath)) {
          errors.push(`${path.relative(root, metadataPath)}: declared screenshot ${screenshot} does not exist`);
        }
      }
    }
  }

  return metadata;
}

function validateRun(runPath) {
  const relativeRunPath = path.relative(root, runPath);
  const evaluationPath = path.join(runPath, 'EVALUATION.md');
  if (!fs.existsSync(evaluationPath)) {
    errors.push(`${relativeRunPath}: missing EVALUATION.md`);
  } else {
    const evaluation = fs.readFileSync(evaluationPath, 'utf8');
    for (const category of rubricCategories) {
      if (!evaluation.includes(`| ${category} |`)) {
        errors.push(`${relativeRunPath}/EVALUATION.md: missing rubric category ${category}`);
      }
    }
  }

  validateArtifacts(runPath, 'baseline');
  validateArtifacts(runPath, 'ai-design-rules');
  const baseline = validateMetadata(runPath, 'baseline');
  const rules = validateMetadata(runPath, 'ai-design-rules');

  if (!baseline || !rules) {
    return;
  }

  for (const field of [
    'scenario',
    'date',
    'model',
    'provider',
    'generation_surface',
    'temperature',
    'tool_access',
    'implementation_target',
    'evidence_level',
  ]) {
    if (JSON.stringify(baseline[field]) !== JSON.stringify(rules[field])) {
      errors.push(`${relativeRunPath}: baseline and ai-design-rules must use the same ${field}`);
    }
  }

  if (baseline.evidence_level === 'directional') {
    warnings.push(`${relativeRunPath}: directional evidence only; no rendered visual proof is asserted`);
  }

  runs.push({ evidenceLevel: baseline.evidence_level, runPath: relativeRunPath });
}

for (const scenario of listDirectories(evidenceRoot)) {
  for (const run of listDirectories(path.join(evidenceRoot, scenario))) {
    validateRun(path.join(evidenceRoot, scenario, run));
  }
}

if (runs.length === 0) {
  errors.push('evidence/: no benchmark run directories found');
}

if (errors.length > 0) {
  console.error(`Benchmark evidence validation failed with ${errors.length} error(s):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

const renderedCount = runs.filter((run) => run.evidenceLevel === 'rendered').length;
const directionalCount = runs.length - renderedCount;
console.log(
  `Benchmark evidence validation passed: ${runs.length} run(s), ${renderedCount} rendered, ${directionalCount} directional.`,
);
for (const warning of warnings) {
  console.warn(`Warning: ${warning}`);
}
