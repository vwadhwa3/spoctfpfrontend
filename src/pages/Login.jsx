import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const LOGO_URL = '/logo.svg'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    // TODO: wire up authentication
    navigate('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
      {/* Card */}
      <div className="w-full max-w-md rounded-sm border border-black bg-white p-8 shadow-[0_2px_10px_rgba(0,0,0,0.15)] sm:p-10">
        {/* Logo — middle top */}
        <img
          src={LOGO_URL}
          alt="Logo"
          className="mx-auto mb-5 h-16 w-auto object-contain"
        />

        {/* Heading + secondary text */}
        <h1 className="text-center text-xl font-bold text-primary">
          Visa Management Portal
        </h1>
        <p className="mb-8 mt-1 text-center text-sm text-neutral-500">
          Manage and track Visa
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="mb-1.5 block text-sm font-semibold text-neutral-800"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-none border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Enter your username"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-semibold text-neutral-800"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-none border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Enter your password"
            />
          </div>

          {/* Login button — squared, label + right arrow */}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-none bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Login
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
