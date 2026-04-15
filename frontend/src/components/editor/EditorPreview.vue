<template>
  <div class="preview-pane" v-if="content !== null">
    <div class="preview-body">
      <VueMarkdown :source="content" />
    </div>
  </div>
</template>

<script setup>
import VueMarkdown from "vue-markdown-render";

defineProps({
  content: { type: String, default: "" },
});
</script>

<style scoped>
.preview-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-left: 1px solid var(--border);
}
.preview-body {
  flex: 1;
  padding: 24px 32px;
  overflow-y: auto;
  font-size: 15px;
  line-height: 1.7;
  color: var(--text);
}
.preview-body::-webkit-scrollbar {
  width: 6px;
}
.preview-body::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
}

/* Markdown rendered content */
.preview-body :deep(h1) {
  font-size: 28px;
  font-weight: 700;
  margin: 16px 0 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--border);
}
.preview-body :deep(h2) {
  font-size: 22px;
  font-weight: 600;
  margin: 14px 0 6px;
}
.preview-body :deep(h3) {
  font-size: 18px;
  font-weight: 600;
  margin: 12px 0 4px;
}
.preview-body :deep(p) {
  margin: 0 0 8px;
}
.preview-body :deep(blockquote) {
  border-left: 3px solid var(--label-to);
  padding-left: 12px;
  margin: 8px 0;
  color: var(--text-dim);
}
.preview-body :deep(code) {
  background: var(--surface-hover);
  padding: 2px 6px;
  border-radius: 3px;
  font-family: ui-monospace, Consolas, monospace;
  font-size: 13px;
}
.preview-body :deep(pre) {
  background: var(--surface);
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
  border: 1px solid var(--border);
}
.preview-body :deep(pre code) {
  background: none;
  padding: 0;
}
.preview-body :deep(hr) {
  border: none;
  border-top: 1px solid var(--border);
  margin: 16px 0;
}
.preview-body :deep(ul),
.preview-body :deep(ol) {
  padding-left: 24px;
  margin: 4px 0;
}
.preview-body :deep(table) {
  border-collapse: collapse;
  margin: 8px 0;
  width: 100%;
}
.preview-body :deep(th),
.preview-body :deep(td) {
  border: 1px solid var(--border);
  padding: 6px 12px;
  text-align: left;
}
.preview-body :deep(th) {
  background: var(--surface-hover);
  font-weight: 600;
}
.preview-body :deep(a) {
  color: var(--label-to);
  text-decoration: underline;
}
</style>
