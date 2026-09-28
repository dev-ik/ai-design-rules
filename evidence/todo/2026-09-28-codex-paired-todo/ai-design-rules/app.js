'use strict';
const SEED = [
  {
    "id": "t01",
    "title": "Book dentist appointment",
    "notes": "Ask about a morning appointment.",
    "dueDate": "2026-09-28",
    "completed": false
  },
  {
    "id": "t02",
    "title": "Pick up parcel",
    "notes": "",
    "dueDate": "2026-09-28",
    "completed": false
  },
  {
    "id": "t03",
    "title": "Reply to Maya",
    "notes": "",
    "dueDate": "2026-09-28",
    "completed": false
  },
  {
    "id": "t04",
    "title": "Pay electricity bill",
    "notes": "",
    "dueDate": "2026-09-28",
    "completed": false
  },
  {
    "id": "t05",
    "title": "Fix bicycle light",
    "notes": "",
    "dueDate": "2026-09-28",
    "completed": false
  },
  {
    "id": "t06",
    "title": "Water the plants",
    "notes": "",
    "dueDate": "2026-09-28",
    "completed": false
  },
  {
    "id": "t07",
    "title": "Read chapter twelve",
    "notes": "",
    "dueDate": "2026-09-28",
    "completed": false
  },
  {
    "id": "t08",
    "title": "Plan weekend walk",
    "notes": "",
    "dueDate": "2026-09-28",
    "completed": false
  },
  {
    "id": "t09",
    "title": "Return library book",
    "notes": "",
    "dueDate": "2026-09-28",
    "completed": false
  },
  {
    "id": "t10",
    "title": "Take out recycling",
    "notes": "",
    "dueDate": "2026-09-28",
    "completed": false
  },
  {
    "id": "t11",
    "title": "Order coffee beans",
    "notes": "",
    "dueDate": "2026-09-28",
    "completed": false
  },
  {
    "id": "t12",
    "title": "Stretch for ten minutes",
    "notes": "",
    "dueDate": "2026-09-28",
    "completed": true
  }
];
const TODAY = '2026-09-28';
const STORE = 'daylight-adr-benchmark-v1';
const $ = id => document.getElementById(id);
const clone = value => JSON.parse(JSON.stringify(value));
let tasks = clone(SEED), view = 'today', loading = true, showCompleted = true;
let delay = 500, failNext = false, pending = null, epoch = 0, sequence = 0;
let selected = null, opener = null, sourceScroll = 0, failedOperation = null;
let drafts = {}, status = 'idle';
try {
  const stored = JSON.parse(localStorage.getItem(STORE));
  if (Array.isArray(stored) && stored.every(t => typeof t.id === 'string' && typeof t.title === 'string' && typeof t.notes === 'string' && typeof t.dueDate === 'string' && typeof t.completed === 'boolean')) tasks = stored;
} catch (_) { /* The app remains usable; a failed write gets explicit recovery. */ }

