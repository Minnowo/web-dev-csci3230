<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Pencil, FileText, Sun, Moon, User, BarChart2, ChevronDown } from 'lucide-vue-next'
import { useTheme } from '../composables/useTheme'

const { isDark, toggle } = useTheme()
const insightsOpen = ref(false)
const insightsRef = ref(null)

function closeInsights() {
  insightsOpen.value = false
}

function handleClickOutside(e) {
  if (insightsRef.value && !insightsRef.value.contains(e.target)) {
    insightsOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <nav class="flex items-center gap-1 px-4 h-12 bg-c-nav-bg border-b border-c-nav-border text-sm text-c-text-dim transition-colors">
    <span class="font-semibold text-c-text mr-3">Notes</span>

    <RouterLink to="/" custom v-slot="{ navigate, isActive }">
      <button
        @click="navigate"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-c-border transition-colors cursor-pointer"
        :class="isActive ? 'text-c-text' : 'hover:text-c-text'"
      >
        <Pencil class="w-4 h-4" /> Editor
      </button>
    </RouterLink>

    <!-- Insights dropdown -->
    <div class="relative" ref="insightsRef">
      <button
        @click="insightsOpen = !insightsOpen"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-c-border hover:text-c-text transition-colors cursor-pointer"
      >
        <BarChart2 class="w-4 h-4" /> Insights <ChevronDown class="w-3 h-3 ml-0.5" />
      </button>

      <div
        v-if="insightsOpen"
        class="absolute top-full left-0 mt-1 w-36 bg-c-nav-bg border border-c-nav-border rounded-md shadow-lg z-50 py-1"
      >
        <RouterLink to="/graph" @click="closeInsights"
          class="flex items-center gap-2 px-3 py-2 text-sm text-c-text-dim hover:bg-c-border hover:text-c-text transition-colors cursor-pointer"
        >
          Graph
        </RouterLink>
        <RouterLink to="/calendar" @click="closeInsights"
          class="flex items-center gap-2 px-3 py-2 text-sm text-c-text-dim hover:bg-c-border hover:text-c-text transition-colors cursor-pointer"
        >
          Calendar
        </RouterLink>
      </div>
    </div>

    <RouterLink to="/notes" custom v-slot="{ navigate, isActive }">
      <button
        @click="navigate"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-c-border transition-colors cursor-pointer"
        :class="isActive ? 'text-c-text' : 'hover:text-c-text'"
      >
        <FileText class="w-4 h-4" /> Notes
      </button>
    </RouterLink>

    <div class="flex-1" />

    <button class="flex items-center justify-center w-8 h-8 rounded-md hover:bg-c-border hover:text-c-text transition-colors cursor-pointer" title="Toggle theme" @click="toggle">
      <Sun v-if="isDark" class="w-4 h-4" />
      <Moon v-else class="w-4 h-4" />
    </button>
    <button class="flex items-center justify-center w-8 h-8 rounded-md hover:bg-c-border hover:text-c-text transition-colors cursor-pointer" title="Account">
      <User class="w-4 h-4" />
    </button>
  </nav>
</template>
