<template>
  <div>
    <div
      class="tree-item"
      :class="{ active: item.type === 'file' && item.id === activeId }"
      :style="{ paddingLeft: depth * 16 + 8 + 'px' }"
      @click="handleClick"
      @dblclick="startRename"
    >
      <!-- Folder toggle -->
      <ChevronRight
        v-if="item.type === 'folder'"
        class="w-3 h-3 toggle-icon"
        :class="{ rotated: expanded }"
      />
      <span v-else class="w-3 h-3 inline-block" />

      <component :is="icon" class="w-4 h-4 item-icon" />

      <input
        v-if="isRenaming"
        ref="renameInput"
        v-model="renamingName"
        class="rename-input"
        @blur="finishRename"
        @keydown.enter="finishRename"
        @keydown.escape="cancelRename"
        @click.stop
      />
      <span v-else class="item-name">{{ item.name }}</span>

      <button class="delete-btn" title="Delete" @click.stop="$emit('delete', item.id)">
        <Trash2 class="w-3 h-3" />
      </button>
    </div>

    <!-- Children (if folder is expanded) -->
    <template v-if="item.type === 'folder' && expanded">
      <TreeItem
        v-for="child in children"
        :key="child.id"
        :item="child"
        :active-id="activeId"
        :get-children="getChildren"
        :depth="depth + 1"
        @select="$emit('select', $event)"
        @delete="$emit('delete', $event)"
        @rename="(id, name) => $emit('rename', id, name)"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { ChevronRight, FileText, Folder, FolderOpen, Trash2 } from 'lucide-vue-next'

const props = defineProps({
  item: { type: Object, required: true },
  activeId: { type: String, default: null },
  getChildren: { type: Function, required: true },
  depth: { type: Number, default: 0 },
})

const emit = defineEmits(['select', 'delete', 'rename'])

const expanded = ref(true)
const isRenaming = ref(false)
const renamingName = ref('')
const renameInput = ref(null)

const children = computed(() => props.getChildren(props.item.id))

const icon = computed(() => {
  if (props.item.type === 'folder') return expanded.value ? FolderOpen : Folder
  return FileText
})

function handleClick() {
  if (props.item.type === 'folder') {
    expanded.value = !expanded.value
  } else {
    emit('select', props.item.id)
  }
}

function startRename() {
  isRenaming.value = true
  renamingName.value = props.item.name
  nextTick(() => {
    renameInput.value?.focus()
    renameInput.value?.select()
  })
}

function finishRename() {
  if (isRenaming.value && renamingName.value.trim()) {
    emit('rename', props.item.id, renamingName.value.trim())
  }
  isRenaming.value = false
}

function cancelRename() {
  isRenaming.value = false
}
</script>

<style scoped>
.tree-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  color: var(--text-dim);
  transition: background 0.12s, color 0.12s;
  position: relative;
}
.tree-item:hover {
  background: var(--surface-hover);
  color: var(--text);
}
.tree-item.active {
  background: color-mix(in srgb, var(--label-to) 20%, transparent);
  color: var(--text);
}
.toggle-icon {
  flex-shrink: 0;
  transition: transform 0.15s;
}
.toggle-icon.rotated {
  transform: rotate(90deg);
}
.item-icon {
  flex-shrink: 0;
  color: var(--text-muted);
}
.tree-item.active .item-icon {
  color: var(--label-to);
}
.item-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rename-input {
  flex: 1;
  background: var(--bg);
  border: 1px solid var(--label-to);
  border-radius: 3px;
  color: var(--text);
  font-size: 13px;
  padding: 1px 4px;
  outline: none;
}
.delete-btn {
  display: none;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 2px;
  border-radius: 3px;
  flex-shrink: 0;
}
.delete-btn:hover {
  color: #f87171;
  background: rgba(248, 113, 113, 0.1);
}
.tree-item:hover .delete-btn {
  display: flex;
}
</style>