function message(text, kind = 'idle', retry = false) {
  status = kind;
  $('feedback-text').textContent = text;
  $('feedback').className = 'feedback ' + kind;
  $('retry').hidden = !retry;
}
function detailMessage(text, kind = '') {
  $('detail-feedback').textContent = text;
  $('detail-feedback').className = 'detail-feedback ' + kind;
}
function visibleTasks() { return tasks.filter(t => view === 'all' || t.dueDate === TODAY || (t.dueDate && t.dueDate < TODAY && !t.completed)); }
function dateLabel(date) {
  if (!date) return 'No date';
  if (date === TODAY) return 'Today';
  return new Date(date + 'T12:00:00').toLocaleDateString('en-US', {month:'short', day:'numeric'});
}
function taskRow(task) {
  const row = document.createElement('li');
  row.className = 'task-row' + (task.completed ? ' is-completed' : '');
  row.dataset.taskId = task.id;
  if (pending?.id === task.id) row.setAttribute('aria-busy', 'true');
  const check = document.createElement('button');
  check.className = 'check';
  check.setAttribute('role', 'checkbox');
  check.setAttribute('aria-checked', String(task.completed));
  check.setAttribute('aria-label', `${task.completed ? 'Mark incomplete' : 'Complete'}: ${task.title}`);
  check.disabled = Boolean(pending);
  const circle = document.createElement('span');
  circle.className = 'check-circle'; circle.setAttribute('aria-hidden', 'true'); circle.textContent = task.completed ? '✓' : '';
  check.append(circle);
  check.addEventListener('click', () => save({kind:'complete', id:task.id, completed:!task.completed, title:task.title}));
  const open = document.createElement('button');
  open.className = 'task-open'; open.dataset.openId = task.id;
  open.setAttribute('aria-label', `Details: ${task.title}`);
  const text = document.createElement('span'); text.className = 'task-text';
  const title = document.createElement('span'); title.className = 'task-title'; title.textContent = task.title;
  text.append(title);
  if (task.notes || view === 'all' || (task.dueDate && task.dueDate < TODAY)) {
    const meta = document.createElement('span'); meta.className = 'task-meta';
    meta.textContent = [task.dueDate && task.dueDate < TODAY && !task.completed ? 'Overdue · ' + dateLabel(task.dueDate) : view === 'all' ? dateLabel(task.dueDate) : '', task.notes ? 'Has notes' : ''].filter(Boolean).join(' · ');
    text.append(meta);
  }
  const arrow = document.createElement('span'); arrow.className = 'row-arrow'; arrow.textContent = '›'; arrow.setAttribute('aria-hidden','true');
  open.append(text,arrow); open.addEventListener('click', () => openDetail(task.id, open));
  row.append(check,open); return row;
}
function render() {
  const list = visibleTasks(); const active = list.filter(t => !t.completed); const done = list.filter(t => t.completed);
  $('today-count').textContent = tasks.filter(t => !t.completed && t.dueDate && t.dueDate <= TODAY).length;
  $('all-count').textContent = tasks.filter(t => !t.completed).length;
  document.querySelectorAll('[data-view]').forEach(button => {
    const activeView = button.dataset.view === view;
    button.classList.toggle('active', activeView);
    if (activeView) button.setAttribute('aria-current','page'); else button.removeAttribute('aria-current');
  });
  $('view-title').replaceChildren(document.createTextNode(view === 'today' ? 'Today' : 'All tasks'));
  if (view === 'today') { const sun=document.createElement('span'); sun.className='sun'; sun.textContent='☀'; sun.setAttribute('aria-hidden','true'); $('view-title').append(sun); }
  $('summary').textContent = loading ? 'Getting your day ready…' : active.length ? `${active.length} ${active.length === 1 ? 'task' : 'tasks'} to do. One thing at a time.` : done.length ? 'A good day, one small step at a time.' : 'A fresh start. Make room for what matters.';
  $('remaining-count').textContent = loading ? '' : active.length;
  $('task-region').setAttribute('aria-busy',String(loading));
  $('task-list').replaceChildren(); $('completed-list').replaceChildren();
  if (loading) {
    for (let i=0;i<Math.max(1,active.length);i++) { const li=document.createElement('li'); li.className='task-row'; li.setAttribute('aria-hidden','true'); const line=document.createElement('span'); line.className='skeleton'; li.append(line); $('task-list').append(li); }
  } else { active.forEach(task => $('task-list').append(taskRow(task))); done.forEach(task => $('completed-list').append(taskRow(task))); }
  $('empty').hidden = loading || active.length > 0;
  $('empty-title').textContent = done.length ? 'All clear for now' : view === 'today' && tasks.length ? 'Nothing planned for today' : 'A little room to begin';
  $('empty-copy').textContent = done.length ? 'You’ve taken care of your list. Enjoy a little breathing room.' : 'Add a task below. One small thing is a good start.';
  $('completed-section').hidden = loading || done.length === 0;
  $('completed-count').textContent = done.length;
  $('completed-toggle').setAttribute('aria-expanded',String(showCompleted));
  $('completed-chevron').textContent = showCompleted ? '⌄' : '›';
  $('completed-list').hidden = !showCompleted;
  $('add-task').disabled = Boolean(pending) || loading;
  $('task-title').readOnly = Boolean(pending) || loading;
  $('add-task').textContent = pending?.kind === 'add' ? 'Saving…' : failedOperation?.kind === 'add' ? 'Retry' : 'Add';
  $('save-detail').disabled = Boolean(pending);
  for (const id of ['detail-title','detail-notes','detail-date']) $(id).readOnly = Boolean(pending?.kind === 'edit' && pending.id === selected);
}
function save(operation) {
  if (pending || loading) return;
  const token = epoch; const shouldFail = failNext; failNext = false;
  pending = clone(operation); failedOperation = null;
  message('Saving…', 'saving');
  if (operation.kind === 'edit' && selected === operation.id) detailMessage('Saving your changes…');
  render();
  setTimeout(() => {
    if (token !== epoch) return;
    let updated = clone(tasks);
    if (operation.kind === 'add') updated.unshift(operation.task);
    if (operation.kind === 'complete') updated = updated.map(t => t.id === operation.id ? {...t, completed:operation.completed} : t);
    if (operation.kind === 'edit') updated = updated.map(t => t.id === operation.id ? {...t,...operation.fields} : t);
    try {
      if (shouldFail) throw new Error('simulated');
      localStorage.setItem(STORE,JSON.stringify(updated));
      tasks = updated; pending = null; failedOperation = null;
      if (operation.kind === 'add') {
        $('task-title').value = ''; $('task-title').removeAttribute('aria-invalid');
        message('Task added to Today.', 'success');
      } else if (operation.kind === 'complete') {
        message(operation.completed ? 'Task completed. You can uncheck it below.' : 'Task marked incomplete.', 'success');
      } else {
        delete drafts[operation.id];
        message('Changes saved.', 'success');
        if (selected === operation.id) detailMessage('Changes saved.', 'success');
      }
      render();
      if (operation.kind === 'add' && !$('detail').open) $('task-title').focus({preventScroll:true});
      if (operation.kind === 'complete' && !$('detail').open) {
        const target = [...document.querySelectorAll('[data-task-id]')].find(el => el.dataset.taskId === operation.id);
        const focusTarget = operation.completed && !showCompleted ? $('completed-toggle') : target?.querySelector('.check');
        (focusTarget || $('task-title')).focus({preventScroll:true});
      }
    } catch (_) {
      pending = null; failedOperation = operation;
      message(operation.kind === 'add' ? 'Task wasn’t saved. Your title is kept. Try again.' : 'Changes weren’t saved. Try again.', 'error', operation.kind !== 'add');
      if (operation.kind === 'edit' && selected === operation.id) detailMessage('Changes weren’t saved. Your edits are kept. Choose Save changes to retry.','error');
      render();
    }
  }, delay);
}
$('capture').addEventListener('submit', event => {
  event.preventDefault(); if (pending || loading) return;
  const title = $('task-title').value.trim();
  if (!title) { message('Task title: enter something you need to do.','error'); $('task-title').setAttribute('aria-invalid','true'); $('task-title').focus(); return; }
  $('task-title').removeAttribute('aria-invalid');
  save({kind:'add',task:{id:`new-${Date.now()}-${++sequence}`,title,notes:'',dueDate:TODAY,completed:false}});
});
$('task-title').addEventListener('input', () => {
  $('task-title').removeAttribute('aria-invalid');
  if (failedOperation?.kind === 'add') { failedOperation = null; $('add-task').textContent='Add'; }
});
$('retry').addEventListener('click',() => { if (failedOperation) save(failedOperation); });
$('empty-add').addEventListener('click',() => $('task-title').focus({preventScroll:true}));
$('completed-toggle').addEventListener('click',() => { showCompleted = !showCompleted; render(); $('completed-toggle').focus({preventScroll:true}); });
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click',() => {view = button.dataset.view; render(); window.scrollTo(0,0);}));
function openDetail(id, source) {
  const task = tasks.find(t => t.id === id); if (!task) return;
  selected = id; opener = source; sourceScroll = window.scrollY;
  const values = drafts[id] || task;
  $('detail-title').value = values.title; $('detail-notes').value = values.notes; $('detail-date').value = values.dueDate;
  $('detail-title').removeAttribute('aria-invalid');
  detailMessage(drafts[id] ? 'Your unsaved edits are here.' : task.completed ? 'Completed. You can still update the details.' : 'Make a little space for the details.');
  $('detail').showModal(); document.body.style.overflow='hidden';
  $('close-detail').focus({preventScroll:true}); render();
}
function preserveDraft() {
  if (!selected) return;
  const task=tasks.find(t => t.id === selected);
  const values={title:$('detail-title').value, notes:$('detail-notes').value, dueDate:$('detail-date').value};
  if (task && (values.title!==task.title || values.notes!==task.notes || values.dueDate!==task.dueDate)) drafts[selected]=values;
  else delete drafts[selected];
}
function closeDetail() {
  preserveDraft(); const returnId=selected;
  $('detail').close(); document.body.style.overflow=''; selected=null;
  window.scrollTo(0,sourceScroll);
  const target = opener?.isConnected ? opener : [...document.querySelectorAll('[data-open-id]')].find(el => el.dataset.openId===returnId);
  (target || $('task-title')).focus({preventScroll:true});
}
$('close-detail').addEventListener('click',closeDetail); $('detail-cancel').addEventListener('click',closeDetail);
$('detail').addEventListener('cancel', event => {event.preventDefault(); closeDetail();});
$('detail').addEventListener('click', event => { if(event.target === $('detail')) {const r=$('detail').getBoundingClientRect(); if(event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) closeDetail();} });
$('detail-form').addEventListener('input',preserveDraft);
$('detail-form').addEventListener('submit', event => {
  event.preventDefault(); if(pending) return;
  const title=$('detail-title').value.trim();
  if(!title) {detailMessage('Task title: enter a name before saving.','error'); $('detail-title').setAttribute('aria-invalid','true'); $('detail-title').focus(); return;}
  $('detail-title').removeAttribute('aria-invalid');
  preserveDraft();
  save({kind:'edit',id:selected,fields:{title,notes:$('detail-notes').value,dueDate:$('detail-date').value}});
});
window.__benchmark = {
  reset(mode) {
    if (!['seed','empty'].includes(mode)) throw new Error('Use seed or empty');
    epoch++; pending=null; failedOperation=null; failNext=false; delay=500; sequence=0;
    tasks=mode==='seed'?clone(SEED):[]; loading=false; view='today'; showCompleted=true; drafts={};
    if($('detail').open) $('detail').close(); selected=null; opener=null; document.body.style.overflow='';
    $('task-title').value=''; $('task-title').removeAttribute('aria-invalid');
    try {localStorage.setItem(STORE,JSON.stringify(tasks));} catch (_) {}
    message('Tasks stay on this device.'); render(); window.scrollTo(0,0);
    return this.getState();
  },
  setSaveDelay(milliseconds) { delay=Math.max(0,Number(milliseconds)||0); },
  failNextSave() { failNext=true; },
  getState() { return clone({tasks,view,loading,selected,status,pending,failedOperation,saveDelay:delay,failNextSave:failNext,captureDraft:$('task-title').value,detailDrafts:drafts,showCompleted}); }
};
render();
const initialEpoch=epoch;
setTimeout(() => { if(initialEpoch===epoch) {loading=false;render();} },350);
