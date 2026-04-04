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
      />
    </div>

    <!-- File tree -->
    <div v-if="!collapsed" class="tree-container">
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
import { ref, computed } from 'vue'
import { Home, Plus, FolderPlus, Search } from 'lucide-vue-next'
import TreeItem from './TreeItem.vue'

const props = defineProps({
  items: { type: Array, required: true },
  activeFileId: { type: String, default: null },
  fileCount: { type: Number, default: 0 },
  collapsed: { type: Boolean, default: false },
  getChildren: { type: Function, required: true },
  searchItems: { type: Function, required: true },
})

defineEmits(['createFile', 'createFolder', 'selectFile', 'deleteItem', 'renameItem'])

const searchQuery = ref('')

const searchResults = computed(() => {
  if (!searchQuery.value) return []
  return props.searchItems(searchQuery.value)
})
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
.sidebar-footer {
  padding: 8px 12px;
  font-size: 11px;
  color: var(--text-muted);
  border-top: 1px solid var(--border);
}
</style>
