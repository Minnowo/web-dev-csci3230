<template>
  <div class="picker-backdrop" @mousedown.self="$emit('close')">
    <div class="picker-popover" :style="positionStyle" @mousedown.stop>
      <!-- Search -->
      <div class="picker-search-wrap">
        <Search class="picker-search-icon w-3.5 h-3.5" />
        <input
          ref="searchRef"
          v-model="query"
          class="picker-search"
          placeholder="Search icons..."
          @keydown.escape="$emit('close')"
        />
      </div>

      <!-- Groups / results -->
      <div class="picker-body">
        <template v-if="query">
          <div class="icon-grid">
            <button
              v-for="name in filteredIcons"
              :key="name"
              class="icon-cell"
              :class="{ selected: name === current }"
              :title="name"
              @click="pick(name)"
            >
              <component :is="resolveIcon(name)" class="w-4 h-4" />
            </button>
          </div>
          <p v-if="filteredIcons.length === 0" class="picker-empty">No icons found</p>
        </template>

        <template v-else>
          <div v-for="group in ICON_GROUPS" :key="group.label" class="picker-group">
            <p class="group-label">{{ group.label }}</p>
            <div class="icon-grid">
              <button
                v-for="name in group.icons"
                :key="name"
                class="icon-cell"
                :class="{ selected: name === current }"
                :title="name"
                @click="pick(name)"
              >
                <component :is="resolveIcon(name)" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Search } from 'lucide-vue-next'
import { ICON_GROUPS, ICON_MAP, resolveIcon } from './iconMap.js'

const props = defineProps({
  current: { type: String, default: 'FileText' },
  /** { top, left } in px relative to the viewport — set by the parent */
  position: { type: Object, default: () => ({ top: 0, left: 0 }) },
})

const emit = defineEmits(['select', 'close'])

const query = ref('')
const searchRef = ref(null)

onMounted(() => searchRef.value?.focus())

const positionStyle = computed(() => ({
  top: props.position.top + 'px',
  left: props.position.left + 'px',
}))

const allIconNames = computed(() => Object.keys(ICON_MAP))

const filteredIcons = computed(() => {
  const q = query.value.toLowerCase()
  return allIconNames.value.filter(n => n.toLowerCase().includes(q))
})

function pick(name) {
  emit('select', name)
  emit('close')
}
</script>

<style scoped>
.picker-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
}
.picker-popover {
  position: fixed;
  width: 260px;
  max-height: 360px;
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 12px 32px rgba(0,0,0,0.4);
  z-index: 201;
  overflow: hidden;
}
.picker-search-wrap {
  position: relative;
  padding: 8px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.picker-search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}
.picker-search {
  width: 100%;
  padding: 5px 8px 5px 26px;
  border-radius: 4px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  font-size: 12px;
  outline: none;
  box-sizing: border-box;
}
.picker-search:focus {
  border-color: var(--label-to);
}
.picker-body {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}
.picker-body::-webkit-scrollbar { width: 4px; }
.picker-body::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
.picker-group {
  margin-bottom: 10px;
}
.group-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0 0 4px 2px;
}
.icon-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
}
.icon-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 5px;
  border: none;
  background: none;
  color: var(--text-dim);
  cursor: pointer;
  transition: background 0.1s, color 0.1s;
}
.icon-cell:hover {
  background: var(--surface-hover);
  color: var(--text);
}
.icon-cell.selected {
  background: color-mix(in srgb, var(--label-to) 20%, transparent);
  color: var(--label-to);
}
.picker-empty {
  font-size: 12px;
  color: var(--text-muted);
  text-align: center;
  padding: 16px 0;
  margin: 0;
}
</style>
