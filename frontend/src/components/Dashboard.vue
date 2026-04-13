<template>
  <div class="flex flex-col min-h-[calc(100vh-48px)]">
    <!-- Actions -->
    <div class="flex flex-col items-center justify-center gap-3 flex-1">
      <AppButton label="Create Note" @click="handleCreateNote">
        <template #icon><CirclePlus /></template>
      </AppButton>
      <AppButton label="Search Notes">
        <template #icon><Search /></template>
      </AppButton>
    </div>

    <!-- Recently visited -->
    <div class="border-t border-[var(--border)] py-8">
      <div class="w-full max-w-2xl mx-auto px-8">
        <h2 class="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] mb-5">
          <Clock class="w-4 h-4" /> Recently visited
        </h2>

        <!-- Empty state -->
        <p v-if="recentFiles.length === 0" class="text-sm text-[var(--text-muted)]">
          No notes yet — create your first note above.
        </p>

        <div v-else class="relative">
          <!-- Left arrow -->
          <button
            v-if="canScrollLeft"
            @click="scroll(-1)"
            class="absolute -left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] transition-colors shadow-lg"
          >
            <ChevronLeft class="w-4 h-4" />
          </button>

          <!-- Scroll container -->
          <div ref="scrollRef" class="flex gap-3 overflow-x-auto scrollbar-hide" @scroll="updateScroll">
            <NoteCard
              v-for="file in recentFiles"
              :key="file.id"
              :title="file.name"
              :date="file.lastVisitedAt || file.updatedAt"
              class="shrink-0 w-[calc(25%-9px)]"
              @click="openNote(file.id)"
            >
              <template #icon>
                <component :is="resolveIcon(file.icon || 'FileText')" />
              </template>
            </NoteCard>
          </div>

          <!-- Right arrow -->
          <button
            v-if="canScrollRight"
            @click="scroll(1)"
            class="absolute -right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] transition-colors shadow-lg"
          >
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { CirclePlus, Search, Clock, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import AppButton from './AppButton.vue'
import NoteCard from './NoteCard.vue'
import { useEditorStore } from '../composables/useEditorStore'
import { resolveIcon } from './editor/iconMap.js'

const router = useRouter()
const { createFile, setActiveFile, recentFiles } = useEditorStore()

async function handleCreateNote() {
  await createFile()
  router.push('/editor')
}

function openNote(id) {
  setActiveFile(id)
  router.push('/editor')
}

const scrollRef = ref(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

function updateScroll() {
  const el = scrollRef.value
  if (!el) return
  canScrollLeft.value = el.scrollLeft > 0
  canScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 1
}

function scroll(dir) {
  const el = scrollRef.value
  el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' })
}

onMounted(() => nextTick(updateScroll))
</script>

<style>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
