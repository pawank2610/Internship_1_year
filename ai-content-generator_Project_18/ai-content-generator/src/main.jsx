import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { GeneratorProvider } from './context/GeneratorContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GeneratorProvider>
        <App />
      </GeneratorProvider>
    </BrowserRouter>
  </React.StrictMode>
)
