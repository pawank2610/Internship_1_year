import React from 'react'
import { useGenerator } from '../context/GeneratorContext.jsx'
import { MODELS } from '../api/aiApi.js'

export default function PromptForm() {
  const {
    templates, templateId, setTemplate,
    prompt, setPrompt,
    model, setModel,
    variantCount, setVariantCount,
    generate, results, apiKey, openSettings
  } = useGenerator()

  const activeTemplate = templates.find((t) => t.id === templateId) || templates[0]
  const isGenerating = results.some((r) => r.status === 'loading')

  const handleSubmit = (e) => {
    e.preventDefault()
    generate()
  }

  return (
    <aside className="prompt-panel">
      <h3>Prompt</h3>

      <div className="template-tabs">
        {templates.map((t) => (
          <button
            key={t.id}
            className={`template-chip ${templateId === t.id ? 'active' : ''}`}
            onClick={() => setTemplate(t.id)}
            type="button"
          >
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="field-group">
          <label htmlFor="prompt-input">What should it write?</label>
          <textarea
            id="prompt-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={activeTemplate.placeholder}
          />
        </div>

        <div className="row-2">
          <div className="field-group">
            <label htmlFor="model-select">Model</label>
            <select id="model-select" value={model} onChange={(e) => setModel(e.target.value)}>
              {MODELS.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>
          <div className="field-group">
            <label>Variants</label>
            <div className="variant-stepper">
              <button type="button" onClick={() => setVariantCount(variantCount - 1)} disabled={variantCount <= 1}>−</button>
              <span>{variantCount}</span>
              <button type="button" onClick={() => setVariantCount(variantCount + 1)} disabled={variantCount >= 4}>+</button>
            </div>
          </div>
        </div>

        <button className="generate-btn" type="submit" disabled={!prompt.trim() || isGenerating}>
          {isGenerating ? (
            <>Generating<span className="dots"><span /><span /><span /></span></>
          ) : (
            <>Generate {variantCount > 1 ? `${variantCount} variants` : 'text'}</>
          )}
        </button>

        {!apiKey && (
          <div className="key-warning">
            No API key set. <a href="#" onClick={(e) => { e.preventDefault(); openSettings() }}>Add your Anthropic API key</a> to start generating.
          </div>
        )}
      </form>
    </aside>
  )
}
