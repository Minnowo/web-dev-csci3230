<template>
  <div v-if="visible" class="toolbar">
    <div class="toolbar-group">
      <button class="tb-btn" title="Bold" @click="$emit('format', 'bold')">
        <Bold class="w-4 h-4" />
      </button>
      <button class="tb-btn" title="Italic" @click="$emit('format', 'italic')">
        <Italic class="w-4 h-4" />
      </button>
      <button class="tb-btn" title="Strikethrough" @click="$emit('format', 'strikeThrough')">
        <Strikethrough class="w-4 h-4" />
      </button>
      <button class="tb-btn" title="Code" @click="$emit('format', 'code')">
        <Code class="w-4 h-4" />
      </button>
    </div>

    <div class="toolbar-sep" />

    <div class="toolbar-group">
      <button class="tb-btn tb-text" title="Heading 1" @click="$emit('format', 'h1')">
        <Heading1 class="w-4 h-4" />
      </button>
      <button class="tb-btn tb-text" title="Heading 2" @click="$emit('format', 'h2')">
        <Heading2 class="w-4 h-4" />
      </button>
      <button class="tb-btn tb-text" title="Heading 3" @click="$emit('format', 'h3')">
        <Heading3 class="w-4 h-4" />
      </button>
    </div>

    <div class="toolbar-sep" />

    <div class="toolbar-group">
      <button class="tb-btn" title="Bullet List" @click="$emit('format', 'insertUnorderedList')">
        <List class="w-4 h-4" />
      </button>
      <button class="tb-btn" title="Numbered List" @click="$emit('format', 'insertOrderedList')">
        <ListOrdered class="w-4 h-4" />
      </button>
      <button class="tb-btn" title="Checklist" @click="$emit('format', 'checklist')">
        <ListChecks class="w-4 h-4" />
      </button>
    </div>

    <div class="toolbar-sep" />

    <div class="toolbar-group">
      <button class="tb-btn" title="Blockquote" @click="$emit('format', 'blockquote')">
        <Quote class="w-4 h-4" />
      </button>
      <button class="tb-btn" title="Link" @click="$emit('format', 'createLink')">
        <Link class="w-4 h-4" />
      </button>
      <button class="tb-btn" title="Table" @click="$emit('format', 'table')">
        <Table class="w-4 h-4" />
      </button>
      <button class="tb-btn" title="Horizontal Rule" @click="$emit('format', 'insertHorizontalRule')">
        <Minus class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
import {
  Bold, Italic, Strikethrough, Code,
  Heading1, Heading2, Heading3,
  List, ListOrdered, ListChecks,
  Quote, Link, Table, Minus
} from 'lucide-vue-next'

defineProps({
  visible: { type: Boolean, default: true },
})

defineEmits(['format'])
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 6px 12px;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
  flex-wrap: wrap;
}
.toolbar-group {
  display: flex;
  align-items: center;
  gap: 2px;
}
.toolbar-sep {
  width: 1px;
  height: 20px;
  background: var(--border);
  margin: 0 6px;
}
.tb-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background: none;
  border: none;
  color: var(--text-dim);
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
}
.tb-btn:hover {
  background: var(--surface-hover);
  color: var(--text);
}
.tb-btn:active {
  background: color-mix(in srgb, var(--label-to) 15%, transparent);
  color: var(--label-to);
}
</style>
