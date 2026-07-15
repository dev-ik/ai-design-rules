import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const generatedNotice = 'This file is generated from registry metadata. Do not edit manually.';

function readRegistry(root) {
  const objects = JSON.parse(fs.readFileSync(path.join(root, 'registry/objects.json'), 'utf8')).objects;
  const relationships = JSON.parse(
    fs.readFileSync(path.join(root, 'registry/relationships.json'), 'utf8'),
  ).relationships;

  return {
    objects,
    relationships,
    objectsById: new Map(objects.map((object) => [object.id, object])),
  };
}

function escapeCell(value) {
  return String(value ?? 'None').replaceAll('|', '\\|');
}

function objectLabel(object) {
  if (!object) {
    return 'Missing object';
  }

  const alias = object.alias ? `${object.alias} / ` : '';
  return `${alias}${object.id} ${object.title}`;
}

function listOrNone(values) {
  return values.length > 0 ? values.join('<br>') : 'None';
}

function linesOrNone(values) {
  return values.length > 0 ? values.map((value) => `- ${value}`).join('\n') : 'None';
}

function table(headers, rows) {
  return [
    `| ${headers.map(escapeCell).join(' | ')} |`,
    `| ${headers.map(() => '---').join(' | ')} |`,
    ...rows.map((row) => `| ${row.map(escapeCell).join(' | ')} |`),
  ].join('\n');
}

function relationshipsFor(relationships, id) {
  return relationships.filter((relationship) => relationship.source === id || relationship.target === id);
}

function generateRulesIndex(registry) {
  const rules = registry.objects
    .filter((object) => object.object_type === 'rule')
    .sort((a, b) => a.id.localeCompare(b.id));

  const rows = rules.map((rule) => {
    const usedByPatterns = registry.relationships
      .filter(
        (relationship) =>
          relationship.type === 'requires' &&
          relationship.target === rule.id &&
          registry.objectsById.get(relationship.source)?.object_type === 'pattern',
      )
      .map((relationship) => objectLabel(registry.objectsById.get(relationship.source)));

    const relatedObjects = relationshipsFor(registry.relationships, rule.id)
      .filter((relationship) => relationship.type !== 'requires')
      .map((relationship) => {
        const otherId = relationship.source === rule.id ? relationship.target : relationship.source;
        return `${relationship.type}: ${objectLabel(registry.objectsById.get(otherId))}`;
      });

    return [
      rule.id,
      rule.alias,
      rule.title,
      rule.category,
      rule.status,
      rule.maturity,
      rule.path,
      listOrNone(usedByPatterns),
      listOrNone(relatedObjects),
    ];
  });

  return [
    '# Generated Rules Index',
    '',
    generatedNotice,
    '',
    table(
      ['ID', 'Alias', 'Title', 'Category', 'Status', 'Maturity', 'File Path', 'Used By Patterns', 'Related Objects'],
      rows,
    ),
    '',
  ].join('\n');
}

function generateResearchIndex(registry) {
  const researchObjects = registry.objects
    .filter((object) => object.object_type === 'research')
    .sort((a, b) => a.id.localeCompare(b.id));

  const rows = researchObjects.map((research) => {
    const derivedRules = registry.relationships
      .filter(
        (relationship) =>
          ['derived_from', 'inspired_by'].includes(relationship.type) &&
          relationship.target === research.id &&
          registry.objectsById.get(relationship.source)?.object_type === 'rule',
      )
      .map((relationship) => `${relationship.type}: ${objectLabel(registry.objectsById.get(relationship.source))}`);

    return [
      research.id,
      research.alias,
      research.title,
      research.category,
      research.status,
      research.maturity,
      research.path,
      listOrNone(derivedRules),
    ];
  });

  return [
    '# Generated Research Index',
    '',
    generatedNotice,
    '',
    table(['ID', 'Alias', 'Title', 'Category', 'Status', 'Maturity', 'File Path', 'Derived Or Inspired Rules'], rows),
    '',
  ].join('\n');
}

