import { Bell, ChevronDown, Menu, Search } from 'lucide-react'

export default function Header({ onMenu }) {
  return (
    <header className="topbar">
      <button className="menu-button" onClick={onMenu} aria-label="Open menu"><Menu size={21} /></button>
      <div className="search-global"><Search size={17} /><input placeholder="Search anything..." /></div>
      <div className="topbar-actions">
        <button className="top-icon" aria-label="Notifications"><Bell size={18} /><i /></button>
        <div className="header-avatar">AM</div>
        <ChevronDown size={16} />
      </div>
    </header>
  )
}
