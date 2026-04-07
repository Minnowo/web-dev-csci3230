<template>
  <AuthCard title="Create an account" subtitle="Start building your knowledge base">
    <form class="auth-form" @submit.prevent="handleSubmit">
      <!-- Success banner -->
      <div v-if="successMsg" class="auth-success">
        <CheckCircle class="w-4 h-4 shrink-0" />
        {{ successMsg }}
      </div>

      <!-- Error banner -->
      <div v-if="errorMsg" class="auth-error">
        <AlertCircle class="w-4 h-4 shrink-0" />
        {{ errorMsg }}
      </div>

      <AuthInput
        v-model="username"
        label="Username"
        placeholder="Choose a username"
        :icon="User"
        :error="errors.username"
        autocomplete="username"
        @submit="handleSubmit"
      />

      <AuthInput
        v-model="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        :icon="Mail"
        :error="errors.email"
        autocomplete="email"
        @submit="handleSubmit"
      />

      <AuthInput
        v-model="password"
        label="Password"
        type="password"
        placeholder="Create a password"
        :icon="Lock"
        :error="errors.password"
        autocomplete="new-password"
        @submit="handleSubmit"
      />

      <AuthInput
        v-model="confirmPassword"
        label="Confirm password"
        type="password"
        placeholder="Repeat your password"
        :icon="Lock"
        :error="errors.confirmPassword"
        autocomplete="new-password"
        @submit="handleSubmit"
      />

      <button type="submit" class="auth-btn" :disabled="loading">
        <span v-if="loading" class="btn-loading" />
        {{ loading ? 'Creating account…' : 'Create account' }}
      </button>
    </form>

    <template #footer>
      Already have an account?
      <RouterLink to="/login" class="auth-link">Sign in</RouterLink>
    </template>
  </AuthCard>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { User, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-vue-next'
import { useAuth } from '../composables/useAuth.js'
import AuthCard from '../components/auth/AuthCard.vue'
import AuthInput from '../components/auth/AuthInput.vue'

const router = useRouter()
const { register } = useAuth()

const username        = ref('')
const email           = ref('')
const password        = ref('')
const confirmPassword = ref('')
const loading         = ref(false)
const errorMsg        = ref('')
const successMsg      = ref('')
const errors          = ref({ username: '', email: '', password: '', confirmPassword: '' })

function validate() {
  errors.value = { username: '', email: '', password: '', confirmPassword: '' }
  let valid = true

  if (!username.value.trim()) {
    errors.value.username = 'Username is required'
    valid = false
  }
  if (!email.value.trim()) {
    errors.value.email = 'Email is required'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = 'Enter a valid email address'
    valid = false
  }
  if (!password.value) {
    errors.value.password = 'Password is required'
    valid = false
  } else if (password.value.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
    valid = false
  }
  if (confirmPassword.value !== password.value) {
    errors.value.confirmPassword = 'Passwords do not match'
    valid = false
  }
  return valid
}

async function handleSubmit() {
  errorMsg.value = ''
  successMsg.value = ''
  if (!validate()) return
  loading.value = true
  try {
    await register(username.value.trim(), email.value.trim(), password.value)
    successMsg.value = 'Registration successful, please proceed to login.'
    username.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
  } catch (err) {
    errorMsg.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.auth-success {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  background: rgba(74, 222, 128, 0.1);
  border: 1px solid rgba(74, 222, 128, 0.3);
  color: #4ade80;
  font-size: 13px;
}
.auth-error {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  background: rgba(248, 113, 113, 0.1);
  border: 1px solid rgba(248, 113, 113, 0.3);
  color: #f87171;
  font-size: 13px;
}
.auth-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 11px;
  margin-top: 4px;
  border-radius: 8px;
  border: none;
  background: var(--label-to);
  color: var(--bg);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;
}
.auth-btn:hover:not(:disabled) {
  opacity: 0.85;
}
.auth-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn-loading {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(0,0,0,0.2);
  border-top-color: var(--bg);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}
@keyframes spin { to { transform: rotate(360deg); } }
.auth-link {
  color: var(--label-to);
  text-decoration: none;
  font-weight: 500;
  margin-left: 4px;
}
.auth-link:hover {
  text-decoration: underline;
}
</style>