function generatePatternsIndex(registry) {
  const patterns = registry.objects
    .filter((object) => object.object_type === 'pattern')
    .sort((a, b) => a.id.localeCompare(b.id));

  const rows = patterns.map((pattern) => {
    const requiredRules = registry.relationships
      .filter(
        (relationship) =>
          relationship.type === 'requires' &&
          relationship.source === pattern.id &&
          registry.objectsById.get(relationship.target)?.object_type === 'rule',
      )
      .map((relationship) => objectLabel(registry.objectsById.get(relationship.target)));

    const directResearch = registry.relationships
      .filter(
        (relationship) =>
          relationship.source === pattern.id &&
          ['derived_from', 'cites', 'inspired_by'].includes(relationship.type) &&
          registry.objectsById.get(relationship.target)?.object_type === 'research',
      )
      .map((relationship) => objectLabel(registry.objectsById.get(relationship.target)));

    const researchFromRules = requiredRules.length
      ? registry.relationships
          .filter(
            (relationship) =>
              ['derived_from', 'inspired_by'].includes(relationship.type) &&
              registry.objectsById.get(relationship.source)?.object_type === 'rule' &&
              registry.objectsById.get(relationship.target)?.object_type === 'research' &&
              registry.relationships.some(
                (requiredRelationship) =>
                  requiredRelationship.type === 'requires' &&
                  requiredRelationship.source === pattern.id &&
                  requiredRelationship.target === relationship.source,
              ),
          )
          .map((relationship) => objectLabel(registry.objectsById.get(relationship.target)))
      : [];

    const relatedResearch = [...new Set([...directResearch, ...researchFromRules])];

    return [
      pattern.id,
      pattern.alias,
      pattern.title,
      pattern.category,
      pattern.status,
      pattern.maturity,
      pattern.path,
      listOrNone(requiredRules),
      listOrNone(relatedResearch),
    ];
  });

  return [
    '# Generated Patterns Index',
    '',
    generatedNotice,
    '',
    table(
      ['ID', 'Alias', 'Title', 'Category', 'Status', 'Maturity', 'File Path', 'Required Rules', 'Related Research'],
      rows,
    ),
    '',
  ].join('\n');
}

function generatePromptsIndex(registry) {
  const prompts = registry.objects
    .filter((object) => object.object_type === 'prompt')
    .sort((a, b) => a.id.localeCompare(b.id));

  const rows = prompts.map((prompt) => {
    const patternReferences = registry.relationships
      .filter(
        (relationship) =>
          ['requires', 'related_to'].includes(relationship.type) &&
          relationship.source === prompt.id &&
          registry.objectsById.get(relationship.target)?.object_type === 'pattern',
      )
      .map((relationship) => `${relationship.type}: ${objectLabel(registry.objectsById.get(relationship.target))}`);

    const ruleReferences = registry.relationships
      .filter(
        (relationship) =>
          ['requires', 'related_to'].includes(relationship.type) &&
          relationship.source === prompt.id &&
          registry.objectsById.get(relationship.target)?.object_type === 'rule',
      )
      .map((relationship) => `${relationship.type}: ${objectLabel(registry.objectsById.get(relationship.target))}`);

    const checklistReferences = registry.relationships
      .filter(
        (relationship) =>
          ['requires', 'related_to'].includes(relationship.type) &&
          relationship.source === prompt.id &&
          registry.objectsById.get(relationship.target)?.object_type === 'checklist',
      )
      .map((relationship) => `${relationship.type}: ${objectLabel(registry.objectsById.get(relationship.target))}`);

    return [
      prompt.id,
      prompt.alias,
      prompt.title,
      prompt.category,
      prompt.status,
      prompt.maturity,
      prompt.path,
      listOrNone(patternReferences),
      listOrNone(ruleReferences),
      listOrNone(checklistReferences),
    ];
  });

  return [
    '# Generated Prompts Index',
    '',
    generatedNotice,
    '',
    table(
      [
        'ID',
        'Alias',
        'Title',
        'Category',
        'Status',
        'Maturity',
        'File Path',
        'Pattern References',
        'Rule References',
        'Checklist References',
      ],
      rows,
    ),
    '',
  ].join('\n');
}

function generateChecklistsIndex(registry) {
  const checklists = registry.objects
    .filter((object) => object.object_type === 'checklist')
    .sort((a, b) => a.id.localeCompare(b.id));

  const rows = checklists.map((checklist) => {
    const coverageReferences = registry.relationships
      .filter(
        (relationship) =>
          relationship.target === checklist.id &&
          ['prompt', 'review', 'skill'].includes(registry.objectsById.get(relationship.source)?.object_type),
      )
      .map((relationship) => `${relationship.type}: ${objectLabel(registry.objectsById.get(relationship.source))}`);

    const relatedRules = registry.relationships
      .filter(
        (relationship) =>
          relationship.source === checklist.id &&
          registry.objectsById.get(relationship.target)?.object_type === 'rule',
      )
      .map((relationship) => `${relationship.type}: ${objectLabel(registry.objectsById.get(relationship.target))}`);

    return [
      checklist.id,
      checklist.alias,
      checklist.title,
      checklist.category,
      checklist.status,
      checklist.maturity,
      checklist.path,
      listOrNone(relatedRules),
      listOrNone(coverageReferences),
    ];
  });

  return [
    '# Generated Checklists Index',
    '',
    generatedNotice,
    '',
    table(
      ['ID', 'Alias', 'Title', 'Category', 'Status', 'Maturity', 'File Path', 'Rule Coverage', 'Used By'],
      rows,
    ),
    '',
  ].join('\n');
}

