import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function StatCard({ label, value, caption, Icon, tone, progress }) {
  return <article className={`stat-card ${tone}`}>
    <div className="stat-top"><span className="stat-icon"><Icon size={16} /></span><span className="stat-caption">{caption}</span></div>
    <div className="stat-bottom"><div><p>{label}</p><strong>{value}</strong></div>{progress !== undefined ? <div className="stat-ring" style={{ '--progress': `${progress}%` }} aria-label={`${progress}% complete`}><span>{progress}%</span></div> : <span className="stat-trend"><ArrowUpRight size={14} /></span>}</div>
  </article>;
}
