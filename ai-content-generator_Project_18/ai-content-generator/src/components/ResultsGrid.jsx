import React from 'react'
import CopyButton from './CopyButton.jsx'

function ResultCard({ result, index }) {
  return (
    <div className="manuscript">
      <div className="manuscript-header">
        <span className="manuscript-tag">Variant {index + 1}</span>
        <div className="manuscript-actions">
          {result.status === 'succeeded' && <CopyButton text={result.text} />}
        </div>
      </div>

      {result.status === 'loading' && (
        <div className="manuscript-body loading">
          Writing<span className="dots"><span /><span /><span /></span>
        </div>
      )}

      {result.status === 'failed' && (
        <div className="manuscript-body loading" style={{ color: 'var(--danger)' }}>
          {result.error}
        </div>
      )}

      {result.status === 'succeeded' && (
        <div className="manuscript-body">{result.text}</div>
      )}

      {result.status === 'succeeded' && (
        <div className="manuscript-footer">
          <span>{result.model}</span>
          <span>{result.text.split(/\s+/).filter(Boolean).length} words</span>
        </div>
      )}
    </div>
  )
}

export default function ResultsGrid({ results }) {
  if (results.length === 0) {
    return (
      <div className="results-grid">
        <div className="state-block">
          <span className="state-icon">READY</span>
          <h4>Nothing generated yet</h4>
          <p>Pick a template, write a prompt, and hit generate.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="results-grid">
      {results.map((r, i) => (
        <ResultCard key={r.id} result={r} index={i} />
      ))}
    </div>
  )
}
