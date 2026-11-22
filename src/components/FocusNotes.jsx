import { useState } from 'react'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

const notes = [
  { eyebrow: 'FOCUS NOTE · 1 OF 3', title: 'Plan your day with intention.', text: 'Start with one meaningful priority. Small, consistent progress is how big work gets done.', accent: 'violet' },
  { eyebrow: 'FOCUS NOTE · 2 OF 3', title: 'Make space for deep work.', text: 'Protect your best hours from distractions and give important ideas room to grow.', accent: 'blue' },
  { eyebrow: 'FOCUS NOTE · 3 OF 3', title: 'Celebrate every milestone.', text: 'A completed task is momentum. Take a moment to notice what you have accomplished.', accent: 'orange' },
]

export default function FocusNotes() {
  const [active, setActive] = useState(0)
  const move = (amount) => setActive((active + amount + notes.length) % notes.length)
  const note = notes[active]

  return (
    <section className={`focus-note ${note.accent}`} aria-roledescription="carousel" aria-label="Focus Notes">
      <div className="note-glow" />
      <div className="note-copy">
        <span>{note.eyebrow}</span><h2>{note.title}</h2><p>{note.text}</p>
        <div className="note-controls">
          <button onClick={() => move(-1)} aria-label="Previous note"><ChevronLeft size={17} /></button>
          <div className="indicators">{notes.map((item, index) => <button key={item.eyebrow} className={index === active ? 'selected' : ''} onClick={() => setActive(index)} aria-label={`Show note ${index + 1}`} />)}</div>
          <button onClick={() => move(1)} aria-label="Next note"><ChevronRight size={17} /></button>
        </div>
      </div>
      <div className="note-illustration"><Sparkles size={34} /><span>FOCUS<br />FORWARD</span></div>
    </section>
  )
}
