import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Cases from './pages/Cases.jsx'

function App() {
  return (
    <Routes>
      <Route path="/spoc/dashboard" element={<Dashboard />} />
      <Route path="/spoc/cases" element={<Cases />} />
      {/* Fallback: anything else redirects to login for now */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
