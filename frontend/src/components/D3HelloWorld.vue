<script setup>
import { onMounted, ref } from 'vue'
import * as d3 from 'd3'

const svgRef = ref(null)

onMounted(() => {
  const width = 600
  const height = 400

  // Prevent multiple charts rendering in HMR
  const svg = d3.select(svgRef.value)
  svg.selectAll('*').remove()
  
  svg.attr('width', width)
     .attr('height', height)

  // Sample node data
  const nodes = [
    { id: 'Vue 3', group: 1 },
    { id: 'D3.js', group: 2 },
    { id: 'Vite', group: 3 },
    { id: 'Data Viz', group: 4 },
    { id: 'Interactive', group: 5 }
  ]

  // Sample link data
  const links = [
    { source: 'Vue 3', target: 'D3.js' },
    { source: 'Vue 3', target: 'Vite' },
    { source: 'D3.js', target: 'Data Viz' },
    { source: 'D3.js', target: 'Interactive' },
    { source: 'Vite', target: 'Interactive' }
  ]

  // Initialize force simulation
  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(120))
    .force('charge', d3.forceManyBody().strength(-400))
    .force('center', d3.forceCenter(width / 2, height / 2))

  // Color scale
  const color = d3.scaleOrdinal(d3.schemePaired)

  // Draw links
  const link = svg.append('g')
    .attr('stroke', '#a1a1aa') // Tailwind gray-400
    .attr('stroke-opacity', 0.6)
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke-width', 2)

  // Draw nodes
  const node = svg.append('g')
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('r', 18)
    .attr('fill', d => color(d.group))
    .attr('cursor', 'pointer')
    .call(drag(simulation))

  // Add accessible labels
  const label = svg.append('g')
    .selectAll('text')
    .data(nodes)
    .join('text')
    .attr('dx', 24)
    .attr('dy', '.35em')
    .text(d => d.id)
    .style('font-family', 'ui-sans-serif, system-ui, sans-serif')
    .style('font-size', '14px')
    .style('font-weight', '500')
    .style('fill', 'currentColor') // Naturally adapts to dark/light mode

  // Simulation tick updates
  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)

    node
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)

    label
      .attr('x', d => d.x)
      .attr('y', d => d.y)
  })

  // Drag handlers defining behavior when grabbing nodes
  function drag(simulation) {
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
    }
    
    function dragged(event) {
      event.subject.fx = event.x
      event.subject.fy = event.y
    }
    
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0)
      event.subject.fx = null
      event.subject.fy = null
    }
    
    return d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended)
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center p-8">
    <h2 class="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">D3 Force Graph</h2>
    <p class="text-gray-500 dark:text-gray-400 mb-6 font-medium">Try dragging the nodes around!</p>
    
    <!-- Render container for the D3 SVG with decent styling -->
    <div class="p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <svg ref="svgRef" class="w-full max-w-[600px] h-[400px]"></svg>
    </div>
  </div>
</template>
