<script setup>
import { onMounted, onUnmounted, ref, computed, watch, reactive } from 'vue'
import * as d3 from 'd3'
import { useRouter } from 'vue-router'
import { getNotes, fetchAllLinks, buildGraphData, hybridSearch } from '../../services/api.js'
import { useEditorStore } from '../../composables/useEditorStore.js'
import { ChevronUp, ChevronDown, Tag, Link2, BarChart2, Sliders, Lasso, Route, CalendarDays } from 'lucide-vue-next'

const router = useRouter()
const { setActiveFile } = useEditorStore()

// ─── Tag node shape (price-tag / label with pointed right end) ────────────────
const tagShape = {
  draw(context, size) {
    const r  = Math.sqrt(size) * 0.5
    const w  = r, h = r * 0.68, tip = r * 0.55
    context.moveTo(-w, -h)
    context.lineTo(w - tip, -h)
    context.lineTo(w, 0)
    context.lineTo(w - tip, h)
    context.lineTo(-w, h)
    context.closePath()
  }
}

// ─── Raw graph data (set once after load) ─────────────────────────────────────
let rawNoteNodes = []
let rawTagNodes  = []
let rawWikiEdges = []
let rawTagEdges  = []

// ─── Toggles ─────────────────────────────────────────────────────────────────
const showTagNodes  = ref(false)
const showWikiLinks = ref(true)

// ─── Appearance ───────────────────────────────────────────────────────────────
const appearance = reactive({
  repulsion:    600,
  linkDistance: 220,
  gravity:      0.08,
  minNodeSize:      8,
  neighborOpacity:  0.35,
  nodeColor:        '#64748b',
  edgeThickness: 1.5,
  edgeOpacity:  0.8,
  showArrows:   false,
  labelMode:    'on', // 'on' | 'hover' | 'off'
})

// ─── UI state ─────────────────────────────────────────────────────────────────
const svgRef       = ref(null)
const containerRef = ref(null)
const loading      = ref(true)
const error        = ref(null)
const drawerOpen   = ref(false)
const statsOpen    = ref(true)

const searchQuery   = ref('')
const searchResults = ref([])
const showDropdown  = ref(false)
const searchLoading = ref(false)
let   searchDebounce = null

const showOrphans   = ref(true)
const minConnections = ref(0)
const focusedNode    = ref(null)
const focusedCluster  = ref(null)  // Set of node IDs or null
const selectionMode   = ref(false)
const customSelection = ref(new Set())

// ─── Path mode ────────────────────────────────────────────────────────────────
const pathMode   = ref(false)
const pathFrom   = ref(null)   // source node
const pathResult = ref(null)   // { nodeIds: Set, edgeKeys: Set, steps: number } | { steps: -1 }

// ─── Timeline mode ────────────────────────────────────────────────────────────
const timelineMode = ref(false)

watch(selectionMode, on => {
  if (on) { focusedCluster.value = null; focusedNode.value = null; pathMode.value = false; timelineMode.value = false }
  else    { customSelection.value = new Set() }
})

watch(pathMode, on => {
  if (on) { selectionMode.value = false; focusedCluster.value = null; focusedNode.value = null; timelineMode.value = false }
  pathFrom.value = null; pathResult.value = null
})

watch(timelineMode, on => {
  if (on) {
    selectionMode.value = false; pathMode.value = false
    focusedCluster.value = null; focusedNode.value = null
    applyTimeline()
  } else {
    clearTimeline()
  }
})

// ─── Shortest path (BFS on undirected wiki-links) ─────────────────────────────
function findShortestPath(fromId, toId) {
  const adj = new Map()
  rawWikiEdges.forEach(l => {
    const s = l.source?.id ?? l.source
    const t = l.target?.id ?? l.target
    if (!adj.has(s)) adj.set(s, [])
    if (!adj.has(t)) adj.set(t, [])
    adj.get(s).push(t)
    adj.get(t).push(s)
  })
  const prev    = new Map()
  const visited = new Set([fromId])
  const queue   = [fromId]
  while (queue.length) {
    const curr = queue.shift()
    if (curr === toId) {
      const path = []
      let node = toId
      while (node !== undefined) { path.unshift(node); node = prev.get(node) }
      return path
    }
    for (const nb of (adj.get(curr) ?? [])) {
      if (!visited.has(nb)) { visited.add(nb); prev.set(nb, curr); queue.push(nb) }
    }
  }
  return null
}

function drawPathOverlay() {
  if (!pathOverlayGroup) return
  pathOverlayGroup.selectAll('line').remove()
  if (!pathResult.value?.edgeKeys?.size) return
  const nodeById = Object.fromEntries(simNodes.map(n => [n.id, n]))
  const edgeData = []
  pathResult.value.edgeKeys.forEach(key => {
    const [s, t] = key.split('-').map(Number)
    if (s < t && nodeById[s] && nodeById[t])
      edgeData.push({ source: nodeById[s], target: nodeById[t] })
  })
  pathOverlayGroup.selectAll('line')
    .data(edgeData)
    .join('line')
    .attr('stroke', '#f59e0b')
    .attr('stroke-width', 3)
    .attr('stroke-opacity', 0.95)
    .attr('stroke-linecap', 'round')
}

function applySelection() {
  const ids = new Set(customSelection.value)  // snapshot before clearing
  selectionMode.value = false                 // watcher clears customSelection
  focusOnCluster(ids)                         // focus the snapshot
}
const hoveredNode   = ref(null)
const tooltipX      = ref(0)
const tooltipY      = ref(0)

let simulation    = null
let svg              = null
let zoomBehavior     = null
let gZoom            = null   // zoom layer — needed for path overlay
let pathOverlayGroup  = null   // amber path edge overlay
let timelineAxisGroup = null   // date axis overlay (timeline mode)
let timelineScale     = null   // d3.scaleTime used for timeline x pinning
let currentSimLinks   = []     // stored for restoring link force after timeline
let initialFitDone    = false
const positionCache   = new Map()

// ─── Active node/link arrays (rebuilt when toggles change) ────────────────────
let allNodes = []
let allLinks = []
let simNodes = []           // visible nodes in current simulation run
const totalNoteCount = ref(0)

function rebuildActiveArrays() {
  allNodes = [
    ...rawNoteNodes,
    ...(showTagNodes.value  ? rawTagNodes  : []),
  ]
  allLinks = [
    ...(showWikiLinks.value ? rawWikiEdges : []),
    ...(showTagNodes.value  ? rawTagEdges  : []),
  ]
}

// ─── Visible node IDs (orphan + min-connections filters) ──────────────────────
const visibleNodeIds = computed(() => {
  void totalNoteCount.value
  void showTagNodes.value
  void showWikiLinks.value
  let nodes = allNodes

  if (!showOrphans.value) {
    const connectedIds = new Set(
      allLinks.flatMap(l => [l.source?.id ?? l.source, l.target?.id ?? l.target])
    )
    nodes = nodes.filter(n => connectedIds.has(n.id))
  }
  // Tag nodes are exempt from the min-connections filter
  nodes = nodes.filter(n => n.type === 'tag' || n.connectionCount >= minConnections.value)
  return new Set(nodes.map(n => n.id))
})

const maxConnectionCount = computed(() => {
  void totalNoteCount.value
  const noteDegrees = rawNoteNodes.map(n => n.connectionCount)
  return Math.max(...noteDegrees, 1)
})

// ─── Stats ────────────────────────────────────────────────────────────────────

const visibleNoteNodes = computed(() => {
  void totalNoteCount.value
  return rawNoteNodes.filter(n => visibleNodeIds.value.has(n.id))
})

const visibleLinks = computed(() => {
  void totalNoteCount.value
  void showTagNodes.value
  void showWikiLinks.value
  return allLinks.filter(l => {
    const s = l.source?.id ?? l.source
    const t = l.target?.id ?? l.target
    return visibleNodeIds.value.has(s) && visibleNodeIds.value.has(t)
  })
})

// Degree of each visible note in the current visible graph
const effectiveDegree = computed(() => {
  const deg = new Map()
  visibleNoteNodes.value.forEach(n => deg.set(n.id, 0))
  visibleLinks.value.forEach(l => {
    const s = typeof l.source === 'object' ? l.source.id : l.source
    const t = typeof l.target === 'object' ? l.target.id : l.target
    if (deg.has(s)) deg.set(s, deg.get(s) + 1)
    if (deg.has(t)) deg.set(t, deg.get(t) + 1)
  })
  return deg
})

const mostConnectedNote = computed(() => {
  let best = null, bestDeg = -1
  visibleNoteNodes.value.forEach(n => {
    const d = effectiveDegree.value.get(n.id) ?? 0
    if (d > bestDeg) { bestDeg = d; best = n }
  })
  return best ? { ...best, degree: bestDeg } : null
})

const isolatedCount = computed(() =>
  visibleNoteNodes.value.filter(n => (effectiveDegree.value.get(n.id) ?? 0) === 0).length
)

// Directed in/out degree from wiki-links only (for dead-end detection)
const wikiDegree = computed(() => {
  const inDeg  = new Map()
  const outDeg = new Map()
  visibleNoteNodes.value.forEach(n => { inDeg.set(n.id, 0); outDeg.set(n.id, 0) })
  rawWikiEdges.forEach(l => {
    const s = l.source?.id ?? l.source
    const t = l.target?.id ?? l.target
    if (visibleNodeIds.value.has(s) && visibleNodeIds.value.has(t)) {
      outDeg.set(s, (outDeg.get(s) ?? 0) + 1)
      inDeg.set(t,  (inDeg.get(t)  ?? 0) + 1)
    }
  })
  return { inDeg, outDeg }
})

