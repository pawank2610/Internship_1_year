import React from 'react'
import { NavLink } from 'react-router-dom'
import { useJobs } from '../context/JobsContext.jsx'

export default function Navbar() {
  const { savedJobs } = useJobs()

  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">JP</div>
        Dispatch
        <span className="brand-sub">Job Portal</span>
      </div>
      <nav className="nav-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Board
        </NavLink>
        <NavLink to="/saved" className={({ isActive }) => (isActive ? 'active' : '')}>
          Saved
          {savedJobs.length > 0 && <span className="nav-badge">{savedJobs.length}</span>}
        </NavLink>
      </nav>
    </header>
  )
}
