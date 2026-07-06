import React from 'react'
import { Link } from 'react-router-dom'
import { useJobs } from '../context/JobsContext.jsx'
import JobCard from '../components/JobCard.jsx'

export default function SavedJobs() {
  const { savedJobs } = useJobs()

  return (
    <div className="dashboard-layout" style={{ gridTemplateColumns: '1fr' }}>
      <div>
        <div className="results-meta">
          <span><strong>{savedJobs.length}</strong> saved jobs</span>
          <span>Stored locally in your browser</span>
        </div>

        {savedJobs.length === 0 ? (
          <div className="job-grid">
            <div className="state-block">
              <span className="state-icon">EMPTY</span>
              <h4>No saved jobs yet</h4>
              <p>Tap the save stub on any listing to bookmark it here.</p>
              <div style={{ marginTop: 18 }}>
                <Link className="btn btn-primary" to="/">Browse the board</Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="job-grid">
            {savedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
