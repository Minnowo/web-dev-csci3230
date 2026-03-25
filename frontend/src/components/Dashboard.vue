<template>
  <div class="dashboard">
    <!-- Actions -->
    <div class="actions">
      <AppButton label="Create Note">
        <template #icon><CirclePlus /></template>
      </AppButton>
      <AppButton label="Search Notes">
        <template #icon><Search /></template>
      </AppButton>
    </div>

    <!-- Recently visited -->
    <div class="recent">
      <h2 class="recent-heading">
        <Clock class="w-4 h-4" /> Recently visited
      </h2>
      <div class="cards">
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

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 48px);
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex: 1;
  justify-content: center;
}

.recent {
  padding: 32px;
  border-top: 1px solid var(--border);
}

.recent-heading {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted);
  margin: 0 0 20px;
}

.cards {
  display: flex;
  gap: 16px;
}
</style>
