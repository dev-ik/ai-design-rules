'use strict';

(() => {
  const TODAY = '2026-09-28';
  const STORAGE_KEY = 'daylight-baseline-v1';
  const SEED = [
    { id: 't01', title: 'Book dentist appointment', notes: 'Ask about a morning appointment.', dueDate: TODAY, completed: false },
    { id: 't02', title: 'Pick up parcel', notes: '', dueDate: TODAY, completed: false },
    { id: 't03', title: 'Reply to Maya', notes: '', dueDate: TODAY, completed: false },
    { id: 't04', title: 'Pay electricity bill', notes: '', dueDate: TODAY, completed: false },
    { id: 't05', title: 'Fix bicycle light', notes: '', dueDate: TODAY, completed: false },
    { id: 't06', title: 'Water the plants', notes: '', dueDate: TODAY, completed: false },
    { id: 't07', title: 'Read chapter twelve', notes: '', dueDate: TODAY, completed: false },
    { id: 't08', title: 'Plan weekend walk', notes: '', dueDate: TODAY, completed: false },
    { id: 't09', title: 'Return library book', notes: '', dueDate: TODAY, completed: false },
    { id: 't10', title: 'Take out recycling', notes: '', dueDate: TODAY, completed: false },
    { id: 't11', title: 'Order coffee beans', notes: '', dueDate: TODAY, completed: false },
    { id: 't12', title: 'Stretch for ten minutes', notes: '', dueDate: TODAY, completed: true }
  ];
  const $ = id => document.getElementById(id);
  const clone = value => JSON.parse(JSON.stringify(value));
  let tasks = clone(SEED);
  let view = 'today';
  let loading = true;
  let saveDelay = 500;
  let failNext = false;
  let pending = null;
  let failed = null;
  let feedback = '';
  let feedbackType = '';
  let editingId = null;
  let generation = 0;
  let idCounter = 0;
  let opener = null;

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved) && saved.every(t => t && typeof t.id === 'string' && typeof t.title === 'string' && typeof t.notes === 'string' && typeof t.dueDate === 'string' && typeof t.completed === 'boolean')) tasks = saved;
  } catch (_) { /* A blocked store still permits an in-memory session. */ }

  const belongsToday = task => Boolean(task.dueDate && task.dueDate <= TODAY);
  const currentTasks = () => tasks.filter(task => view === 'all' || belongsToday(task));

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function dateLabel(date) {
    if (!date) return 'No date';
    if (date === TODAY) return 'Today';
    const label = new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return date < TODAY ? `Overdue · ${label}` : label;
  }

  function taskRow(task) {
    const row = element('div', `task-row${task.completed ? ' is-complete' : ''}`);
    row.dataset.taskId = task.id;
    const label = element('label', 'task-check-label');
    const check = element('input', 'task-checkbox');
    check.type = 'checkbox';
    check.checked = task.completed;
    check.disabled = Boolean(pending);
    check.setAttribute('aria-label', `${task.completed ? 'Mark incomplete' : 'Complete'}: ${task.title}`);
    check.addEventListener('change', () => {
      check.checked = task.completed;
      save({ type: 'toggle', id: task.id, completed: !task.completed });
    });
    label.append(check);
    const open = element('button', 'task-open');
    open.type = 'button';
    open.disabled = Boolean(pending);
    open.setAttribute('aria-label', `Task details: ${task.title}`);
    const text = element('span', 'task-text');
    text.append(element('span', 'task-title', task.title));
    if (view === 'all' || task.dueDate < TODAY) text.append(element('span', `task-meta${task.dueDate && task.dueDate < TODAY ? ' overdue' : ''}`, dateLabel(task.dueDate)));
    open.append(text);
    if (task.notes) {
      const note = element('span', 'note-icon', '≡');
      note.setAttribute('aria-label', 'Has notes');
      open.append(note);
    }
    const arrow = element('span', 'row-arrow', '›');
    arrow.setAttribute('aria-hidden', 'true');
    open.append(arrow);
    open.addEventListener('click', () => openDetails(task, open));
    row.append(label, open);
    return row;
  }

  function renderFeedback() {
    const target = $('save-feedback');
    target.replaceChildren();
    target.className = `save-feedback ${feedbackType}`;
    if (pending) {
      const spinner = element('span', 'spinner');
      spinner.setAttribute('aria-hidden', 'true');
      target.append(spinner);
    }
    if (feedback) target.append(element('span', 'feedback-copy', feedback));
    if (failed && !pending) {
      const retry = element('button', 'retry-button', 'Try again');
      retry.type = 'button';
      retry.addEventListener('click', () => save(failed));
      target.append(retry);
    }
    const detail = $('detail-feedback');
    detail.className = `detail-feedback ${feedbackType}`;
    detail.textContent = editingId && (pending?.type === 'edit' || failed?.type === 'edit') ? feedback : '';
    $('add-button').disabled = Boolean(pending) || loading;
    $('new-task').disabled = Boolean(pending) || loading;
    $('add-button').firstChild.textContent = pending?.type === 'add' ? 'Adding…' : 'Add';
    $('save-detail').disabled = Boolean(pending);
    $('save-detail').textContent = pending?.type === 'edit' ? 'Saving…' : failed?.type === 'edit' ? 'Try saving again' : 'Save changes';
    for (const id of ['detail-title', 'detail-date', 'detail-notes']) $(id).disabled = Boolean(pending);
    $('close-detail').disabled = Boolean(pending);
    $('cancel-detail').disabled = Boolean(pending);
  }

  function render() {
    document.querySelectorAll('[data-view]').forEach(button => {
      const active = button.dataset.view === view;
      button.classList.toggle('active', active);
      if (active) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    $('view-title').replaceChildren(document.createTextNode(view === 'today' ? 'Today' : 'All tasks'), element('span', 'title-dot', '.'));
    $('view-description').textContent = view === 'today' ? 'A clear list for a lighter day.' : 'Everything you want to make time for.';
    const visible = currentTasks();
    const active = visible.filter(task => !task.completed);
    const complete = visible.filter(task => task.completed);
    $('today-count').textContent = tasks.filter(task => !task.completed && belongsToday(task)).length;
    $('all-count').textContent = tasks.filter(task => !task.completed).length;
    $('remaining-badge').textContent = loading ? 'Loading…' : `${active.length} left`;
    $('list-count').textContent = loading ? '' : `${active.length} ${active.length === 1 ? 'task' : 'tasks'}`;
    $('task-section').setAttribute('aria-busy', String(loading));
    const list = $('task-list');
    list.replaceChildren();
    $('completed-list').replaceChildren();
    if (loading) {
      for (let i = 0; i < 5; i++) {
        const row = element('div', 'skeleton-row');
        row.setAttribute('aria-hidden', 'true');
        row.append(element('span', 'skeleton-circle'), element('span', 'skeleton-line'));
        list.append(row);
      }
      list.setAttribute('aria-label', 'Loading your tasks');
    } else {
      list.removeAttribute('aria-label');
      active.forEach(task => list.append(taskRow(task)));
      complete.forEach(task => $('completed-list').append(taskRow(task)));
    }
    $('completed-section').hidden = loading || complete.length === 0;
    $('completed-count').textContent = complete.length;
    $('empty-state').hidden = loading || active.length > 0;
    $('empty-title').textContent = complete.length ? 'Look at you. All done.' : view === 'today' && tasks.length ? 'Today has a little room.' : 'A little room to breathe.';
    $('empty-description').textContent = complete.length ? 'Your tasks are taken care of. Enjoy a little headspace, or add what’s next.' : 'Add a task and take the day one thing at a time.';
    renderFeedback();
  }

  function applyOperation(operation) {
    if (operation.type === 'add') return [...tasks, clone(operation.task)];
    return tasks.map(task => {
      if (task.id !== operation.id) return task;
      return operation.type === 'toggle' ? { ...task, completed: operation.completed } : { ...task, ...operation.changes };
    });
  }

  async function save(operation) {
    if (pending || loading || !operation) return;
    const shouldFail = failNext;
    failNext = false;
    const token = generation;
    pending = clone(operation);
    failed = null;
    feedbackType = '';
    feedback = operation.type === 'add' ? 'Adding your task…' : 'Saving your changes…';
    render();
    await new Promise(resolve => setTimeout(resolve, saveDelay));
    if (token !== generation) return;
    try {
      if (shouldFail) throw new Error('Simulated save failure');
      const nextTasks = applyOperation(operation);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTasks));
      tasks = nextTasks;
      pending = null;
      feedbackType = 'success';
      if (operation.type === 'add') {
        $('new-task').value = '';
        feedback = 'Task added to today.';
      } else if (operation.type === 'toggle') {
        feedback = operation.completed ? 'Task completed. Nicely done.' : 'Task marked incomplete.';
      } else {
        const date = operation.changes.dueDate;
        feedback = view === 'today' && (!date || date > TODAY) ? 'Changes saved. Find this task in All tasks.' : 'Changes saved.';
        closeDetails();
      }
      render();
      if (operation.type === 'add') $('new-task').focus();
      if (operation.type === 'toggle') {
        const row = Array.from(document.querySelectorAll('.task-row')).find(node => node.dataset.taskId === operation.id);
        if (operation.completed) $('completed-section').querySelector('summary').focus();
        else row?.querySelector('input').focus();
      }
    } catch (_) {
      pending = null;
      failed = clone(operation);
      feedbackType = 'error';
      feedback = 'Couldn’t save. Your changes are still here. Try again.';
      render();
      if (operation.type === 'edit') $('save-detail').focus();
      else $('save-feedback').querySelector('button')?.focus();
    }
  }

  function openDetails(task, source) {
    if (pending) return;
    editingId = task.id;
    opener = source;
    $('detail-title').value = task.title;
    $('detail-date').value = task.dueDate;
    $('detail-notes').value = task.notes;
    renderFeedback();
    $('task-dialog').showModal();
    $('detail-title').focus();
  }

  function closeDetails() {
    if (pending) return;
    $('task-dialog').close();
    editingId = null;
    if (opener?.isConnected) opener.focus();
    else $('new-task').focus();
    opener = null;
  }

  $('add-form').addEventListener('submit', event => {
    event.preventDefault();
    const title = $('new-task').value.trim();
    if (!title) { $('new-task').value = ''; $('new-task').reportValidity(); return; }
    save({ type: 'add', task: { id: `task-${Date.now()}-${++idCounter}`, title, notes: '', dueDate: TODAY, completed: false } });
  });
  $('detail-form').addEventListener('submit', event => {
    event.preventDefault();
    const title = $('detail-title').value.trim();
    if (!title) { $('detail-title').value = ''; $('detail-title').reportValidity(); return; }
    save({ type: 'edit', id: editingId, changes: { title, dueDate: $('detail-date').value, notes: $('detail-notes').value.trim() } });
  });
  $('close-detail').addEventListener('click', closeDetails);
  $('cancel-detail').addEventListener('click', () => {
    if (failed?.type === 'edit' && failed.id === editingId) { failed = null; feedback = ''; feedbackType = ''; }
    closeDetails();
    renderFeedback();
  });
  $('task-dialog').addEventListener('cancel', event => {
    event.preventDefault();
    if (!pending) $('cancel-detail').click();
  });
  $('empty-add').addEventListener('click', () => $('new-task').focus());
  document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
    view = button.dataset.view;
    render();
  }));

  window.__benchmark = {
    reset(mode = 'seed') {
      if (!['seed', 'empty'].includes(mode)) throw new Error('Use seed or empty');
      generation++;
      tasks = mode === 'seed' ? clone(SEED) : [];
      view = 'today';
      loading = false;
      pending = null;
      failed = null;
      failNext = false;
      saveDelay = 500;
      feedback = '';
      feedbackType = '';
      editingId = null;
      $('new-task').value = '';
      $('task-dialog').close();
      $('completed-section').open = false;
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); } catch (_) { /* Reset still updates the current session. */ }
      render();
      return this.getState();
    },
    setSaveDelay(milliseconds) {
      if (!Number.isFinite(milliseconds) || milliseconds < 0) throw new Error('Delay must be a nonnegative number');
      saveDelay = milliseconds;
    },
    failNextSave() { failNext = true; },
    getState() { return clone({ tasks, today: TODAY, view, loading, pending, failed, feedback, feedbackType, editingId, saveDelay }); }
  };

  render();
  const initialGeneration = generation;
  setTimeout(() => {
    if (generation !== initialGeneration) return;
    loading = false;
    render();
  }, 500);
})();
