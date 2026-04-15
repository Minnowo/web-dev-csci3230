<template>
  <div class="assets-panel">
    <div class="panel-header">
      <span class="panel-title">IMPORT</span>
      <button
        class="action-btn"
        :title="uploading ? 'Importing...' : 'Import .md file'"
        :disabled="uploading"
        @click="triggerUpload"
      >
        <Loader2 v-if="uploading" class="w-4 h-4 spinning" />
        <Upload v-else class="w-4 h-4" />
      </button>
      <input
        ref="fileInput"
        type="file"
        accept=".md"
        style="display: none"
        @change="handleUpload"
      />
    </div>

    <div v-if="error" class="panel-status error">{{ error }}</div>
    <div v-else class="panel-status">
      Upload a .md file to import it as a note.
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Upload, Loader2 } from "lucide-vue-next";
import { useEditorStore } from "../../composables/useEditorStore.js";

const { importNote } = useEditorStore();

const uploading = ref(false);
const error = ref("");
const fileInput = ref(null);

function triggerUpload() {
  fileInput.value?.click();
}

async function handleUpload(e) {
  const file = e.target.files?.[0];
  e.target.value = "";
  if (!file) return;
  uploading.value = true;
  error.value = "";
  try {
    const content = await file.text();
    const title = file.name.replace(/\.md$/i, "");
    await importNote(title, content);
  } catch {
    error.value = "Import failed";
  } finally {
    uploading.value = false;
  }
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
  transition:
    background 0.15s,
    color 0.15s;
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
.spinning {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
