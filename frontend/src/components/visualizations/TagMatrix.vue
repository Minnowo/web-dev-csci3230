<script setup>
import { onMounted, ref, nextTick } from 'vue'
import * as d3 from 'd3'
import { getNotes, buildTagMatrixData } from '../../services/api.js'

const svgRef = ref(null)
const loading = ref(true)
const error = ref(null)
const hoveredCell = ref(null)
const tooltipX = ref(0)
const tooltipY = ref(0)

async function loadAndDraw() {
  try {
    loading.value = true
    const notes = await getNotes()
    const matrixData = buildTagMatrixData(notes)
    loading.value = false
    await nextTick()
    draw(matrixData)
  } catch (e) {
    error.value = e.message
    loading.value = false
  }
}

function draw({ tags, matrix }) {
  if (!svgRef.value) return
  d3.select(svgRef.value).selectAll('*').remove()

  const n = tags.length
  const cellSize = 38
  const margin = { top: 100, right: 20, bottom: 20, left: 100 }
  const gridSize = n * cellSize
  const width = margin.left + gridSize + margin.right
  const height = margin.top + gridSize + margin.bottom

  const svg = d3.select(svgRef.value).attr('width', width).attr('height', height)
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

  // Color scale
  const maxVal = d3.max(matrix.flat().filter(v => v > 0)) || 1
  const colorScale = d3.scaleSequential(d3.interpolateBlues).domain([0, maxVal])

  // Cells
  tags.forEach((rowTag, i) => {
    tags.forEach((colTag, j) => {
      const value = matrix[i][j]
      if (i === j) return // skip diagonal (self-co-occurrence)

      g.append('rect')
        .attr('x', j * cellSize)
        .attr('y', i * cellSize)
        .attr('width', cellSize - 2)
        .attr('height', cellSize - 2)
        .attr('rx', 3)
        .attr('fill', value > 0 ? colorScale(value) : '#1e293b')
        .attr('cursor', value > 0 ? 'pointer' : 'default')
        .on('mouseover', (event) => {
          if (value > 0) {
            hoveredCell.value = { row: rowTag, col: colTag, value }
            tooltipX.value = event.pageX + 12
            tooltipY.value = event.pageY - 28
            d3.select(event.currentTarget).attr('stroke', '#f59e0b').attr('stroke-width', 2)
          }
        })
        .on('mousemove', event => {
          tooltipX.value = event.pageX + 12
          tooltipY.value = event.pageY - 28
        })
        .on('mouseout', (event) => {
          hoveredCell.value = null
          d3.select(event.currentTarget).attr('stroke', null)
        })

      // Count label inside cell
      if (value > 0) {
        g.append('text')
          .attr('x', j * cellSize + cellSize / 2 - 1)
          .attr('y', i * cellSize + cellSize / 2 - 1 + 4)
          .attr('text-anchor', 'middle')
          .text(value)
          .style('font-size', '10px')
          .style('fill', value > maxVal * 0.6 ? '#fff' : '#94a3b8')
          .style('pointer-events', 'none')
      }
    })
  })

  // Diagonal cells (self) — show tag name background
  tags.forEach((tag, i) => {
    g.append('rect')
      .attr('x', i * cellSize)
      .attr('y', i * cellSize)
      .attr('width', cellSize - 2)
      .attr('height', cellSize - 2)
      .attr('rx', 3)
      .attr('fill', '#0f172a')
  })

  // Column labels (rotated)
  g.selectAll('.col-label')
    .data(tags)
    .join('text')
    .attr('class', 'col-label')
    .attr('x', (d, i) => i * cellSize + cellSize / 2)
    .attr('y', -8)
    .attr('text-anchor', 'start')
    .attr('transform', (d, i) => `rotate(-45, ${i * cellSize + cellSize / 2}, -8)`)
    .text(d => d)
    .style('font-size', '11px')
    .style('fill', '#94a3b8')

  // Row labels
  g.selectAll('.row-label')
    .data(tags)
    .join('text')
    .attr('class', 'row-label')
    .attr('x', -8)
    .attr('y', (d, i) => i * cellSize + cellSize / 2 + 4)
    .attr('text-anchor', 'end')
    .text(d => d)
    .style('font-size', '11px')
    .style('fill', '#94a3b8')

  // Color legend
  const legendWidth = 120
  const legendHeight = 10
  const legendX = gridSize - legendWidth
  const legendY = gridSize + 16

  const defs = svg.append('defs')
  const gradId = 'matrix-grad'
  const grad = defs.append('linearGradient').attr('id', gradId)
  grad.append('stop').attr('offset', '0%').attr('stop-color', colorScale(0))
  grad.append('stop').attr('offset', '100%').attr('stop-color', colorScale(maxVal))

  g.append('rect')
    .attr('x', legendX)
    .attr('y', legendY)
    .attr('width', legendWidth)
    .attr('height', legendHeight)
    .attr('rx', 2)
    .attr('fill', `url(#${gradId})`)

  g.append('text').attr('x', legendX).attr('y', legendY + 24).text('0').style('font-size', '9px').style('fill', '#64748b')
  g.append('text').attr('x', legendX + legendWidth).attr('y', legendY + 24).attr('text-anchor', 'end').text(maxVal).style('font-size', '9px').style('fill', '#64748b')
  g.append('text').attr('x', legendX + legendWidth / 2).attr('y', legendY + 24).attr('text-anchor', 'middle').text('co-occurrences').style('font-size', '9px').style('fill', '#64748b')
}

onMounted(() => loadAndDraw())
</script>

<template>
  <div class="flex flex-col h-full bg-gray-950 text-gray-100 p-4">

    <!-- Header -->
    <div class="mb-6">
      <h2 class="text-lg font-semibold text-white">Tag Co-occurrence Matrix</h2>
      <p class="text-sm text-gray-500 mt-1">How often pairs of tags appear together on the same note</p>
    </div>

    <!-- Matrix -->
    <div v-if="loading" class="flex-1 flex items-center justify-center text-gray-500">Loading…</div>
    <div v-else-if="error" class="flex-1 flex items-center justify-center text-red-400">{{ error }}</div>
    <div v-else class="flex-1 flex items-center justify-center overflow-auto">
      <svg ref="svgRef" />
    </div>

    <!-- Tooltip -->
    <Teleport to="body">
      <div
        v-if="hoveredCell"
        class="fixed z-50 pointer-events-none bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-3 text-sm"
        :style="{ left: tooltipX + 'px', top: tooltipY + 'px' }"
      >
        <p class="font-semibold text-white mb-1">
          <span class="text-blue-400">{{ hoveredCell.row }}</span>
          &amp;
          <span class="text-blue-400">{{ hoveredCell.col }}</span>
        </p>
        <p class="text-gray-400">
          Co-occur in <span class="text-white font-semibold">{{ hoveredCell.value }}</span>
          note{{ hoveredCell.value !== 1 ? 's' : '' }}
        </p>
      </div>
    </Teleport>
  </div>
</template>
