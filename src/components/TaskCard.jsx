import React from 'react';
import { CalendarDays, Check, Circle, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

const formatDate = (value) => {
  if (!value) return 'No due date';
  const date = new Date(`${value}T12:00:00`);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const done = task.status === 'Completed';
  return <article className={`task-card ${done ? 'task-done' : ''}`}>
    <button className={`task-check ${done ? 'checked' : ''}`} aria-label={done ? `Mark ${task.title} as to do` : `Mark ${task.title} as completed`} onClick={() => onStatusChange(task.id, done ? 'To do' : 'Completed')}>{done ? <Check size={13} strokeWidth={3} /> : <Circle size={17} />}</button>
    <div className="task-main"><div className="task-title-line"><h3>{task.title}</h3><span className={`priority-pill priority-${task.priority.toLowerCase()}`}><i />{task.priority}</span></div><p className="task-description">{task.description || 'No description added yet.'}</p><div className="task-meta"><span className={`category-pill category-${task.category.toLowerCase()}`}>{task.category}</span><span className="due-date"><CalendarDays size={13} />{formatDate(task.dueDate)}</span></div></div>
    <label className="sr-only" htmlFor={`status-${task.id}`}>Status for {task.title}</label><select id={`status-${task.id}`} className={`status-select status-${task.status.toLowerCase().replace(' ', '-')}`} value={task.status} onChange={(e) => onStatusChange(task.id, e.target.value)}><option>To do</option><option>In progress</option><option>Completed</option></select>
    <div className="task-actions"><details className="task-menu"><summary aria-label={`Actions for ${task.title}`}><MoreHorizontal size={18} /></summary><div className="task-menu-pop"><button onClick={onEdit}><Pencil size={14} />Edit task</button><button className="delete-action" onClick={onDelete}><Trash2 size={14} />Delete task</button></div></details></div>
  </article>;
}