// Sinks: notes linked TO but with no outgoing links (dead ends in the knowledge graph)
const sinkNotes = computed(() =>
  visibleNoteNodes.value.filter(n =>
    (wikiDegree.value.inDeg.get(n.id)  ?? 0) > 0 &&
    (wikiDegree.value.outDeg.get(n.id) ?? 0) === 0
  )
)

const avgConnections = computed(() => {
  if (!visibleNoteNodes.value.length) return '0'
  const total = [...effectiveDegree.value.values()].reduce((a, b) => a + b, 0)
  return (total / visibleNoteNodes.value.length).toFixed(1)
})

const largestCluster = computed(() => {
  const noteIds = new Set(visibleNoteNodes.value.map(n => n.id))
  const noteLinks = visibleLinks.value.filter(l => {
    const s = typeof l.source === 'object' ? l.source.id : l.source
    const t = typeof l.target === 'object' ? l.target.id : l.target
    return noteIds.has(s) && noteIds.has(t)
  })
  const adj = new Map()
  noteIds.forEach(id => adj.set(id, []))
  noteLinks.forEach(l => {
    const s = typeof l.source === 'object' ? l.source.id : l.source
    const t = typeof l.target === 'object' ? l.target.id : l.target
    adj.get(s)?.push(t)
    adj.get(t)?.push(s)
  })
  const visited = new Set()
  let maxSize = 0, maxCluster = new Set()
  noteIds.forEach(id => {
    if (visited.has(id)) return
    const queue = [id]
    const component = new Set()
    while (queue.length) {
      const curr = queue.shift()
      if (visited.has(curr)) continue
      visited.add(curr)
      component.add(curr)
      adj.get(curr)?.forEach(nb => { if (!visited.has(nb)) queue.push(nb) })
    }
    if (component.size > maxSize) { maxSize = component.size; maxCluster = component }
  })
  return { size: maxSize, nodeIds: maxCluster }
})

const tagFrequency = computed(() => {
  const freq = new Map()
  visibleNoteNodes.value.forEach(n => n.tags.forEach(t => freq.set(t, (freq.get(t) ?? 0) + 1)))
  return freq
})

const mostUsedTag = computed(() => {
  let best = null, bestCount = 0
  tagFrequency.value.forEach((count, tag) => { if (count > bestCount) { bestCount = count; best = tag } })
  return best ? { name: best, count: bestCount } : null
})

const nicheTags = computed(() =>
  [...tagFrequency.value.entries()].filter(([, c]) => c === 1).map(([t]) => t)
)

const mostVersatileNote = computed(() => {
  if (!visibleNoteNodes.value.length) return null
  return visibleNoteNodes.value.reduce((best, n) =>
    n.tags.length > (best?.tags.length ?? -1) ? n : best, null)
})

const newTagsLast30Days = computed(() => {
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const recent = visibleNoteNodes.value.filter(n => n.created_at && new Date(n.created_at) > cutoff)
  const older  = visibleNoteNodes.value.filter(n => !n.created_at || new Date(n.created_at) <= cutoff)
  const recentTags = new Set(recent.flatMap(n => n.tags))
  const olderTags  = new Set(older.flatMap(n => n.tags))
  return [...recentTags].filter(t => !olderTags.has(t)).length
})

// ─── Focus / search helpers ───────────────────────────────────────────────────
const effectiveMatchedIds = computed(() => {
  void showTagNodes.value
  void showWikiLinks.value
  if (pathResult.value?.nodeIds) return pathResult.value.nodeIds
  if (customSelection.value.size > 0) return customSelection.value
  if (focusedCluster.value) return focusedCluster.value
  if (focusedNode.value) return new Set([focusedNode.value.id])
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    return new Set(
      allNodes.filter(n =>
        n.title?.toLowerCase().includes(q) ||
        n.name?.toLowerCase().includes(q) ||
        n.tags?.some(t => t.includes(q))
      ).map(n => n.id)
    )
  }
  return null
})

const effectiveVisibleIds = computed(() => {
  void totalNoteCount.value
  void showTagNodes.value
  void showWikiLinks.value
  const base = visibleNodeIds.value
  if (!effectiveMatchedIds.value) return base
  const matchedIds = effectiveMatchedIds.value
  const neighborIds = new Set()
  allLinks.forEach(l => {
    const s = l.source?.id ?? l.source
    const t = l.target?.id ?? l.target
    if (matchedIds.has(s)) neighborIds.add(t)
    if (matchedIds.has(t)) neighborIds.add(s)
  })
  return new Set([...matchedIds, ...neighborIds].filter(id => base.has(id)))
})

const statsNoteCount = computed(() => {
  const visibleIds = effectiveVisibleIds.value
  return allNodes.filter(n => n.type === 'note' && visibleIds.has(n.id)).length
})
const statsTagCount = computed(() => {
  const visibleIds = effectiveVisibleIds.value
  return allNodes.filter(n => n.type === 'tag' && visibleIds.has(n.id)).length
})
const statsNoteLinkCount = computed(() => {
  void showWikiLinks.value
  const visibleIds = effectiveVisibleIds.value
  const matchedIds = effectiveMatchedIds.value
  return allLinks.filter(l => {
    if (l.type !== 'wiki') return false
    const s = l.source?.id ?? l.source
    const t = l.target?.id ?? l.target
    if (!visibleIds.has(s) || !visibleIds.has(t)) return false
    if (matchedIds && !matchedIds.has(s) && !matchedIds.has(t)) return false
    return true
  }).length
})
const statsTagLinkCount = computed(() => {
  void showTagNodes.value
  const visibleIds = effectiveVisibleIds.value
  const matchedIds = effectiveMatchedIds.value
  return allLinks.filter(l => {
    if (l.type !== 'tag') return false
    const s = l.source?.id ?? l.source
    const t = l.target?.id ?? l.target
    if (!visibleIds.has(s) || !visibleIds.has(t)) return false
    if (matchedIds && !matchedIds.has(s) && !matchedIds.has(t)) return false
    return true
  }).length
})

const lastUpdatedNote = computed(() => {
  void showTagNodes.value
  const visibleIds = effectiveVisibleIds.value
  const notes = allNodes.filter(n => n.type === 'note' && visibleIds.has(n.id) && n.updated_at)
  if (!notes.length) return null
  return notes.reduce((a, b) => new Date(a.updated_at) > new Date(b.updated_at) ? a : b)
})

const allClusters = computed(() => {
  void showWikiLinks.value
  const noteIds = new Set(visibleNoteNodes.value.map(n => n.id))
  const adj = new Map()
  noteIds.forEach(id => adj.set(id, []))
  visibleLinks.value.filter(l => l.type === 'wiki').forEach(l => {
    const s = l.source?.id ?? l.source
    const t = l.target?.id ?? l.target
    if (noteIds.has(s) && noteIds.has(t)) { adj.get(s).push(t); adj.get(t).push(s) }
  })
  const visited = new Set()
  const clusters = []
  noteIds.forEach(id => {
    if (visited.has(id)) return
    const component = new Set()
    const queue = [id]
    while (queue.length) {
      const curr = queue.shift()
      if (visited.has(curr)) continue
      visited.add(curr); component.add(curr)
      adj.get(curr)?.forEach(nb => { if (!visited.has(nb)) queue.push(nb) })
    }
    clusters.push(component)
  })
  return clusters.sort((a, b) => b.size - a.size)
})

const selectedClusterIndex = ref(null)

watch(focusedCluster, val => { if (!val) selectedClusterIndex.value = null })
watch(allClusters,   ()  => { selectedClusterIndex.value = null })

function cycleCluster(dir) {
  const n = allClusters.value.length
  if (!n) return
  selectedClusterIndex.value = selectedClusterIndex.value === null
    ? 0
    : (selectedClusterIndex.value + dir + n) % n
  focusOnCluster(allClusters.value[selectedClusterIndex.value])
}

