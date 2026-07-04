import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { generateText, TEMPLATES, getStoredApiKey, setStoredApiKey } from '../api/aiApi.js'

const GeneratorContext = createContext(null)
const HISTORY_KEY = 'ai-content-gen:history'

function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const initialState = {
  templateId: 'blog-intro',
  prompt: '',
  model: 'claude-sonnet-5',
  variantCount: 1,
  results: [], // [{ id, status, text, error }]
  history: loadHistory(),
  apiKey: getStoredApiKey(),
  settingsOpen: false
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TEMPLATE':
      return { ...state, templateId: action.payload }
    case 'SET_PROMPT':
      return { ...state, prompt: action.payload }
    case 'SET_MODEL':
      return { ...state, model: action.payload }
    case 'SET_VARIANT_COUNT':
      return { ...state, variantCount: Math.min(4, Math.max(1, action.payload)) }
    case 'GENERATE_START':
      return { ...state, results: action.payload }
    case 'GENERATE_RESULT_UPDATE':
      return {
        ...state,
        results: state.results.map((r) =>
          r.id === action.payload.id ? { ...r, ...action.payload.patch } : r
        )
      }
    case 'ADD_HISTORY_ENTRY': {
      const history = [action.payload, ...state.history].slice(0, 50)
      return { ...state, history }
    }
    case 'CLEAR_HISTORY':
      return { ...state, history: [] }
    case 'DELETE_HISTORY_ENTRY':
      return { ...state, history: state.history.filter((h) => h.id !== action.payload) }
    case 'SET_SETTINGS_OPEN':
      return { ...state, settingsOpen: action.payload }
    case 'SET_API_KEY':
      return { ...state, apiKey: action.payload }
    default:
      return state
  }
}

export function GeneratorProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(state.history))
  }, [state.history])

  const setTemplate = useCallback((id) => dispatch({ type: 'SET_TEMPLATE', payload: id }), [])
  const setPrompt = useCallback((v) => dispatch({ type: 'SET_PROMPT', payload: v }), [])
  const setModel = useCallback((v) => dispatch({ type: 'SET_MODEL', payload: v }), [])
  const setVariantCount = useCallback((v) => dispatch({ type: 'SET_VARIANT_COUNT', payload: v }), [])
  const openSettings = useCallback(() => dispatch({ type: 'SET_SETTINGS_OPEN', payload: true }), [])
  const closeSettings = useCallback(() => dispatch({ type: 'SET_SETTINGS_OPEN', payload: false }), [])
  const clearHistory = useCallback(() => dispatch({ type: 'CLEAR_HISTORY' }), [])
  const deleteHistoryEntry = useCallback((id) => dispatch({ type: 'DELETE_HISTORY_ENTRY', payload: id }), [])

  const saveApiKey = useCallback((key) => {
    setStoredApiKey(key)
    dispatch({ type: 'SET_API_KEY', payload: key })
  }, [])

  // Kicks off `variantCount` parallel generations for the current prompt/template.
  const generate = useCallback(async () => {
    const template = TEMPLATES.find((t) => t.id === state.templateId) || TEMPLATES[0]
    const prompt = state.prompt.trim()
    if (!prompt) return

    const placeholders = Array.from({ length: state.variantCount }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      status: 'loading',
      text: '',
      error: null
    }))
    dispatch({ type: 'GENERATE_START', payload: placeholders })

    await Promise.all(
      placeholders.map(async (slot) => {
        try {
          const { text, model } = await generateText({
            prompt,
            system: template.system,
            model: state.model
          })
          dispatch({
            type: 'GENERATE_RESULT_UPDATE',
            payload: { id: slot.id, patch: { status: 'succeeded', text, model } }
          })
          dispatch({
            type: 'ADD_HISTORY_ENTRY',
            payload: {
              id: slot.id,
              prompt,
              templateId: template.id,
              templateLabel: template.label,
              text,
              model: state.model,
              createdAt: new Date().toISOString()
            }
          })
        } catch (err) {
          dispatch({
            type: 'GENERATE_RESULT_UPDATE',
            payload: { id: slot.id, patch: { status: 'failed', error: err.message } }
          })
        }
      })
    )
  }, [state.templateId, state.prompt, state.model, state.variantCount])

  const value = {
    ...state,
    templates: TEMPLATES,
    setTemplate,
    setPrompt,
    setModel,
    setVariantCount,
    generate,
    openSettings,
    closeSettings,
    saveApiKey,
    clearHistory,
    deleteHistoryEntry
  }

  return <GeneratorContext.Provider value={value}>{children}</GeneratorContext.Provider>
}

export function useGenerator() {
  const ctx = useContext(GeneratorContext)
  if (!ctx) throw new Error('useGenerator must be used within a GeneratorProvider')
  return ctx
}
