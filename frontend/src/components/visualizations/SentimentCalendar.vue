<script setup>
import { onMounted, ref, watch, nextTick } from 'vue'
import * as d3 from 'd3'
import { getNotes, buildCalendarData } from '../../services/api.js'

const svgRef = ref(null)
const loading = ref(true)
const error = ref(null)
const viewMode = ref('year') // 'year' | 'month'
const selectedYear = ref(new Date().getFullYear())
const selectedMonth = ref(new Date().getMonth()) // 0-indexed
const hoveredDay = ref(null)
const tooltipX = ref(0)
const tooltipY = ref(0)
const streakCount = ref(0)
const totalNotes = ref(0)
const avgSentiment = ref(0)

let calendarData = {}

const CELL_SIZE = 18
const CELL_PAD = 3

// Diverging color scale: red → grey → green
const colorScale = d3.scaleDiverging(d3.interpolateRdYlGn).domain([-1, 0, 1])
const emptyColor = '#1e293b'

async function loadAndDraw() {
  try {
    loading.value = true
    const notes = await getNotes()
    calendarData = buildCalendarData(notes)
    totalNotes.value = notes.length
    computeStats(notes)
    loading.value = false
    await nextTick()
    draw()
  } catch (e) {
    error.value = e.message
    loading.value = false
  }
}

function computeStats(notes) {
  const scores = notes.filter(n => n.sentiment_score != null).map(n => n.sentiment_score)
  avgSentiment.value = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2) : 0

  // Compute longest writing streak
  const dates = Object.keys(calendarData).sort()
  let maxStreak = 0, curr = 0
  for (let i = 0; i < dates.length; i++) {
    if (i === 0) { curr = 1; continue }
    const prev = new Date(dates[i - 1])
    const cur = new Date(dates[i])
    const diff = (cur - prev) / (1000 * 60 * 60 * 24)
    curr = diff === 1 ? curr + 1 : 1
    maxStreak = Math.max(maxStreak, curr)
  }
  streakCount.value = maxStreak
}

function draw() {
  if (!svgRef.value) return
  d3.select(svgRef.value).selectAll('*').remove()
  viewMode.value === 'year' ? drawYear() : drawMonth()
}

function drawYear() {
  const year = selectedYear.value
  const startDate = new Date(year, 0, 1)
  const endDate = new Date(year, 11, 31)

  // Build all days of the year
  const days = d3.timeDays(startDate, d3.timeDay.offset(endDate, 1))

  const weekOffset = startDate.getDay() // 0=Sun
  const totalWeeks = Math.ceil((days.length + weekOffset) / 7)

  const marginLeft = 28
  const marginTop = 24
  const width = marginLeft + (totalWeeks) * (CELL_SIZE + CELL_PAD) + 20
  const height = marginTop + 7 * (CELL_SIZE + CELL_PAD) + 30

  const svg = d3.select(svgRef.value).attr('width', width).attr('height', height)
  const g = svg.append('g').attr('transform', `translate(${marginLeft},${marginTop})`)

  // Month labels
  const months = d3.timeMonths(startDate, d3.timeMonth.offset(endDate, 1))
  g.selectAll('.month-label')
    .data(months)
    .join('text')
    .attr('class', 'month-label')
    .attr('x', d => {
      const weekNo = d3.timeWeek.count(d3.timeYear(d), d)
      return weekNo * (CELL_SIZE + CELL_PAD)
    })
    .attr('y', -6)
    .text(d => d3.timeFormat('%b')(d))
    .style('font-size', '10px')
    .style('fill', '#64748b')

  // Day-of-week labels
  const dowLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  g.selectAll('.dow-label')
    .data(dowLabels)
    .join('text')
    .attr('class', 'dow-label')
    .attr('x', -14)
    .attr('y', (d, i) => i * (CELL_SIZE + CELL_PAD) + CELL_SIZE - 2)
    .text(d => d)
    .style('font-size', '9px')
    .style('fill', '#475569')

  // Day cells
  g.selectAll('.day')
    .data(days)
    .join('rect')
    .attr('class', 'day')
    .attr('width', CELL_SIZE)
    .attr('height', CELL_SIZE)
    .attr('rx', 2)
    .attr('x', d => {
      const weekNo = d3.timeWeek.count(d3.timeYear(d), d)
      return weekNo * (CELL_SIZE + CELL_PAD)
    })
    .attr('y', d => d.getDay() * (CELL_SIZE + CELL_PAD))
    .attr('fill', d => {
      const key = d3.timeFormat('%Y-%m-%d')(d)
      return calendarData[key] ? colorScale(calendarData[key].score) : emptyColor
    })
    .attr('cursor', d => {
      const key = d3.timeFormat('%Y-%m-%d')(d)
      return calendarData[key] ? 'pointer' : 'default'
    })
    .on('mouseover', (event, d) => {
      const key = d3.timeFormat('%Y-%m-%d')(d)
      if (calendarData[key]) {
        hoveredDay.value = { date: key, ...calendarData[key] }
        tooltipX.value = event.pageX + 12
        tooltipY.value = event.pageY - 28
      }
    })
    .on('mousemove', event => {
      tooltipX.value = event.pageX + 12
      tooltipY.value = event.pageY - 28
    })
    .on('mouseout', () => { hoveredDay.value = null })
}