// ─── Load & draw ──────────────────────────────────────────────────────────────
async function loadAndDraw() {
  try {
    loading.value = true
    const [notes, wikiLinks] = await Promise.all([getNotes(), fetchAllLinks()])
    const graph = buildGraphData(notes, wikiLinks)
    rawNoteNodes = graph.noteNodes
    rawTagNodes  = graph.tagNodes
    rawWikiEdges = graph.wikiEdges
    rawTagEdges  = graph.tagEdges
    totalNoteCount.value = rawNoteNodes.length
    rebuildActiveArrays()
    draw()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

// ─── Timeline ─────────────────────────────────────────────────────────────────

const YEAR_COLORS = ['#94a3b8', '#60a5fa', '#34d399', '#f59e0b', '#c084fc', '#f87171']

function yearColor(dateStr) {
  if (!dateStr) return appearance.nodeColor
  const year = new Date(dateStr).getFullYear()
  const noteNodes = simNodes.filter(n => n.type === 'note' && n.created_at)
  const years = [...new Set(noteNodes.map(n => new Date(n.created_at).getFullYear()))].sort()
  const idx = years.indexOf(year)
  return YEAR_COLORS[idx % YEAR_COLORS.length]
}

function applyTimeline() {
  if (!svg || !simulation) return
  const container = containerRef.value
  const width  = container.clientWidth  || 900
  const height = container.clientHeight || 600
  const pad = 80

  const noteNodes = simNodes.filter(n => n.type === 'note' && n.created_at)
  if (!noteNodes.length) return

  const dateExtent = d3.extent(noteNodes, n => new Date(n.created_at))
  const minDate = d3.timeYear.floor(dateExtent[0])
  const maxDate = d3.timeYear.ceil(dateExtent[1])

  timelineScale = d3.scaleTime()
    .domain([minDate, maxDate])
    .range([pad, width - pad])

  // Hard-pin x by creation date; pre-distribute y per column so same-date notes start spread rather than piled
  const dateGroups = new Map()
  noteNodes.forEach(n => {
    const key = new Date(n.created_at).toDateString()
    if (!dateGroups.has(key)) dateGroups.set(key, [])
    dateGroups.get(key).push(n)
    n.fx = timelineScale(new Date(n.created_at))
  })
  const yMin = 44, yMax = height - 48
  dateGroups.forEach(group => {
    const step = (yMax - yMin) / (group.length + 1)
    group.forEach((n, i) => { n.y = yMin + step * (i + 1) })
  })

  simulation
    .force('link', d3.forceLink([]).id(d => d.id))
    .force('charge', d3.forceManyBody().strength(-20))
    .force('gravityX', null)
    .force('dateX', null)
    .force('gravityY', d3.forceY(height / 2).strength(0.04))
    .force('collision', d3.forceCollide().radius(d => d.type === 'note' ? 12 : (d._radius ?? 8) + 4))
    .alphaDecay(0.0228)
    .alpha(0.3).restart()

  // Shrink nodes to a uniform small size — position carries meaning, not size
  const tlRadius = 5
  simNodes.forEach(n => { if (n.type === 'note') { n._radiusPrev = n._radius; n._radius = tlRadius } })
  svg.selectAll('.note-nodes circle').attr('r', tlRadius)

  // Color nodes by year and force labels visible
  svg.selectAll('.note-nodes circle')
    .attr('fill', d => yearColor(d.created_at))
    .attr('stroke', d => lightenHex(yearColor(d.created_at), 30))
  svg.selectAll('.labels .note-label').attr('opacity', 1)

  // Draw overlay (bands + gridlines + axis)
  drawTimelineOverlay(width, height)
}

function clearTimeline() {
  simNodes.forEach(n => { if (n.type === 'note') delete n.fx })
  // Restore radius before updating forces so collision radius is accurate
  simNodes.forEach(n => { if (n.type === 'note' && n._radiusPrev != null) { n._radius = n._radiusPrev; delete n._radiusPrev } })
  if (simulation) {
    const container = containerRef.value
    const width  = container?.clientWidth  || 900
    const height = container?.clientHeight || 600
    simulation
      .force('link', d3.forceLink(currentSimLinks).id(d => d.id).distance(appearance.linkDistance))
      .force('charge', d3.forceManyBody().strength(-appearance.repulsion))
      .force('dateX', null)
      .force('gravityX', d3.forceX(width / 2).strength(appearance.gravity))
      .force('gravityY', d3.forceY(height / 2).strength(appearance.gravity))
      .force('collision', d3.forceCollide().radius(d => (d._radius ?? 5) + 6))
      .alpha(0.3).restart()
  }
  svg?.selectAll('.note-nodes circle')
    .attr('r', d => d._radius)
    .attr('fill', appearance.nodeColor)
    .attr('stroke', lightenHex(appearance.nodeColor, 40))
  if (timelineAxisGroup) { timelineAxisGroup.remove(); timelineAxisGroup = null }
  timelineScale = null
}

function drawTimelineOverlay(width, height) {
  svg.selectAll('.timeline-overlay').remove()
  timelineAxisGroup = svg.append('g').attr('class', 'timeline-overlay')
    .style('pointer-events', 'none')  // let mouse events pass through to nodes
  timelineAxisGroup.append('g').attr('class', 'tl-bands')
  timelineAxisGroup.append('g').attr('class', 'tl-gridlines')
  timelineAxisGroup.append('g').attr('class', 'tl-top-labels')
  timelineAxisGroup.append('g').attr('class', 'tl-axis')
    .attr('transform', `translate(0,${height - 28})`)
  updateTimelineOverlay(d3.zoomTransform(svg.node()), width, height)
}

function updateTimelineOverlay(transform, width, height) {
  if (!timelineAxisGroup || !timelineScale) return
  const k = transform.k
  const rescaled = transform.rescaleX(timelineScale)
  const [d0, d1] = rescaled.domain()
  const axisH = height - 28
  const allYears = d3.timeYear.range(timelineScale.domain()[0], timelineScale.domain()[1])
  const noteNodes = simNodes.filter(n => n.type === 'note' && n.created_at)
  const sortedYears = [...new Set(noteNodes.map(n => new Date(n.created_at).getFullYear()))].sort()

  // ── Year bands ──
  const bandColors = ['rgba(255,255,255,0.025)', 'rgba(255,255,255,0.055)']
  timelineAxisGroup.select('.tl-bands').selectAll('rect').data(allYears).join('rect')
    .attr('x', d => rescaled(d))
    .attr('y', 0)
    .attr('width', d => Math.max(0, rescaled(d3.timeYear.offset(d, 1)) - rescaled(d)))
    .attr('height', axisH)
    .attr('fill', (d, i) => bandColors[i % 2])

  // Year labels at top of each band
  timelineAxisGroup.select('.tl-top-labels').selectAll('.yr-label').data(allYears).join('text')
    .attr('class', 'yr-label')
    .attr('x', d => (rescaled(d) + rescaled(d3.timeYear.offset(d, 1))) / 2)
    .attr('y', 16)
    .attr('text-anchor', 'middle')
    .style('fill', d => { const idx = sortedYears.indexOf(d.getFullYear()); return YEAR_COLORS[idx % YEAR_COLORS.length] })
    .style('font-size', '11px')
    .style('font-weight', '700')
    .style('letter-spacing', '1px')
    .style('font-family', 'ui-sans-serif, system-ui, sans-serif')
    .style('opacity', 0.8)
    .text(d => d.getFullYear())

  // ── Adaptive gridlines ──
  const gridG = timelineAxisGroup.select('.tl-gridlines')
  gridG.selectAll('*').remove()

  // Month gridlines (visible when zoomed in enough)
  if (k >= 0.35) {
    const months = d3.timeMonth.range(d3.timeMonth.floor(d0), d3.timeMonth.ceil(d1))
      .filter(m => m > timelineScale.domain()[0] && m < timelineScale.domain()[1])

    gridG.selectAll('.tl-month-line').data(months).join('line')
      .attr('class', 'tl-month-line')
      .attr('x1', d => rescaled(d)).attr('x2', d => rescaled(d))
      .attr('y1', 22).attr('y2', axisH)
      .attr('stroke', 'var(--border)')
      .attr('stroke-opacity', 0.6)

    if (k >= 0.7) {
      gridG.selectAll('.tl-month-label').data(months).join('text')
        .attr('class', 'tl-month-label')
        .attr('x', d => rescaled(d) + 3).attr('y', 32)
        .style('fill', 'var(--text-muted)')
        .style('font-size', '9px')
        .style('font-family', 'ui-sans-serif, system-ui, sans-serif')
        .text(d => d3.timeFormat('%b')(d))
    }
  }

  // Day gridlines — only when visible range spans ≤ 90 days
  const visibleDays = (d1 - d0) / 86400000
  if (k >= 1.8 && visibleDays <= 90) {
    const days = d3.timeDay.range(d3.timeDay.floor(d0), d3.timeDay.ceil(d1))
      .filter(d => d > timelineScale.domain()[0] && d < timelineScale.domain()[1])

    gridG.selectAll('.tl-day-line').data(days).join('line')
      .attr('class', 'tl-day-line')
      .attr('x1', d => rescaled(d)).attr('x2', d => rescaled(d))
      .attr('y1', 22).attr('y2', axisH)
      .attr('stroke', 'var(--border)')
      .attr('stroke-opacity', 0.3)
      .attr('stroke-dasharray', '2,3')

    if (visibleDays <= 60) {
      gridG.selectAll('.tl-day-label').data(days).join('text')
        .attr('class', 'tl-day-label')
        .attr('x', d => rescaled(d) + 2).attr('y', 44)
        .style('fill', 'var(--text-muted)')
        .style('font-size', '8px')
        .style('font-family', 'ui-sans-serif, system-ui, sans-serif')
        .text(d => d.getDate())
    }
  }

  // ── Bottom axis (adaptive tick density) ──
  let tickInterval, tickFmt
  if (visibleDays <= 90) {
    tickInterval = d3.timeDay.every(Math.max(1, Math.round(visibleDays / 10)))
    tickFmt = d3.timeFormat('%b %d')
  } else if (k >= 0.35) {
    const visibleMonths = (d1 - d0) / (30 * 86400000)
    tickInterval = d3.timeMonth.every(Math.max(1, Math.round(visibleMonths / 8)))
    tickFmt = d3.timeFormat('%b %Y')
  } else {
    tickInterval = d3.timeYear.every(1)
    tickFmt = d3.timeFormat('%Y')
  }

  const axisFn = d3.axisBottom(rescaled).ticks(tickInterval).tickFormat(tickFmt)
  timelineAxisGroup.select('.tl-axis').call(axisFn)
  styleAxis(timelineAxisGroup.select('.tl-axis'))
}

function styleAxis(axisG) {
  axisG.selectAll('path, line').attr('stroke', 'var(--border)')
  axisG.selectAll('text')
    .style('fill', 'var(--text-muted)')
    .style('font-size', '10px')
    .style('font-family', 'ui-sans-serif, system-ui, sans-serif')
}

function draw() {
  if (!svgRef.value) return
  const container = containerRef.value
  const width  = container.clientWidth  || 900
  const height = container.clientHeight || 600

  d3.select(svgRef.value).selectAll('*').remove()

  svg = d3.select(svgRef.value).attr('width', width).attr('height', height)

  // Arrow marker for wiki-links
  const defs = svg.append('defs')
  defs.append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 24).attr('refY', 0)
    .attr('markerWidth', 5).attr('markerHeight', 5)
    .attr('orient', 'auto')
    .append('path').attr('d', 'M0,-5L10,0L0,5').attr('fill', 'var(--text-dim)')

  gZoom = svg.append('g').attr('class', 'zoom-layer')
  const g = gZoom

  zoomBehavior = d3.zoom().scaleExtent([0.1, 8]).on('zoom', e => {
    if (timelineMode.value && timelineScale) {
      // ── Semantic timeline zoom ──────────────────────────────────────────────
      // Instead of visually scaling the graph layer, narrow/shift the visible
      // date range and reposition notes to fill the screen width accordingly.
      const container = containerRef.value
      const width  = container?.clientWidth  || 900
      const height = container?.clientHeight || 600
      const pad = 80

      // Derive the visible date range from the zoom transform
      const rescaled = e.transform.rescaleX(timelineScale)
      const viewScale = d3.scaleTime()
        .domain(rescaled.domain())
        .range([pad, width - pad])

      // Repin all notes to new x positions; snap x immediately for visual coherence
      simNodes.forEach(n => {
        if (n.type === 'note' && n.created_at) {
          n.fx = viewScale(new Date(n.created_at))
          n.x  = n.fx
        }
      })

      // Update overlay (bands, gridlines, axis)
      updateTimelineOverlay(e.transform, width, height)

      // Settle y positions for new layout (fast decay so it's not jarring)
      simulation?.alphaDecay(0.25).alpha(0.15).restart()

      // Do NOT apply zoom transform to the node layer — x is handled via fx
    } else {
      g.attr('transform', e.transform)
    }
  })
  svg.call(zoomBehavior)

  // Seed positions from cache
  const simNodeData = allNodes.map(n => {
    const c = positionCache.get(n.id)
    return c ? { ...n, x: c.x, y: c.y } : { ...n }
  })
  const simNodeById = Object.fromEntries(simNodeData.map(n => [n.id, n]))

  const simLinks = allLinks
    .filter(l => {
      const s = l.source?.id ?? l.source
      const t = l.target?.id ?? l.target
      return visibleNodeIds.value.has(s) && visibleNodeIds.value.has(t)
    })
    .map(l => ({
      ...l,
      source: simNodeById[l.source?.id ?? l.source],
      target: simNodeById[l.target?.id ?? l.target],
    }))
    .filter(l => l.source && l.target)

  const visibleSimNodes = simNodeData.filter(n => visibleNodeIds.value.has(n.id))
  simNodes = visibleSimNodes
  currentSimLinks = simLinks

  const maxConn = d3.max(visibleSimNodes.filter(n => n.type === 'note'), d => d.connectionCount) || 1
  const radiusScale = d3.scaleSqrt()
    .domain([0, maxConn])
    .range([appearance.minNodeSize, appearance.minNodeSize * 3.5])
  const tagR = Math.max(appearance.minNodeSize * 0.75, 5)

  // Store radius on each node so onHover can compute screen-space offset
  visibleSimNodes.forEach(n => {
    n._radius = n.type === 'note' ? radiusScale(n.connectionCount) : tagR
  })

  const isRedraw = visibleSimNodes.some(n => positionCache.has(n.id))

  simulation = d3.forceSimulation(visibleSimNodes)
    .alphaDecay(isRedraw ? 0.15 : 0.0228)
    .force('link',      d3.forceLink(simLinks).id(d => d.id).distance(appearance.linkDistance))
    .force('charge',    d3.forceManyBody().strength(-appearance.repulsion))
    .force('gravityX',  d3.forceX(width / 2).strength(appearance.gravity))
    .force('gravityY',  d3.forceY(height / 2).strength(appearance.gravity))
    .force('collision', d3.forceCollide().radius(d =>
      d.type === 'tag' ? tagR + 4 : radiusScale(d.connectionCount) + 6
    ))

  // ── Edges ──
  const wikiLinkEls = g.append('g').attr('class', 'wiki-links')
    .selectAll('line')
    .data(simLinks.filter(l => l.type === 'wiki'))
    .join('line')
    .attr('stroke', 'var(--text-dim)')
    .attr('stroke-opacity', appearance.edgeOpacity)
    .attr('stroke-width', appearance.edgeThickness)
    .attr('marker-end', appearance.showArrows ? 'url(#arrow)' : null)

  const tagLinkEls = g.append('g').attr('class', 'tag-links')
    .selectAll('line')
    .data(simLinks.filter(l => l.type === 'tag'))
    .join('line')
    .attr('stroke', '#a855f7')
    .attr('stroke-opacity', appearance.edgeOpacity * 0.75)
    .attr('stroke-width', Math.max(appearance.edgeThickness * 0.5, 0.8))
    .attr('stroke-dasharray', '3,3')

  // ── Note nodes (circles) ──
  const noteEls = g.append('g').attr('class', 'note-nodes')
    .selectAll('circle')
    .data(visibleSimNodes.filter(n => n.type === 'note'))
    .join('circle')
    .attr('r', d => radiusScale(d.connectionCount))
    .attr('fill', appearance.nodeColor)
    .attr('stroke', lightenHex(appearance.nodeColor, 40))
    .attr('stroke-width', 2)
    .attr('cursor', 'pointer')
    .call(dragBehavior())
    .on('mouseover', (event, d) => onHover(event, d))
    .on('mouseout',  (event, d) => onOut())
    .on('click',     (event, d) => { event.stopPropagation(); toggleFocus(d) })

  // ── Tag nodes (diamonds) ──
  const tagEls = g.append('g').attr('class', 'tag-nodes')
    .selectAll('path')
    .data(visibleSimNodes.filter(n => n.type === 'tag'))
    .join('path')
    .attr('d', d3.symbol(tagShape, tagR * tagR * 4))
    .attr('fill', '#130a2a')
    .attr('stroke', '#a855f7')
    .attr('stroke-width', 1.5)
    .attr('cursor', 'pointer')
    .on('mouseover', (event, d) => onHover(event, d))
    .on('mouseout',  (event, d) => onOut())
    .on('click',     (event, d) => { event.stopPropagation(); toggleFocus(d) })

  // ── Labels ──
  const labelG = g.append('g').attr('class', 'labels')

  const noteLabelEls = labelG.selectAll('.note-label')
    .data(visibleSimNodes.filter(n => n.type === 'note'))
    .join('text').attr('class', 'note-label')
    .text(d => d.title.length > 22 ? d.title.slice(0, 22) + '…' : d.title)
    .style('font-size', '11px').style('font-weight', '500')
    .style('font-family', 'ui-sans-serif, system-ui, sans-serif')
    .style('fill', 'var(--text)').style('stroke', 'var(--bg)')
    .style('stroke-width', '3px').style('stroke-linejoin', 'round')
    .style('paint-order', 'stroke').style('pointer-events', 'none')
    .attr('opacity', appearance.labelMode === 'on' ? 1 : 0)

  const tagLabelEls = labelG.selectAll('.tag-label')
    .data(visibleSimNodes.filter(n => n.type === 'tag'))
    .join('text').attr('class', 'tag-label')
    .text(d => `#${d.name}`)
    .style('font-size', '10px').style('font-weight', '600')
    .style('fill', 'var(--tag-color)').style('stroke', 'var(--bg)')
    .style('stroke-width', '2px').style('paint-order', 'stroke')
    .style('pointer-events', 'none')
    .attr('dominant-baseline', 'central')
    .attr('opacity', appearance.labelMode === 'on' ? 1 : 0)

  // Path overlay — rendered on top of labels so amber lines are always visible
  pathOverlayGroup = g.append('g').attr('class', 'path-overlay')
  drawPathOverlay()

  svg.on('click', () => {
    if (selectionMode.value) return
    focusedNode.value = null; focusedCluster.value = null
  })

  simulation.on('end', () => {
    visibleSimNodes.forEach(n => positionCache.set(n.id, { x: n.x, y: n.y }))
    if (initialFitDone) return
    initialFitDone = true
    autoFit(width, height, visibleSimNodes)
  })

  simulation.on('tick', () => {
    // Keep nodes within the visible area in timeline mode (dynamic, not hardcoded)
    if (timelineMode.value && containerRef.value) {
      const h    = containerRef.value.clientHeight
      const yMin = 36        // below year labels at top
      const yMax = h - 40   // above the axis bar at bottom
      simNodes.forEach(n => {
        if (n.y < yMin) { n.y = yMin; if (n.vy < 0) n.vy *= -0.1 }
        if (n.y > yMax) { n.y = yMax; if (n.vy > 0) n.vy *= -0.1 }
      })
    }

    const matchedIds = effectiveMatchedIds.value

    // Update path overlay positions as nodes move
    pathOverlayGroup?.selectAll('line')
      .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x).attr('y2', d => d.target.y)

    wikiLinkEls
      .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x).attr('y2', d => d.target.y)
      .attr('opacity', d => getLinkOpacity(d, matchedIds))

    tagLinkEls
      .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x).attr('y2', d => d.target.y)
      .attr('opacity', d => getLinkOpacity(d, matchedIds))

    noteEls.attr('cx', d => d.x).attr('cy', d => d.y)
      .attr('opacity', d => getNodeOpacity(d, matchedIds))

    tagEls.attr('transform', d => `translate(${d.x},${d.y})`)
      .attr('opacity', d => getNodeOpacity(d, matchedIds))

    noteLabelEls
      .attr('x', d => d.x + radiusScale(d.connectionCount) + 4)
      .attr('y', d => d.y)
      .attr('opacity', d => {
        if (appearance.labelMode === 'off') return 0
        return getNodeOpacity(d, matchedIds)
      })

    tagLabelEls
      .attr('x', d => d.x + tagR + 4)
      .attr('y', d => d.y)
      .attr('opacity', d => {
        if (appearance.labelMode === 'off') return 0
        return getNodeOpacity(d, matchedIds)
      })
  })
}

