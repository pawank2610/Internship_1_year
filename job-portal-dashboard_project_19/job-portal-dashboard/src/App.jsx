import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import JobDetails from './pages/JobDetails.jsx'
import SavedJobs from './pages/SavedJobs.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/saved" element={<SavedJobs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer className="footer">DISPATCH JOB BOARD — POWERED BY REMOTIVE API</footer>
    </div>
  )
}
