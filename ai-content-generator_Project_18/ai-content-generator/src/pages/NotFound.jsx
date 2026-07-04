import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="generator-layout" style={{ gridTemplateColumns: '1fr' }}>
      <div className="results-grid">
        <div className="state-block">
          <span className="state-icon">404</span>
          <h4>Page not found</h4>
          <p>The route you're looking for doesn't exist.</p>
          <div style={{ marginTop: 18 }}>
            <Link className="btn btn-primary" to="/">Back to generator</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
