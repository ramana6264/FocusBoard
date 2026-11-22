import { useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'

export default function TaskForm({ task, onSave, onCancel }) {
  const [form, setForm] = useState(task || { title: '', description: '', category: 'Development', status: 'To do', priority: 'Medium', dueDate: '' })
  const [error, setError] = useState('')
  const change = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
    if (error) setError('')
  }

  useEffect(() => {
    const handleEscape = (event) => event.key === 'Escape' && onCancel()
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onCancel])

  const submit = (event) => {
    event.preventDefault()
    if (!form.title.trim()) { setError('Please enter a task title.'); return }
    if (!form.dueDate) { setError('Please choose a due date.'); return }
    onSave({ ...form, title: form.title.trim(), description: form.description.trim() })
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onCancel()}>
      <form className="task-form" onSubmit={submit}>
        <div className="modal-heading">
          <div><span className="overline">{task ? 'UPDATE TASK' : 'NEW TASK'}</span><h2>{task ? 'Edit task' : 'Create a new task'}</h2></div>
          <button type="button" className="icon-button" onClick={onCancel} aria-label="Close form"><X size={19} /></button>
        </div>
        <label>Task title<input name="title" value={form.title} onChange={change} placeholder="What needs to be done?" required autoFocus /></label>
        <label>Description<textarea name="description" value={form.description} onChange={change} placeholder="Add context or details..." rows="3" /></label>
        <div className="form-grid">
          <label>Category<select name="category" value={form.category} onChange={change}>{['Development', 'Design', 'Research', 'Testing', 'Operations'].map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Due date<input name="dueDate" type="date" value={form.dueDate} onChange={change} required /></label>
          <label>Priority<select name="priority" value={form.priority} onChange={change}>{['Low', 'Medium', 'High'].map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Status<select name="status" value={form.status} onChange={change}>{['To do', 'In progress', 'Completed'].map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
        {error && <p className="form-error">{error}</p>}
        <div className="form-actions">
          <button type="button" className="secondary-button" onClick={onCancel}>Cancel</button>
          <button className="primary-button" type="submit">{task ? 'Save changes' : 'Create task'} <Check size={16} /></button>
        </div>
      </form>
    </div>
  )
}
