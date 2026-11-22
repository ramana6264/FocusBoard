import { useEffect } from 'react'
import { Trash2, X } from 'lucide-react'

export default function DeleteConfirm({ task, onConfirm, onCancel }) {
  useEffect(() => {
    const handleEscape = (event) => event.key === 'Escape' && onCancel()
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onCancel])

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onCancel()}>
      <div className="confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="delete-title" aria-describedby="delete-description">
        <button type="button" className="icon-button confirm-close" onClick={onCancel} aria-label="Close confirmation"><X size={19} /></button>
        <div className="confirm-icon"><Trash2 size={21} /></div>
        <h2 id="delete-title">Delete task?</h2>
        <p id="delete-description">“{task.title}” will be permanently removed.</p>
        <div className="form-actions">
          <button type="button" className="secondary-button" onClick={onCancel}>Cancel</button>
          <button type="button" className="danger-button" onClick={onConfirm}><Trash2 size={15} /> Delete task</button>
        </div>
      </div>
    </div>
  )
}
