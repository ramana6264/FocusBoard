import { ChevronDown, ListFilter, MoreHorizontal, Search } from 'lucide-react'
import SearchBar from './SearchBar'
import FilterTabs from './FilterTabs'
import TaskCard from './TaskCard'

export default function TaskList({ tasks, query, onQuery, statusFilter, onStatusFilter, priorityFilter, onPriorityFilter, onReset, filtersActive, onEdit, onDelete, onStatusChange }) {
  return (
    <section className="tasks-section">
      <div className="section-heading">
        <div><h2>My tasks</h2><p>Stay on top of your priorities.</p></div>
        <button className="more-button" aria-label="More task options"><MoreHorizontal size={19} /></button>
      </div>
      <div className="toolbar">
        <SearchBar value={query} onChange={onQuery} />
        <FilterTabs value={statusFilter} onChange={onStatusFilter} />
        <label className="priority-filter">
          <ListFilter size={16} />
          <select value={priorityFilter} onChange={(event) => onPriorityFilter(event.target.value)}>
            <option>All priorities</option><option>High</option><option>Medium</option><option>Low</option>
          </select>
          <ChevronDown size={14} />
        </label>
        {filtersActive && <button type="button" className="reset-filters" onClick={onReset}>Reset filters</button>}
      </div>
      <div className="task-list">
        {tasks.length ? tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} />
        )) : (
          <div className="empty-state"><Search size={26} /><h3>No tasks found</h3><p>Try changing your search or filters.</p></div>
        )}
      </div>
    </section>
  )
}
