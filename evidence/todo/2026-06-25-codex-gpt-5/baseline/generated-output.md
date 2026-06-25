# Generated Output: Baseline Todo App

## Product

Name: TaskBoard

TaskBoard is a responsive todo app for personal productivity. It has a polished dashboard-style layout with a header, task statistics, a task form, list filters, and a detail panel.

## Main Screen

- Top header with app name, date, and search.
- Summary cards:
  - Due Today
  - Completed
  - Overdue
- Add task form with:
  - task title;
  - due date;
  - priority;
  - notes.
- Filter tabs:
  - Today;
  - All;
  - Completed.
- Task list cards with checkbox, title, due date, priority chip, and edit button.
- Right-side detail panel on desktop.
- Full-screen detail view on mobile.

## Core Interactions

### Add Task

The user fills the task title and optional fields, then selects `Add Task`.

If the title is empty, show inline text: `Task title is required.`

### Complete Task

The user checks the checkbox. The task moves to completed state with reduced opacity and a completed label.

### Edit Details

The user selects `Edit` on a task card. A detail panel opens with title, due date, priority, and notes fields.

### Search And Filter

The user can search by title and switch tabs between Today, All, and Completed.

## Empty State

If there are no tasks, show:

Title: `No tasks yet`

Text: `Add your first task to get started.`

Button: `Add task`

## Loading State

Show skeleton cards for the summary cards and task list.

## Error State

If saving fails, show a banner:

`We could not save your task. Try again.`

The user can retry.

## Accessibility Notes

- Buttons and inputs have visible labels.
- Checkboxes use task title as label text.
- Error banner uses clear text.
- Touch target sizing is intended but not specified.

## Responsive Behavior

Desktop:

- Header at top.
- Summary cards in a row.
- Task list and detail panel side by side.

Mobile:

- Summary cards stack.
- Add task form appears above list.
- Detail panel becomes a separate screen.

## Known Output Characteristics

- The design is familiar and usable.
- The dashboard summary cards add some overhead for a simple consumer todo app.
- Optional metadata is visible early.
- Mobile behavior is responsive but not deeply mobile-first.
- Detail editing changes context on mobile.
