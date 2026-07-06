import React from 'react'
import { useJobs } from '../context/JobsContext.jsx'

export default function SearchBar() {
  const { searchTerm, setSearch, sortBy, setSort } = useJobs()

  return (
    <div className="search-row">
      <div className="search-box">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search by title, company, or keyword..."
          value={searchTerm}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <select className="sort-select" value={sortBy} onChange={(e) => setSort(e.target.value)}>
        <option value="newest">Newest first</option>
        <option value="title">Title A–Z</option>
      </select>
    </div>
  )
}
