<script setup>
import { Pencil, GitFork, FileText, Sun, User } from 'lucide-vue-next'
</script>

<template>
  <nav class="flex items-center gap-1 px-4 h-12 bg-[#0f1117] border-b border-white/10 text-sm text-white/60">
    <!-- Brand -->
    <span class="font-semibold text-white mr-3">Notes</span>

    <!-- Nav links -->
    <button class="nav-link">
      <Pencil class="w-4 h-4" />
      Editor
    </button>

    <button class="nav-link">
      <GitFork class="w-4 h-4" />
      Graph View
    </button>

    <button class="nav-link">
      <FileText class="w-4 h-4" />
      Notes
    </button>

    <!-- Spacer -->
    <div class="flex-1" />

    <!-- Icon buttons -->
    <button class="icon-btn" title="Toggle theme">
      <Sun class="w-4 h-4" />
    </button>

    <button class="icon-btn" title="Account">
      <User class="w-4 h-4" />
    </button>
  </nav>
</template>

<style scoped>
.nav-link {
  @apply flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-white/10 hover:text-white/90 transition-colors cursor-pointer;
}
.icon-btn {
  @apply flex items-center justify-center w-8 h-8 rounded hover:bg-white/10 hover:text-white/90 transition-colors cursor-pointer;
}
</style>
