import { Check, ChevronRight, Grid2X2, Inbox, LayoutDashboard, CalendarDays, ClipboardList, Plus, Settings, Sparkles, X, MoreHorizontal } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'My Tasks', icon: ClipboardList },
  { label: 'Inbox', icon: Inbox, badge: 3 },
  { label: 'Calendar', icon: CalendarDays },
  { label: 'Reports', icon: Grid2X2 },
]

export default function Sidebar({ open, onClose, activeNav, onNav }) {
  return (
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="brand">
        <span className="brand-mark"><Check size={17} strokeWidth={3} /></span>
        <span>Focus<span>Board</span></span>
        <button className="mobile-close" onClick={onClose} aria-label="Close menu"><X size={19} /></button>
      </div>
      <nav>
        <p className="nav-label">Workspace</p>
        {navItems.map(({ label, icon: Icon, active, badge }) => (
          <button
            className={`nav-item ${activeNav === label ? 'active' : ''}`}
            key={label}
            onClick={() => { onNav(label); onClose() }}
          >
            <Icon size={18} /><span>{label}</span>{badge && <small>{badge}</small>}
          </button>
        ))}
        <p className="nav-label projects-label">Projects <Plus size={14} /></p>
        {[
          { label: 'Product launch', dot: 'teal' },
          { label: 'Website redesign', dot: 'purple' },
          { label: 'User research', dot: 'orange' },
        ].map((project) => (
          <button
            className={`project-item ${activeNav === project.label ? 'active' : ''}`}
            key={project.label}
            onClick={() => { onNav(project.label); onClose() }}
          >
            <i className={`dot ${project.dot}`} /> {project.label}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="nav-item"><Settings size={18} /><span>Settings</span></button>
        <div className="upgrade-card"><Sparkles size={18} /><strong>Stay focused</strong><span>Make progress on what matters.</span><button>Learn more <ChevronRight size={14} /></button></div>
        <div className="user-mini"><div className="avatar">AM</div><div><strong>Alex Morgan</strong><span>Personal workspace</span></div><MoreHorizontal size={17} /></div>
      </div>
    </aside>
  )
}
