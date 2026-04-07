<script setup>
import { onMounted, onUnmounted, ref, watch, computed } from 'vue'
import * as d3 from 'd3'
import { getNotes, buildGraphData, hybridSearch } from '../../services/api.js'

// ─── State ────────────────────────────────────────────────────────────────────
const svgRef = ref(null)
const containerRef = ref(null)
const searchQuery = ref('')
const searchResults = ref([])     // search dropdown results
const showDropdown = ref(false)   // controls dropdown visibility
const searchLoading = ref(false)  // loading indicator during API call
let searchDebounce = null         // debounce timer for search input
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
const totalNotes = ref(0)
const totalLinks = ref(0)
let simNodes = []
let simulation = null
let svg = null
let zoomBehavior = null
let initialFitDone = false
const positionCache = new Map() // persists node positions across redraws

// ─── Single node colour ───────────────────────────────────────────────────────
const NODE_COLOR = '#64748b'
const NODE_STROKE = '#94a3b8'
const LINK_COLOR = '#334155'

// ─── Filtered data (orphan + min connections only — focus handled via opacity) ─
const visibleNodeIds = computed(() => {
  void totalNotes.value // reactive dependency so this re-runs when data loads
  let nodes = allNodes

  if (!showOrphans.value) {
    const connectedIds = new Set(allLinks.flatMap(l => [l.source?.id ?? l.source, l.target?.id ?? l.target]))
    nodes = nodes.filter(n => connectedIds.has(n.id))
  }

  nodes = nodes.filter(n => n.connectionCount >= minConnections.value)

  return new Set(nodes.map(n => n.id))
})

// ─── Slider max (dynamic based on loaded data) ────────────────────────────────
const maxConnectionCount = computed(() => {
  void totalNotes.value
  if (!allNodes.length) return 10
  return Math.max(...allNodes.map(n => n.connectionCount), 10)
})

// ─── Stats ────────────────────────────────────────────────────────────────────
const statsTotal = computed(() => totalNotes.value)

const effectiveVisibleIds = computed(() => {
  void totalNotes.value
  const base = visibleNodeIds.value
  if (!focusedNode.value && !searchQuery.value) return base

  // In focus/search mode, only count nodes with opacity > 0
  const matchedIds = focusedNode.value
    ? new Set([focusedNode.value.id])
    : new Set(allNodes.filter(n => n.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || n.tags.some(t => t.includes(searchQuery.value.toLowerCase()))).map(n => n.id))

  const neighborIds = new Set()
  allLinks.forEach(l => {
    const s = l.source?.id ?? l.source
    const t = l.target?.id ?? l.target
    if (matchedIds.has(s)) neighborIds.add(t)
    if (matchedIds.has(t)) neighborIds.add(s)
  })

  return new Set([...matchedIds, ...neighborIds].filter(id => base.has(id)))
})

const statsNodes = computed(() => effectiveVisibleIds.value.size)
const statsLinks = computed(() => {
  if (!totalLinks.value) return 0
  return allLinks.filter(l => {
    const src = l.source?.id ?? l.source
    const tgt = l.target?.id ?? l.target
    return effectiveVisibleIds.value.has(src) && effectiveVisibleIds.value.has(tgt)
  }).length
})

