<template>
  <button class="flex items-center gap-3 px-6 py-3.5 w-56 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] transition-colors cursor-pointer">
    <span v-if="$slots.icon" class="flex items-center text-[var(--text-muted)] [&>svg]:w-5 [&>svg]:h-5">
      <slot name="icon" />
    </span>
    <span class="label font-semibold text-base">{{ label }}</span>
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
.label {
  background: linear-gradient(90deg, var(--label-from) 0%, var(--label-to) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
