import React from 'react'
import JobCard from './JobCard.jsx'

export default function JobList({ jobs, status, error }) {
  if (status === 'loading') {
    return (
      <div className="job-grid">
        <div className="state-block">
          <div className="spinner" />
          <h4>Pulling the latest listings…</h4>
          <p>Contacting the job feed API.</p>
        </div>
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="job-grid">
        <div className="state-block">
          <span className="state-icon">ERR-500</span>
          <h4>Couldn't load jobs</h4>
          <p>{error || 'Something went wrong while reaching the API.'}</p>
        </div>
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <div className="job-grid">
        <div className="state-block">
          <span className="state-icon">NO-MATCH</span>
          <h4>No jobs match your filters</h4>
          <p>Try a different keyword or clear a filter.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="job-grid">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}