// ─── Load data & draw ─────────────────────────────────────────────────────────
async function loadAndDraw() {
  try {
    loading.value = true
    const notes = await getNotes()
    const graph = buildGraphData(notes)
    allNodes = graph.nodes
    allLinks = graph.links
    totalNotes.value = allNodes.length
    totalLinks.value = allLinks.length
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

  // Clone nodes/links for simulation, seeding from position cache if available
  const nodes = allNodes.map(n => {
    const cached = positionCache.get(n.id)
    return cached ? { ...n, x: cached.x, y: cached.y } : { ...n }
  })
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
  simNodes = visibleNodes // keep reference for pan-to-node

  // Node radius scale
  const maxConn = d3.max(visibleNodes, d => d.connectionCount) || 1
  const radiusScale = d3.scaleSqrt().domain([0, maxConn]).range([8, 28])

  // Link width scale
  const maxShared = d3.max(links, d => d.sharedTags.length) || 1
  const linkWidthScale = d3.scaleLinear().domain([1, maxShared]).range([1, 5])

  // Use faster decay on redraws (positions cached), slow on first load for better layout
  const isRedraw = visibleNodes.some(n => positionCache.has(n.id))
  simulation = d3.forceSimulation(visibleNodes)
    .alphaDecay(isRedraw ? 0.15 : 0.0228)
    .force('link', d3.forceLink(links).id(d => d.id).distance(220))
    .force('charge', d3.forceManyBody().strength(-600))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(d => radiusScale(d.connectionCount) + 6))
    .force('centerX', d3.forceX(width / 2).strength(d => d.connectionCount === 0 ? 0.15 : 0))
    .force('centerY', d3.forceY(height / 2).strength(d => d.connectionCount === 0 ? 0.15 : 0))

  // Draw links
  const link = g.append('g').attr('class', 'links')
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke', LINK_COLOR)
    .attr('stroke-opacity', 1)
    .attr('stroke-width', d => linkWidthScale(d.sharedTags.length))

  // Draw nodes
  const node = g.append('g').attr('class', 'nodes')
    .selectAll('circle')
    .data(visibleNodes)
    .join('circle')
    .attr('r', d => radiusScale(d.connectionCount))
    .attr('fill', NODE_COLOR)
    .attr('stroke', NODE_STROKE)
    .attr('stroke-width', 2)
    .attr('cursor', 'pointer')
    .attr('opacity', d => getNodeOpacity(d, getEffectiveMatchedIds()))
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
      d3.select(event.currentTarget).attr('stroke', NODE_STROKE).attr('stroke-width', 2)
    })
    .on('click', (event, d) => {
      event.stopPropagation()
      if (focusedNode.value?.id === d.id) {
        focusedNode.value = null
      } else {
        focusedNode.value = d
      }
    })

  // Labels — dark halo via paint-order stroke for readability in dense areas
  const label = g.append('g').attr('class', 'labels')
    .selectAll('text')
    .data(visibleNodes)
    .join('text')
    .attr('dx', d => radiusScale(d.connectionCount) + 4)
    .attr('dy', '0.35em')
    .text(d => d.title.length > 20 ? d.title.slice(0, 20) + '…' : d.title)
    .style('font-size', '11px')
    .style('font-weight', '500')
    .style('font-family', 'ui-sans-serif, system-ui, sans-serif')
    .style('fill', '#e2e8f0')
    .style('stroke', '#0f172a')
    .style('stroke-width', '3px')
    .style('stroke-linejoin', 'round')
    .style('paint-order', 'stroke')
    .style('pointer-events', 'none')

  // Click on background to clear focus
  svg.on('click', () => { focusedNode.value = null })

  // Auto-fit to viewport once simulation settles, save positions to cache
  simulation.on('end', () => {
    visibleNodes.forEach(n => positionCache.set(n.id, { x: n.x, y: n.y }))
    if (initialFitDone) return
    initialFitDone = true

    // Zoom to dense core: use nodes with at least 1 connection, fall back to all
    const coreNodes = visibleNodes.filter(n => n.connectionCount > 0)
    const fitNodes = coreNodes.length > 0 ? coreNodes : visibleNodes

    // Trim outliers beyond 2 std deviations from the mean position
    const meanX = d3.mean(fitNodes, d => d.x)
    const meanY = d3.mean(fitNodes, d => d.y)
    const stdX = Math.sqrt(d3.mean(fitNodes, d => (d.x - meanX) ** 2))
    const stdY = Math.sqrt(d3.mean(fitNodes, d => (d.y - meanY) ** 2))
    const coreOnly = fitNodes.filter(n =>
      Math.abs(n.x - meanX) <= 2 * stdX &&
      Math.abs(n.y - meanY) <= 2 * stdY
    )
    const target = coreOnly.length > 0 ? coreOnly : fitNodes

    const xExtent = d3.extent(target, d => d.x)
    const yExtent = d3.extent(target, d => d.y)
    const graphWidth = xExtent[1] - xExtent[0] || 1
    const graphHeight = yExtent[1] - yExtent[0] || 1
    const padding = 80
    const scale = Math.min(
      (width - padding * 2) / graphWidth,
      (height - padding * 2) / graphHeight,
      1.2
    )
    const cx = (xExtent[0] + xExtent[1]) / 2
    const cy = (yExtent[0] + yExtent[1]) / 2
    const transform = d3.zoomIdentity
      .translate(width / 2, height / 2)
      .scale(scale)
      .translate(-cx, -cy)
    svg.transition().duration(750).call(zoomBehavior.transform, transform)
  })

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

