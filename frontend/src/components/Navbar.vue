<script setup>
import { Pencil, GitFork, FileText, Sun, Moon, User } from 'lucide-vue-next'
import { useTheme } from '../composables/useTheme'

const { isDark, toggle } = useTheme()
</script>

<template>
  <nav class="navbar">
    <span class="brand">Notes</span>

    <button class="nav-link">
      <Pencil class="w-4 h-4" /> Editor
    </button>
    <button class="nav-link">
      <GitFork class="w-4 h-4" /> Graph View
    </button>
    <button class="nav-link">
      <FileText class="w-4 h-4" /> Notes
    </button>

    <div class="flex-1" />

    <button class="icon-btn" title="Toggle theme" @click="toggle">
      <Sun v-if="isDark" class="w-4 h-4" />
      <Moon v-else class="w-4 h-4" />
    </button>
    <button class="icon-btn" title="Account">
      <User class="w-4 h-4" />
    </button>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 16px;
  height: 48px;
  background: var(--nav-bg);
  border-bottom: 1px solid var(--nav-border);
  font-size: 14px;
  color: var(--text-dim);
  transition: background 0.2s;
}

.brand {
  font-weight: 600;
  color: var(--text);
  margin-right: 12px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  color: var(--text-dim);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.nav-link:hover {
  background: var(--border);
  color: var(--text);
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  color: var(--text-dim);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.icon-btn:hover {
  background: var(--border);
  color: var(--text);
}
</style>
