<template>
  <div class="sidebar" :class="{ collapsed }">
    <!-- Header -->
    <div class="sidebar-header">
      <RouterLink to="/" class="app-title" title="Back to Dashboard">
        <Home class="w-4 h-4" />
        <span v-if="!collapsed">HOME</span>
      </RouterLink>
      <div v-if="!collapsed" class="header-actions">
        <button class="action-btn" title="New note" @click="$emit('createFile')">
          <Plus class="w-4 h-4" />
        </button>
        <button class="action-btn" title="New folder" @click="$emit('createFolder')">
          <FolderPlus class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Search -->
    <div v-if="!collapsed" class="search-wrap">
      <Search class="search-icon" />
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search notes..."
        class="search-input"
        @focus="showDropdown = hybridResults.length > 0"
        @blur="closeDropdown"
      />
      <span v-if="searchLoading" class="search-loading">searching...</span>

      <!-- Hybrid search dropdown -->
      <div
        v-if="showDropdown && hybridResults.length > 0"
        class="search-dropdown"
      >
        <button
          v-for="result in hybridResults"
          :key="result.id"
          class="search-result"
          @mousedown.prevent="selectHybridResult(result)"
        >
          <span class="result-title">{{ result.title }}</span>
        </button>
      </div>
    </div>

    <!-- File tree -->
    <div
      v-if="!collapsed"
      class="tree-container"
      :class="{ 'root-drop-target': isRootDragOver }"
      @dragover.prevent="onRootDragOver"
      @dragleave="onRootDragLeave"
      @drop="onRootDrop"
    >
      <template v-if="searchQuery">
        <TreeItem
          v-for="item in searchResults"
          :key="item.id"
          :item="item"
          :active-id="activeFileId"
          :get-children="getChildren"
          @select="$emit('selectFile', $event)"
          @delete="$emit('deleteItem', $event)"
          @rename="(id, name) => $emit('renameItem', id, name)"
          @move="(draggedId, targetId) => $emit('moveItem', draggedId, targetId)"
        />
      </template>
      <template v-else>
        <TreeItem
          v-for="item in items"
          :key="item.id"
          :item="item"
          :active-id="activeFileId"
          :get-children="getChildren"
          @select="$emit('selectFile', $event)"
          @delete="$emit('deleteItem', $event)"
          @rename="(id, name) => $emit('renameItem', id, name)"
          @move="(draggedId, targetId) => $emit('moveItem', draggedId, targetId)"
        />
      </template>
    </div>

    <!-- Footer -->
    <div v-if="!collapsed" class="sidebar-footer">
      {{ fileCount }} {{ fileCount === 1 ? 'note' : 'notes' }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Home, Plus, FolderPlus, Search } from 'lucide-vue-next'
import TreeItem from './TreeItem.vue'
import { hybridSearch } from '../../services/api.js'

const props = defineProps({
  items: { type: Array, required: true },
  activeFileId: { type: String, default: null },
  fileCount: { type: Number, default: 0 },
  collapsed: { type: Boolean, default: false },
  getChildren: { type: Function, required: true },
  searchItems: { type: Function, required: true },
})

const emit = defineEmits(['createFile', 'createFolder', 'selectFile', 'deleteItem', 'renameItem', 'moveItem'])

const searchQuery = ref('')
const isRootDragOver = ref(false)

function onRootDragOver() {
  isRootDragOver.value = true
}

function onRootDragLeave(e) {
  // Only clear if leaving the container itself, not entering a child
  if (!e.currentTarget.contains(e.relatedTarget)) {
    isRootDragOver.value = false
  }
}

function onRootDrop(e) {
  isRootDragOver.value = false
  const draggedId = e.dataTransfer.getData('text/plain')
  if (draggedId) emit('moveItem', draggedId, null)
}

// ─── Local name-only filter (instant, existing behavior) ─────────────────────
const searchResults = computed(() => {
  if (!searchQuery.value) return []
  return props.searchItems(searchQuery.value)
})

// ─── Hybrid search (debounced backend call, same pattern as GraphView) ───────
const hybridResults = ref([])
const showDropdown = ref(false)
const searchLoading = ref(false)
let searchDebounce = null

watch(searchQuery, (query) => {
  if (searchDebounce) clearTimeout(searchDebounce)

  if (!query || query.trim().length === 0) {
    hybridResults.value = []
    showDropdown.value = false
    return
  }

  searchDebounce = setTimeout(async () => {
    searchLoading.value = true
    try {
      const res = await hybridSearch(query.trim(), 8)
      hybridResults.value = res.results
      showDropdown.value = hybridResults.value.length > 0
    } catch (err) {
      console.warn('Hybrid search unavailable, using local filter:', err.message)
      hybridResults.value = []
      showDropdown.value = false
    } finally {
      searchLoading.value = false
    }
  }, 500)
})

function selectHybridResult(result) {
  emit('selectFile', result.id)
  searchQuery.value = ''
  hybridResults.value = []
  showDropdown.value = false
}

function closeDropdown() {
  setTimeout(() => { showDropdown.value = false }, 200)
}
</script>

<style scoped>
.sidebar {
  width: 240px;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border-right: 1px solid var(--border);
  transition: width 0.2s, min-width 0.2s;
  overflow: hidden;
}
.sidebar.collapsed {
  width: 0;
  min-width: 0;
  border-right: none;
}
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 12px 8px;
}
.app-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.15s;
}
.app-title:hover {
  color: var(--text);
}
.header-actions {
  display: flex;
  gap: 2px;
}
.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.action-btn:hover {
  background: var(--surface-hover);
  color: var(--text);
}
.search-wrap {
  position: relative;
  padding: 0 12px 8px;
}
.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  color: var(--text-muted);
  pointer-events: none;
  margin-top: -4px;
}
.search-input {
  width: 100%;
  padding: 6px 8px 6px 30px;
  border-radius: 4px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  font-size: 12px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s;
}
.search-input::placeholder {
  color: var(--text-muted);
}
.search-input:focus {
  border-color: var(--label-to);
}
.tree-container {
  flex: 1;
  overflow-y: auto;
  padding: 4px 8px;
}
.tree-container::-webkit-scrollbar {
  width: 4px;
}
.tree-container::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 2px;
}
.tree-container.root-drop-target {
  background: color-mix(in srgb, var(--label-to) 8%, transparent);
  outline: 1px dashed var(--label-to);
  outline-offset: -2px;
  border-radius: 4px;
}
.sidebar-footer {
  padding: 8px 12px;
  font-size: 11px;
  color: var(--text-muted);
  border-top: 1px solid var(--border);
}
.search-loading {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 11px;
  color: var(--text-muted);
  margin-top: -4px;
  animation: pulse 1.5s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
.search-dropdown {
  position: absolute;
  top: 100%;
  left: 12px;
  right: 12px;
  margin-top: 2px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  z-index: 50;
  max-height: 240px;
  overflow-y: auto;
}
.search-result {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: none;
  color: var(--text-dim);
  font-size: 12px;
  cursor: pointer;
  text-align: left;
  border-bottom: 1px solid var(--border);
  transition: background 0.12s, color 0.12s;
}
.search-result:last-child {
  border-bottom: none;
}
.search-result:hover {
  background: var(--surface-hover);
  color: var(--text);
}
.result-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.result-score {
  flex-shrink: 0;
  margin-left: 8px;
  font-size: 11px;
  color: var(--text-muted);
}
</style>