// ─── Auto-fit ─────────────────────────────────────────────────────────────────
function autoFit(width, height, nodes) {
  const core = nodes.filter(n => n.connectionCount > 0)
  const fit  = core.length > 0 ? core : nodes
  if (!fit.length) return
  const mx = d3.mean(fit, d => d.x)
  const my = d3.mean(fit, d => d.y)
  const sx = Math.sqrt(d3.mean(fit, d => (d.x - mx) ** 2)) || 1
  const sy = Math.sqrt(d3.mean(fit, d => (d.y - my) ** 2)) || 1
  const trimmed = fit.filter(n => Math.abs(n.x - mx) <= 2 * sx && Math.abs(n.y - my) <= 2 * sy)
  const use = trimmed.length > 0 ? trimmed : fit
  const xe = d3.extent(use, d => d.x)
  const ye = d3.extent(use, d => d.y)
  const pad = 80
  const scale = Math.min((width - pad * 2) / (xe[1] - xe[0] || 1), (height - pad * 2) / (ye[1] - ye[0] || 1), 1.2)
  svg.transition().duration(750).call(
    zoomBehavior.transform,
    d3.zoomIdentity.translate(width / 2, height / 2).scale(scale).translate(-(xe[0] + xe[1]) / 2, -(ye[0] + ye[1]) / 2)
  )
}

