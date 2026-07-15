import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const registry = JSON.parse(fs.readFileSync(path.join(root, 'registry/objects.json'), 'utf8'));
const relationshipRegistry = JSON.parse(
  fs.readFileSync(path.join(root, 'registry/relationships.json'), 'utf8'),
);
const objectsById = new Map(registry.objects.map((object) => [object.id, object]));
const relationships = relationshipRegistry.relationships;
const errors = [];

function outgoing(objectId) {
  return relationships.filter((relationship) => relationship.source === objectId);
}

function hasOutgoing(object, relationshipTypes, targetTypes) {
  return outgoing(object.id).some(
    (relationship) =>
      relationshipTypes.includes(relationship.type) && targetTypes.includes(objectsById.get(relationship.target)?.object_type),
  );
}

for (const object of registry.objects) {
  switch (object.object_type) {
    case 'rule':
      if (!hasOutgoing(object, ['derived_from', 'inspired_by'], ['research'])) {
        errors.push(`${object.id}: rules must derive from or be inspired by registered research`);
      }
      break;
    case 'pattern':
      if (!hasOutgoing(object, ['requires'], ['rule'])) {
        errors.push(`${object.id}: patterns must require at least one registered rule`);
      }
      break;
    case 'prompt':
      if (!hasOutgoing(object, ['requires', 'related_to'], ['pattern', 'rule', 'checklist'])) {
        errors.push(`${object.id}: prompts must reference a registered pattern, rule, or checklist`);
      }
      break;
    case 'checklist':
      if (!hasOutgoing(object, ['requires', 'related_to'], ['pattern', 'rule'])) {
        errors.push(`${object.id}: checklists must cover at least one registered pattern or rule`);
      }
      break;
    case 'reference_project':
      if (!hasOutgoing(object, ['implements'], ['prompt'])) {
        errors.push(`${object.id}: reference projects must implement a registered prompt`);
      }
      if (!hasOutgoing(object, ['validates'], ['prompt', 'pattern'])) {
        errors.push(`${object.id}: reference projects must validate a registered prompt or pattern`);
      }
      break;
    case 'review':
      if (!hasOutgoing(object, ['requires'], ['checklist'])) {
        errors.push(`${object.id}: reviews must require a registered checklist`);
      }
      if (!hasOutgoing(object, ['validates'], ['research', 'rule', 'pattern', 'prompt', 'reference_project'])) {
        errors.push(`${object.id}: reviews must validate a registered knowledge object`);
      }
      break;
    default:
      break;
  }
}

if (errors.length > 0) {
  console.error(`DesignLint v0 failed with ${errors.length} error(s):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `DesignLint v0 passed: ${registry.objects.length} registered objects satisfy evidence-chain relationship requirements.`,
);
