import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="task-search">
      <Search size={16} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search tasks..."
        aria-label="Search tasks by title"
      />
      {value && <button type="button" className="search-clear" onClick={() => onChange('')} aria-label="Clear task search"><X size={14} /></button>}
    </div>
  )
}
