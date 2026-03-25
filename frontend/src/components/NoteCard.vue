<template>
  <div class="note-card">
    <FileText class="icon" />
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

const formattedDate = computed(() => {
  return new Date(props.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
})
</script>

<style scoped>
.note-card {
  @apply flex flex-col gap-3 p-5 w-48 rounded-2xl bg-[#161b27] border border-white/8 cursor-pointer
         hover:bg-[#1e2535] hover:border-white/15 transition-colors;
}

.icon {
  @apply w-10 h-10 text-white/40;
}

.title {
  @apply text-white font-semibold text-base m-0 leading-snug;
}

.date {
  @apply text-white/40 text-sm m-0;
}
</style>
