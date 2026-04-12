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

    <!-- Wiki-link autocomplete -->
    <Teleport to="body">
      <div
        v-if="wikiOpen && wikiResults.length"
        class="wiki-autocomplete"
        :style="{ top: wikiPos.top + 'px', left: wikiPos.left + 'px' }"
      >
        <button
          v-for="(note, i) in wikiResults"
          :key="note.id"
          class="wiki-ac-item"
          :class="{ selected: i === wikiSelectedIdx }"
          @mousedown.prevent="selectWikiNote(note)"
        >
          <component :is="resolveIcon(note.icon || 'FileText')" class="w-3.5 h-3.5 flex-shrink-0" />
          {{ note.name }}
        </button>
      </div>
    </Teleport>

    <!-- Editable area -->
    <div
      ref="editorRef"
      class="editor-area"
      contenteditable="true"
      spellcheck="true"
      @input="handleInput"
      @keydown="handleKeydown"
      @click="handleWikiLinkClick"
      @blur="handleEditorBlur"
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

const { updateItemIcon, state, setActiveFile } = useEditorStore()

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

function processWikiLinks(text) {
  return text.replace(/\[\[([^\]]+)\]\]/g, (_, name) =>
    `<span class="wiki-link" contenteditable="false" data-name="${name}">${name}</span>`)
}

function contentToHtml(content) {
  if (!content) return '<p><br></p>'
  // Simple markdown-like to HTML for initial load
  return content
    .split('\n')
    .map(line => {
      if (line.startsWith('### ')) return `<h3>${processWikiLinks(line.slice(4))}</h3>`
      if (line.startsWith('## ')) return `<h2>${processWikiLinks(line.slice(3))}</h2>`
      if (line.startsWith('# ')) return `<h1>${processWikiLinks(line.slice(2))}</h1>`
      if (line.startsWith('> ')) return `<blockquote>${processWikiLinks(line.slice(2))}</blockquote>`
      if (line.startsWith('- [ ] ')) return `<div class="checklist-item"><input type="checkbox" />${line.slice(6)}</div>`
      if (line.startsWith('- [x] ')) return `<div class="checklist-item"><input type="checkbox" checked />${line.slice(6)}</div>`
      if (line.startsWith('- ')) return `<li>${processWikiLinks(line.slice(2))}</li>`
      if (line.startsWith('---')) return '<hr>'
      if (line === '') return '<p><br></p>'
      return `<p>${processWikiLinks(line)}</p>`
    })
    .join('')
}

// Serializes a node's content to markdown, preserving [[wiki-link]] spans.
function serializeInnerMarkdown(node) {
  let result = ''
  for (const child of node.childNodes) {
    if (child.nodeType === Node.TEXT_NODE) {
      result += child.textContent
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      const t = child.tagName.toLowerCase()
      if (t === 'span' && child.classList.contains('wiki-link')) {
        result += `[[${child.dataset.name || child.textContent}]]`
      } else if (t === 'br') {
        // ignore
      } else {
        result += serializeInnerMarkdown(child)
      }
    }
  }
  return result
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
    const rich = serializeInnerMarkdown(node)
    if (tag === 'h1') lines.push(`# ${rich}`)
    else if (tag === 'h2') lines.push(`## ${rich}`)
    else if (tag === 'h3') lines.push(`### ${rich}`)
    else if (tag === 'blockquote') lines.push(`> ${rich}`)
    else if (tag === 'hr') lines.push('---')
    else if (tag === 'li') lines.push(`- ${rich}`)
    else if (tag === 'ul' || tag === 'ol') {
      for (const li of node.querySelectorAll('li')) {
        lines.push(`- ${serializeInnerMarkdown(li)}`)
      }
    }
    else if (tag === 'div' && node.classList.contains('checklist-item')) {
      const checked = node.querySelector('input')?.checked
      lines.push(checked ? `- [x] ${text.trim()}` : `- [ ] ${text.trim()}`)
    }
    else {
      lines.push(rich === '' ? '' : rich)
    }
  }
  return lines.join('\n')
}

