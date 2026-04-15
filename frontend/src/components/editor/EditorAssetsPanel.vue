<template>
  <div class="assets-panel">
    <div class="panel-header">
      <span class="panel-title">FILES</span>
      <button
        class="action-btn"
        :title="uploading ? 'Uploading...' : 'Upload file'"
        :disabled="uploading"
        @click="triggerUpload"
      >
        <Loader2 v-if="uploading" class="w-4 h-4 spinning" />
        <Upload v-else class="w-4 h-4" />
      </button>
      <input
        ref="fileInput"
        type="file"
        accept=".md,.png,.jpg,.jpeg,.gif,.pdf"
        style="display: none"
        @change="handleUpload"
      />
    </div>

    <div v-if="loading" class="panel-status">Loading...</div>
    <div v-else-if="error" class="panel-status error">{{ error }}</div>
    <div v-else-if="!files.length" class="panel-status">No files yet</div>

    <div v-else class="file-list">
      <div v-for="file in files" :key="file.id" class="file-item">
        <component :is="iconFor(file)" class="w-4 h-4 file-type-icon" />
        <div class="file-meta">
          <span class="file-name" :title="file.original_name">{{ file.original_name }}</span>
          <span class="file-size">{{ formatSize(file.size_bytes) }}</span>
        </div>
        <button class="dl-btn" title="Download" @click="handleDownload(file.id)">
          <Download class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Upload, Download, FileText, Image, File, Loader2 } from 'lucide-vue-next'
import { listFiles, uploadFile, downloadFile } from '../../services/api.js'

const files = ref([])
const loading = ref(false)
const error = ref('')
const uploading = ref(false)
const fileInput = ref(null)

onMounted(load)

async function load() {
  loading.value = true
  error.value = ''
  try {
    files.value = await listFiles()
  } catch {
    error.value = 'Failed to load files'
  } finally {
    loading.value = false
  }
}

function triggerUpload() {
  fileInput.value?.click()
}

async function handleUpload(e) {
  const file = e.target.files?.[0]
  e.target.value = ''
  if (!file) return
  uploading.value = true
  error.value = ''
  try {
    await uploadFile(file)
    await load()
  } catch {
    error.value = 'Upload failed'
  } finally {
    uploading.value = false
  }
}

async function handleDownload(id) {
  error.value = ''
  try {
    await downloadFile(id)
  } catch {
    error.value = 'Download failed'
  }
}

function iconFor(file) {
  const ext = (file.extension || '').toLowerCase()
  if (['.png', '.jpg', '.jpeg', '.gif'].includes(ext)) return Image
  if (ext === '.md') return FileText
  return File
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
}
</script>

<style scoped>
.assets-panel {
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
  padding: 12px 12px 8px;
  gap: 4px;
}
.panel-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--text-muted);
  flex: 1;
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
.action-btn:hover:not(:disabled) {
  background: var(--surface-hover);
  color: var(--text);
}
.action-btn:disabled {
  opacity: 0.5;
  cursor: default;
}
.panel-status {
  padding: 16px 12px;
  font-size: 12px;
  color: var(--text-muted);
  text-align: center;
}
.panel-status.error {
  color: #f87171;
}
.file-list {
  flex: 1;
  overflow-y: auto;
  padding: 4px 8px;
}
.file-list::-webkit-scrollbar {
  width: 4px;
}
.file-list::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 2px;
}
.file-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 6px;
  border-radius: 4px;
  color: var(--text-dim);
  transition: background 0.12s;
}
.file-item:hover {
  background: var(--surface-hover);
  color: var(--text);
}
.file-type-icon {
  flex-shrink: 0;
  color: var(--text-muted);
}
.file-meta {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.file-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
}
.file-size {
  font-size: 10px;
  color: var(--text-muted);
}
.dl-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 3px;
  border: none;
  background: none;
  color: var(--text-muted);
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
  transition: background 0.12s, color 0.12s;
}
.file-item:hover .dl-btn {
  display: flex;
}
.dl-btn:hover {
  background: var(--border);
  color: var(--text);
}
.spinning {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
