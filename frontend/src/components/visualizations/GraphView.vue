<script setup>
import { onMounted, onUnmounted, ref, watch, computed } from 'vue'
import * as d3 from 'd3'
import { getNotes, buildGraphData } from '../../services/api.js'

// ─── State ────────────────────────────────────────────────────────────────────
const svgRef = ref(null)
const containerRef = ref(null)
const searchQuery = ref('')
const showOrphans = ref(true)
const minConnections = ref(0)
const focusedNode = ref(null)
const hoveredNode = ref(null)
const tooltipX = ref(0)
const tooltipY = ref(0)
const loading = ref(true)
const error = ref(null)

let allNodes = []
let allLinks = []
let simulation = null
let svg = null
let zoomBehavior = null

// ─── Tag colour scale ─────────────────────────────────────────────────────────
const colorScale = d3.scaleOrdinal(d3.schemeTableau10)

// ─── Filtered data ────────────────────────────────────────────────────────────
const visibleNodeIds = computed(() => {
  let nodes = allNodes

  // Orphan filter
  if (!showOrphans.value) {
    const connectedIds = new Set(allLinks.flatMap(l => [l.source?.id ?? l.source, l.target?.id ?? l.target]))
    nodes = nodes.filter(n => connectedIds.has(n.id))
  }

  // Min connections filter
  nodes = nodes.filter(n => n.connectionCount >= minConnections.value)

  // Focus mode
  if (focusedNode.value) {
    const neighborIds = new Set([focusedNode.value.id])
    allLinks.forEach(l => {
      const s = l.source?.id ?? l.source
      const t = l.target?.id ?? l.target
      if (s === focusedNode.value.id) neighborIds.add(t)
      if (t === focusedNode.value.id) neighborIds.add(s)
    })
    nodes = nodes.filter(n => neighborIds.has(n.id))
  }

  return new Set(nodes.map(n => n.id))
})

// ─── Load data & draw ─────────────────────────────────────────────────────────
async function loadAndDraw() {
  try {
    loading.value = true
    const notes = await getNotes()
    const graph = buildGraphData(notes)
    allNodes = graph.nodes
    allLinks = graph.links
    draw()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

function draw() {
  if (!svgRef.value) return

  const container = containerRef.value
  const width = container.clientWidth || 900
  const height = container.clientHeight || 600

  // Clear previous
  d3.select(svgRef.value).selectAll('*').remove()

  svg = d3.select(svgRef.value)
    .attr('width', width)
    .attr('height', height)

  // Zoom layer
  const g = svg.append('g').attr('class', 'zoom-layer')

  zoomBehavior = d3.zoom()
    .scaleExtent([0.2, 4])
    .on('zoom', e => g.attr('transform', e.transform))

  svg.call(zoomBehavior)

  // Clone nodes/links for simulation (D3 mutates them)
  const nodes = allNodes.map(n => ({ ...n }))
  const nodeById = Object.fromEntries(nodes.map(n => [n.id, n]))

  const links = allLinks
    .filter(l => {
      const s = l.source?.id ?? l.source
      const t = l.target?.id ?? l.target
      return visibleNodeIds.value.has(s) && visibleNodeIds.value.has(t)
    })
    .map(l => ({
      ...l,
      source: nodeById[l.source?.id ?? l.source],
      target: nodeById[l.target?.id ?? l.target]
    }))
    .filter(l => l.source && l.target)

  const visibleNodes = nodes.filter(n => visibleNodeIds.value.has(n.id))

  // Node radius scale
  const maxConn = d3.max(visibleNodes, d => d.connectionCount) || 1
  const radiusScale = d3.scaleSqrt().domain([0, maxConn]).range([8, 28])

  // Link width scale
  const maxShared = d3.max(links, d => d.sharedTags.length) || 1
  const linkWidthScale = d3.scaleLinear().domain([1, maxShared]).range([1, 5])

  // Simulation
  simulation = d3.forceSimulation(visibleNodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(120))
    .force('charge', d3.forceManyBody().strength(-350))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(d => radiusScale(d.connectionCount) + 6))

  // Draw links
  const link = g.append('g').attr('class', 'links')
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke', '#94a3b8')
    .attr('stroke-opacity', 0.5)
    .attr('stroke-width', d => linkWidthScale(d.sharedTags.length))

  // Draw nodes
  const node = g.append('g').attr('class', 'nodes')
    .selectAll('circle')
    .data(visibleNodes)
    .join('circle')
    .attr('r', d => radiusScale(d.connectionCount))
    .attr('fill', d => colorScale(d.dominantTag))
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    .attr('cursor', 'pointer')
    .attr('opacity', d => getNodeOpacity(d))
    .call(dragBehavior())
    .on('mouseover', (event, d) => {
      hoveredNode.value = d
      tooltipX.value = event.pageX + 12
      tooltipY.value = event.pageY - 28
      d3.select(event.currentTarget).attr('stroke', '#f59e0b').attr('stroke-width', 3)
    })
    .on('mousemove', (event) => {
      tooltipX.value = event.pageX + 12
      tooltipY.value = event.pageY - 28
    })
    .on('mouseout', (event) => {
      hoveredNode.value = null
      d3.select(event.currentTarget).attr('stroke', '#fff').attr('stroke-width', 2)
    })
    .on('click', (event, d) => {
      event.stopPropagation()
      if (focusedNode.value?.id === d.id) {
        focusedNode.value = null
      } else {
        focusedNode.value = d
      }
    })

  // Labels
  const label = g.append('g').attr('class', 'labels')
    .selectAll('text')
    .data(visibleNodes)
    .join('text')
    .attr('dx', d => radiusScale(d.connectionCount) + 4)
    .attr('dy', '0.35em')
    .text(d => d.title.length > 20 ? d.title.slice(0, 20) + '…' : d.title)
    .style('font-size', '11px')
    .style('font-family', 'ui-sans-serif, system-ui, sans-serif')
    .style('fill', '#94a3b8')
    .style('pointer-events', 'none')

  // Click on background to clear focus
  svg.on('click', () => { focusedNode.value = null })

  // Tick
  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
    node.attr('cx', d => d.x).attr('cy', d => d.y)
    label.attr('x', d => d.x).attr('y', d => d.y)
  })
}

