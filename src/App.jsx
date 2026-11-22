import React, { useMemo, useState } from 'react';
import { Bell, ChevronDown, ChevronRight, Command, Plus, Search, Settings2, Sparkles } from 'lucide-react';
import Sidebar from './components/Sidebar.jsx';
import StatCard from './components/StatCard.jsx';
import FocusNotes from './components/FocusNotes.jsx';
import TaskList from './components/TaskList.jsx';
import TaskForm from './components/TaskForm.jsx';
import { sampleTasks } from './data/sampleTasks.js';
import { useLocalStorage } from './hooks/useLocalStorage.js';

export default function App() {
  const [tasks, setTasks] = useLocalStorage('focusboard.tasks.v1', sampleTasks);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All tasks');
  const [priority, setPriority] = useState('All');
  const [slide, setSlide] = useState(0);
  const [active, setActive] = useState('Overview');
  const [formTask, setFormTask] = useState(undefined);
  const [formOpen, setFormOpen] = useState(false);

  const visibleTasks = useMemo(() => tasks.filter((task) =>
    task.title.toLowerCase().includes(query.toLowerCase().trim()) &&
    (status === 'All tasks' || task.status === status) &&
    (priority === 'All' || task.priority === priority),
  ), [tasks, query, status, priority]);
  const inProgress = tasks.filter((task) => task.status === 'In progress').length;
  const completed = tasks.filter((task) => task.status === 'Completed').length;
  const completion = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  const today = new Date();
  const dateLabel = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase();
  const greeting = today.getHours() < 12 ? 'Good morning' : today.getHours() < 18 ? 'Good afternoon' : 'Good evening';

  const openCreate = () => { setFormTask(undefined); setFormOpen(true); };
  const openEdit = (task) => { setFormTask(task); setFormOpen(true); };
  const saveTask = (draft) => {
    if (formTask) setTasks((current) => current.map((task) => task.id === formTask.id ? { ...task, ...draft } : task));
    else setTasks((current) => [{ ...draft, id: globalThis.crypto?.randomUUID?.() || `task-${Date.now()}` }, ...current]);
    setFormOpen(false);
  };
  const deleteTask = (task) => { if (window.confirm(`Delete “${task.title}”? This can’t be undone.`)) setTasks((current) => current.filter((item) => item.id !== task.id)); };
  const changeStatus = (id, nextStatus) => setTasks((current) => current.map((task) => task.id === id ? { ...task, status: nextStatus } : task));
  const navigate = (label) => { setActive(label); if (label === 'My tasks') document.getElementById('my-tasks')?.scrollIntoView({ behavior: 'smooth' }); else window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return <div className="app-shell" id="overview">
    <Sidebar active={active} onNavigate={navigate} />
    <main className="main-content">
      <header className="topbar"><div className="breadcrumbs"><span>Workspace</span><ChevronRight size={14} /><strong>Overview</strong></div><div className="top-actions"><button className="command-search" onClick={() => document.querySelector('.search-box input')?.focus()}><Search size={14} /><span>Quick search</span><kbd><Command size={11} /> K</kbd></button><button className="icon-button notification" aria-label="Notifications"><Bell size={18} /><i /></button><span className="top-divider" /><button className="workspace-switch"><span className="workspace-avatar">J</span><span>Jamie’s space</span><ChevronDown size={14} /></button></div></header>
      <div className="content-wrap">
        <div className="welcome-row"><div><div className="date-label"><span className="date-dot" />{dateLabel}</div><h1>Your work, in focus<span>.</span></h1><p>{greeting}, Jamie. Let’s make today a good one.</p></div><button className="quick-create" onClick={openCreate}><Plus size={16} /><span>New task</span></button></div>
        <section className="overview-section" aria-labelledby="overview-heading"><div className="section-title-line"><div><span className="section-kicker"><Sparkles size={13} /> AT A GLANCE</span><h2 id="overview-heading">Your overview</h2></div><button className="period-select">This week <ChevronDown size={13} /></button></div>
          <div className="stats-grid">
            <StatCard label="Total tasks" value={tasks.length} caption="In your workspace" Icon={Settings2} tone="stat-lilac" />
            <StatCard label="In progress" value={inProgress} caption="Moving along" Icon={Sparkles} tone="stat-peach" />
            <StatCard label="Completed" value={completed} caption="Nice work!" Icon={Plus} tone="stat-mint" />
            <StatCard label="Completion" value={`${completion}%`} caption="You’re making progress" Icon={ChevronRight} tone="stat-blue" progress={completion} />
          </div>
        </section>
        <FocusNotes active={slide} setActive={setSlide} />
        <TaskList tasks={visibleTasks} allTasks={tasks} query={query} setQuery={setQuery} status={status} setStatus={setStatus} priority={priority} setPriority={setPriority} onCreate={openCreate} onEdit={openEdit} onDelete={deleteTask} onStatusChange={changeStatus} />
        <footer className="page-footer"><span>Made for a more focused day <span className="footer-heart">✳</span></span><span>FOCUSBOARD <i>·</i> YOUR SPACE TO DO</span></footer>
      </div>
    </main>
    {formOpen && <TaskForm task={formTask} onSave={saveTask} onClose={() => setFormOpen(false)} />}
  </div>;
}
