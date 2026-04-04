import { mockNotes } from './mockData.js'

// Flip to false when Ryan's backend is ready
const USE_MOCK = true
const API_BASE = 'http://localhost:3000/api'

// ─── Notes ────────────────────────────────────────────────────────────────────

/**
 * Fetch all notes.
 * Returns: [{ id, title, content, tags, sentiment_score, summary, created_at, updated_at }]
 */
export async function getNotes() {
  if (USE_MOCK) return mockNotes
  const res = await fetch(`${API_BASE}/notes`)
  if (!res.ok) throw new Error('Failed to fetch notes')
  return res.json()
}

/**
 * Fetch a single note by ID.
 */
export async function getNote(id) {
  if (USE_MOCK) return mockNotes.find(n => n.id === id) ?? null
  const res = await fetch(`${API_BASE}/notes/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch note ${id}`)
  return res.json()
}

// ─── Gemini Analysis ──────────────────────────────────────────────────────────

/**
 * Analyze a note with Gemini — returns tags, sentiment_score, summary.
 * Called after a note is saved.
 */
export async function analyzeNote(id, content) {
  if (USE_MOCK) {
    // Simulate a short delay like a real API call
    await new Promise(r => setTimeout(r, 500))
    return {
      tags: ['work', 'planning'],
      sentiment_score: 0.6,
      summary: 'A mock summary for development purposes.'
    }
  }
  const res = await fetch(`${API_BASE}/notes/${id}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  })
  if (!res.ok) throw new Error('Failed to analyze note')
  return res.json()
}

// ─── Smart Search (David) ────────────────────────────────────────────────────
// Semantic search using Gemini embeddings. Sends the query to the backend which
// embeds it and finds the most similar notes by cosine similarity. Returns note
// IDs + similarity scores — the frontend resolves these to actual note objects.

/**
 * Search notes semantically via Gemini embeddings.
 * Returns: { query, total_searched, results: [{ id, similarity }] }
 */
export async function smartSearch(query, topK = 8) {
  const res = await fetch(`${API_BASE}/search/smart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, topK })
  })
  if (!res.ok) throw new Error('Smart search failed')
  return res.json()
}

// ─── Graph Helpers ────────────────────────────────────────────────────────────

/**
 * Compute links between notes that share at least one tag.
 * Returns: [{ source: id, target: id, sharedTags: [...] }]
 */
export function computeLinks(notes) {
  const links = []
  for (let i = 0; i < notes.length; i++) {
    for (let j = i + 1; j < notes.length; j++) {
      const shared = notes[i].tags.filter(t => notes[j].tags.includes(t))
      if (shared.length) {
        links.push({
          source: notes[i].id,
          target: notes[j].id,
          sharedTags: shared
        })
      }
    }
  }
  return links
}

/**
 * Build graph data (nodes + links) from a notes array.
 * Nodes include a connectionCount for sizing.
 */
export function buildGraphData(notes) {
  const links = computeLinks(notes)

  // Count connections per note
  const connectionCount = {}
  notes.forEach(n => connectionCount[n.id] = 0)
  links.forEach(l => {
    connectionCount[l.source]++
    connectionCount[l.target]++
  })

  const nodes = notes.map(n => ({
    id: n.id,
    title: n.title,
    tags: n.tags,
    summary: n.summary,
    updated_at: n.updated_at,
    connectionCount: connectionCount[n.id],
    dominantTag: n.tags[0] ?? 'untagged'
  }))

  return { nodes, links }
}

// ─── Sentiment Calendar Helpers ───────────────────────────────────────────────

/**
 * Group notes by date for the sentiment calendar.
 * Returns: { "2026-03-01": { score: 0.75, notes: [...] }, ... }
 */
export function buildCalendarData(notes) {
  const byDate = {}
  notes
    .filter(n => n.sentiment_score !== null && n.sentiment_score !== undefined)
    .forEach(n => {
      const date = n.created_at.slice(0, 10) // "YYYY-MM-DD"
      if (!byDate[date]) byDate[date] = { scores: [], notes: [] }
      byDate[date].scores.push(n.sentiment_score)
      byDate[date].notes.push({ id: n.id, title: n.title, score: n.sentiment_score })
    })

  // Average score per day
  const result = {}
  Object.entries(byDate).forEach(([date, { scores, notes }]) => {
    result[date] = {
      score: scores.reduce((a, b) => a + b, 0) / scores.length,
      count: notes.length,
      notes
    }
  })
  return result
}

// ─── Activity Chart Helpers ───────────────────────────────────────────────────

/**
 * Count notes created per day.
 * Returns: [{ date: "2026-03-01", count: 3 }] sorted by date.
 */
export function buildActivityData(notes) {
  const byDate = {}
  notes.forEach(n => {
    const date = n.created_at.slice(0, 10)
    byDate[date] = (byDate[date] ?? 0) + 1
  })
  return Object.entries(byDate)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

// ─── Tag Matrix Helpers ───────────────────────────────────────────────────────

/**
 * Build tag co-occurrence matrix data.
 * Returns: { tags: [...], matrix: [[count]] } where matrix[i][j] = notes sharing tags[i] and tags[j]
 */
export function buildTagMatrixData(notes) {
  // Collect all unique tags
  const tagSet = new Set()
  notes.forEach(n => n.tags.forEach(t => tagSet.add(t)))
  const tags = Array.from(tagSet).sort()

  // Build co-occurrence counts
  const tagIndex = {}
  tags.forEach((t, i) => tagIndex[t] = i)

  const matrix = Array.from({ length: tags.length }, () =>
    Array(tags.length).fill(0)
  )

  notes.forEach(n => {
    for (let i = 0; i < n.tags.length; i++) {
      for (let j = i; j < n.tags.length; j++) {
        const a = tagIndex[n.tags[i]]
        const b = tagIndex[n.tags[j]]
        if (a !== undefined && b !== undefined) {
          matrix[a][b]++
          if (a !== b) matrix[b][a]++
        }
      }
    }
  })

  return { tags, matrix }
}