function drawMonth() {
  const year = selectedYear.value
  const month = selectedMonth.value
  const startDate = new Date(year, month, 1)
  const endDate = new Date(year, month + 1, 0)
  const days = d3.timeDays(startDate, d3.timeDay.offset(endDate, 1))

  const LARGE = 36
  const PAD = 4
  const startDow = startDate.getDay()
  const cols = 7
  const rows = Math.ceil((days.length + startDow) / 7)
  const marginLeft = 30
  const marginTop = 30
  const width = marginLeft + cols * (LARGE + PAD) + 20
  const height = marginTop + rows * (LARGE + PAD) + 20

  const svg = d3.select(svgRef.value).attr('width', width).attr('height', height)
  const g = svg.append('g').attr('transform', `translate(${marginLeft},${marginTop})`)

  const dowLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  g.selectAll('.dow-label')
    .data(dowLabels)
    .join('text')
    .attr('x', (d, i) => i * (LARGE + PAD) + LARGE / 2)
    .attr('y', -8)
    .attr('text-anchor', 'middle')
    .text(d => d)
    .style('font-size', '10px')
    .style('fill', '#64748b')

  g.selectAll('.day')
    .data(days)
    .join('rect')
    .attr('width', LARGE)
    .attr('height', LARGE)
    .attr('rx', 4)
    .attr('x', d => ((d.getDay()) % 7) * (LARGE + PAD))
    .attr('y', d => {
      const week = Math.floor((d.getDate() - 1 + startDow) / 7)
      return week * (LARGE + PAD)
    })
    .attr('fill', d => {
      const key = d3.timeFormat('%Y-%m-%d')(d)
      return calendarData[key] ? colorScale(calendarData[key].score) : emptyColor
    })
    .attr('cursor', d => {
      const key = d3.timeFormat('%Y-%m-%d')(d)
      return calendarData[key] ? 'pointer' : 'default'
    })
    .on('mouseover', (event, d) => {
      const key = d3.timeFormat('%Y-%m-%d')(d)
      if (calendarData[key]) {
        hoveredDay.value = { date: key, ...calendarData[key] }
        tooltipX.value = event.pageX + 12
        tooltipY.value = event.pageY - 28
      }
    })
    .on('mousemove', event => {
      tooltipX.value = event.pageX + 12
      tooltipY.value = event.pageY - 28
    })
    .on('mouseout', () => { hoveredDay.value = null })

  // Day number labels
  g.selectAll('.day-num')
    .data(days)
    .join('text')
    .attr('x', d => ((d.getDay()) % 7) * (LARGE + PAD) + 4)
    .attr('y', d => {
      const week = Math.floor((d.getDate() - 1 + startDow) / 7)
      return week * (LARGE + PAD) + 14
    })
    .text(d => d.getDate())
    .style('font-size', '10px')
    .style('fill', '#94a3b8')
    .style('pointer-events', 'none')
}

const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

