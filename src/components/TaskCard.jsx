import { CalendarDays, Check, Pencil, Tag, Trash2 } from 'lucide-react'

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const date = new Date(`${task.dueDate}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <article className="task-row">
      <button
        className={`check-task ${task.status === 'Completed' ? 'done' : ''}`}
        onClick={() => onStatusChange(task)}
        aria-label={`Mark ${task.title} ${task.status === 'Completed' ? 'to do' : 'completed'}`}
      >
        {task.status === 'Completed' && <Check size={13} />}
      </button>
      <div className="task-main">
        <h3 className={task.status === 'Completed' ? 'completed-title' : ''}>{task.title}</h3>
        <p>{task.description}</p>
        <div className="task-meta"><span><Tag size={13} /> {task.category}</span><span><CalendarDays size={13} /> {date}</span></div>
      </div>
      <span className={`priority ${task.priority.toLowerCase()}`}><i /> {task.priority}</span>
      <label className="status-control">
        <span className="sr-only">Status for {task.title}</span>
        <select
          className={`status-pill ${task.status.toLowerCase().replaceAll(' ', '-')}`}
          value={task.status}
          onChange={(event) => onStatusChange(task, event.target.value)}
          aria-label={`Status for ${task.title}`}
        >
          <option>To do</option>
          <option>In progress</option>
          <option>Completed</option>
        </select>
      </label>
      <div className="task-actions">
        <button onClick={() => onEdit(task)} aria-label="Edit task"><Pencil size={15} /></button>
        <button onClick={() => onDelete(task)} aria-label="Delete task"><Trash2 size={15} /></button>
      </div>
    </article>
  )
}
