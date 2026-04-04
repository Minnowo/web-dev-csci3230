<template>
  <div class="editor-content" v-if="file">
    <!-- Note title -->
    <div class="note-header">
      <div class="title-row">
        <!-- Clickable icon -->
        <button class="note-icon-btn" title="Change icon" @click="openPicker">
          <component :is="noteIcon" class="w-8 h-8" />
        </button>
        <input
          class="note-title"
          :value="file.name"
          @input="$emit('rename', file.id, $event.target.value)"
          @keydown.enter.prevent="focusEditor"
        />
      </div>
      <div class="note-meta">
        <Clock class="w-3 h-3" />
        Modified {{ formatDate(file.updatedAt) }}
      </div>
    </div>

    <!-- Icon picker -->
    <Teleport to="body">
      <IconPicker
        v-if="pickerOpen"
        :current="file.icon || 'FileText'"
        :position="pickerPos"
        @select="handleIconSelect"
        @close="pickerOpen = false"
      />
    </Teleport>

    <!-- Editable area -->
    <div
      ref="editorRef"
      class="editor-area"
      contenteditable="true"
      spellcheck="true"
      @input="handleInput"
      @keydown="handleKeydown"
    />
  </div>
  <div v-else class="empty-state">
    <FileText class="w-12 h-12 text-[var(--text-muted)]" />
    <p>No notes yet</p>
    <p class="sub">Your vault is empty. Create your first note and start building your knowledge base.</p>
    <button class="create-btn" @click="$emit('createFirst')">
      <FileText class="w-4 h-4" />
      Create first note
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { Clock, FileText } from 'lucide-vue-next'
import { resolveIcon } from './iconMap.js'
import { useEditorStore } from '../../composables/useEditorStore.js'
import IconPicker from './IconPicker.vue'

const props = defineProps({
  file: { type: Object, default: null },
})

const emit = defineEmits(['update', 'rename', 'createFirst'])

const { updateItemIcon } = useEditorStore()

const pickerOpen = ref(false)
const pickerPos = ref({ top: 0, left: 0 })

const noteIcon = computed(() => resolveIcon(props.file?.icon || 'FileText'))

function openPicker(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  pickerPos.value = {
    top: rect.bottom + 6,
    left: rect.left,
  }
  pickerOpen.value = true
}

function handleIconSelect(iconName) {
  if (props.file) updateItemIcon(props.file.id, iconName)
}

const editorRef = ref(null)
let isUpdatingFromProp = false

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  }) + ', ' + d.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit',
  })
}

// When active file changes, load its content into the editor
watch(() => props.file?.id, () => {
  if (props.file && editorRef.value) {
    isUpdatingFromProp = true
    editorRef.value.innerHTML = contentToHtml(props.file.content)
    nextTick(() => { isUpdatingFromProp = false })
  }
}, { immediate: true })

// Also handle initial mount
watch(editorRef, (el) => {
  if (el && props.file) {
    el.innerHTML = contentToHtml(props.file.content)
  }
})

function contentToHtml(content) {
  if (!content) return '<p><br></p>'
  // Simple markdown-like to HTML for initial load
  return content
    .split('\n')
    .map(line => {
      if (line.startsWith('### ')) return `<h3>${line.slice(4)}</h3>`
      if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`
      if (line.startsWith('# ')) return `<h1>${line.slice(2)}</h1>`
      if (line.startsWith('> ')) return `<blockquote>${line.slice(2)}</blockquote>`
      if (line.startsWith('- [ ] ')) return `<div class="checklist-item"><input type="checkbox" />${line.slice(6)}</div>`
      if (line.startsWith('- [x] ')) return `<div class="checklist-item"><input type="checkbox" checked />${line.slice(6)}</div>`
      if (line.startsWith('- ')) return `<li>${line.slice(2)}</li>`
      if (line.startsWith('---')) return '<hr>'
      if (line === '') return '<p><br></p>'
      return `<p>${line}</p>`
    })
    .join('')
}

function htmlToContent(html) {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html
  const lines = []
  for (const node of tempDiv.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      lines.push(node.textContent)
      continue
    }
    const tag = node.tagName?.toLowerCase()
    const text = node.textContent || ''
    if (tag === 'h1') lines.push(`# ${text}`)
    else if (tag === 'h2') lines.push(`## ${text}`)
    else if (tag === 'h3') lines.push(`### ${text}`)
    else if (tag === 'blockquote') lines.push(`> ${text}`)
    else if (tag === 'hr') lines.push('---')
    else if (tag === 'li') lines.push(`- ${text}`)
    else if (tag === 'ul' || tag === 'ol') {
      for (const li of node.querySelectorAll('li')) {
        lines.push(`- ${li.textContent}`)
      }
    }
    else if (tag === 'div' && node.classList.contains('checklist-item')) {
      const checked = node.querySelector('input')?.checked
      lines.push(checked ? `- [x] ${text.trim()}` : `- [ ] ${text.trim()}`)
    }
    else {
      lines.push(text === '' ? '' : text)
    }
  }
  return lines.join('\n')
}

function handleInput() {
  if (isUpdatingFromProp) return
  const html = editorRef.value?.innerHTML || ''
  const markdown = htmlToContent(html)
  emit('update', markdown)
}

function handleKeydown(e) {
  // Tab inserts spaces instead of moving focus
  if (e.key === 'Tab') {
    e.preventDefault()
    document.execCommand('insertText', false, '  ')
  }
}

function focusEditor() {
  editorRef.value?.focus()
}

function applyFormat(command) {
  editorRef.value?.focus()

  if (command === 'h1') {
    document.execCommand('formatBlock', false, 'h1')
  } else if (command === 'h2') {
    document.execCommand('formatBlock', false, 'h2')
  } else if (command === 'h3') {
    document.execCommand('formatBlock', false, 'h3')
  } else if (command === 'code') {
    // Wrap selection in <code>
    const sel = window.getSelection()
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0)
      const code = document.createElement('code')
      range.surroundContents(code)
    }
  } else if (command === 'blockquote') {
    document.execCommand('formatBlock', false, 'blockquote')
  } else if (command === 'checklist') {
    const html = '<div class="checklist-item"><input type="checkbox" />Checklist item</div>'
    document.execCommand('insertHTML', false, html)
  } else if (command === 'table') {
    const tableHtml = `<table><tr><th>Header</th><th>Header</th></tr><tr><td>Cell</td><td>Cell</td></tr></table>`
    document.execCommand('insertHTML', false, tableHtml)
  } else if (command === 'createLink') {
    const url = prompt('Enter URL:')
    if (url) document.execCommand('createLink', false, url)
  } else {
    document.execCommand(command, false, null)
  }

  // Sync content after formatting
  handleInput()
}

