import React from 'react';
import { ArrowLeft, ArrowRight, Check, Sparkles, Target, Trophy } from 'lucide-react';

const slides = [
  { eyebrow: 'WEDNESDAY · YOUR DAILY NOTE', title: 'Make today count.', copy: 'Small, thoughtful steps add up to something great.', tag: 'One thing at a time', percent: '65%', Icon: Target },
  { eyebrow: 'A LITTLE PROGRESS, EVERY DAY', title: 'Small steps, big progress.', copy: 'You are closer than you were yesterday. Keep going.', tag: 'Focus on progress', percent: '72%', Icon: Sparkles },
  { eyebrow: 'PAUSE AND TAKE IT IN', title: 'Celebrate the wins.', copy: 'Look how far you have come. You earned this moment.', tag: 'You did that!', percent: '88%', Icon: Trophy },
];

export default function FocusNotes({ active, setActive }) {
  const slide = slides[active];
  const move = (amount) => setActive((active + amount + slides.length) % slides.length);
  const Icon = slide.Icon;
  return <section className="focus-notes" aria-label="Focus Notes carousel" aria-roledescription="carousel">
    <div className="note-copy"><div className="note-eyebrow"><span className="live-dot" />{slide.eyebrow}</div><h2>{slide.title}</h2><p>{slide.copy}</p><div className="note-progress"><span /></div><span className="progress-label">A little progress goes a long way <b>{slide.percent}</b></span></div>
    <div className="note-art" aria-hidden="true"><div className="mini-check"><Check size={12} /></div><div className="mini-icon"><Icon size={18} /></div><div className="mini-card"><span>Today’s focus</span><strong>{slide.tag}</strong><i><b /></i></div><span className="spark spark-one">✦</span><span className="spark spark-two">✧</span></div>
    <div className="carousel-controls"><button onClick={() => move(-1)} aria-label="Previous focus note"><ArrowLeft size={15} /></button><button className="next" onClick={() => move(1)} aria-label="Next focus note"><ArrowRight size={16} /></button></div>
    <div className="carousel-dots" role="group" aria-label="Choose focus note">{slides.map((item, i) => <button key={item.title} className={i === active ? 'active' : ''} aria-label={`Show note ${i + 1}: ${item.title}`} aria-current={i === active ? 'true' : undefined} onClick={() => setActive(i)} />)}</div>
  </section>;
}