// Returns the set of "primary" node IDs for search or focus
function getEffectiveMatchedIds() {
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    return new Set(
      allNodes
        .filter(n => n.title.toLowerCase().includes(q) || n.tags.some(t => t.includes(q)))
        .map(n => n.id)
    )
  }
  if (focusedNode.value) {
    return new Set([focusedNode.value.id])
  }
  return null
}

function getNodeOpacity(d, matchedIds) {
  if (!matchedIds) return 1
  if (matchedIds.has(d.id)) return 1
  const isNeighbor = allLinks.some(l => {
    const s = l.source?.id ?? l.source
    const t = l.target?.id ?? l.target
    return (matchedIds.has(s) && t === d.id) || (matchedIds.has(t) && s === d.id)
  })
  return isNeighbor ? 0.35 : 0
}

function getLinkOpacity(l, matchedIds) {
  if (!matchedIds) return 1
  const s = l.source?.id ?? l.source
  const t = l.target?.id ?? l.target
  return (matchedIds.has(s) || matchedIds.has(t)) ? 0.9 : 0
}

function updateOpacity() {
  if (!svg) return
  const matchedIds = getEffectiveMatchedIds()
  svg.selectAll('.nodes circle').attr('opacity', d => getNodeOpacity(d, matchedIds))
  svg.selectAll('.labels text').attr('opacity', d => getNodeOpacity(d, matchedIds))
  svg.selectAll('.links line').attr('opacity', d => getLinkOpacity(d, matchedIds))
}

