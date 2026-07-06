import React from 'react'
import SearchBar from '../components/SearchBar.jsx'
import FilterPanel from '../components/FilterPanel.jsx'
import JobList from '../components/JobList.jsx'
import { useJobs } from '../context/JobsContext.jsx'

export default function Dashboard() {
  const { visibleJobs, status, error } = useJobs()

  return (
    <div className="dashboard-layout">
      <FilterPanel />
      <div>
        <SearchBar />
        <div className="results-meta">
          <span><strong>{visibleJobs.length}</strong> open roles</span>
          <span>Live from Remotive API</span>
        </div>
        <JobList jobs={visibleJobs} status={status} error={error} />
      </div>
    </div>
  )
}
