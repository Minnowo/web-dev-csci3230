<template>
  <button class="app-btn">
    <span class="icon">
      <slot name="icon">
        <!-- default icon: circle-plus -->
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
          <circle cx="12" cy="12" r="9"/>
          <line x1="12" y1="8" x2="12" y2="16"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
      </slot>
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
  @apply flex items-center gap-3 px-5 py-3 rounded-xl
         bg-[#161b27] border border-white/10
         hover:bg-[#1e2535] hover:border-white/20
         transition-colors cursor-pointer;
}

.icon {
  @apply flex items-center justify-center text-white/50;
}

.icon svg {
  @apply w-5 h-5;
}

.label {
  @apply font-semibold text-base;
  background: linear-gradient(90deg, #fff 0%, #7dd3fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