watch([viewMode, selectedYear, selectedMonth], () => draw())
onMounted(() => loadAndDraw())
</script>

<template>
  <div class="flex flex-col h-full bg-gray-950 text-gray-100 p-4">

    <!-- Header -->
    <div class="flex flex-wrap items-center gap-4 mb-6">
      <h2 class="text-lg font-semibold text-white">Sentiment Calendar</h2>

      <!-- View toggle -->
      <div class="flex rounded-lg overflow-hidden border border-gray-700">
        <button
          @click="viewMode = 'year'"
          :class="viewMode === 'year' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'"
          class="px-3 py-1.5 text-sm transition"
        >Year</button>
        <button
          @click="viewMode = 'month'"
          :class="viewMode === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'"
          class="px-3 py-1.5 text-sm transition"
        >Month</button>
      </div>

      <!-- Year selector -->
      <div class="flex items-center gap-2">
        <button @click="selectedYear--" class="text-gray-400 hover:text-white px-2">‹</button>
        <span class="text-sm font-medium w-12 text-center">{{ selectedYear }}</span>
        <button @click="selectedYear++" class="text-gray-400 hover:text-white px-2">›</button>
      </div>

      <!-- Month selector (month view only) -->
      <div v-if="viewMode === 'month'" class="flex items-center gap-2">
        <button @click="selectedMonth = (selectedMonth - 1 + 12) % 12" class="text-gray-400 hover:text-white px-2">‹</button>
        <span class="text-sm font-medium w-8 text-center">{{ monthNames[selectedMonth] }}</span>
        <button @click="selectedMonth = (selectedMonth + 1) % 12" class="text-gray-400 hover:text-white px-2">›</button>
      </div>

      <!-- Stats -->
      <div class="ml-auto flex gap-6 text-sm text-gray-400">
        <div>Longest streak <span class="text-white font-semibold">{{ streakCount }}d</span></div>
        <div>Avg sentiment <span class="font-semibold" :class="avgSentiment > 0 ? 'text-green-400' : 'text-red-400'">{{ avgSentiment }}</span></div>
        <div>Total notes <span class="text-white font-semibold">{{ totalNotes }}</span></div>
      </div>
    </div>

    <!-- Calendar SVG -->
    <div v-if="loading" class="flex-1 flex items-center justify-center text-gray-500">Loading…</div>
    <div v-else-if="error" class="flex-1 flex items-center justify-center text-red-400">{{ error }}</div>
    <div v-else class="overflow-x-auto">
      <svg ref="svgRef" />
    </div>

    <!-- Color legend -->
    <div class="flex items-center gap-3 mt-4 text-xs text-gray-500">
      <span>Negative</span>
      <div class="flex gap-0.5">
        <div v-for="v in [-1, -0.5, 0, 0.5, 1]" :key="v"
          class="w-5 h-3 rounded-sm"
          :style="{ background: colorScale(v) }"
        />
      </div>
      <span>Positive</span>
      <div class="ml-4 w-5 h-3 rounded-sm" :style="{ background: emptyColor }" />
      <span>No notes</span>
    </div>

    <!-- Tooltip -->
    <Teleport to="body">
      <div
        v-if="hoveredDay"
        class="fixed z-50 pointer-events-none bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-3 text-sm max-w-xs"
        :style="{ left: tooltipX + 'px', top: tooltipY + 'px' }"
      >
        <p class="font-semibold text-white mb-2">{{ hoveredDay.date }}</p>
        <p class="text-gray-400 text-xs mb-2">
          Avg sentiment:
          <span :class="hoveredDay.score > 0 ? 'text-green-400' : 'text-red-400'" class="font-semibold">
            {{ hoveredDay.score.toFixed(2) }}
          </span>
        </p>
        <ul class="text-gray-400 text-xs space-y-1">
          <li v-for="n in hoveredDay.notes" :key="n.id">
            {{ n.title }}
            <span :class="n.score > 0 ? 'text-green-400' : 'text-red-400'">({{ n.score > 0 ? '+' : '' }}{{ n.score }})</span>
          </li>
        </ul>
      </div>
    </Teleport>
  </div>
</template>
