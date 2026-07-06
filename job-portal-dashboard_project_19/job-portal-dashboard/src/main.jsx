import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { JobsProvider } from './context/JobsContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <JobsProvider>
        <App />
      </JobsProvider>
    </BrowserRouter>
  </React.StrictMode>
)
