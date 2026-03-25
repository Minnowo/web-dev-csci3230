<template>
  <div class="note-card">
    <span class="icon">
      <slot name="icon">
        <FileText />
      </slot>
    </span>
    <h3 class="title">{{ title }}</h3>
    <p class="date">{{ formattedDate }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { FileText } from 'lucide-vue-next'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: [String, Date],
    required: true,
  },
})

const formattedDate = computed(() =>
  new Date(props.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
)
</script>

<style scoped>
.note-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  border-radius: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  cursor: pointer;
  flex: 1;
  transition: background 0.15s, border-color 0.15s;
}
.note-card:hover {
  background: var(--surface-hover);
  border-color: var(--border-hover);
}

.icon {
  display: flex;
  color: var(--text-muted);
}
.icon :deep(svg) {
  width: 36px;
  height: 36px;
  stroke-width: 1.5;
}

.title {
  font-weight: 700;
  font-size: 16px;
  color: var(--text);
  margin: 0;
}

.date {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
}
</style>
