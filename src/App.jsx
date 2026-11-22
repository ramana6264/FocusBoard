import React, { useMemo, useState } from 'react'
import { Archive, CheckCircle2, Clock3, ClipboardList, Plus } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import StatCard from './components/StatCard'
import FocusNotes from './components/FocusNotes'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import DeleteConfirm from './components/DeleteConfirm'
import { initialTasks } from './data/sampleTasks'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks', initialTasks)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All tasks')
  const [priorityFilter, setPriorityFilter] = useState('All priorities')
  const [modalTask, setModalTask] = useState(null)
  const [deleteTaskModal, setDeleteTaskModal] = useState(null)
  const [activeNav, setActiveNav] = useState('My Tasks')
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState('')
  const stats = useMemo(() => ({ total: tasks.length, progress: tasks.filter((task) => task.status === 'In progress').length, completed: tasks.filter((task) => task.status === 'Completed').length }), [tasks])
  const visibleTasks = tasks.filter((task) => (statusFilter === 'All tasks' || task.status === statusFilter) && (priorityFilter === 'All priorities' || task.priority === priorityFilter) && task.title.toLowerCase().includes(query.toLowerCase()))
  const saveTask = (task) => { setTasks((current) => task.id ? current.map((item) => item.id === task.id ? task : item) : [{ ...task, id: Date.now() }, ...current]); setModalTask(null); showToast(task.id ? 'Task updated' : 'Task created') }
  const showToast = (message) => { setToast(message); window.setTimeout(() => setToast(''), 2600) }
  const confirmDelete = () => {
    setTasks((current) => current.filter((item) => item.id !== deleteTaskModal.id))
    setDeleteTaskModal(null)
    showToast('Task deleted')
  }
  const updateTaskStatus = (task, status) => setTasks((current) => current.map((item) => item.id === task.id ? { ...item, status } : item))
  const resetFilters = () => {
    setQuery('')
    setStatusFilter('All tasks')
    setPriorityFilter('All priorities')
  }
  const filtersActive = query || statusFilter !== 'All tasks' || priorityFilter !== 'All priorities'
  const projectCategories = {
    'Product launch': ['Design', 'Operations'],
    'Website redesign': ['Design', 'Development'],
    'User research': ['Research', 'Testing'],
  }
  const projectTasks = projectCategories[activeNav]
    ? tasks.filter((task) => projectCategories[activeNav].includes(task.category))
    : []
  return (
    <div className="app-shell">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} activeNav={activeNav} onNav={setActiveNav} />
      <main className="main-content">
        <Header onMenu={() => setMenuOpen(true)} />
        <div className="page-content">
          <div className="page-heading">
            <div><span className="overline">MONDAY, NOVEMBER 23, 2026</span><h1>{activeNav === 'Dashboard' ? 'Task dashboard' : activeNav} <span>✦</span></h1><p>Here’s what’s happening with your tasks today.</p></div>
            {activeNav !== 'Reports' && <button className="primary-button" onClick={() => setModalTask({})}><Plus size={18} /> New task</button>}
          </div>
          <div className="stats-grid">
            <StatCard icon={ClipboardList} label="Total tasks" value={stats.total} detail="+2 this week" tone="purple" />
            <StatCard icon={Clock3} label="In progress" value={stats.progress} detail="Keep going" tone="blue" />
            <StatCard icon={CheckCircle2} label="Completed" value={stats.completed} detail={`${stats.total ? Math.round(stats.completed / stats.total * 100) : 0}% completion`} tone="green" />
            <StatCard icon={Archive} label="To do" value={tasks.filter((task) => task.status === 'To do').length} detail="On your list" tone="orange" />
          </div>
          {activeNav === 'Inbox' && (
            <section className="nav-view">
              <div className="section-heading"><div><h2>Inbox</h2><p>Tasks that still need your attention.</p></div></div>
              <div className="nav-view-list">
                {tasks.filter((task) => task.status !== 'Completed').map((task) => (
                  <button className="nav-view-item" key={task.id} onClick={() => setModalTask(task)}>
                    <span className={`nav-view-dot ${task.priority.toLowerCase()}`} />
                    <span><strong>{task.title}</strong><small>{task.status} · {task.priority} priority</small></span>
                  </button>
                ))}
              </div>
            </section>
          )}
          {activeNav === 'Calendar' && (
            <section className="nav-view">
              <div className="section-heading"><div><h2>Task calendar</h2><p>Upcoming work grouped by due date.</p></div></div>
              <div className="calendar-list">
                {[...new Set(tasks.map((task) => task.dueDate))].sort().map((date) => (
                  <div className="calendar-day" key={date}>
                    <strong>{new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</strong>
                    {tasks.filter((task) => task.dueDate === date).map((task) => (
                      <button key={task.id} onClick={() => setModalTask(task)}><span /> {task.title}</button>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          )}
          {activeNav === 'Reports' && (
            <section className="nav-view">
              <div className="section-heading"><div><h2>Reports</h2><p>Task progress at a glance.</p></div></div>
              <div className="report-grid">
                <div><span>Completion rate</span><strong>{stats.total ? Math.round(stats.completed / stats.total * 100) : 0}%</strong></div>
                <div><span>In progress</span><strong>{stats.progress}</strong></div>
                <div><span>Completed</span><strong>{stats.completed}</strong></div>
              </div>
            </section>
          )}
          {projectCategories[activeNav] && (
            <section className="nav-view">
              <div className="section-heading"><div><h2>{activeNav}</h2><p>Tasks associated with this project.</p></div></div>
              <div className="nav-view-list">
                {projectTasks.length ? projectTasks.map((task) => (
                  <button className="nav-view-item" key={task.id} onClick={() => setModalTask(task)}>
                    <span className={`nav-view-dot ${task.priority.toLowerCase()}`} />
                    <span><strong>{task.title}</strong><small>{task.status} · {task.category} · {task.priority} priority</small></span>
                  </button>
                )) : (
                  <div className="empty-state"><h3>No project tasks yet</h3><p>Create a task with one of this project's categories.</p></div>
                )}
              </div>
            </section>
          )}
          {(activeNav === 'Dashboard' || activeNav === 'My Tasks') && (
            <>
              <FocusNotes />
              <TaskList
                tasks={visibleTasks}
                query={query}
                onQuery={setQuery}
                statusFilter={statusFilter}
                onStatusFilter={setStatusFilter}
                priorityFilter={priorityFilter}
                onPriorityFilter={setPriorityFilter}
                onReset={resetFilters}
                filtersActive={Boolean(filtersActive)}
                onEdit={setModalTask}
                onDelete={setDeleteTaskModal}
                onStatusChange={updateTaskStatus}
              />
            </>
          )}
        </div>
      </main>
      {modalTask && <TaskForm task={modalTask.id ? modalTask : null} onSave={saveTask} onCancel={() => setModalTask(null)} />}
      {deleteTaskModal && <DeleteConfirm task={deleteTaskModal} onConfirm={confirmDelete} onCancel={() => setDeleteTaskModal(null)} />}
      {toast && <div className="toast"><CheckCircle2 size={17} /> {toast}</div>}
    </div>
  )
}

export default App
