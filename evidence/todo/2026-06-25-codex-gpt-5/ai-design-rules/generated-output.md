# Generated Output: AI Design Rules Todo App

## Product

Name: Today List

Today List is a mobile-first consumer todo app centered on one stable daily surface. The app helps a busy person capture a task before organizing it, see today's useful work, complete tasks, and inspect details without losing the list.

## Main Surface

Primary screen: `Today`

The first screen shows:

- current date;
- quick capture input;
- today's active tasks;
- completed tasks collapsed below active tasks;
- quiet status feedback for saved, saving, and failed tasks.

No dashboard cards are shown. The first viewport is reserved for the current tasks and the add action.

## Core Object

Object: `Task`

Required fields:

- title;
- completion state.

Optional fields:

- note;
- due time;
- repeat;
- list;
- priority.

Optional fields are hidden until the user opens detail.

## Core Interactions

### Quick Capture

The user types a task into a single input and presses `Add`.

The task appears immediately in Today with a quiet `Saving` status.

If saving fails, the task remains in place with:

- visible failed state;
- `Retry`;
- `Edit`;
- preserved text.

### Complete Task

The user taps a 44px checkbox row target.

The task moves to completed state in place first, then collapses under `Completed today`.

### Inspect Details

The user selects a task row.

Desktop:

- a side panel opens beside the Today list.
- the Today list remains visible.

Mobile:

- a bottom sheet opens over the Today list.
- the sheet has a clear close control.
- the task title remains visible at the top.

### Edit Optional Details

Inside detail, the user can add note, due time, repeat, list, or priority.

These fields do not block capture.

## Empty State

Title: `Nothing for today`

Text: `Add one thing to get it out of your head.`

Primary action: focused quick capture input.

## Loading State

Keep the Today header and quick capture input visible.

Show two quiet task row skeletons below. Do not replace the whole screen with a spinner.

## Error State

Task save failure appears on the affected task row.

Message: `Not saved. Retry?`

Actions:

- `Retry`;
- `Edit`.

The task text is preserved.

## Accessibility Notes

- Primary input has label `New task`.
- Add button has label `Add task`.
- Task rows have accessible names using task title and completion state.
- Checkbox row target is at least 44px high.
- Detail sheet close control is labeled.
- Error state uses text, not color alone.
- Keyboard order: quick add -> task rows -> detail fields -> close.

## Responsive Behavior

Mobile:

- quick capture stays near the bottom action zone or immediately above the task list depending on viewport.
- primary add action remains reachable.
- detail opens as a bottom sheet.
- no multi-column dashboard layout.

Desktop:

- Today list remains primary.
- detail can open as a side panel.
- additional width improves inspection without changing the product model.

## Applied Rules

- `PRD-001` Daily Actions First
- `PRD-002` Low-Friction Capture Before Organization
- `IA-001` One Stable Home Surface
- `IA-002` Define The Object Model Before Screens
- `UX-001` Thumb-Zone Primary Actions
- `UX-002` Progressively Disclose Power
- `UX-003` Preserve Context During Inspection
- `VIS-001` Semantic Tokens Only
- `A11Y-001` 44x44 Touch Targets

## Applied Patterns

- `PAT-001` Daily Home Surface
- `PAT-002` Quick Capture
- `PAT-003` Mobile Primary Action
- `PAT-004` Progressive Detail
- `PAT-005` Context-Preserving Preview
- `PAT-006` Object Status List

## Known Output Characteristics

- The output is more focused on the daily task surface.
- Optional details are secondary.
- Mobile and desktop share the same product model.
- State behavior preserves user input and orientation.
- The artifact is a design specification, not a rendered implementation.
