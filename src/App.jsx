import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Cases from './pages/Cases.jsx'
import Directory from './pages/Directory.jsx'
import NewCase from './pages/NewCase.jsx'

function App() {
  return (
    <Routes>
      <Route path="/spoc/dashboard" element={<Dashboard />} />
      <Route path="/spoc/cases" element={<Cases />} />
      <Route path="/spoc/cases/new" element={<NewCase />} />
      <Route path="/spoc/directory" element={<Directory />} />
      {/* No auth yet — everything else lands on the dashboard */}
      <Route path="*" element={<Navigate to="/spoc/dashboard" replace />} />
    </Routes>
  )
}

export default App
