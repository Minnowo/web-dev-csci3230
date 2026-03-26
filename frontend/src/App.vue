<script setup>
import { ref } from 'vue'
import GraphView from './components/visualizations/GraphView.vue'
import SentimentCalendar from './components/visualizations/SentimentCalendar.vue'
import TagMatrix from './components/visualizations/TagMatrix.vue'

const activeTab = ref('graph')

const tabs = [
  { id: 'graph',    label: 'Graph View', icon: '⬡' },
  { id: 'calendar', label: 'Calendar',   icon: '◫' },
  { id: 'matrix',   label: 'Tag Matrix', icon: '⊞' },
]
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-950 text-gray-100 overflow-hidden">

    <!-- Top nav -->
    <nav class="flex items-center gap-1 px-4 py-2 border-b border-gray-800 bg-gray-900 shrink-0">
      <span class="text-white font-bold mr-4 text-sm tracking-wide">📓 NoteGraph</span>
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-4 py-1.5 rounded-lg text-sm font-medium transition',
          activeTab === tab.id
            ? 'bg-blue-600 text-white'
            : 'text-gray-400 hover:text-white hover:bg-gray-800'
        ]"
      >
        {{ tab.icon }} {{ tab.label }}
      </button>
    </nav>

    <!-- Content -->
    <div class="flex-1 overflow-hidden">
      <GraphView         v-if="activeTab === 'graph'"    class="h-full" />
      <SentimentCalendar v-if="activeTab === 'calendar'" class="h-full overflow-y-auto" />
      <TagMatrix         v-if="activeTab === 'matrix'"   class="h-full overflow-auto" />
    </div>
  </div>
</template>