// ─── Interaction ──────────────────────────────────────────────────────────────
let hideCardTimer = null

function onHover(event, d) {
  if (getNodeOpacity(d, effectiveMatchedIds.value) === 0) return
  if (hideCardTimer) { clearTimeout(hideCardTimer); hideCardTimer = null }
  hoveredNode.value = d

  // Project node centre to screen space using zoom transform + SVG bounding rect
  // In timeline mode gZoom has no transform — nodes sit at raw simulation coords
  const transform = d3.zoomTransform(svg.node())
  const rect      = svgRef.value.getBoundingClientRect()
  let sx, sy, screenR
  if (timelineMode.value) {
    sx = d.x; sy = d.y; screenR = d._radius ?? 10
  } else {
    ;[sx, sy] = transform.apply([d.x, d.y])
    screenR = (d._radius ?? 10) * transform.k
  }
  const cardW        = 224  // w-56 = 14rem
  const gap          = 12

  const nodePageX = rect.left + window.scrollX + sx
  const nodePageY = rect.top  + window.scrollY + sy

  // Prefer right side; flip left if card would overflow viewport
  const rightX = nodePageX + screenR + gap
  tooltipX.value = rightX + cardW < window.scrollX + window.innerWidth
    ? rightX
    : nodePageX - screenR - gap - cardW

  // Vertically centre card on node, clamp so it doesn't go above viewport
  tooltipY.value = Math.max(window.scrollY + 8, nodePageY - 60)
}

function onOut() {
  hideCardTimer = setTimeout(() => { hoveredNode.value = null }, 500)
}

function onCardEnter() {
  if (hideCardTimer) { clearTimeout(hideCardTimer); hideCardTimer = null }
}

function onCardLeave() {
  hoveredNode.value = null
}

function navigateToNote(id) {
  setActiveFile(id)
  router.push('/editor')
}

function toggleFocus(d) {
  if (pathMode.value) {
    if (d.type !== 'note') return
    if (!pathFrom.value) {
      pathFrom.value = d; pathResult.value = null; return
    }
    if (pathFrom.value.id === d.id) {
      pathFrom.value = null; pathResult.value = null; return
    }
    const path = findShortestPath(pathFrom.value.id, d.id)
    if (path) {
      const nodeIds  = new Set(path)
      const edgeKeys = new Set()
      for (let i = 0; i < path.length - 1; i++) {
        edgeKeys.add(`${path[i]}-${path[i + 1]}`)
        edgeKeys.add(`${path[i + 1]}-${path[i]}`)
      }
      pathResult.value = { nodeIds, edgeKeys, steps: path.length - 1 }
    } else {
      pathResult.value = { nodeIds: new Set([pathFrom.value.id, d.id]), edgeKeys: new Set(), steps: -1 }
    }
    return
  }
  if (selectionMode.value) {
    const next = new Set(customSelection.value)
    next.has(d.id) ? next.delete(d.id) : next.add(d.id)
    customSelection.value = next
    return
  }
  focusedCluster.value = null
  focusedNode.value = focusedNode.value?.id === d.id ? null : d
}

function focusOnNote(node) {
  focusedCluster.value = null
  focusedNode.value = null
  setTimeout(() => {
    focusedNode.value = node
    panToNode(node)
  }, 10)
}

function focusOnCluster(nodeIds) {
  focusedNode.value = null
  focusedCluster.value = nodeIds
  updateOpacity()
  const clusterNodes = simNodes.filter(n => nodeIds.has(n.id))
  if (!clusterNodes.length || !svg || !zoomBehavior) return
  const cx = d3.mean(clusterNodes, n => n.x)
  const cy = d3.mean(clusterNodes, n => n.y)
  const w = containerRef.value?.clientWidth  || 900
  const h = containerRef.value?.clientHeight || 600
  const k = d3.zoomTransform(svg.node()).k
  svg.transition().duration(600).call(
    zoomBehavior.transform,
    d3.zoomIdentity.translate(w / 2 - k * cx, h / 2 - k * cy).scale(k)
  )
}

function getNodeOpacity(d, matchedIds) {
  if (!matchedIds) return 1
  if (matchedIds.has(d.id)) return 1
  const isNeighbor = allLinks.some(l => {
    const s = l.source?.id ?? l.source
    const t = l.target?.id ?? l.target
    return (matchedIds.has(s) && t === d.id) || (matchedIds.has(t) && s === d.id)
  })
  if (isNeighbor) return appearance.neighborOpacity
  return selectionMode.value ? Math.max(appearance.neighborOpacity - 0.1, 0.1) : 0
}

function getLinkOpacity(l, matchedIds) {
  if (!matchedIds) return 1
  const s = l.source?.id ?? l.source
  const t = l.target?.id ?? l.target
  if (matchedIds.has(s) || matchedIds.has(t)) return 0.85
  return selectionMode.value ? 0.15 : 0
}

function updateOpacity() {
  if (!svg) return
  const m = effectiveMatchedIds.value
  svg.selectAll('.note-nodes circle').attr('opacity', d => getNodeOpacity(d, m))
  svg.selectAll('.tag-nodes path').attr('opacity', d => getNodeOpacity(d, m))
  svg.selectAll('.labels text').attr('opacity', d => {
    if (appearance.labelMode === 'off') return 0
    return getNodeOpacity(d, m)
  })
  svg.selectAll('.wiki-links line, .tag-links line').attr('opacity', d => getLinkOpacity(d, m))
  // Highlight path source node with an indigo ring
  svg.selectAll('.note-nodes circle')
    .attr('stroke', d => d.id === pathFrom.value?.id ? '#818cf8' : lightenHex(appearance.nodeColor, 40))
    .attr('stroke-width', d => d.id === pathFrom.value?.id ? 3 : 2)
}

function panToNode(node) {
  if (!svg || !zoomBehavior || !node) return
  const simNode = simNodes.find(n => n.id === node.id)
  if (!simNode) return
  const w = containerRef.value?.clientWidth  || 900
  const h = containerRef.value?.clientHeight || 600
  const k = d3.zoomTransform(svg.node()).k
  svg.transition().duration(400).call(
    zoomBehavior.transform,
    d3.zoomIdentity.translate(w / 2 - k * simNode.x, h / 2 - k * simNode.y).scale(k)
  )
}

