import React from 'react'
import { useJobs } from '../context/JobsContext.jsx'
import { CATEGORIES, JOB_TYPES } from '../api/jobsApi.js'

const TYPE_LABELS = {
  full_time: 'Full-time',
  part_time: 'Part-time',
  contract: 'Contract',
  freelance: 'Freelance',
  internship: 'Internship'
}

export default function FilterPanel() {
  const { category, setCategory, jobType, setJobType, resetFilters } = useJobs()

  return (
    <aside className="filter-panel">
      <h3>Filters</h3>

      <div className="filter-group">
        <label htmlFor="category-select">Category</label>
        <select
          id="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Job type</label>
        <div className="chip-group">
          {JOB_TYPES.map((t) => (
            <button
              key={t}
              className={`chip ${jobType === t ? 'active' : ''}`}
              onClick={() => setJobType(jobType === t ? '' : t)}
            >
              {TYPE_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      <button className="reset-btn" onClick={resetFilters}>Clear all filters</button>
    </aside>
  )
}
