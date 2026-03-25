<template>
  <div class="flex flex-col gap-3 p-6 flex-1 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] transition-colors cursor-pointer">
    <span class="flex text-[var(--text-muted)] [&>svg]:w-9 [&>svg]:h-9 [&>svg]:stroke-[1.5]">
      <slot name="icon">
        <FileText />
      </slot>
    </span>
    <h3 class="font-bold text-base text-[var(--text)] m-0 leading-snug">{{ title }}</h3>
    <p class="text-sm text-[var(--text-muted)] m-0">{{ formattedDate }}</p>
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
