const tasks = [
  { id: 1, title: 'Pick up fruit for breakfast', detail: 'Errand · before 18:00', complete: false },
  { id: 2, title: 'Send the design review notes', detail: 'Work · 20 min', complete: false },
  { id: 3, title: 'Book a dentist appointment', detail: 'Personal · this week', complete: false },
];

const taskList = document.querySelector('[data-task-list]');
const emptyState = document.querySelector('[data-empty-state]');
const taskSurface = document.querySelector('.task-surface');
const remainingCount = document.querySelector('#remaining-count');
const progressCopy = document.querySelector('#progress-copy');
const captureForm = document.querySelector('[data-capture-form]');
const taskInput = document.querySelector('#task-title');
const captureError = document.querySelector('#capture-error');
const addButton = document.querySelector('[data-add-task]');
const saveStatus = document.querySelector('#save-status');
const detailPanel = document.querySelector('[data-detail-panel]');
const detailHeading = document.querySelector('#detail-heading');
const detailStatus = document.querySelector('[data-detail-status]');
const completeDetailButton = document.querySelector('[data-action="complete-detail"]');
let selectedTaskId = null;
let detailReturnFocus = null;
let showEmpty = false;

function activeTasks() {
  return tasks.filter((task) => !task.complete);
}

function render() {
  const visibleTasks = showEmpty ? [] : tasks;
  taskList.hidden = visibleTasks.length === 0;
  emptyState.hidden = visibleTasks.length !== 0;
  taskList.replaceChildren(
    ...visibleTasks.map((task) => {
      const item = document.createElement('li');
      item.className = `task-row${task.complete ? ' is-complete' : ''}`;

      const taskMain = document.createElement('div');
      taskMain.className = 'task-main';

      const completeButton = document.createElement('button');
      completeButton.className = 'complete-toggle';
      completeButton.type = 'button';
      completeButton.dataset.completeId = String(task.id);
      completeButton.setAttribute('aria-pressed', String(task.complete));
      completeButton.setAttribute(
        'aria-label',
        `${task.complete ? 'Mark incomplete' : 'Mark complete'}: ${task.title}`,
      );
      completeButton.textContent = task.complete ? '✓' : '';

      const openButton = document.createElement('button');
      openButton.className = 'task-open';
      openButton.type = 'button';
      openButton.dataset.openId = String(task.id);

      const title = document.createElement('span');
      title.className = 'task-title';
      title.textContent = task.title;

      const meta = document.createElement('span');
      meta.className = 'task-meta';
      meta.textContent = task.detail;

      openButton.append(title, meta);
      taskMain.append(completeButton, openButton);
      item.append(taskMain);
      return item;
    }),
  );

  const remaining = activeTasks().length;
  remainingCount.textContent = String(remaining);
  progressCopy.textContent = remaining === 0 ? 'Everything is complete.' : 'A clear plan for the day.';
}

function openDetail(taskId, returnFocus = document.activeElement) {
  const task = tasks.find((item) => item.id === taskId);
  if (!task) return;
  selectedTaskId = task.id;
  detailReturnFocus = returnFocus instanceof HTMLElement ? returnFocus : null;
  detailHeading.textContent = task.title;
  detailStatus.textContent = task.complete ? 'Complete' : 'Open';
  completeDetailButton.textContent = task.complete ? 'Mark incomplete' : 'Mark complete';
  detailPanel.hidden = false;
  detailPanel.querySelector('[data-action="close-detail"]').focus();
}

function closeDetail({ restoreFocus = true } = {}) {
  detailPanel.hidden = true;
  selectedTaskId = null;
  const returnFocus = detailReturnFocus;
  detailReturnFocus = null;
  if (restoreFocus && returnFocus?.isConnected) returnFocus.focus();
}

function toggleComplete(taskId) {
  const task = tasks.find((item) => item.id === taskId);
  if (!task) return;
  task.complete = !task.complete;
  render();
  if (selectedTaskId === task.id) {
    openDetail(task.id, document.querySelector(`[data-open-id="${task.id}"]`));
  }
}

captureForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = taskInput.value.trim();
  captureError.hidden = true;
  taskInput.removeAttribute('aria-invalid');

  if (!title) {
    captureError.textContent = 'Enter a task before adding it.';
    captureError.hidden = false;
    taskInput.setAttribute('aria-invalid', 'true');
    taskInput.focus();
    return;
  }

  taskSurface.setAttribute('aria-busy', 'true');
  addButton.disabled = true;
  saveStatus.textContent = 'Saving…';
  window.setTimeout(() => {
    tasks.unshift({ id: Date.now(), title, detail: 'Just added · Today', complete: false });
    taskInput.value = '';
    showEmpty = false;
    taskSurface.setAttribute('aria-busy', 'false');
    addButton.disabled = false;
    saveStatus.textContent = 'Saved';
    render();
    window.setTimeout(() => { saveStatus.textContent = ''; }, 1800);
  }, 420);
});

taskList.addEventListener('click', (event) => {
  const completion = event.target.closest('[data-complete-id]');
  const opener = event.target.closest('[data-open-id]');
  if (completion) toggleComplete(Number(completion.dataset.completeId));
  if (opener) openDetail(Number(opener.dataset.openId), opener);
});

document.querySelector('[data-action="toggle-empty"]').addEventListener('click', (event) => {
  showEmpty = !showEmpty;
  event.currentTarget.setAttribute('aria-pressed', String(showEmpty));
  event.currentTarget.setAttribute('aria-label', showEmpty ? 'Show task list' : 'Show empty state');
  closeDetail({ restoreFocus: false });
  render();
});
document.querySelector('[data-action="focus-capture"]').addEventListener('click', () => taskInput.focus());
document.querySelector('[data-action="close-detail"]').addEventListener('click', closeDetail);
completeDetailButton.addEventListener('click', () => toggleComplete(selectedTaskId));

render();
