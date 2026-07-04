import React, { useState } from 'react'
import { useGenerator } from '../context/GeneratorContext.jsx'

export default function SettingsModal() {
  const { settingsOpen, closeSettings, apiKey, saveApiKey } = useGenerator()
  const [draft, setDraft] = useState(apiKey)

  if (!settingsOpen) return null

  const handleSave = () => {
    saveApiKey(draft.trim())
    closeSettings()
  }

  return (
    <div className="modal-overlay" onClick={closeSettings}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>API key</h3>
        <p>
          Your key is stored only in this browser's <code>localStorage</code> and sent
          directly to Anthropic's API — it never touches any other server. Get a key at{' '}
          <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noreferrer">
            console.anthropic.com
          </a>.
        </p>
        <div className="field-group">
          <label htmlFor="api-key-input">Anthropic API key</label>
          <input
            id="api-key-input"
            type="text"
            placeholder="sk-ant-..."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
        </div>
        <div className="modal-footer">
          <button className="btn" onClick={closeSettings}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save key</button>
        </div>
      </div>
    </div>
  )
}
