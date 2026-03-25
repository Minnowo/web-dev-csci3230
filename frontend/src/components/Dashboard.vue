<template>
  <div class="flex flex-col min-h-[calc(100vh-48px)]">
    <!-- Actions -->
    <div class="flex flex-col items-center justify-center gap-3 flex-1">
      <AppButton label="Create Note">
        <template #icon><CirclePlus /></template>
      </AppButton>
      <AppButton label="Search Notes">
        <template #icon><Search /></template>
      </AppButton>
    </div>

    <!-- Recently visited -->
    <div class="px-8 py-8 border-t border-[var(--border)]">
      <h2 class="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] mb-5">
        <Clock class="w-4 h-4" /> Recently visited
      </h2>
      <div class="flex gap-4">
        <NoteCard title="Meeting Notes" date="2026-03-24">
          <template #icon><FileText /></template>
        </NoteCard>
        <NoteCard title="Project Ideas" date="2026-03-23">
          <template #icon><Lightbulb /></template>
        </NoteCard>
        <NoteCard title="Research Paper" date="2026-03-22">
          <template #icon><BookOpen /></template>
        </NoteCard>
        <NoteCard title="Goals 2026" date="2026-03-20">
          <template #icon><Target /></template>
        </NoteCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CirclePlus, Search, Clock, FileText, Lightbulb, BookOpen, Target } from 'lucide-vue-next'
import AppButton from './AppButton.vue'
import NoteCard from './NoteCard.vue'
</script>
