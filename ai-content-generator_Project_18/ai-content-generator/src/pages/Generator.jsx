import React from 'react'
import PromptForm from '../components/PromptForm.jsx'
import ResultsGrid from '../components/ResultsGrid.jsx'
import { useGenerator } from '../context/GeneratorContext.jsx'

export default function Generator() {
  const { results, prompt } = useGenerator()

  return (
    <div className="generator-layout">
      <PromptForm />
      <div>
        <div className="results-meta">
          <span>
            <strong>{results.filter((r) => r.status === 'succeeded').length}</strong> of {results.length || 0} generated
          </span>
          <span>{prompt ? `${prompt.length} chars in prompt` : 'Anthropic Messages API'}</span>
        </div>
        <ResultsGrid results={results} />
      </div>
    </div>
  )
}
