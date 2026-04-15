<script setup>
import { onMounted, ref, watch, nextTick } from "vue";
import * as d3 from "d3";
import { getNotes, buildActivityData } from "../../services/api.js";

const svgRef = ref(null);
const containerRef = ref(null);
const loading = ref(true);
const error = ref(null);
const viewMode = ref("daily"); // 'daily' | 'weekly'
const hoveredBar = ref(null);
const tooltipX = ref(0);
const tooltipY = ref(0);
const totalNotes = ref(0);
const totalDays = ref(0);

let rawActivity = [];

async function loadAndDraw() {
  try {
    loading.value = true;
    const notes = await getNotes();
    rawActivity = buildActivityData(notes);
    totalNotes.value = notes.length;
    totalDays.value = rawActivity.length;
    loading.value = false;
    await nextTick();
    draw();
  } catch (e) {
    error.value = e.message;
    loading.value = false;
  }
}

function aggregateWeekly(daily) {
  const weekly = {};
  daily.forEach(({ date, count }) => {
    const d = new Date(date);
    const weekStart = d3.timeMonday.floor(d);
    const key = d3.timeFormat("%Y-%m-%d")(weekStart);
    weekly[key] = (weekly[key] ?? 0) + count;
  });
  return Object.entries(weekly)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function draw() {
  if (!svgRef.value || !containerRef.value) return;
  d3.select(svgRef.value).selectAll("*").remove();

  const data =
    viewMode.value === "weekly" ? aggregateWeekly(rawActivity) : rawActivity;
  if (!data.length) return;

  const container = containerRef.value;
  const totalWidth = container.clientWidth || 800;
  const totalHeight = container.clientHeight || 500;
  const margin = { top: 30, right: 30, bottom: 70, left: 50 };
  const width = totalWidth - margin.left - margin.right;
  const height = totalHeight - margin.top - margin.bottom;

  const svg = d3
    .select(svgRef.value)
    .attr("width", totalWidth)
    .attr("height", totalHeight);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Scales
  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.date))
    .range([0, width])
    .padding(0.2);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.count) + 1])
    .range([height, 0]);

  // Grid lines
  g.append("g")
    .attr("class", "grid")
    .call(d3.axisLeft(y).tickSize(-width).tickFormat(""))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll("line")
        .attr("stroke", "#1e293b")
        .attr("stroke-dasharray", "3,3"),
    );

  // X axis — only show a subset of labels to avoid crowding
  const tickInterval = Math.ceil(data.length / 10);
  const xAxis = d3
    .axisBottom(x)
    .tickValues(
      data.filter((d, i) => i % tickInterval === 0).map((d) => d.date),
    )
    .tickFormat((d) => {
      const date = new Date(d);
      return viewMode.value === "weekly"
        ? d3.timeFormat("%b %d")(date)
        : d3.timeFormat("%b %d")(date);
    });

  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis)
    .call((g) => g.select(".domain").attr("stroke", "#334155"))
    .call((g) =>
      g
        .selectAll("text")
        .attr("transform", "rotate(-35)")
        .attr("text-anchor", "end")
        .attr("dx", "-0.5em")
        .attr("dy", "0.5em")
        .style("font-size", "11px")
        .style("fill", "#64748b"),
    )
    .call((g) => g.selectAll(".tick line").attr("stroke", "#334155"));

  // Y axis
  g.append("g")
    .call(
      d3
        .axisLeft(y)
        .ticks(5)
        .tickFormat((d) => (Number.isInteger(d) ? d : "")),
    )
    .call((g) => g.select(".domain").attr("stroke", "#334155"))
    .call((g) =>
      g.selectAll("text").style("font-size", "11px").style("fill", "#64748b"),
    )
    .call((g) => g.selectAll(".tick line").attr("stroke", "#334155"));

  // Color scale by count (low = muted blue, high = bright blue)
  const maxCount = d3.max(data, (d) => d.count);
  const barColor = d3
    .scaleSequential(d3.interpolateBlues)
    .domain([0, maxCount * 1.5]);

  // Bars
  g.selectAll(".bar")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("x", (d) => x(d.date))
    .attr("y", height) // start from bottom for animation
    .attr("width", x.bandwidth())
    .attr("height", 0)
    .attr("rx", 3)
    .attr("fill", (d) => barColor(d.count))
    .attr("cursor", "pointer")
    .on("mouseover", (event, d) => {
      hoveredBar.value = d;
      tooltipX.value = event.pageX + 12;
      tooltipY.value = event.pageY - 28;
      d3.select(event.currentTarget).attr("fill", "#60a5fa");
    })
    .on("mousemove", (event) => {
      tooltipX.value = event.pageX + 12;
      tooltipY.value = event.pageY - 28;
    })
    .on("mouseout", (event, d) => {
      hoveredBar.value = null;
      d3.select(event.currentTarget).attr("fill", barColor(d.count));
    })
    // Animate bars up
    .transition()
    .duration(600)
    .ease(d3.easeCubicOut)
    .attr("y", (d) => y(d.count))
    .attr("height", (d) => height - y(d.count));

  // Y axis label
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(margin.top + height / 2))
    .attr("y", 12)
    .attr("text-anchor", "middle")
    .text("Notes")
    .style("font-size", "11px")
    .style("fill", "#64748b");
}

watch(viewMode, () => draw());
onMounted(() => loadAndDraw());
</script>

<template>
  <div class="flex flex-col h-full bg-gray-950 text-gray-100 p-4">
    <!-- Header -->
    <div class="flex flex-wrap items-center gap-4 mb-6">
      <h2 class="text-lg font-semibold text-white">Writing Activity</h2>

      <!-- View toggle -->
      <div
        class="flex rounded-lg overflow-hidden border border-gray-700 shrink-0"
      >
        <button
          @click="viewMode = 'daily'"
          :class="
            viewMode === 'daily'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-white'
          "
          class="px-3 py-1.5 text-sm transition"
        >
          Daily
        </button>
        <button
          @click="viewMode = 'weekly'"
          :class="
            viewMode === 'weekly'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-white'
          "
          class="px-3 py-1.5 text-sm transition"
        >
          Weekly
        </button>
      </div>

      <!-- Stats -->
      <div class="ml-auto flex gap-6 text-sm text-gray-400">
        <div>
          Total notes
          <span class="text-white font-semibold">{{ totalNotes }}</span>
        </div>
        <div>
          Active days
          <span class="text-white font-semibold">{{ totalDays }}</span>
        </div>
      </div>
    </div>

    <!-- Chart -->
    <div
      v-if="loading"
      class="flex-1 flex items-center justify-center text-gray-500"
    >
      Loading…
    </div>
    <div
      v-else-if="error"
      class="flex-1 flex items-center justify-center text-red-400"
    >
      {{ error }}
    </div>
    <div v-else ref="containerRef" class="flex-1 w-full">
      <svg ref="svgRef" class="w-full h-full" />
    </div>

    <!-- Tooltip -->
    <Teleport to="body">
      <div
        v-if="hoveredBar"
        class="fixed z-50 pointer-events-none bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-3 text-sm"
        :style="{ left: tooltipX + 'px', top: tooltipY + 'px' }"
      >
        <p class="font-semibold text-white">{{ hoveredBar.date }}</p>
        <p class="text-gray-400 mt-1">
          {{ hoveredBar.count }} note{{ hoveredBar.count !== 1 ? "s" : "" }}
          {{ viewMode === "weekly" ? "this week" : "this day" }}
        </p>
      </div>
    </Teleport>
  </div>
</template>