// Scans the editor for any [[...]] plain-text patterns not yet wrapped in a
// wiki-link span, converts them in-place, and restores the cursor position.
function renderWikiLinksInDOM() {
  if (!editorRef.value) return

  const sel = window.getSelection()
  const anchorNode = sel?.anchorNode
  const anchorOffset = sel?.anchorOffset ?? 0

  const walker = document.createTreeWalker(editorRef.value, NodeFilter.SHOW_TEXT)
  const nodes = []
  let n
  while ((n = walker.nextNode())) {
    if (!n.parentElement?.classList.contains('wiki-link') && /\[\[[^\]]+\]\]/.test(n.textContent)) {
      nodes.push(n)
    }
  }
  if (!nodes.length) return

  let restoreTo = null

  for (const textNode of nodes) {
    const text = textNode.textContent
    const regex = /\[\[([^\]]+)\]\]/g
    const frag = document.createDocumentFragment()
    let last = 0
    let match
    let lastInserted = null

    while ((match = regex.exec(text)) !== null) {
      if (match.index > last) {
        const t = document.createTextNode(text.slice(last, match.index))
        frag.appendChild(t)
        if (textNode === anchorNode && anchorOffset >= last && anchorOffset <= match.index) {
          restoreTo = { node: t, offset: anchorOffset - last }
        }
        lastInserted = t
      }
      const span = document.createElement('span')
      span.className = 'wiki-link'
      span.setAttribute('contenteditable', 'false')
      span.setAttribute('data-name', match[1])
      span.textContent = match[1]
      frag.appendChild(span)
      lastInserted = span
      last = regex.lastIndex
    }

    if (last < text.length) {
      const t = document.createTextNode(text.slice(last))
      frag.appendChild(t)
      if (textNode === anchorNode && anchorOffset >= last && !restoreTo) {
        restoreTo = { node: t, offset: Math.min(anchorOffset - last, t.textContent.length) }
      }
      lastInserted = t
    }

    if (textNode === anchorNode && !restoreTo && lastInserted) {
      if (lastInserted.nodeType === Node.TEXT_NODE) {
        restoreTo = { node: lastInserted, offset: lastInserted.textContent.length }
      } else {
        restoreTo = { afterNode: lastInserted }
      }
    }

    textNode.parentNode.replaceChild(frag, textNode)
  }

  if (sel && restoreTo) {
    try {
      const range = document.createRange()
      if (restoreTo.afterNode) {
        range.setStartAfter(restoreTo.afterNode)
      } else {
        range.setStart(restoreTo.node, restoreTo.offset)
      }
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
    } catch (e) { /* best-effort cursor restoration */ }
  }
}

function handleInput() {
  if (isUpdatingFromProp) return
  const html = editorRef.value?.innerHTML || ''
  const markdown = htmlToContent(html)
  emit('update', markdown)
  renderWikiLinksInDOM()
  checkWikiAutocomplete()
}

function handleKeydown(e) {
  // Wiki-link autocomplete navigation
  if (wikiOpen.value) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      wikiSelectedIdx.value = Math.min(wikiSelectedIdx.value + 1, wikiResults.value.length - 1)
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      wikiSelectedIdx.value = Math.max(wikiSelectedIdx.value - 1, 0)
      return
    }
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault()
      if (wikiResults.value[wikiSelectedIdx.value]) selectWikiNote(wikiResults.value[wikiSelectedIdx.value])
      return
    }
    if (e.key === 'Escape') {
      closeWikiAutocomplete()
      return
    }
  }
  // Tab inserts spaces instead of moving focus
  if (e.key === 'Tab') {
    e.preventDefault()
    document.execCommand('insertText', false, '  ')
  }
}

function focusEditor() {
  editorRef.value?.focus()
}

// ─── Wiki-link autocomplete ───────────────────────────────────────────────────
const wikiOpen = ref(false)
const wikiPos = ref({ top: 0, left: 0 })
const wikiResults = ref([])
const wikiSelectedIdx = ref(0)

