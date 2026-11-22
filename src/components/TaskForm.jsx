import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const emptyTask = { title: '', description: '', category: 'Design', status: 'To do', priority: 'Medium', dueDate: '' };

export default function TaskForm({ task, onSave, onClose }) {
  const [form, setForm] = useState(task || emptyTask);
  const [error, setError] = useState('');
  useEffect(() => { setForm(task || emptyTask); setError(''); }, [task]);
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = (event) => { event.preventDefault(); if (!form.title.trim()) { setError('Add a title so you can find this task later.'); return; } onSave({ ...form, title: form.title.trim(), description: form.description.trim() }); };

  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <section className="task-modal" role="dialog" aria-modal="true" aria-labelledby="form-title">
      <div className="modal-heading"><div><span className="form-kicker">YOUR WORKSPACE</span><h2 id="form-title">{task ? 'Edit task' : 'Create new task'}</h2><p>Make a little room for what matters.</p></div><button className="icon-button close-modal" onClick={onClose} aria-label="Close task form"><X size={19} /></button></div>
      <form onSubmit={submit} noValidate>
        <label className="field-label" htmlFor="task-title">Task title <span>*</span></label><input id="task-title" name="title" value={form.title} onChange={update} placeholder="e.g. Design landing page" autoFocus />{error && <p className="field-error" role="alert">{error}</p>}
        <label className="field-label" htmlFor="task-description">Description <small>OPTIONAL</small></label><textarea id="task-description" name="description" value={form.description} onChange={update} placeholder="Add a few details about this task..." rows="3" />
        <div className="form-grid"><div><label className="field-label" htmlFor="task-status">Status</label><select id="task-status" name="status" value={form.status} onChange={update}><option>To do</option><option>In progress</option><option>Completed</option></select></div><div><label className="field-label" htmlFor="task-priority">Priority</label><select id="task-priority" name="priority" value={form.priority} onChange={update}><option>Low</option><option>Medium</option><option>High</option></select></div></div>
        <div className="form-grid"><div><label className="field-label" htmlFor="task-category">Category</label><select id="task-category" name="category" value={form.category} onChange={update}>{['Design', 'Development', 'Research', 'Testing', 'Planning', 'Content', 'Personal'].map((category) => <option key={category}>{category}</option>)}</select></div><div><label className="field-label" htmlFor="task-date">Due date</label><input id="task-date" type="date" name="dueDate" value={form.dueDate} onChange={update} /></div></div>
        <div className="form-actions"><button type="button" className="button-secondary" onClick={onClose}>Cancel</button><button type="submit" className="button-primary">{task ? 'Save changes' : 'Create task'} <span>→</span></button></div>
      </form>
    </section>
  </div>;
}
