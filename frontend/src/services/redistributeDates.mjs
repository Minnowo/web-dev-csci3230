// Script to redistribute note dates across 2025 + early 2026
import { readFileSync, writeFileSync } from 'fs'

const filePath = decodeURIComponent(new URL('./mockData.js', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'))

// Generate a spread of dates: 80 notes in 2025, 30 notes in early 2026
// Natural distribution: 5-8 notes per month, with some multi-note days

function randomDate(start, end) {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  // Round to hour
  d.setMinutes(0, 0, 0)
  d.setHours(8 + Math.floor(Math.random() * 12)) // 8am - 8pm
  return d.toISOString().slice(0, 19) + 'Z'
}

function monthRange(year, month) {
  return {
    start: new Date(year, month, 1),
    end: new Date(year, month + 1, 0, 23, 59, 59)
  }
}

// Build date pool: spread 80 notes across 2025 (all 12 months), 30 notes in Jan-Mar 2026
const dates = []

// 2025: ~6-7 notes per month
const notesPerMonth2025 = [5, 6, 7, 6, 7, 6, 7, 6, 7, 6, 7, 8] // total = 78
for (let m = 0; m < 12; m++) {
  const { start, end } = monthRange(2025, m)
  for (let i = 0; i < notesPerMonth2025[m]; i++) {
    dates.push(randomDate(start, end))
  }
}

// 2026 Jan-Mar: ~10 notes per month
const notesPerMonth2026 = [10, 11, 11] // total = 32
for (let m = 0; m < 3; m++) {
  const { start, end } = monthRange(2026, m)
  for (let i = 0; i < notesPerMonth2026[m]; i++) {
    dates.push(randomDate(start, end))
  }
}

// Sort dates chronologically
dates.sort()

console.log(`Generated ${dates.length} dates`)
console.log('First:', dates[0])
console.log('Last:', dates[dates.length - 1])

// Read the mockData file
let content = readFileSync(filePath, 'utf8')

// Replace each created_at and updated_at with new dates (in order)
let noteIndex = 0
content = content.replace(
  /"created_at":\s*"[^"]+"/g,
  () => {
    const date = dates[noteIndex] ?? dates[dates.length - 1]
    noteIndex++
    return `"created_at": "${date}"`
  }
)

// Set updated_at = same day as created_at but 1-2 hours later
noteIndex = 0
content = content.replace(
  /"updated_at":\s*"[^"]+"/g,
  () => {
    const base = dates[noteIndex] ?? dates[dates.length - 1]
    noteIndex++
    const d = new Date(base)
    d.setHours(d.getHours() + 1 + Math.floor(Math.random() * 2))
    return `"updated_at": "${d.toISOString().slice(0, 19)}Z"`
  }
)

writeFileSync(filePath, content)
console.log('Done! mockData.js updated with redistributed dates.')
