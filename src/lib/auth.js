export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3003'
export const LOGIN_URL = import.meta.env.VITE_LOGIN_URL ?? 'http://localhost:5173/'

const TOKEN_KEY = 'token'

// The login app redirects here with { token, role, userId } as JSON in
// window.name. Move the token to localStorage and always clear window.name
// so the token doesn't stay readable by whatever page this tab opens next.
export function saveTokenFromLogin() {
  if (!window.name) return

  let handoff
  try {
    handoff = JSON.parse(window.name)
  } catch {
    handoff = null
  } finally {
    window.name = ''
  }

  if (handoff && handoff.token) {
    localStorage.setItem(TOKEN_KEY, handoff.token)
  }
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

// The backend reads the token from the Authorization header.
export function authHeaders() {
  const token = getToken()
  if (!token) return {}
  return { Authorization: `Bearer ${token}` }
}

export async function verifySession(signal) {
  const res = await fetch(`${API_URL}/api/auth/verify`, {
    headers: authHeaders(),
    signal,
  })
  if (res.status === 401) clearToken()
  if (!res.ok) return null
  const body = await res.json()
  return body.success ? body.data.user : null
}