function generateReviewsIndex(registry) {
  const reviews = registry.objects
    .filter((object) => object.object_type === 'review')
    .sort((a, b) => a.id.localeCompare(b.id));

  const rows = reviews.map((review) => {
    const requiredChecklists = registry.relationships
      .filter(
        (relationship) =>
          relationship.type === 'requires' &&
          relationship.source === review.id &&
          registry.objectsById.get(relationship.target)?.object_type === 'checklist',
      )
      .map((relationship) => objectLabel(registry.objectsById.get(relationship.target)));

    const validatedObjects = registry.relationships
      .filter((relationship) => relationship.type === 'validates' && relationship.source === review.id)
      .map((relationship) => objectLabel(registry.objectsById.get(relationship.target)));

    return [
      review.id,
      review.alias,
      review.title,
      review.category,
      review.status,
      review.maturity,
      review.path,
      listOrNone(requiredChecklists),
      listOrNone(validatedObjects),
    ];
  });

  return [
    '# Generated Reviews Index',
    '',
    generatedNotice,
    '',
    table(
      ['ID', 'Alias', 'Title', 'Category', 'Status', 'Maturity', 'File Path', 'Required Checklists', 'Validates'],
      rows,
    ),
    '',
  ].join('\n');
}

function generateExamplesIndex(registry) {
  const referenceProjects = registry.objects
    .filter((object) => object.object_type === 'reference_project')
    .sort((a, b) => a.id.localeCompare(b.id));

  const rows = referenceProjects.map((referenceProject) => {
    const implementedPrompts = registry.relationships
      .filter(
        (relationship) =>
          relationship.type === 'implements' &&
          relationship.source === referenceProject.id &&
          registry.objectsById.get(relationship.target)?.object_type === 'prompt',
      )
      .map((relationship) => objectLabel(registry.objectsById.get(relationship.target)));

    const validatedObjects = registry.relationships
      .filter((relationship) => relationship.type === 'validates' && relationship.source === referenceProject.id)
      .map((relationship) => objectLabel(registry.objectsById.get(relationship.target)));

    return [
      referenceProject.id,
      referenceProject.alias,
      referenceProject.title,
      referenceProject.category,
      referenceProject.status,
      referenceProject.maturity,
      referenceProject.path,
      listOrNone(implementedPrompts),
      listOrNone(validatedObjects),
    ];
  });

  return [
    '# Generated Examples Index',
    '',
    generatedNotice,
    '',
    table(
      ['ID', 'Alias', 'Title', 'Category', 'Status', 'Maturity', 'File Path', 'Implements', 'Validates'],
      rows,
    ),
    '',
  ].join('\n');
}

