import React, { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from 'react'
import { fetchJobs } from '../api/jobsApi.js'

const JobsContext = createContext(null)
const SAVED_JOBS_KEY = 'job-portal:saved-jobs'

const initialState = {
  jobs: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
  searchTerm: '',
  category: '',
  jobType: '',
  sortBy: 'newest', // newest | title
  savedJobs: loadSavedJobs()
}

function loadSavedJobs() {
  try {
    const raw = localStorage.getItem(SAVED_JOBS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, status: 'loading', error: null }
    case 'FETCH_SUCCESS':
      return { ...state, status: 'succeeded', jobs: action.payload }
    case 'FETCH_ERROR':
      return { ...state, status: 'failed', error: action.payload }
    case 'SET_SEARCH':
      return { ...state, searchTerm: action.payload }
    case 'SET_CATEGORY':
      return { ...state, category: action.payload }
    case 'SET_JOB_TYPE':
      return { ...state, jobType: action.payload }
    case 'SET_SORT':
      return { ...state, sortBy: action.payload }
    case 'RESET_FILTERS':
      return { ...state, searchTerm: '', category: '', jobType: '', sortBy: 'newest' }
    case 'TOGGLE_SAVED': {
      const job = action.payload
      const exists = state.savedJobs.some(j => j.id === job.id)
      const savedJobs = exists
        ? state.savedJobs.filter(j => j.id !== job.id)
        : [...state.savedJobs, job]
      return { ...state, savedJobs }
    }
    default:
      return state
  }
}

export function JobsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Persist saved jobs whenever they change
  useEffect(() => {
    localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(state.savedJobs))
  }, [state.savedJobs])

  // Refetch from the API whenever search term or category changes (debounced search)
  useEffect(() => {
    const controller = new AbortController()
    const timeout = setTimeout(async () => {
      dispatch({ type: 'FETCH_START' })
      try {
        const jobs = await fetchJobs({ search: state.searchTerm, category: state.category })
        dispatch({ type: 'FETCH_SUCCESS', payload: jobs })
      } catch (err) {
        if (err.name !== 'AbortError') {
          dispatch({ type: 'FETCH_ERROR', payload: err.message })
        }
      }
    }, state.searchTerm ? 400 : 0) // debounce free-text search only

    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [state.searchTerm, state.category])

  const isSaved = useCallback(
    (id) => state.savedJobs.some(j => j.id === id),
    [state.savedJobs]
  )

  const toggleSaved = useCallback((job) => {
    dispatch({ type: 'TOGGLE_SAVED', payload: job })
  }, [])

  // Client-side filtering (job type) + sorting on top of the API results
  const visibleJobs = useMemo(() => {
    let list = state.jobs
    if (state.jobType) {
      list = list.filter(j => j.jobType === state.jobType)
    }
    list = [...list].sort((a, b) => {
      if (state.sortBy === 'title') return a.title.localeCompare(b.title)
      return new Date(b.publicationDate) - new Date(a.publicationDate)
    })
    return list
  }, [state.jobs, state.jobType, state.sortBy])

  const value = {
    ...state,
    visibleJobs,
    isSaved,
    toggleSaved,
    setSearch: (v) => dispatch({ type: 'SET_SEARCH', payload: v }),
    setCategory: (v) => dispatch({ type: 'SET_CATEGORY', payload: v }),
    setJobType: (v) => dispatch({ type: 'SET_JOB_TYPE', payload: v }),
    setSort: (v) => dispatch({ type: 'SET_SORT', payload: v }),
    resetFilters: () => dispatch({ type: 'RESET_FILTERS' })
  }

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>
}

export function useJobs() {
  const ctx = useContext(JobsContext)
  if (!ctx) throw new Error('useJobs must be used within a JobsProvider')
  return ctx
}
