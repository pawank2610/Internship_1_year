import React from 'react'
import { useGenerator } from '../context/GeneratorContext.jsx'
import CopyButton from '../components/CopyButton.jsx'

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function History() {
  const { history, deleteHistoryEntry, clearHistory } = useGenerator()

  return (
    <div className="generator-layout" style={{ gridTemplateColumns: '1fr' }}>
      <div>
        <div className="results-meta">
          <span><strong>{history.length}</strong> past generations</span>
          {history.length > 0 && (
            <button className="icon-btn" onClick={clearHistory}>Clear history</button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="results-grid">
            <div className="state-block">
              <span className="state-icon">EMPTY</span>
              <h4>No generations yet</h4>
              <p>Everything you generate is saved here automatically, stored locally in your browser.</p>
            </div>
          </div>
        ) : (
          <div className="history-list">
            {history.map((h) => (
              <div className="history-item" key={h.id}>
                <div className="history-item-head">
                  <span>{h.templateLabel} · {h.model}</span>
                  <span>{formatDate(h.createdAt)}</span>
                </div>
                <div className="history-prompt">"{h.prompt}"</div>
                <div className="history-output">{h.text}</div>
                <div className="history-actions">
                  <CopyButton text={h.text} />
                  <button className="copy-btn" onClick={() => deleteHistoryEntry(h.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
