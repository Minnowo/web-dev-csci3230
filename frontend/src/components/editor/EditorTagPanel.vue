<template>
  <aside class="tag-panel">
    <div class="panel-header">
      <span class="panel-title">Tags</span>
      <button class="refresh-btn" title="Refresh tags" @click="refreshTags">
        <RefreshCw class="w-3.5 h-3.5" />
      </button>
    </div>

    <!-- This note -->
    <div class="panel-section">
      <div class="section-label">This note</div>
      <template v-if="activeFile">
        <div class="note-tags">
          <span v-for="tag in panelTags" :key="'p-' + tag" class="tag-chip panel-tag">
            #{{ tag }}
            <button class="chip-remove" title="Remove tag" @click="removePanelTag(tag)">
              <X class="w-2.5 h-2.5" />
            </button>
          </span>
          <span v-for="tag in contentOnlyTags" :key="'c-' + tag" class="tag-chip content-tag" title="Remove from note content to delete">
            #{{ tag }}
          </span>
          <span v-if="!panelTags.length && !contentOnlyTags.length" class="empty-msg">No tags yet</span>
        </div>
        <button
          class="auto-tag-btn"
          :disabled="autoTagging"
          @click="autoTag"
        >
          <RefreshCw v-if="autoTagging" class="w-3.5 h-3.5 spinning" />
          <Sparkles v-else class="w-3.5 h-3.5" />
          {{ autoTagging ? 'Analyzing...' : 'Auto-tag' }}
        </button>
      </template>
      <span v-else class="empty-msg">No note open</span>
      <p v-if="error" class="error-msg">{{ error }}</p>
    </div>

    <div class="panel-divider" />

    <!-- All tags -->
    <div class="panel-section all-tags-header">
      <div class="section-label">All tags</div>
      <div class="new-tag-wrap">
        <input
          v-model="newTagName"
          class="new-tag-input"
          placeholder="New tag..."
          maxlength="30"
          @input="sanitizeTagInput"
          @keydown.enter="createNewTag"
          @keydown.escape="newTagName = ''"
        />
        <button class="create-btn" :disabled="!newTagName.trim()" @click="createNewTag" title="Create tag">
          <Plus class="w-3.5 h-3.5" />
        </button>
      </div>
      <span v-if="newTagName.length > 20" class="char-count" :class="{ 'at-limit': newTagName.length === 30 }">
        {{ newTagName.length }}/30
      </span>
    </div>

    <div class="tag-list">
      <div v-if="!globalTags.length" class="empty-msg">No tags yet</div>
      <div v-for="tag in globalTags" :key="tag.id" class="tag-row">
        <span class="tag-name">#{{ tag.name }}</span>
        <span class="tag-count">{{ tag.note_count }}</span>
        <button class="delete-btn" title="Delete tag" @click="deleteGlobalTag(tag)">
          <X class="w-3 h-3" />
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Plus, X, RefreshCw, Sparkles } from 'lucide-vue-next'
import { useEditorStore } from '../../composables/useEditorStore.js'
import { createTag, deleteTag, fetchTags, analyzeNote } from '../../services/api.js'

const { globalTags, activeFile, setNoteTags, getPanelTags, getContentTags, deletePanelTag, reloadNoteTags } = useEditorStore()

// Panel tags for active note (deletable)
const panelTags = computed(() => activeFile.value ? getPanelTags(activeFile.value.id) : [])
// Content tags not already in panel (shown read-only)
const contentOnlyTags = computed(() => {
  if (!activeFile.value) return []
  const panel = new Set(getPanelTags(activeFile.value.id))
  return getContentTags(activeFile.value.id).filter(t => !panel.has(t))
})

const newTagName = ref('')
const error = ref('')
const autoTagging = ref(false)

async function refreshTags() {
  const fresh = await fetchTags()
  globalTags.splice(0, globalTags.length, ...fresh)
  if (activeFile.value) await reloadNoteTags(activeFile.value.id)
}

function sanitizeTagInput() {
  newTagName.value = newTagName.value.replace(/[^a-zA-Z0-9]/g, '')
}

async function createNewTag() {
  const name = newTagName.value.trim()
  if (!name) return
  if (!/^[a-zA-Z0-9]{1,30}$/.test(name)) {
    error.value = 'Tag must be alphanumeric and at most 30 characters'
    return
  }
  if (globalTags.some(t => t.name === name.toLowerCase())) {
    error.value = 'Tag already exists'
    return
  }
  error.value = ''
  try {
    await createTag(name)
    newTagName.value = ''
    await refreshTags()
  } catch (err) {
    error.value = 'Failed to create tag'
  }
}