function getNodeOpacity(d) {
  if (!searchQuery.value) return 1
  const q = searchQuery.value.toLowerCase()
  const matches = d.title.toLowerCase().includes(q) || d.tags.some(t => t.includes(q))
  return matches ? 1 : 0.15
}

function dragBehavior() {
  return d3.drag()
    .on('start', (event, d) => {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x; d.fy = d.y
    })
    .on('drag', (event, d) => {
      d.fx = event.x; d.fy = event.y
    })
    .on('end', (event, d) => {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null; d.fy = null
    })
}

function resetZoom() {
  svg.transition().duration(500).call(zoomBehavior.transform, d3.zoomIdentity)
}

// Re-draw when filters change
watch([showOrphans, minConnections, focusedNode], () => { draw() })

// Update node opacity on search without full redraw
watch(searchQuery, () => {
  if (!svg) return
  svg.selectAll('.nodes circle').attr('opacity', d => getNodeOpacity(d))
  svg.selectAll('.labels text').attr('opacity', d => getNodeOpacity(d))
})

onMounted(() => { loadAndDraw() })
onUnmounted(() => { if (simulation) simulation.stop() })
</script>

<template>
  <div class="flex flex-col h-full bg-gray-950 text-gray-100">

    <!-- Header & Controls -->
    <div class="flex flex-wrap items-center gap-3 p-4 border-b border-gray-800">
      <h2 class="text-lg font-semibold text-white mr-2">Graph View</h2>

      <!-- Search -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search notes or tags…"
        class="px-3 py-1.5 text-sm rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 w-52"
      />

      <!-- Min connections slider -->
      <div class="flex items-center gap-2 text-sm text-gray-400">
        <span>Min links:</span>
        <input
          v-model.number="minConnections"
          type="range" min="0" max="10" step="1"
          class="w-24 accent-blue-500"
        />
        <span class="w-4 text-gray-200">{{ minConnections }}</span>
      </div>

      <!-- Orphan toggle -->
      <label class="flex items-center gap-2 text-sm text-gray-400 cursor-pointer select-none">
        <input v-model="showOrphans" type="checkbox" class="accent-blue-500" />
        Show orphans
      </label>

      <!-- Focus mode badge -->
      <div v-if="focusedNode" class="flex items-center gap-2 text-sm bg-blue-900 text-blue-200 px-3 py-1 rounded-full">
        Focus: {{ focusedNode.title }}
        <button @click="focusedNode = null" class="ml-1 text-blue-400 hover:text-white">✕</button>
      </div>

      <button @click="resetZoom" class="ml-auto text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded-lg border border-gray-700 hover:border-gray-500 transition">
        Reset zoom
      </button>
    </div>

    <!-- Graph area -->
    <div ref="containerRef" class="relative flex-1 overflow-hidden">
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center text-gray-500">
        Loading graph…
      </div>
      <div v-else-if="error" class="absolute inset-0 flex items-center justify-center text-red-400">
        {{ error }}
      </div>
      <svg ref="svgRef" class="w-full h-full" />
    </div>

    <!-- Tooltip -->
    <Teleport to="body">
      <div
        v-if="hoveredNode"
        class="fixed z-50 pointer-events-none bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-3 text-sm max-w-xs"
        :style="{ left: tooltipX + 'px', top: tooltipY + 'px' }"
      >
        <p class="font-semibold text-white mb-1">{{ hoveredNode.title }}</p>
        <p class="text-gray-400 text-xs mb-2">{{ hoveredNode.summary }}</p>
        <div class="flex flex-wrap gap-1 mb-2">
          <span
            v-for="tag in hoveredNode.tags" :key="tag"
            class="px-2 py-0.5 rounded-full text-xs bg-gray-700 text-gray-300"
          >{{ tag }}</span>
        </div>
        <p class="text-gray-500 text-xs">{{ hoveredNode.connectionCount }} connection{{ hoveredNode.connectionCount !== 1 ? 's' : '' }}</p>
        <p class="text-gray-500 text-xs">Updated {{ new Date(hoveredNode.updated_at).toLocaleDateString() }}</p>
      </div>
    </Teleport>

    <!-- Legend -->
    <div class="flex flex-wrap gap-3 px-4 py-2 border-t border-gray-800 text-xs text-gray-500">
      <span>Node size = connections</span>
      <span>·</span>
      <span>Line thickness = shared tags</span>
      <span>·</span>
      <span>Click node to focus</span>
      <span>·</span>
      <span>Drag to reposition</span>
      <span>·</span>
      <span>Scroll to zoom</span>
    </div>
  </div>
</template>
