<script setup>
import { Pencil, GitFork, FileText, Sun, Moon, User } from 'lucide-vue-next'
import { useTheme } from '../composables/useTheme'

const { isDark, toggle } = useTheme()
</script>

<template>
  <nav class="flex items-center gap-1 px-4 h-12 bg-[var(--nav-bg)] border-b border-[var(--nav-border)] text-sm text-[var(--text-dim)] transition-colors">
    <span class="font-semibold text-[var(--text)] mr-3">Notes</span>

    <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-[var(--border)] hover:text-[var(--text)] transition-colors cursor-pointer">
      <Pencil class="w-4 h-4" /> Editor
    </button>
    <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-[var(--border)] hover:text-[var(--text)] transition-colors cursor-pointer">
      <GitFork class="w-4 h-4" /> Graph View
    </button>
    <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-[var(--border)] hover:text-[var(--text)] transition-colors cursor-pointer">
      <FileText class="w-4 h-4" /> Notes
    </button>

    <div class="flex-1" />

    <button class="flex items-center justify-center w-8 h-8 rounded-md hover:bg-[var(--border)] hover:text-[var(--text)] transition-colors cursor-pointer" title="Toggle theme" @click="toggle">
      <Sun v-if="isDark" class="w-4 h-4" />
      <Moon v-else class="w-4 h-4" />
    </button>
    <button class="flex items-center justify-center w-8 h-8 rounded-md hover:bg-[var(--border)] hover:text-[var(--text)] transition-colors cursor-pointer" title="Account">
      <User class="w-4 h-4" />
    </button>
  </nav>
</template>