function dragBehavior() {
  return d3.drag()
    .on('start', (event, d) => {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      if (!timelineMode.value) d.fx = d.x
      d.fy = d.y
    })
    .on('drag',  (event, d) => {
      if (!timelineMode.value) d.fx = event.x
      d.fy = event.y
    })
    .on('end',   (event, d) => {
      if (!event.active) simulation.alphaTarget(0)
      if (!timelineMode.value) d.fx = null
      d.fy = null
    })
}

function resetZoom() {
  svg?.transition().duration(500).call(zoomBehavior.transform, d3.zoomIdentity)
}

// ─── Colour utility ───────────────────────────────────────────────────────────
function lightenHex(hex, amount) {
  try {
    const n = parseInt(hex.replace('#', ''), 16)
    const r = Math.min(255, (n >> 16)        + amount)
    const g = Math.min(255, ((n >> 8) & 0xff) + amount)
    const b = Math.min(255, (n & 0xff)        + amount)
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
  } catch { return '#94a3b8' }
}

// ─── Appearance watchers (live — no redraw) ────────────────────────────────────
watch(() => appearance.nodeColor, v => {
  svg?.selectAll('.note-nodes circle').attr('fill', v).attr('stroke', lightenHex(v, 40))
})
watch(() => appearance.edgeOpacity, v => {
  svg?.selectAll('.wiki-links line').attr('stroke-opacity', v)
  svg?.selectAll('.tag-links line').attr('stroke-opacity', v * 0.45)
})
watch(() => appearance.edgeThickness, v => {
  svg?.selectAll('.wiki-links line').attr('stroke-width', v)
  svg?.selectAll('.tag-links line').attr('stroke-width', Math.max(v * 0.5, 0.8))
})
watch(() => appearance.showArrows, v => {
  svg?.selectAll('.wiki-links line').attr('marker-end', v ? 'url(#arrow)' : null)
})
watch(() => appearance.labelMode, mode => {
  svg?.selectAll('.note-label, .tag-label').attr('opacity', mode === 'on' ? 1 : 0)
})

// Physics — update existing forces + restart (no redraw)
watch([() => appearance.repulsion, () => appearance.linkDistance, () => appearance.gravity], () => {
  if (!simulation) return
  simulation.force('charge')?.strength(-appearance.repulsion)
  simulation.force('link')?.distance(appearance.linkDistance)
  simulation.force('gravityX')?.strength(appearance.gravity)
  simulation.force('gravityY')?.strength(appearance.gravity)
  simulation.alpha(0.3).restart()
})

watch(() => appearance.neighborOpacity, () => updateOpacity())

// Node size — needs redraw (scales change)
watch(() => appearance.minNodeSize, () => {
  if (simulation) simulation.stop()
  draw()
})

// Structural changes — full redraw
watch([showTagNodes, showWikiLinks], () => {
  focusedNode.value = null
  initialFitDone = false
  rebuildActiveArrays()
  draw()
})
watch([showOrphans, minConnections], () => {
  focusedNode.value = null
  initialFitDone = false
  draw()
})

// ─── Search ───────────────────────────────────────────────────────────────────
let skipSearchWatch = false
watch(searchQuery, query => {
  if (skipSearchWatch) return
  focusedNode.value = null
  if (searchDebounce) clearTimeout(searchDebounce)
  if (!query?.trim()) {
    searchResults.value = []; showDropdown.value = false; updateOpacity(); return
  }
  updateOpacity()
  searchDebounce = setTimeout(async () => {
    searchLoading.value = true
    try {
      const res = await hybridSearch(query.trim(), 8)
      searchResults.value = res.results
        .map(r => { const node = allNodes.find(n => n.id === Number(r.id)); return node ? { ...node, score: r.score } : null })
        .filter(Boolean)
      showDropdown.value = searchResults.value.length > 0
    } catch {
      searchResults.value = []; showDropdown.value = false
    } finally { searchLoading.value = false }
  }, 500)
})

function selectSearchResult(node) {
  skipSearchWatch = true
  searchQuery.value = ''; searchResults.value = []; showDropdown.value = false
  focusedNode.value = node
  setTimeout(() => { skipSearchWatch = false }, 50)
}

watch(focusedNode,      node => { updateOpacity(); if (node) panToNode(node) })
watch(focusedCluster,  () => updateOpacity())
watch(customSelection, () => updateOpacity())
watch(pathFrom,        () => updateOpacity())
watch(pathResult,      () => { drawPathOverlay(); updateOpacity() })

onMounted(() => { loadAndDraw() })
onUnmounted(() => { if (simulation) simulation.stop(); if (timelineAxisGroup) timelineAxisGroup.remove() })
</script>

