import { ref, computed } from 'vue'
import * as authService from '../services/authService.js'

const TOKEN_KEY = 'token'
const USER_KEY = 'auth_user'

// Module-level singleton so auth state is shared across all components
const token = ref(localStorage.getItem(TOKEN_KEY) || null)
const user = ref(JSON.parse(localStorage.getItem(USER_KEY) || 'null'))

export function useAuth() {
  const isAuthenticated = computed(() => !!token.value)

  /** Attach the bearer token to a headers object — use this in api.js calls. */
  function authHeaders() {
    if (!token.value) return {}
    return { Authorization: `Bearer ${token.value}` }
  }

  /**
   * Register then automatically log the user in.
   * Throws on error — caller should catch and display the message.
   */
  async function register(username, email, password) {
    await authService.register(username, email, password)
  }

  /**
   * Log in, persist the token, and fetch user info.
   * Throws on error — caller should catch and display the message.
   */
  async function login(username, password) {
    const data = await authService.login(username, password)
    token.value = data.token
    localStorage.setItem(TOKEN_KEY, data.token)
    // Store username immediately so it's available without a whoami call
    user.value = { username, NAME: username }
    localStorage.setItem(USER_KEY, JSON.stringify({ username, NAME: username }))
    // Try to enrich with full user info from server (non-blocking)
    fetchUser()
  }

  /** Clear the session — removes token from memory and localStorage. */
  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  /** Populate `user` from the /whoami endpoint. Safe to call on app boot. */
  async function fetchUser() {
    if (!token.value) return
    try {
      const data = await authService.whoami(token.value)
      user.value = data
      localStorage.setItem(USER_KEY, JSON.stringify(data))
    } catch {
      // Token is invalid or expired — clear session
      logout()
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    authHeaders,
    register,
    login,
    logout,
    fetchUser,
  }
}
