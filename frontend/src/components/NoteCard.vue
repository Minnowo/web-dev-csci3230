<template>
  <div
    class="relative flex flex-col justify-between gap-6 p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] transition-colors cursor-pointer group"
  >
    <span
      class="flex text-[var(--text-muted)] [&>svg]:w-7 [&>svg]:h-7 [&>svg]:stroke-[1.5]"
    >
      <slot name="icon">
        <FileText />
      </slot>
    </span>

    <div class="flex items-end justify-between gap-2">
      <div>
        <h3 class="font-bold text-sm text-[var(--text)] m-0 leading-snug">
          {{ title }}
        </h3>
        <p class="text-xs text-[var(--text-muted)] mt-1 m-0">
          {{ formattedDate }}
        </p>
      </div>
      <button
        class="flex items-center justify-center w-8 h-8 shrink-0 rounded-full bg-[var(--surface-hover)] text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity hover:text-[var(--text)]"
      >
        <ChevronRight class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { FileText, ChevronRight } from "lucide-vue-next";

const props = defineProps({
  title: { type: String, required: true },
  date: { type: [String, Date], required: true },
});

const formattedDate = computed(() =>
  new Date(props.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }),
);
</script>
