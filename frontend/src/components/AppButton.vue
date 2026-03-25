<template>
  <button class="app-btn">
    <span v-if="$slots.icon" class="icon">
      <slot name="icon" />
    </span>
    <span class="label">{{ label }}</span>
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.app-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 24px;
  border-radius: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  width: 220px;
}
.app-btn:hover {
  background: var(--surface-hover);
  border-color: var(--border-hover);
}

.icon {
  display: flex;
  align-items: center;
  color: var(--text-muted);
}
.icon :deep(svg) {
  width: 20px;
  height: 20px;
}

.label {
  font-weight: 600;
  font-size: 16px;
  background: linear-gradient(90deg, var(--label-from) 0%, var(--label-to) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