defineExpose({ applyFormat })
</script>

<style scoped>
.editor-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.note-header {
  padding: 24px 32px 0;
}
.title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
}
.note-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  border: none;
  background: none;
  color: var(--text-muted);
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
  transition: background 0.12s, color 0.12s;
}
.note-icon-btn:hover {
  background: var(--surface-hover);
  color: var(--label-to);
}
.note-title {
  flex: 1;
  font-size: 28px;
  font-weight: 600;
  color: var(--text);
  background: none;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
}
.note-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-muted);
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}
.editor-area {
  flex: 1;
  padding: 20px 32px;
  overflow-y: auto;
  outline: none;
  font-size: 15px;
  line-height: 1.7;
  color: var(--text);
  caret-color: var(--label-to);
}
.editor-area::-webkit-scrollbar {
  width: 6px;
}
.editor-area::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
}

/* WYSIWYG content styles */
.editor-area :deep(h1) {
  font-size: 28px;
  font-weight: 700;
  margin: 16px 0 8px;
  color: var(--text);
}
.editor-area :deep(h2) {
  font-size: 22px;
  font-weight: 600;
  margin: 14px 0 6px;
  color: var(--text);
}
.editor-area :deep(h3) {
  font-size: 18px;
  font-weight: 600;
  margin: 12px 0 4px;
  color: var(--text);
}
.editor-area :deep(p) {
  margin: 0 0 4px;
}
.editor-area :deep(blockquote) {
  border-left: 3px solid var(--label-to);
  padding-left: 12px;
  margin: 8px 0;
  color: var(--text-dim);
}
.editor-area :deep(code) {
  background: var(--surface-hover);
  padding: 2px 6px;
  border-radius: 3px;
  font-family: ui-monospace, Consolas, monospace;
  font-size: 13px;
}
.editor-area :deep(hr) {
  border: none;
  border-top: 1px solid var(--border);
  margin: 16px 0;
}
.editor-area :deep(ul),
.editor-area :deep(ol) {
  padding-left: 24px;
  margin: 4px 0;
}
.editor-area :deep(li) {
  margin: 2px 0;
}
.editor-area :deep(table) {
  border-collapse: collapse;
  margin: 8px 0;
  width: 100%;
}
.editor-area :deep(th),
.editor-area :deep(td) {
  border: 1px solid var(--border);
  padding: 6px 12px;
  text-align: left;
}
.editor-area :deep(th) {
  background: var(--surface-hover);
  font-weight: 600;
}
.editor-area :deep(a) {
  color: var(--label-to);
  text-decoration: underline;
}
.editor-area :deep(.checklist-item) {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px 0;
}
.editor-area :deep(.checklist-item input[type="checkbox"]) {
  accent-color: var(--label-to);
}

/* Empty state */
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--text-muted);
}
.empty-state p {
  font-size: 18px;
  font-weight: 600;
  color: var(--text);
  margin: 8px 0 0;
}
.empty-state .sub {
  font-size: 13px;
  font-weight: 400;
  color: var(--text-muted);
  max-width: 320px;
  text-align: center;
  margin: 0;
}
.create-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background: var(--label-to);
  color: var(--bg);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;
}
.create-btn:hover {
  opacity: 0.85;
}
</style>
