import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import SettingsModal from './components/SettingsModal.jsx'
import Generator from './pages/Generator.jsx'
import History from './pages/History.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<Generator />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SettingsModal />
      <footer className="footer">MANUSCRIPT AI GENERATOR — POWERED BY THE ANTHROPIC API</footer>
    </div>
  )
}
