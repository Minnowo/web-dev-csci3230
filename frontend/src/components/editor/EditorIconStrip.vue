<template>
  <div class="icon-strip">
    <button
      v-for="item in topIcons"
      :key="item.label"
      class="icon-btn"
      :class="{ active: activeView === item.view }"
      :title="item.label"
      @click="$emit('set-view', item.view)"
    >
      <component :is="item.icon" class="w-5 h-5" />
    </button>

    <div class="flex-1" />

    <!-- Settings button with logout dropdown -->
    <div class="relative" ref="settingsRef">
      <button class="icon-btn" title="Settings" @click="menuOpen = !menuOpen">
        <Settings class="w-5 h-5" />
      </button>

      <div v-if="menuOpen" class="settings-menu">
        <button class="menu-item" @click="toggle">
          <Sun v-if="isDark" class="w-4 h-4" /> <Moon v-else class="w-4 h-4" />
          {{ isDark ? 'Light mode' : 'Dark mode' }}
        </button>
        <button class="menu-item logout" @click="handleLogout">
          <LogOut class="w-4 h-4" /> Log out
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { FileText, Search, Star, Tags, Settings, LogOut, Paperclip, Sun, Moon } from 'lucide-vue-next'
import { useAuth } from '../../composables/useAuth.js'
import { useTheme } from '../../composables/useTheme.js'
import { useRouter } from 'vue-router'

defineProps({ activeView: String })
defineEmits(['set-view'])

const topIcons = [
  { icon: FileText, label: 'Files', view: 'files' },
  { icon: Tags, label: 'Tags', view: 'tags' },
  { icon: Paperclip, label: 'Assets', view: 'assets' },
]

const { logout } = useAuth()
const { isDark, toggle } = useTheme()
const router = useRouter()
const menuOpen = ref(false)
const settingsRef = ref(null)

function handleLogout() {
  logout()
  router.push('/login')
}

function handleClickOutside(e) {
  if (settingsRef.value && !settingsRef.value.contains(e.target)) {
    menuOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
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
.icon-btn.active {
  background: var(--surface-hover);
  color: var(--tag-color);
}
.settings-menu {
  position: fixed;
  left: 48px;
  bottom: 12px;
  width: 160px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.35);
  padding: 4px;
  z-index: 100;
}
.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 10px;
  border-radius: 5px;
  border: none;
  background: none;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.12s;
  text-align: left;
}
.menu-item {
  color: var(--text);
}
.menu-item:hover {
  background: var(--surface-hover);
}
.menu-item.logout {
  color: #f87171;
}
.menu-item.logout:hover {
  background: rgba(248, 113, 113, 0.1);
}
</style>