async function removePanelTag(tagName) {
  if (!activeFile.value) return
  error.value = ''
  try {
    await deletePanelTag(activeFile.value.id, tagName)
  } catch {
    error.value = 'Failed to remove tag'
  }
}

async function autoTag() {
  if (!activeFile.value || autoTagging.value) return
  const { id, content } = activeFile.value
  if (!content?.trim()) { error.value = 'Note is empty'; return }
  error.value = ''
  autoTagging.value = true
  try {
    const { tags } = await analyzeNote(id, content, globalTags.map(t => t.name))
    const validTags = tags.filter(t => globalTags.some(g => g.name === t))
    await setNoteTags(id, validTags)
  } catch {
    error.value = 'Auto-tag failed'
  } finally {
    autoTagging.value = false
  }
}

async function deleteGlobalTag(tag) {
  error.value = ''
  try {
    await deleteTag(tag.id)
    await refreshTags()
  } catch (err) {
    error.value = 'Failed to delete tag'
  }
}
</script>

<style scoped>
.tag-panel {
  width: 240px;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border-right: 1px solid var(--border);
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  padding: 0 14px;
  height: 40px;
  min-height: 40px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.panel-title {
  flex: 1;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: var(--text-muted);
  text-transform: uppercase;
}

.refresh-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  color: var(--text-muted);
  cursor: pointer;
  border-radius: 4px;
  padding: 0;
  transition: background 0.12s, color 0.12s;
}

.refresh-btn:hover {
  background: var(--surface-hover);
  color: var(--text);
}

.panel-section {
  padding: 10px 10px 8px;
  flex-shrink: 0;
}

.new-tag-wrap {
  display: flex;
  gap: 6px;
  align-items: center;
}
.char-count {
  display: block;
  font-size: 11px;
  color: var(--text-muted);
  text-align: right;
  margin-top: 3px;
}
.char-count.at-limit {
  color: #f87171;
}

.new-tag-input {
  flex: 1;
  padding: 5px 8px;
  border-radius: 5px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  font-size: 12px;
  outline: none;
  transition: border-color 0.15s;
  box-sizing: border-box;
}

.new-tag-input:focus {
  border-color: var(--tag-color);
}

.new-tag-input::placeholder {
  color: var(--text-muted);
}

.create-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 5px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text-muted);
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.12s, color 0.12s;
}

.create-btn:hover:not(:disabled) {
  background: var(--surface-hover);
  color: var(--text);
}

.create-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.auto-tag-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  margin-top: 8px;
  padding: 6px 10px;
  border-radius: 5px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text-dim);
  font-size: 12px;
  cursor: pointer;
  transition: background 0.12s, color 0.12s, border-color 0.12s;
}

.auto-tag-btn:hover:not(:disabled) {
  border-color: var(--tag-color);
  color: var(--tag-color);
  background: var(--tag-bg);
}

.auto-tag-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinning {
  animation: spin 0.8s linear infinite;
}

.section-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.note-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  min-height: 20px;
}

.tag-chip {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: var(--tag-color);
  background: var(--tag-bg);
}

.content-tag {
  opacity: 0.6;
}

.chip-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  color: var(--tag-color);
  cursor: pointer;
  padding: 0;
  opacity: 0.6;
  transition: opacity 0.1s;
}

.chip-remove:hover {
  opacity: 1;
}

.error-msg {
  margin: 6px 0 0;
  font-size: 11px;
  color: #f87171;
}

.all-tags-header {
  padding-bottom: 6px;
}

.panel-divider {
  height: 1px;
  background: var(--border);
  flex-shrink: 0;
}

.tag-list {
  flex: 1;
  overflow-y: auto;
  padding: 6px 6px;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.empty-msg {
  font-size: 12px;
  color: var(--text-muted);
  font-style: italic;
  padding: 6px 6px;
}

.tag-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 8px;
  border-radius: 5px;
  transition: background 0.1s;
}

.tag-row:hover {
  background: var(--surface-hover);
}

.tag-row:hover .delete-btn {
  opacity: 1;
}

.tag-name {
  flex: 1;
  font-size: 12px;
  font-weight: 500;
  color: var(--tag-color);
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tag-count {
  font-size: 11px;
  color: var(--text-muted);
  background: var(--bg);
  padding: 1px 5px;
  border-radius: 10px;
  flex-shrink: 0;
}

.delete-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  color: var(--text-muted);
  cursor: pointer;
  border-radius: 3px;
  padding: 0;
  opacity: 0;
  flex-shrink: 0;
  transition: opacity 0.1s, background 0.1s, color 0.1s;
}

.delete-btn:hover {
  background: rgba(248, 113, 113, 0.15);
  color: #f87171;
}
</style>