function panToNode(node) {
  if (!svg || !zoomBehavior || !node) return
  const simNode = simNodes.find(n => n.id === node.id)
  if (!simNode) return
  const w = containerRef.value?.clientWidth || 900
  const h = containerRef.value?.clientHeight || 600
  const k = d3.zoomTransform(svg.node()).k
  const transform = d3.zoomIdentity
    .translate(w / 2 - k * simNode.x, h / 2 - k * simNode.y)
    .scale(k)
  svg.transition().duration(400).call(zoomBehavior.transform, transform)
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

// Re-draw only when structural filters change (not focus)
// Also exit focus mode automatically when filters change
watch([showOrphans, minConnections], () => { focusedNode.value = null; initialFitDone = false; draw() })

// ─── Hybrid search (David) ───────────────────────────────────────────────────
// Debounced: waits 500ms after the user stops typing, then calls the backend.
// Results appear in a dropdown. Clicking a result focuses that node in the graph.
// Falls back to local keyword filter while waiting / if backend is unavailable.
watch(searchQuery, (query) => {
  if (skipSearchWatch) return
  focusedNode.value = null

  if (searchDebounce) clearTimeout(searchDebounce)

  if (!query || query.trim().length === 0) {
    searchResults.value = []
    showDropdown.value = false
    updateOpacity()
    return
  }

  // Immediate keyword filter for responsiveness while waiting for backend
  updateOpacity()

  // Debounced hybrid search
  searchDebounce = setTimeout(async () => {
    searchLoading.value = true
    try {
      const res = await hybridSearch(query.trim(), 8)
      searchResults.value = res.results
        .map(r => {
          const node = allNodes.find(n => n.id === r.id)
          return node ? { ...node, score: r.score } : null
        })
        .filter(Boolean)
      showDropdown.value = searchResults.value.length > 0
    } catch (err) {
      console.warn('Hybrid search unavailable, using keyword filter:', err.message)
      searchResults.value = []
      showDropdown.value = false
    } finally {
      searchLoading.value = false
    }
  }, 500)
})

let skipSearchWatch = false // prevents searchQuery watcher from clearing focus

function selectSearchResult(node) {
  skipSearchWatch = true
  searchQuery.value = ''
  searchResults.value = []
  showDropdown.value = false
  focusedNode.value = node
  // Reset flag after the watcher fires
  setTimeout(() => { skipSearchWatch = false }, 50)
}
watch(focusedNode, (node) => {
  updateOpacity()
  if (node) panToNode(node)
})

onMounted(() => { loadAndDraw() })
onUnmounted(() => { if (simulation) simulation.stop() })
</script>

<template>
  <div class="flex flex-col h-full bg-gray-950 text-gray-100">

    <!-- Header & Controls -->
    <div class="flex flex-wrap items-center gap-3 p-4 border-b border-gray-800">
      <h2 class="text-lg font-semibold text-white mr-2">Graph View</h2>

      <!-- Search with dropdown (David) -->
      <div class="relative">
        <div class="flex items-center gap-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search notes…"
            class="px-3 py-1.5 text-sm rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 w-64"
            @focus="showDropdown = searchResults.length > 0"
            @blur="setTimeout(() => showDropdown = false, 200)"
          />
          <span v-if="searchLoading" class="text-xs text-gray-500 animate-pulse">searching…</span>
        </div>

        <!-- Dropdown results -->
        <div
          v-if="showDropdown && searchResults.length > 0"
          class="absolute top-full left-0 mt-1 w-96 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto"
        >
          <button
            v-for="result in searchResults"
            :key="result.id"
            class="w-full text-left px-4 py-3 hover:bg-gray-800 border-b border-gray-800 last:border-0 transition"
            @mousedown.prevent="selectSearchResult(result)"
          >
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-100 truncate">{{ result.title }}</span>
            </div>
            <div class="text-xs text-gray-500 mt-0.5 truncate">
              {{ result.tags.join(', ') }}
            </div>
          </button>
        </div>
      </div>

      <!-- Min connections slider -->
      <div class="flex items-center gap-2 text-sm text-gray-400">
        <span>Min links:</span>
        <input
          v-model.number="minConnections"
          type="range" min="0" :max="maxConnectionCount" step="1"
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
        Focus: {{ focusedNode?.title }}
        <button @click="focusedNode = null" class="ml-1 text-blue-400 hover:text-white">✕</button>
      </div>

      <button @click="resetZoom" class="ml-auto text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded-lg border border-gray-700 hover:border-gray-500 transition">
        Reset zoom
      </button>
    </div>

    <!-- Stats bar -->
    <div class="flex items-center gap-4 px-4 py-1.5 border-b border-gray-800 bg-gray-900 text-xs text-gray-500">
      <span><span class="text-gray-300 font-medium">{{ statsNodes }}</span> nodes shown</span>
      <span class="text-gray-700">·</span>
      <span><span class="text-gray-300 font-medium">{{ statsLinks }}</span> links</span>
      <span class="text-gray-700">·</span>
      <span><span class="text-gray-300 font-medium">{{ statsTotal }}</span> total notes</span>
      <span v-if="statsNodes !== statsTotal" class="text-gray-700">·</span>
      <span v-if="statsNodes !== statsTotal" class="text-yellow-600">{{ statsTotal - statsNodes }} hidden by filters</span>
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
        <p class="text-gray-400 text-xs mb-2">{{ hoveredNode.tags.join(', ') }}</p>
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
