const API_BASE = 'http://localhost:3000/api'

/** Safely parse JSON — if the server returns HTML (e.g. a 404 page), throw a clean error. */
async function parseJSON(res, fallbackMsg) {
  try {
    return await res.json()
  } catch {
    throw new Error(fallbackMsg)
  }
}

/**
 * Register a new user.
 * POST /api/register
 * Body: { username, email, password }
 * Returns the server response (varies — check res.ok for success).
 */
export async function register(username, email, password) {
  let res
  try {
    res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    })
  } catch {
    throw new Error('Could not reach the server. Please try again later.')
  }
  const data = await parseJSON(res, 'Registration failed')
  if (!res.ok) throw new Error(data.message || data.error || 'Registration failed')
  return data
}

/**
 * Log in an existing user.
 * POST /api/login
 * Body: { username, password }
 * Returns: { token: string }
 */
export async function login(username, password) {
  let res
  try {
    res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
  } catch {
    throw new Error('Could not reach the server. Please try again later.')
  }
  const data = await parseJSON(res, 'Login failed')
  if (!res.ok) throw new Error(data.message || data.error || 'Invalid username or password')
  if (!data.token) throw new Error('No token returned from server')
  return data
}

/**
 * Fetch the currently authenticated user's info.
 * GET /api/whoami
 * Requires: Authorization: Bearer <token>
 */
export async function whoami(token) {
  const res = await fetch(`${API_BASE}/whoami`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || data.error || 'Unauthorized')
  return data
}