<template>
  <div class="flex flex-col h-full bg-c-bg text-c-text">

    <!-- ── Controls bar ────────────────────────────────────────────────────── -->
    <div class="flex flex-wrap items-center gap-3 px-4 py-2.5 border-b border-c-border">
      <h2 class="text-base font-semibold text-c-text mr-1">Graph</h2>

      <!-- Toggles -->
      <button
        class="toggle-btn" :class="{ active: showWikiLinks }"
        @click="showWikiLinks = !showWikiLinks"
        title="Toggle note↔note wiki-link edges"
      >
        <Link2 class="w-3.5 h-3.5" />
        Note Links
      </button>
      <button
        class="toggle-btn" :class="{ active: showTagNodes }"
        @click="showTagNodes = !showTagNodes"
        title="Toggle tag nodes and note↔tag edges"
      >
        <Tag class="w-3.5 h-3.5" />
        Tag Nodes
      </button>
      <button
        class="toggle-btn" :class="{ active: selectionMode }"
        :title="selectionMode && customSelection.size > 0 ? 'Focus on selected nodes' : 'Select nodes to view together'"
        @click="selectionMode && customSelection.size > 0 ? applySelection() : (selectionMode = !selectionMode)"
      >
        <Lasso class="w-3.5 h-3.5" />
        {{ selectionMode && customSelection.size > 0 ? `Focus (${customSelection.size})` : 'Select' }}
      </button>
      <button
        class="toggle-btn" :class="{ active: pathMode }"
        title="Find shortest path between two notes"
        @click="pathMode = !pathMode"
      >
        <Route class="w-3.5 h-3.5" />
        Path
      </button>
      <button
        class="toggle-btn" :class="{ active: timelineMode }"
        title="Arrange notes by creation date"
        @click="timelineMode = !timelineMode"
      >
        <CalendarDays class="w-3.5 h-3.5" />
        Timeline
      </button>

      <div class="w-px h-4 bg-c-border" />

      <!-- Search -->
      <div class="relative">
        <div class="flex items-center gap-1">
          <input
            v-model="searchQuery" type="text" placeholder="Search notes…"
            class="px-3 py-1.5 text-sm rounded-lg bg-c-surface border border-c-border text-c-text placeholder-c-text-muted focus:outline-none focus:border-blue-500 w-52"
            @focus="showDropdown = searchResults.length > 0"
            @blur="setTimeout(() => showDropdown = false, 200)"
          />
          <span v-if="searchLoading" class="text-xs text-c-text-muted animate-pulse">…</span>
        </div>
        <div v-if="showDropdown && searchResults.length"
          class="absolute top-full left-0 mt-1 w-80 bg-c-surface border border-c-border rounded-lg shadow-xl z-50 max-h-72 overflow-y-auto">
          <button v-for="r in searchResults" :key="r.id"
            class="w-full text-left px-3 py-2 hover:bg-c-surface-hover border-b border-c-border last:border-0 transition"
            @mousedown.prevent="selectSearchResult(r)">
            <div class="text-sm font-medium text-c-text truncate">{{ r.title }}</div>
            <div class="text-xs text-c-text-muted mt-0.5 truncate">{{ r.tags?.join(', ') }}</div>
          </button>
        </div>
      </div>

      <!-- Min connections -->
      <div class="flex items-center gap-2 text-xs text-c-text-muted">
        <span>Min links:</span>
        <input v-model.number="minConnections" type="range" min="0" :max="maxConnectionCount" step="1" class="w-20 accent-blue-500" />
        <span class="w-4 text-c-text">{{ minConnections }}</span>
      </div>

      <!-- Orphans -->
      <label class="flex items-center gap-1.5 text-xs text-c-text-muted cursor-pointer select-none">
        <input v-model="showOrphans" type="checkbox" class="accent-blue-500" />
        Orphans
      </label>

      <!-- Focus / selection badges -->
      <div v-if="focusedNode" class="flex items-center gap-2 text-xs bg-blue-900/70 text-blue-200 px-2.5 py-1 rounded-full">
        {{ focusedNode.title ?? focusedNode.name }}
        <button @click="focusedNode = null" class="text-blue-400 hover:text-white leading-none">✕</button>
      </div>
      <div v-if="focusedCluster" class="flex items-center gap-2 text-xs bg-emerald-900/70 text-emerald-200 px-2.5 py-1 rounded-full">
        Cluster · {{ focusedCluster.size }} notes
        <button @click="focusedCluster = null" class="text-emerald-400 hover:text-white leading-none">✕</button>
      </div>
      <div v-if="selectionMode && customSelection.size > 0" class="flex items-center gap-2 text-xs bg-amber-900/70 text-amber-200 px-2.5 py-1 rounded-full">
        {{ customSelection.size }} selected
        <button @click="selectionMode = false" class="text-amber-400 hover:text-white leading-none">✕</button>
      </div>
      <div v-if="pathMode && !pathFrom" class="text-xs text-c-text-muted italic">Click a note to start path</div>
      <div v-if="pathFrom && !pathResult" class="flex items-center gap-2 text-xs bg-indigo-900/70 text-indigo-200 px-2.5 py-1 rounded-full">
        From: {{ pathFrom.title.length > 16 ? pathFrom.title.slice(0, 16) + '…' : pathFrom.title }} · click destination
        <button @click="pathFrom = null" class="text-indigo-400 hover:text-white leading-none">✕</button>
      </div>
      <div v-if="pathResult" class="flex items-center gap-2 text-xs px-2.5 py-1 rounded-full"
        :class="pathResult.steps >= 0 ? 'bg-indigo-900/70 text-indigo-200' : 'bg-red-900/70 text-red-200'">
        {{ pathResult.steps >= 0 ? `${pathResult.steps} step${pathResult.steps !== 1 ? 's' : ''}` : 'No path found' }}
        <button @click="pathResult = null; pathFrom = null" class="hover:text-white leading-none"
          :class="pathResult.steps >= 0 ? 'text-indigo-400' : 'text-red-400'">✕</button>
      </div>

      <button @click="resetZoom" class="ml-auto text-xs text-c-text-muted hover:text-c-text px-2.5 py-1.5 rounded-lg border border-c-border hover:border-c-border-hover transition">
        Reset zoom
      </button>
    </div>

    <!-- ── Middle: stats panel + graph ──────────────────────────────────── -->
    <div class="flex flex-1 overflow-hidden">

      <!-- Vertical stats handle -->
      <div class="stats-handle" @click="statsOpen = !statsOpen" :title="statsOpen ? 'Hide stats' : 'Show stats'">
        <component :is="statsOpen ? ChevronDown : ChevronUp" class="stats-handle-chevron" />
        <span class="stats-handle-label">Stats</span>
      </div>

      <!-- Left stats panel -->
      <div class="stats-panel" :class="{ open: statsOpen }">
        <div class="stats-panel-body">

          <div class="stat-section">
            <div class="stat-section-title">Viewing</div>
            <div class="stat-row">
              <span class="stat-label" title="Note nodes currently visible in the graph">Notes</span>
              <span class="stat-value">{{ statsNoteCount }} <span class="text-c-text-muted">/ {{ totalNoteCount }}</span></span>
            </div>
            <div class="stat-row" v-if="showTagNodes">
              <span class="stat-label" title="Tag nodes currently visible in the graph">Tags</span>
              <span class="stat-value">{{ statsTagCount }}</span>
            </div>
            <div class="stat-row" v-if="showWikiLinks">
              <span class="stat-label" title="Direct note-to-note links visible in the graph">Note links</span>
              <span class="stat-value">{{ statsNoteLinkCount }}</span>
            </div>
            <div class="stat-row" v-if="showTagNodes">
              <span class="stat-label" title="Note-to-tag connections visible in the graph">Tag links</span>
              <span class="stat-value">{{ statsTagLinkCount }}</span>
            </div>
            <div class="stat-row clickable" @click="lastUpdatedNote && focusOnNote(lastUpdatedNote)">
              <span class="stat-label" title="Most recently edited note in the current view — click to focus it">Last updated</span>
              <span class="stat-value">{{ lastUpdatedNote ? (lastUpdatedNote.title.length > 18 ? lastUpdatedNote.title.slice(0, 18) + '…' : lastUpdatedNote.title) : '—' }}</span>
            </div>
            <div class="stat-row">
              <span class="stat-label" title="Disconnected groups of notes — use arrows to cycle through each group">Groups</span>
              <div class="flex items-center gap-1">
                <button class="cluster-nav-btn" :disabled="allClusters.length < 2" @click="cycleCluster(-1)">‹</button>
                <span class="stat-value">
                  {{ allClusters.length }}<span v-if="selectedClusterIndex !== null" class="text-c-text-muted"> · {{ selectedClusterIndex + 1 }}</span>
                </span>
                <button class="cluster-nav-btn" :disabled="allClusters.length < 2" @click="cycleCluster(1)">›</button>
              </div>
            </div>
          </div>

          <div class="stat-divider" />

          <div class="stat-section">
            <div class="stat-section-title">Network</div>
            <div class="stat-row" :class="{ clickable: mostConnectedNote }"
              @click="mostConnectedNote && focusOnNote(mostConnectedNote)">
              <span class="stat-label" title="Note with the most wiki-links — click to focus it">Most connected</span>
              <span class="stat-value">{{ mostConnectedNote ? `${mostConnectedNote.title.slice(0, 18)}${mostConnectedNote.title.length > 18 ? '…' : ''} (${mostConnectedNote.degree})` : '—' }}</span>
            </div>
            <div class="stat-row">
              <span class="stat-label" title="Notes with no links to or from any other note">Isolated notes</span>
              <span class="stat-value">{{ isolatedCount }}</span>
            </div>
            <div class="stat-row" :class="{ clickable: sinkNotes.length > 0 }"
              @click="sinkNotes.length && focusOnCluster(new Set(sinkNotes.map(n => n.id)))">
              <span class="stat-label" title="Notes that others link to, but that don't link out to anything — click to focus them">Dead ends</span>
              <span class="stat-value">{{ sinkNotes.length || '—' }}</span>
            </div>
            <div class="stat-row">
              <span class="stat-label" title="Average number of links per note">Avg connections</span>
              <span class="stat-value">{{ avgConnections }}</span>
            </div>
            <div class="stat-row clickable" @click="focusOnCluster(largestCluster.nodeIds)">
              <span class="stat-label" title="Largest group of interconnected notes — click to focus it">Biggest cluster</span>
              <span class="stat-value">{{ largestCluster.size }} notes</span>
            </div>
          </div>

          <div class="stat-divider" />

          <div class="stat-section">
            <div class="stat-section-title">Topics</div>
            <div class="stat-row">
              <span class="stat-label" title="Tag applied to the most notes across your entire graph">Most used tag</span>
              <span v-if="mostUsedTag" class="tag-chip">#{{ mostUsedTag.name }} ({{ mostUsedTag.count }})</span>
              <span v-else class="stat-value">—</span>
            </div>
            <div class="stat-block">
              <div class="stat-row">
                <span class="stat-label" title="Tags that appear on only one note — niche or specific topics">Unique tags</span>
                <span class="stat-value">{{ nicheTags.length || '—' }}</span>
              </div>
              <div v-if="nicheTags.length" class="flex flex-wrap gap-1 mt-1 max-h-20 overflow-y-auto">
                <span v-for="t in nicheTags" :key="t" class="tag-chip">#{{ t }}</span>
              </div>
            </div>
            <div class="stat-row" :class="{ clickable: mostVersatileNote }"
              @click="mostVersatileNote && focusOnNote(mostVersatileNote)">
              <span class="stat-label" title="Note with the most tags — spans the most topics — click to focus it">Most tagged note</span>
              <span class="stat-value">{{ mostVersatileNote ? `${mostVersatileNote.title.slice(0, 16)}${mostVersatileNote.title.length > 16 ? '…' : ''} (${mostVersatileNote.tags.length} tags)` : '—' }}</span>
            </div>
            <div class="stat-row">
              <span class="stat-label" title="Tags that didn't exist before the last 30 days — recently introduced topics">New tags (30d)</span>
              <span class="stat-value">{{ newTagsLast30Days }}</span>
            </div>
          </div>

        </div>
      </div>

      <!-- Graph area -->
      <div ref="containerRef" class="relative flex-1 overflow-hidden">
        <div v-if="loading" class="absolute inset-0 flex items-center justify-center text-c-text-muted text-sm">
          Loading graph…
        </div>
        <div v-else-if="error" class="absolute inset-0 flex items-center justify-center text-red-400 text-sm">
          {{ error }}
        </div>
        <svg ref="svgRef" class="w-full h-full" />
      </div>

    </div>

    <!-- ── Hover card ────────────────────────────────────────────────────────── -->
    <Teleport to="body">
      <Transition name="card-fade">
        <div v-if="hoveredNode"
          class="fixed z-50 bg-c-surface border border-c-border rounded-xl shadow-2xl p-3 text-sm w-56 backdrop-blur-sm"
          :style="{ left: tooltipX + 'px', top: tooltipY + 'px' }"
          @mouseenter="onCardEnter" @mouseleave="onCardLeave">
          <template v-if="hoveredNode.type === 'note'">
            <p class="font-semibold text-c-text mb-1 truncate">{{ hoveredNode.title }}</p>
            <div class="flex flex-wrap gap-1 mb-2">
              <span v-for="tag in hoveredNode.tags" :key="tag" class="tag-chip">#{{ tag }}</span>
            </div>
            <p class="text-c-text-muted text-xs">{{ hoveredNode.connectionCount }} connection{{ hoveredNode.connectionCount !== 1 ? 's' : '' }}</p>
            <p v-if="timelineMode && hoveredNode.created_at" class="text-c-text-muted text-xs">
              Created {{ new Date(hoveredNode.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
            </p>
            <p v-else-if="hoveredNode.updated_at" class="text-c-text-muted text-xs mb-2">Updated {{ new Date(hoveredNode.updated_at).toLocaleDateString() }}</p>
            <button @click="navigateToNote(hoveredNode.id)"
              class="w-full text-xs py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition">
              Open in editor →
            </button>
          </template>
          <template v-else>
            <p class="font-semibold text-purple-300 mb-1">#{{ hoveredNode.name }}</p>
            <p class="text-c-text-muted text-xs">{{ hoveredNode.noteCount }} note{{ hoveredNode.noteCount !== 1 ? 's' : '' }}</p>
          </template>
        </div>
      </Transition>
    </Teleport>

    <!-- ── Drawer (Appearance) ───────────────────────────────────────────── -->
    <div class="drawer" :class="{ open: drawerOpen }">

      <!-- Drawer handle -->
      <div class="drawer-handle" @click="drawerOpen = !drawerOpen">
        <Sliders class="w-3.5 h-3.5 text-c-text-muted" />
        <span class="drawer-label">Appearance</span>
        <component :is="drawerOpen ? ChevronDown : ChevronUp" class="w-4 h-4 text-c-text-muted ml-auto" />
      </div>

      <!-- Drawer content -->
      <div class="drawer-body">

        <!-- ── Appearance ─────────────────────────────────────────────────── -->
        <div class="appearance-grid">

          <div class="app-section">
            <div class="stat-section-title">Physics</div>
            <label class="app-row">
              <span class="app-label">Repulsion</span>
              <input type="range" v-model.number="appearance.repulsion" min="50" max="2000" step="50" class="app-slider" />
              <span class="app-val">{{ appearance.repulsion }}</span>
            </label>
            <label class="app-row">
              <span class="app-label">Spacing</span>
              <input type="range" v-model.number="appearance.linkDistance" min="50" max="500" step="10" class="app-slider" />
              <span class="app-val">{{ appearance.linkDistance }}</span>
            </label>
            <label class="app-row">
              <span class="app-label">Gravity</span>
              <input type="range" v-model.number="appearance.gravity" min="0" max="0.5" step="0.01" class="app-slider" />
              <span class="app-val">{{ appearance.gravity.toFixed(2) }}</span>
            </label>
          </div>

          <div class="app-divider" />

          <div class="app-section">
            <div class="stat-section-title">Nodes</div>
            <label class="app-row">
              <span class="app-label">Node size</span>
              <input type="range" v-model.number="appearance.minNodeSize" min="4" max="20" step="1" class="app-slider" />
              <span class="app-val">{{ appearance.minNodeSize }}</span>
            </label>
            <label class="app-row">
              <span class="app-label">Dim others</span>
              <input type="range" v-model.number="appearance.neighborOpacity" min="0" max="1" step="0.05" class="app-slider" />
              <span class="app-val">{{ appearance.neighborOpacity.toFixed(2) }}</span>
            </label>
            <label class="app-row">
              <span class="app-label">Color</span>
              <input type="color" v-model="appearance.nodeColor" class="app-color" />
              <span class="app-val">{{ appearance.nodeColor }}</span>
            </label>
          </div>

          <div class="app-divider" />

          <div class="app-section">
            <div class="stat-section-title">Edges</div>
            <label class="app-row">
              <span class="app-label">Thickness</span>
              <input type="range" v-model.number="appearance.edgeThickness" min="0.5" max="8" step="0.5" class="app-slider" />
              <span class="app-val">{{ appearance.edgeThickness }}</span>
            </label>
            <label class="app-row">
              <span class="app-label">Opacity</span>
              <input type="range" v-model.number="appearance.edgeOpacity" min="0.1" max="1" step="0.05" class="app-slider" />
              <span class="app-val">{{ appearance.edgeOpacity.toFixed(2) }}</span>
            </label>
            <label class="app-row cursor-pointer">
              <span class="app-label">Arrows</span>
              <input type="checkbox" v-model="appearance.showArrows" class="accent-blue-500" />
            </label>
          </div>

          <div class="app-divider" />

          <div class="app-section">
            <div class="stat-section-title">Labels</div>
            <div class="flex gap-2 mt-1">
              <button v-for="mode in ['on', 'off']" :key="mode"
                class="label-mode-btn" :class="{ active: appearance.labelMode === mode }"
                @click="appearance.labelMode = mode">
                {{ mode }}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Tag chips (hover card + stats) ─────────────────────────────────────────── */
.tag-chip {
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 11px;
  background: var(--tag-bg);
  color: var(--tag-color);
}

/* ── Hover card transition ───────────────────────────────────────────────────── */
.card-fade-enter-active, .card-fade-leave-active { transition: opacity 0.15s ease; }
.card-fade-enter-from, .card-fade-leave-to { opacity: 0; }

/* ── Toggle buttons ─────────────────────────────────────────────────────────── */
.toggle-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid var(--border-hover);
  background: var(--surface-hover);
  color: var(--text-dim);
  font-size: 12px;
  cursor: pointer;
  transition: background 0.12s, border-color 0.12s, color 0.12s;
}
.toggle-btn:hover { border-color: var(--border-hover); color: var(--text); }
.toggle-btn.active { border-color: #a855f7; color: #c084fc; background: rgba(168,85,247,0.12); }

/* ── Stats handle (vertical strip) ─────────────────────────────────────────── */
.stats-handle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 20px;
  flex-shrink: 0;
  background: var(--bg);
  border-right: 1px solid var(--border);
  cursor: pointer;
  transition: background 0.12s;
  user-select: none;
}
.stats-handle:hover { background: var(--surface-hover); }
.stats-handle-chevron {
  width: 12px;
  height: 12px;
  color: var(--text-muted);
  transform: rotate(-90deg);
  flex-shrink: 0;
}
.stats-handle-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--text-muted);
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

/* ── Stats panel (left side) ────────────────────────────────────────────────── */
.stats-panel {
  width: 0;
  flex-shrink: 0;
  overflow: hidden;
  border-right: 0px solid var(--border);
  background: var(--bg);
  transition: width 0.2s ease, border-width 0.2s ease;
}
.stats-panel.open {
  width: 240px;
  border-right-width: 1px;
}
.stats-panel-body {
  width: 240px;
  height: 100%;
  overflow-y: auto;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 0;
  box-sizing: border-box;
}
.stats-panel-body::-webkit-scrollbar { width: 4px; }
.stats-panel-body::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

/* ── Stats content ───────────────────────────────────────────────────────────── */
.stat-section { margin-bottom: 4px; }
.stat-section-title {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 6px;
}
.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0;
  border-radius: 4px;
  gap: 12px;
}
.stat-row.clickable {
  cursor: pointer;
  padding: 3px 6px;
  margin: 0 -6px;
  transition: background 0.1s;
}
.stat-row.clickable:hover { background: var(--surface-hover); }
.stat-block { padding: 3px 0; }
.stat-label { font-size: 11px; color: var(--text-muted); white-space: nowrap; }
.stat-value { font-size: 11px; color: var(--text); font-weight: 500; text-align: right; }
.stat-divider { height: 1px; background: var(--border); margin: 10px 0; }

