import React from 'react';
import { ListFilter, Search, SlidersHorizontal } from 'lucide-react';
import TaskCard from './TaskCard.jsx';

const tabs = ['All tasks', 'To do', 'In progress', 'Completed'];

export default function TaskList({ tasks, allTasks, query, setQuery, status, setStatus, priority, setPriority, onCreate, onEdit, onDelete, onStatusChange }) {
  const counts = Object.fromEntries(tabs.map((tab) => [tab, tab === 'All tasks' ? allTasks.length : allTasks.filter((task) => task.status === tab).length]));
  return <section className="tasks-section" id="my-tasks" aria-labelledby="tasks-heading">
    <div className="section-heading"><div><span className="section-kicker"><ListFilter size={13} /> YOUR WORKSPACE</span><h2 id="tasks-heading">My tasks <span className="task-total">{allTasks.length}</span></h2><p>A little progress, one task at a time.</p></div><button className="button-primary add-task" onClick={onCreate}><span>＋</span> New task</button></div>
    <div className="task-toolbar"><div className="tabs" role="tablist" aria-label="Filter by task status">{tabs.map((tab) => <button key={tab} role="tab" aria-selected={status === tab} className={status === tab ? 'active' : ''} onClick={() => setStatus(tab)}>{tab}<span>{counts[tab]}</span></button>)}</div><div className="filters"><label className="search-box"><Search size={15} /><span className="sr-only">Search task titles</span><input type="search" placeholder="Search tasks..." value={query} onChange={(e) => setQuery(e.target.value)} /></label><label className="priority-filter"><SlidersHorizontal size={14} /><span className="sr-only">Filter by priority</span><select value={priority} onChange={(e) => setPriority(e.target.value)}><option value="All">Priority: All</option><option>High</option><option>Medium</option><option>Low</option></select></label></div></div>
    <div className="task-list">{tasks.length ? tasks.map((task) => <TaskCard key={task.id} task={task} onEdit={() => onEdit(task)} onDelete={() => onDelete(task)} onStatusChange={onStatusChange} />) : <div className="empty-state"><div className="empty-icon"><Search size={19} /></div><strong>{allTasks.length ? 'No tasks match those filters.' : 'Your task list is clear.'}</strong><p>{allTasks.length ? 'Try another search or filter.' : 'Add a task when you’re ready to get started.'}</p>{!allTasks.length && <button className="button-primary" onClick={onCreate}>Create a task</button>}</div>}</div>
    <div className="list-footer"><span>Showing <b>{tasks.length}</b> of <b>{allTasks.length}</b> tasks</span><button onClick={() => { setStatus('All tasks'); setPriority('All'); setQuery(''); }}>Clear filters</button></div>
  </section>;
}
