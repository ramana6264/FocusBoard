const filters = ['All tasks', 'To do', 'In progress', 'Completed']

export default function FilterTabs({ value, onChange }) {
  return (
    <div className="filter-tabs">
      {filters.map((filter) => (
        <button className={value === filter ? 'active' : ''} onClick={() => onChange(filter)} key={filter}>{filter}</button>
      ))}
    </div>
  )
}