function checkWikiAutocomplete() {
  const sel = window.getSelection()
  if (!sel?.rangeCount) { closeWikiAutocomplete(); return }
  const range = sel.getRangeAt(0)
  const container = range.startContainer

  // Build the text before the cursor. When cursor is in an element node (e.g.
  // right after a contenteditable=false span), aggregate preceding text nodes.
  let textBefore = ''
  if (container.nodeType === Node.TEXT_NODE) {
    textBefore = container.textContent.slice(0, range.startOffset)
  } else if (container.nodeType === Node.ELEMENT_NODE) {
    for (let i = 0; i < range.startOffset; i++) {
      const child = container.childNodes[i]
      if (child?.nodeType === Node.TEXT_NODE) textBefore += child.textContent
    }
  } else {
    closeWikiAutocomplete()
    return
  }

  const match = textBefore.match(/\[\[([^\]]*)$/)
  if (!match) { closeWikiAutocomplete(); return }

  const term = match[1].toLowerCase()
  const results = state.items
    .filter(i => i.type === 'file' && i.name.toLowerCase().includes(term))
    .slice(0, 8)
  if (results.length === 0) { closeWikiAutocomplete(); return }

  wikiResults.value = results
  wikiSelectedIdx.value = 0
  wikiOpen.value = true
  const rect = range.getBoundingClientRect()
  wikiPos.value = { top: rect.bottom + 4, left: rect.left }
}

function closeWikiAutocomplete() {
  wikiOpen.value = false
  wikiResults.value = []
}

function selectWikiNote(note) {
  const sel = window.getSelection()
  if (!sel?.rangeCount) return
  const range = sel.getRangeAt(0)
  const container = range.startContainer
  if (container.nodeType !== Node.TEXT_NODE) return

  const textBefore = container.textContent.slice(0, range.startOffset)
  const match = textBefore.match(/\[\[([^\]]*)$/)
  if (!match) return

  // Delete [[partial text
  const deleteRange = document.createRange()
  deleteRange.setStart(container, range.startOffset - match[0].length)
  deleteRange.setEnd(container, range.startOffset)
  deleteRange.deleteContents()

  // Insert wiki-link span
  const span = document.createElement('span')
  span.className = 'wiki-link'
  span.setAttribute('contenteditable', 'false')
  span.setAttribute('data-name', note.name)
  span.textContent = note.name
  deleteRange.insertNode(span)

  // Place cursor right after the span
  const newRange = document.createRange()
  newRange.setStartAfter(span)
  newRange.collapse(true)
  sel.removeAllRanges()
  sel.addRange(newRange)

  closeWikiAutocomplete()
  handleInput()
}

function handleWikiLinkClick(e) {
  if (e.target.classList.contains('wiki-link')) {
    const noteName = e.target.dataset.name
    const item = state.items.find(i => i.type === 'file' && i.name === noteName)
    if (item) setActiveFile(item.id)
  }
}

function handleEditorBlur() {
  setTimeout(closeWikiAutocomplete, 150)
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

/* Wiki links in editor */
.editor-area :deep(.wiki-link) {
  color: var(--label-to);
  background: color-mix(in srgb, var(--label-to) 12%, transparent);
  border-radius: 3px;
  padding: 1px 4px;
  cursor: pointer;
  font-weight: 500;
}
.editor-area :deep(.wiki-link:hover) {
  background: color-mix(in srgb, var(--label-to) 22%, transparent);
  text-decoration: underline;
}

/* Wiki-link autocomplete dropdown */
.wiki-autocomplete {
  position: fixed;
  z-index: 9999;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 4px;
  min-width: 220px;
  max-width: 320px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}
.wiki-ac-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 7px 10px;
  border-radius: 5px;
  border: none;
  background: none;
  color: var(--text-dim);
  font-size: 13px;
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background 0.1s, color 0.1s;
}
.wiki-ac-item:hover,
.wiki-ac-item.selected {
  background: var(--surface-hover);
  color: var(--text);
}
</style>