function countBy(items, getKey) {
  const counts = new Map();
  for (const item of items) {
    const key = getKey(item);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function generateGraphReport(registry) {
  const relationshipCounts = countBy(registry.relationships, (relationship) => relationship.type);
  const objectCounts = countBy(registry.objects, (object) => object.object_type);
  const knownIds = new Set(registry.objects.map((object) => object.id));
  const connectedIds = new Set();
  const missingTargets = [];

  for (const relationship of registry.relationships) {
    if (knownIds.has(relationship.source)) {
      connectedIds.add(relationship.source);
    } else {
      missingTargets.push(`source ${relationship.source} in ${relationship.type}`);
    }

    if (knownIds.has(relationship.target)) {
      connectedIds.add(relationship.target);
    } else {
      missingTargets.push(`target ${relationship.target} in ${relationship.type}`);
    }
  }

  const orphanObjects = registry.objects
    .filter((object) => !connectedIds.has(object.id))
    .sort((a, b) => a.id.localeCompare(b.id))
    .map(objectLabel);

  const connectionCounts = registry.objects
    .map((object) => ({
      object,
      count: registry.relationships.filter(
        (relationship) => relationship.source === object.id || relationship.target === object.id,
      ).length,
    }))
    .sort((a, b) => b.count - a.count || a.object.id.localeCompare(b.object.id))
    .slice(0, 10)
    .map(({ object, count }) => `${objectLabel(object)}: ${count}`);

  const patternsWithoutRequiredRules = registry.objects
    .filter((object) => object.object_type === 'pattern')
    .filter(
      (pattern) =>
        !registry.relationships.some(
          (relationship) =>
            relationship.type === 'requires' &&
            relationship.source === pattern.id &&
            registry.objectsById.get(relationship.target)?.object_type === 'rule',
        ),
    )
    .map(objectLabel);

  const rulesNotUsedByAnyPattern = registry.objects
    .filter((object) => object.object_type === 'rule')
    .filter(
      (rule) =>
        !registry.relationships.some(
          (relationship) =>
            relationship.type === 'requires' &&
            relationship.target === rule.id &&
            registry.objectsById.get(relationship.source)?.object_type === 'pattern',
        ),
    )
    .map(objectLabel);

  const researchWithoutDerivedOrInspiredRules = registry.objects
    .filter((object) => object.object_type === 'research')
    .filter(
      (research) =>
        !registry.relationships.some(
          (relationship) =>
            ['derived_from', 'inspired_by'].includes(relationship.type) &&
            relationship.target === research.id &&
            registry.objectsById.get(relationship.source)?.object_type === 'rule',
        ),
    )
    .map(objectLabel);

  const rulesWithoutResearch = registry.objects
    .filter((object) => object.object_type === 'rule')
    .filter(
      (rule) =>
        !registry.relationships.some(
          (relationship) =>
            ['derived_from', 'inspired_by'].includes(relationship.type) &&
            relationship.source === rule.id &&
            registry.objectsById.get(relationship.target)?.object_type === 'research',
        ),
    )
    .map(objectLabel);

  const promptsWithoutKnowledgeReferences = registry.objects
    .filter((object) => object.object_type === 'prompt')
    .filter(
      (prompt) =>
        !registry.relationships.some(
          (relationship) =>
            ['requires', 'related_to'].includes(relationship.type) &&
            relationship.source === prompt.id &&
            ['pattern', 'rule', 'checklist'].includes(registry.objectsById.get(relationship.target)?.object_type),
        ),
    )
    .map(objectLabel);

  const referenceProjectsWithoutValidatesRelationships = registry.objects
    .filter((object) => object.object_type === 'reference_project')
    .filter(
      (referenceProject) =>
        !registry.relationships.some(
          (relationship) => relationship.type === 'validates' && relationship.source === referenceProject.id,
        ),
    )
    .map(objectLabel);

  return [
    '# Generated Graph Report',
    '',
    generatedNotice,
    '',
    '## Object Counts By Type',
    '',
    table(['Object Type', 'Count'], objectCounts.map(([type, count]) => [type, count])),
    '',
    '## Relationship Counts By Type',
    '',
    table(['Relationship Type', 'Count'], relationshipCounts.map(([type, count]) => [type, count])),
    '',
    '## Orphan Objects',
    '',
    linesOrNone(orphanObjects),
    '',
    '## Missing Targets',
    '',
    linesOrNone(missingTargets),
    '',
    '## Research Without Derived Or Inspired Rules',
    '',
    linesOrNone(researchWithoutDerivedOrInspiredRules),
    '',
    '## Rules Without Research',
    '',
    linesOrNone(rulesWithoutResearch),
    '',
    '## Prompts Without Knowledge References',
    '',
    linesOrNone(promptsWithoutKnowledgeReferences),
    '',
    '## Reference Projects Without Validates Relationships',
    '',
    linesOrNone(referenceProjectsWithoutValidatesRelationships),
    '',
    '## Most Connected Objects',
    '',
    linesOrNone(connectionCounts),
    '',
    '## Patterns Without Required Rules',
    '',
    linesOrNone(patternsWithoutRequiredRules),
    '',
    '## Rules Not Used By Any Pattern',
    '',
    linesOrNone(rulesNotUsedByAnyPattern),
    '',
  ].join('\n');
}

export function generateIndexFiles(root = process.cwd()) {
  const registry = readRegistry(root);

  return {
    'research/GENERATED_INDEX.md': generateResearchIndex(registry),
    'rules/GENERATED_INDEX.md': generateRulesIndex(registry),
    'patterns/GENERATED_INDEX.md': generatePatternsIndex(registry),
    'prompts/GENERATED_INDEX.md': generatePromptsIndex(registry),
    'checklists/GENERATED_INDEX.md': generateChecklistsIndex(registry),
    'reviews/GENERATED_INDEX.md': generateReviewsIndex(registry),
    'examples/GENERATED_INDEX.md': generateExamplesIndex(registry),
    'graph/GENERATED_GRAPH.md': generateGraphReport(registry),
  };
}

export function writeGeneratedIndexes(root = process.cwd()) {
  const files = generateIndexFiles(root);

  for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(root, filePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content, 'utf8');
  }

  return files;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const files = writeGeneratedIndexes();
  for (const filePath of Object.keys(files)) {
    console.log(`Generated ${filePath}`);
  }
}
