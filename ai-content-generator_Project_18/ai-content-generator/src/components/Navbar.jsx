import React from 'react'
import { NavLink } from 'react-router-dom'
import { useGenerator } from '../context/GeneratorContext.jsx'

export default function Navbar() {
  const { history, openSettings, apiKey } = useGenerator()

  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-mark">AI</span>
        Manuscript
        <span className="brand-sub">Content Generator</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Generate
          </NavLink>
          <NavLink to="/history" className={({ isActive }) => (isActive ? 'active' : '')}>
            History
            {history.length > 0 && <span className="nav-badge">{history.length}</span>}
          </NavLink>
        </nav>
        <button className="icon-btn" onClick={openSettings}>
          {apiKey ? '● API key set' : '○ Add API key'}
        </button>
      </div>
    </header>
  )
}
