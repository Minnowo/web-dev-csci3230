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
    <div class="border-t border-[var(--border)] py-8">
      <div class="w-full max-w-2xl mx-auto px-8">
        <h2 class="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] mb-5">
          <Clock class="w-4 h-4" /> Recently visited
        </h2>

        <div class="relative">
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
            <NoteCard v-for="card in cards" :key="card.title" :title="card.title" :date="card.date" class="shrink-0 w-[calc(25%-9px)]">
              <template #icon><component :is="card.icon" /></template>
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
import { CirclePlus, Search, Clock, ChevronLeft, ChevronRight, FileText, Lightbulb, BookOpen, Target, CalendarCheck, List, Pen, Layers } from 'lucide-vue-next'
import AppButton from './AppButton.vue'
import NoteCard from './NoteCard.vue'

const cards = [
  { title: 'Meeting Notes',            date: '2026-03-24', icon: FileText      },
  { title: 'Project Ideas',            date: '2026-03-23', icon: Lightbulb     },
  { title: 'Research Paper',           date: '2026-03-22', icon: BookOpen      },
  { title: 'Goals 2026',               date: '2026-03-20', icon: Target        },
  { title: 'Weekly Review',            date: '2026-03-19', icon: CalendarCheck },
  { title: 'Reading List',             date: '2026-03-18', icon: List          },
  { title: 'Design Notes',             date: '2026-03-17', icon: Pen           },
  { title: 'Sprint Plan',              date: '2026-03-15', icon: Layers        },
]

const scrollRef = ref(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

function updateScroll() {
  const el = scrollRef.value
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
