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
        <button class="action-btn" title="Export workspace as ZIP" @click="handleWorkspaceExport">
          <Download class="w-4 h-4" />
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
        :class="{ 'has-clear': searchQuery }"
      />
      <span v-if="searchLoading" class="search-loading">searching...</span>
      <button v-if="searchQuery && !searchLoading" class="search-clear" title="Clear" @click="searchQuery = ''">
        <X class="w-3 h-3" />
      </button>
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
      <!-- Tag search results (instant, client-side) -->
      <template v-if="isTagSearch">
        <button
          v-for="item in tagSearchResults"
          :key="item.id"
          class="search-result"
          :class="{ active: activeFileId === item.id }"
          @click="$emit('selectFile', item.id); searchQuery = ''"
        >
          <span class="result-title">{{ item.name }}</span>
        </button>
        <div v-if="!tagSearchResults.length && tagName" class="search-status">
          No notes tagged "{{ tagName }}"
        </div>
        <div v-else-if="!tagName" class="search-status">
          Type a tag name…
        </div>
      </template>

      <!-- Loading state -->
      <div v-else-if="searchQuery && searchLoading" class="search-status">
        Searching...
      </div>

      <!-- Hybrid results -->
      <template v-else-if="!isTagSearch && searchQuery && hybridResults.length">
        <button
          v-for="result in hybridResults"
          :key="result.id"
          class="search-result"
          :class="{ active: activeFileId === result.id }"
          @click="selectHybridResult(result)"
        >
          <span class="result-title">{{ result.title }}</span>
        </button>
      </template>

      <!-- Fallback to local title filter if hybrid failed -->
      <template v-else-if="!isTagSearch && searchQuery && hybridFailed">
        <TreeItem
          v-for="item in searchResults"
          :key="item.id"
          :item="item"
          :active-id="activeFileId"
          :get-children="getChildren"
          @select="$emit('selectFile', $event)"
          @delete="$emit('deleteItem', $event)"
          @rename="(id, name, type) => $emit('renameItem', id, name, type)"
          @move="(id, type, targetId) => $emit('moveItem', id, type, targetId)"
        />
      </template>

      <!-- No results -->
      <div v-else-if="!isTagSearch && searchQuery" class="search-status">
        No results found
      </div>

      <!-- Default full tree -->
      <template v-else>
        <TreeItem
          v-for="item in items"
          :key="item.id"
          :item="item"
          :active-id="activeFileId"
          :get-children="getChildren"
          @select="$emit('selectFile', $event)"
          @delete="$emit('deleteItem', $event)"
          @rename="(id, name, type) => $emit('renameItem', id, name, type)"
          @move="(id, type, targetId) => $emit('moveItem', id, type, targetId)"
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
import { Home, Plus, FolderPlus, Search, X, Download } from 'lucide-vue-next'
import TreeItem from './TreeItem.vue'
import { hybridSearch, exportFolderAsZip } from '../../services/api.js'

const props = defineProps({
  items: { type: Array, required: true },
  activeFileId: { type: String, default: null },
  fileCount: { type: Number, default: 0 },
  collapsed: { type: Boolean, default: false },
  getChildren: { type: Function, required: true },
  searchItems: { type: Function, required: true },
  searchByTag: { type: Function, required: true },
  tagQuery: { type: String, default: '' },
})

const emit = defineEmits(['createFile', 'createFolder', 'selectFile', 'deleteItem', 'renameItem', 'moveItem', 'tag-query-consumed'])

const searchQuery = ref('')

watch(() => props.tagQuery, (q) => {
  if (q) {
    searchQuery.value = q
    emit('tag-query-consumed')
  }
})
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
  const draggedType = e.dataTransfer.getData('text/itemtype')
  if (draggedId && draggedType) emit('moveItem', draggedId, draggedType, null)
}

// ─── Tag search (instant, client-side) ───────────────────────────────────────
const isTagSearch = computed(() => searchQuery.value.startsWith('tag:'))
const tagName = computed(() => searchQuery.value.slice(4).trim())
const tagSearchResults = computed(() => {
  if (!isTagSearch.value || !tagName.value) return []
  return props.searchByTag(tagName.value)
})

// ─── Local name-only filter (instant, existing behavior) ─────────────────────
const searchResults = computed(() => {
  if (!searchQuery.value) return []
  return props.searchItems(searchQuery.value)
})

// ─── Hybrid search (debounced backend call, same pattern as GraphView) ───────
const hybridResults = ref([])
const searchLoading = ref(false)
const hybridFailed = ref(false)
let searchDebounce = null

watch(searchQuery, (query) => {
  if (searchDebounce) clearTimeout(searchDebounce)
  hybridResults.value = []
  hybridFailed.value = false

  if (!query || query.trim().length === 0) {
    searchLoading.value = false
    return
  }

  // Tag search is instant — skip hybrid entirely
  if (query.startsWith('tag:')) {
    searchLoading.value = false
    return
  }

  searchLoading.value = true

  searchDebounce = setTimeout(async () => {
    try {
      const res = await hybridSearch(query.trim(), 8)
      hybridResults.value = res.results
    } catch (err) {
      console.warn('Hybrid search unavailable, using local filter:', err.message)
      hybridFailed.value = true
    } finally {
      searchLoading.value = false
    }
  }, 500)
})

async function handleWorkspaceExport() {
  await exportFolderAsZip(null)
}

function selectHybridResult(result) {
  emit('selectFile', Number(result.id))
  searchQuery.value = ''
  hybridResults.value = []
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
.search-input.has-clear {
  padding-right: 26px;
}
.search-input:focus {
  border-color: var(--label-to);
}
.search-clear {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  margin-top: -4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: none;
  background: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0;
  border-radius: 3px;
  transition: color 0.12s;
}
.search-clear:hover {
  color: var(--text);
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
.search-status {
  padding: 16px 8px;
  font-size: 12px;
  color: var(--text-muted);
  text-align: center;
}
.search-result {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 6px 8px;
  border: none;
  border-radius: 4px;
  background: none;
  color: var(--text-dim);
  font-size: 13px;
  cursor: pointer;
  text-align: left;
  transition: background 0.12s, color 0.12s;
}
.search-result:hover,
.search-result.active {
  background: var(--surface-hover);
  color: var(--text);
}
.result-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
