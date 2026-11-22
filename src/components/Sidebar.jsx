import React from 'react';
import { BarChart3, CalendarDays, Check, LayoutDashboard, ListTodo, Settings, Sparkles } from 'lucide-react';

const items = [
  { label: 'Overview', Icon: LayoutDashboard },
  { label: 'My tasks', Icon: ListTodo },
  { label: 'Calendar', Icon: CalendarDays },
  { label: 'Statistics', Icon: BarChart3 },
];

export default function Sidebar({ active, onNavigate }) {
  return <>
    <aside className="sidebar">
      <a className="brand" href="#overview" aria-label="FocusBoard home" onClick={() => onNavigate('Overview')}><span className="brand-mark"><Check size={17} strokeWidth={3} /></span><span>Focus<span className="brand-light">Board</span></span></a>
      <p className="nav-label">MENU</p>
      <nav className="side-nav" aria-label="Main navigation">
        {items.map(({ label, Icon }) => <button key={label} className={`nav-item ${active === label ? 'selected' : ''}`} onClick={() => onNavigate(label)} aria-current={active === label ? 'page' : undefined}><Icon size={17} /><span>{label}</span>{label === 'My tasks' && <span className="nav-count">7</span>}</button>)}
      </nav>
      <div className="sidebar-bottom"><div className="upgrade-card"><span className="upgrade-icon"><Sparkles size={15} /></span><strong>Make space for your best work.</strong><p>A little focus goes a long way.</p><button onClick={() => onNavigate('Overview')}>Explore FocusBoard <span>↗</span></button></div><button className={`nav-item settings-link ${active === 'Settings' ? 'selected' : ''}`} onClick={() => onNavigate('Settings')}><Settings size={17} /><span>Settings</span></button><div className="profile"><div className="avatar">JD</div><div><strong>Jamie Davis</strong><span>Personal workspace</span></div><button className="profile-more" aria-label="Profile options">···</button></div></div>
    </aside>
    <nav className="mobile-nav" aria-label="Mobile navigation">{items.slice(0, 4).map(({ label, Icon }) => <button key={label} className={active === label ? 'active' : ''} onClick={() => onNavigate(label)} aria-current={active === label ? 'page' : undefined}><Icon size={18} /><span>{label === 'Overview' ? 'Home' : label === 'My tasks' ? 'Tasks' : label}</span></button>)}</nav>
  </>;
}
