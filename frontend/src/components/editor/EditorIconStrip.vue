<template>
  <div class="icon-strip">
    <button v-for="item in topIcons" :key="item.label" class="icon-btn" :title="item.label">
      <component :is="item.icon" class="w-5 h-5" />
    </button>
    <div class="flex-1" />
    <button class="icon-btn" title="Settings">
      <Settings class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup>
import { FileText, Search, Star, Settings } from 'lucide-vue-next'

const topIcons = [
  { icon: FileText, label: 'Files' },
  { icon: Search, label: 'Search' },
  { icon: Star, label: 'Favorites' },
]
</script>

<style scoped>
.icon-strip {
  width: 44px;
  min-width: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  gap: 4px;
  background: var(--bg);
  border-right: 1px solid var(--border);
}
.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  color: var(--text-muted);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  background: none;
  border: none;
}
.icon-btn:hover {
  background: var(--surface-hover);
  color: var(--text);
}
</style>
