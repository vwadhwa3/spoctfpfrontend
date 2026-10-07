import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* Fallback: anything else redirects to login for now */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
