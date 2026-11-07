import { API_URL, authHeaders } from './auth.js'

/** A failed backend call. `details` is the backend's list of { field, message }, when it sent one. */
export class ApiError extends Error {
  constructor(message, { status = null, code = null, details = [] } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.details = details
  }
}

// Every backend response is { success, data } or { success: false, error, message, details? }.
// The token from localStorage goes in the Authorization header, the same way verifySession sends it.
async function request(path, init) {
  const headers = { ...authHeaders(), ...init.headers }
  let res
  try {
    res = await fetch(`${API_URL}${path}`, { ...init, headers })
  } catch (err) {
    if (err.name === 'AbortError') throw err
    throw new ApiError('Could not reach the server. Check your connection and try again.')
  }

  const body = await res.json().catch(() => null)
  if (!res.ok || !body?.success) {
    throw new ApiError(body?.message ?? `Request failed (${res.status})`, {
      status: res.status,
      code: body?.error ?? null,
      details: body?.details ?? [],
    })
  }
  return body.data
}

export function apiGet(path, params, signal) {
  const query = params ? `?${new URLSearchParams(params)}` : ''
  return request(`${path}${query}`, { signal })
}

/** `body` is sent as-is, so FormData goes out as multipart. */
export function apiPost(path, body) {
  return request(path, { method: 'POST', body })
}

// FormData goes out as multipart, anything else as JSON.
function send(method, path, body) {
  if (body instanceof FormData) return request(path, { method, body })
  return request(path, { method, body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })
}

export function apiPatch(path, body) {
  return send('PATCH', path, body)
}

export function apiDelete(path) {
  return request(path, { method: 'DELETE' })
}