/* ── Drawer ─────────────────────────────────────────────────────────────────── */
.drawer {
  flex-shrink: 0;
  border-top: 1px solid var(--border);
  background: var(--bg);
  overflow: hidden;
  max-height: 32px;       /* closed: just the handle */
  transition: max-height 0.2s ease;
}
.drawer.open {
  max-height: 280px;      /* open: handle + body */
}
.drawer-handle {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: border-color 0.12s;
}
.drawer.open .drawer-handle { border-color: var(--border); }
.drawer-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: var(--text-muted);
}
.drawer-body {
  overflow-x: auto;
  overflow-y: hidden;
  max-height: 220px;
}

/* ── Appearance grid ────────────────────────────────────────────────────────── */
.appearance-grid {
  display: flex;
  gap: 0;
  padding: 10px 16px;
  min-width: 700px;
  align-items: flex-start;
}
.app-section { flex: 1; min-width: 160px; }
.app-divider { width: 1px; background: var(--border); margin: 0 16px; flex-shrink: 0; }
.app-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 3px 0;
}
.app-label { font-size: 11px; color: var(--text-muted); white-space: nowrap; min-width: 80px; }
.app-slider { flex: 1; accent-color: #6366f1; height: 3px; }
.app-val { font-size: 10px; color: var(--text-dim); min-width: 36px; text-align: right; }
.app-color {
  width: 28px; height: 22px;
  border: 1px solid var(--border-hover);
  border-radius: 4px;
  background: none;
  cursor: pointer;
  padding: 1px;
}
.label-mode-btn {
  padding: 3px 10px;
  border-radius: 5px;
  border: 1px solid var(--border-hover);
  background: none;
  color: var(--text-muted);
  font-size: 11px;
  cursor: pointer;
  text-transform: capitalize;
  transition: all 0.12s;
}
.label-mode-btn:hover { border-color: var(--border-hover); color: var(--text-dim); }
.label-mode-btn.active { border-color: #6366f1; color: #818cf8; background: rgba(99,102,241,0.1); }

/* ── Cluster nav ─────────────────────────────────────────────────────────────── */
.cluster-nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 3px;
  border: 1px solid var(--border-hover);
  background: none;
  color: var(--text-dim);
  font-size: 13px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.1s, color 0.1s;
  padding: 0;
}
.cluster-nav-btn:hover:not(:disabled) { background: var(--surface-hover); color: var(--text); }
.cluster-nav-btn:disabled { opacity: 0.3; cursor: default; }
</style>
