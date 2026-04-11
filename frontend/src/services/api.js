import { mockNotes } from './mockData.js'
import { useAuth } from '../composables/useAuth.js'

// Controls whether visualization functions (getNotes, getNote) use mock data.
// Keep true until DB_NOTES has tags and sentiment_score columns — the real
// backend notes lack these fields and would break the visualization components.
const USE_MOCK = true
const API_BASE = 'http://localhost:3000/api'

// ─── Notes ────────────────────────────────────────────────────────────────────

/**
 * Fetch all notes.
 * Returns: [{ id, title, content, tags, sentiment_score, created_at, updated_at }]
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

// ─── Note CRUD (David) ───────────────────────────────────────────────────────
// These functions talk to DB_NOTES — the real notes table.
// All require an authenticated session (Bearer token from cookie).

/** Fetch all notes for the logged-in user. Returns: [{ id, title, updated_at }] */
export async function fetchNotes() {
  const { authHeaders } = useAuth()
  const res = await fetch(`${API_BASE}/notes`, { headers: authHeaders() })
  if (!res.ok) throw new Error('Failed to fetch notes')
  return res.json()
}

/** Fetch a single note with full content. Returns: { id, title, content, created_at, updated_at } */
export async function fetchNote(id) {
  const { authHeaders } = useAuth()
  const res = await fetch(`${API_BASE}/notes/${id}`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Failed to fetch note ${id}`)
  return res.json()
}

/** Create a new note. Returns: { id } */
export async function createNote(title, content = '') {
  const { authHeaders } = useAuth()
  const res = await fetch(`${API_BASE}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ title, content }),
  })
  if (!res.ok) throw new Error('Failed to create note')
  return res.json()
}

/** Update a note's title and/or content. Returns: { id, title, content, created_at, updated_at } */
export async function updateNote(id, title, content) {
  const { authHeaders } = useAuth()
  const res = await fetch(`${API_BASE}/notes/${id}/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ title, content }),
  })
  if (!res.ok) throw new Error(`Failed to update note ${id}`)
  return res.json()
}

/** Delete a note permanently. Returns: { id } */
export async function deleteNote(id) {
  const { authHeaders } = useAuth()
  const res = await fetch(`${API_BASE}/notes/${id}/delete`, {
    method: 'POST',
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error(`Failed to delete note ${id}`)
  return res.json()
}

// WHY IS THIS IN JS ?????????????????
// interface LinkNoteRequestBody {
//     links: Array<{
//         from_id: number,
//         to_ids: number[]
//     }>;
// }
export async function linkNotes(linkNoteRequestBody) {
  const { authHeaders } = useAuth()
  const res = await fetch(`${API_BASE}/notes/link`, {
    method: 'POST',
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(linkNoteRequestBody)
  })
  if (!res.ok) throw new Error(`Failed to link notes ${linkNoteRequestBody}`)
}

// This returns:
// [
//   {
//     "from_note_id": 2,
//     "to_note_id": 1
//   },
//   {
//     "from_note_id": 3,
//     "to_note_id": 1
//   },
//   {
//     "from_note_id": 1,
//     "to_note_id": 4
//   },
// ]
// Where FROM_NOTE_ID or TO_NOTE_ID can be your given ID, the caller needs to figure out which way it wants
export async function getNoteLinks(nodeId) {
  const { authHeaders } = useAuth()
  const res = await fetch(`${API_BASE}/notes/${nodeId}/links`, {
    method: 'GET',
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error(`Failed to get note links ${nodeId}`)
  return res.json()
}

// Links is this type:
// interface DeleteNoteLinkRequestBody {
// 	links: Array<NoteLink>;
// }
export async function deleteNoteLinks(links) {
  const { authHeaders } = useAuth()
  const res = await fetch(`${API_BASE}/notes/link/delete`, {
    method: 'POST',
    headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify(links)
  })
  if (!res.ok) throw new Error(`Failed to get note links ${links}`)
}

// ─── Gemini Analysis ──────────────────────────────────────────────────────────

/**
 * Analyze a note with Gemini — returns tags, sentiment_score.
 * Called after a note is saved.
 */
export async function analyzeNote(id, content) {
  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 500))
    return {
      tags: ['work', 'planning'],
      sentiment_score: 0.6,
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


// ─── Hybrid Search (David) ───────────────────────────────────────────────────
// Full-text search via SQLite FTS5 + BM25 ranking. Each term is prefix-matched
// (guitar* → guitars, guitarist). Returns note IDs + normalised scores.
// The frontend resolves IDs to node objects for the graph dropdown.

/**
 * Search notes using FTS5 BM25 hybrid search.
 * Returns: { query, total_searched, results: [{ id, title, tags, score }] }
 */
export async function hybridSearch(query, topK = 8) {
  const res = await fetch(`${API_BASE}/search/hybrid`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, topK })
  })
  if (!res.ok) throw new Error('Hybrid search failed')
  return res.json()
}

// ─── Note Indexing (FTS) ────────────────────────────────────────────────────
// Upsert / remove a note from the FTS5 search index.
// Called by the editor store when notes are saved or deleted.

/**
 * Upsert a note into the FTS5 index.
 */
export async function indexNote(id, { title = '', tags = '', content = '' } = {}) {
  const res = await fetch(`${API_BASE}/notes/${id}/index`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, tags, content })
  })
  if (!res.ok) throw new Error('Failed to index note')
  return res.json()
}

/**
 * Remove a note from the FTS5 index.
 */
export async function deleteNoteIndex(id) {
  const res = await fetch(`${API_BASE}/notes/${id}/index`, {
    method: 'DELETE'
  })
  if (!res.ok) throw new Error('Failed to remove note from index')
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
