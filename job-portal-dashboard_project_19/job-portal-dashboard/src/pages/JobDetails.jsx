import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useJobs } from '../context/JobsContext.jsx'
import { fetchJobs } from '../api/jobsApi.js'

export default function JobDetails() {
  const { id } = useParams()
  const { jobs, savedJobs, isSaved, toggleSaved } = useJobs()
  const [job, setJob] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const fromState = [...jobs, ...savedJobs].find((j) => String(j.id) === String(id))
    if (fromState) {
      setJob(fromState)
      setStatus('succeeded')
      return
    }

    let cancelled = false
    setStatus('loading')
    fetchJobs({})
      .then((all) => {
        if (cancelled) return
        const found = all.find((j) => String(j.id) === String(id))
        setJob(found || null)
        setStatus(found ? 'succeeded' : 'not-found')
      })
      .catch(() => !cancelled && setStatus('failed'))

    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (status === 'loading') {
    return (
      <div className="details-wrap">
        <div className="state-block">
          <div className="spinner" />
          <h4>Loading job details…</h4>
        </div>
      </div>
    )
  }

  if (status === 'not-found' || status === 'failed' || !job) {
    return (
      <div className="details-wrap">
        <Link className="back-link" to="/">← Back to board</Link>
        <div className="state-block">
          <span className="state-icon">404</span>
          <h4>Job not found</h4>
          <p>This listing may have expired or moved.</p>
        </div>
      </div>
    )
  }

  const saved = isSaved(job.id)

  return (
    <div className="details-wrap">
      <Link className="back-link" to="/">← Back to board</Link>

      <div className="details-header">
        {job.logo ? <img src={job.logo} alt="" /> : <div style={{ width: 64, height: 64 }} />}
        <div>
          <h1>{job.title}</h1>
          <div style={{ color: 'var(--text-dim)', fontSize: 14 }}>{job.company}</div>
          <div className="ticket-tags" style={{ marginTop: 10 }}>
            {job.jobType && <span className="tag type">{job.jobType.replace('_', '-')}</span>}
            {job.location && <span className="tag location">{job.location}</span>}
            {job.salary && <span className="tag">{job.salary}</span>}
            <span className="tag">{job.category}</span>
          </div>
        </div>
      </div>

      <div className="details-actions">
        <a className="btn btn-primary" href={job.url} target="_blank" rel="noreferrer">
          Apply on company site
        </a>
        <button
          className={`btn btn-ghost ${saved ? 'saved' : ''}`}
          onClick={() => toggleSaved(job)}
        >
          {saved ? '★ Saved' : '☆ Save job'}
        </button>
      </div>

      <div className="details-body" dangerouslySetInnerHTML={{ __html: job.description }} />
    </div>
  )
}
