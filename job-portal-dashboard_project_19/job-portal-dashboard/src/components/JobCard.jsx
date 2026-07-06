import React from 'react'
import { Link } from 'react-router-dom'
import { useJobs } from '../context/JobsContext.jsx'

const TYPE_LABELS = {
  full_time: 'Full-time',
  part_time: 'Part-time',
  contract: 'Contract',
  freelance: 'Freelance',
  internship: 'Internship'
}

function timeAgo(dateStr) {
  if (!dateStr) return ''
  const days = Math.floor((Date.now() - new Date(dateStr)) / 86400000)
  if (days <= 0) return 'today'
  if (days === 1) return '1 day ago'
  if (days < 30) return `${days} days ago`
  return `${Math.floor(days / 30)} mo ago`
}

export default function JobCard({ job }) {
  const { isSaved, toggleSaved } = useJobs()
  const saved = isSaved(job.id)

  return (
    <article className="ticket">
      <div className="ticket-main">
        <div className="ticket-id">
          <span>JOB-{String(job.id).slice(-4).padStart(4, '0')}</span>
          <span>{timeAgo(job.publicationDate)}</span>
        </div>

        <div className="ticket-top">
          {job.logo ? (
            <img className="ticket-logo" src={job.logo} alt="" />
          ) : (
            <div className="ticket-logo" />
          )}
          <div style={{ minWidth: 0 }}>
            <h4 className="ticket-title">
              <Link to={`/job/${job.id}`}>{job.title}</Link>
            </h4>
            <div className="ticket-company">{job.company}</div>
          </div>
        </div>

        <div className="ticket-tags">
          {job.jobType && <span className="tag type">{TYPE_LABELS[job.jobType] || job.jobType}</span>}
          {job.location && <span className="tag location">{job.location}</span>}
          {job.salary && <span className="tag">{job.salary}</span>}
        </div>

        <div className="ticket-footer">
          <span>{job.category}</span>
          <Link to={`/job/${job.id}`}>
            View details
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="ticket-stub">
        <button
          className={`save-btn ${saved ? 'saved' : ''}`}
          onClick={() => toggleSaved(job)}
          aria-pressed={saved}
          aria-label={saved ? 'Remove from saved jobs' : 'Save job'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
          </svg>
          {saved ? 'SAVED' : 'SAVE'}
        </button>
      </div>
    </article>
  )
}
