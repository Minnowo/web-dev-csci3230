import { useAuth } from '../composables/useAuth.js'

const API_BASE = 'http://localhost:3000/api'

// ─── Notes (Visualizations) ───────────────────────────────────────────────────

/**
 * Fetch all notes for visualizations (authenticated).
 * Returns: [{ id, folder_id, title, created_at, updated_at, tags: string[] }]
 */
export async function getNotes() {
  return fetchNotes()
}

/**
 * Fetch a single note by ID for visualizations (authenticated).
 */
export async function getNote(id) {
  return fetchNote(id)
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

// ─── Tags (David) ────────────────────────────────────────────────────────────

/** Fetch all tags for the logged-in user. Returns: [{ id, name, note_count }] */
export async function fetchTags() {
  const { authHeaders } = useAuth()
  const res = await fetch(`${API_BASE}/tags`, { headers: authHeaders() })
  if (!res.ok) throw new Error('Failed to fetch tags')
  const { tags } = await res.json()
  return tags ?? []
}

/** Create a new global tag. Returns: { id, name } */
export async function createTag(name) {
  const { authHeaders } = useAuth()
  const res = await fetch(`${API_BASE}/tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ name }),
  })
  if (!res.ok) throw new Error('Failed to create tag')
  return res.json()
}

/** Delete a global tag by ID. */
export async function deleteTag(tagId) {
  const { authHeaders } = useAuth()
  const res = await fetch(`${API_BASE}/tags/${tagId}/delete`, {
    method: 'POST',
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error(`Failed to delete tag ${tagId}`)
}

/** Fetch tags for a specific note. Returns: [{ id, name }] */
export async function fetchNoteTags(noteId) {
  const { authHeaders } = useAuth()
  const res = await fetch(`${API_BASE}/notes/${noteId}/tags`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Failed to fetch tags for note ${noteId}`)
  const { tags } = await res.json()
  return tags ?? []
}

/** Fetch all wiki-links for the logged-in user. Returns: [{ from_note_id, to_note_id }] */
export async function fetchAllLinks() {
  const { authHeaders } = useAuth()
  const res = await fetch(`${API_BASE}/notes/links`, { headers: authHeaders() })
  if (!res.ok) throw new Error('Failed to fetch all note links')
  return res.json()
}

/** Replace all tags on a note. Returns: { tags: [{ id, name }] } */
export async function syncNoteTags(noteId, tags) {
  const { authHeaders } = useAuth()
  const res = await fetch(`${API_BASE}/notes/${noteId}/tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ tags }),
  })
  if (!res.ok) throw new Error(`Failed to sync tags for note ${noteId}`)
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
  return res.json();
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
export async function apiCreateFolder(parent_folder_id, title) {
  const { authHeaders } = useAuth()
  const res = await fetch(`${API_BASE}/folder`, {
    method: 'POST',
    headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({
              parent_folder_id: parent_folder_id,
	        title: title,
      })
  })
  if (!res.ok) throw new Error(`Failed to get note links ${parent_folder_id}, ${title}`)
  return res.json();
}
export async function apiDeleteFolder(folder_id) {
  const { authHeaders } = useAuth()
  const res = await fetch(`${API_BASE}/folder/delete`, {
    method: 'POST',
    headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({
              folder_id: folder_id,
      })
  })
  if (!res.ok) throw new Error(`Failed to delete folder ${folder_id}`)
}

// ─── Gemini Analysis ──────────────────────────────────────────────────────────

/**
 * Analyze a note with Gemini — returns tags, sentiment_score.
 * Called after a note is saved.
 */
export async function analyzeNote(id, content, existingTags = []) {
  const res = await fetch(`${API_BASE}/notes/${id}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, tags: existingTags })
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
 * Build graph data from notes and wiki-links.
 *
 * Returns four separate collections so GraphView can combine them based on toggles:
 *   noteNodes  — one node per note
 *   tagNodes   — one node per unique tag (id = "tag-{name}")
 *   wikiEdges  — explicit note↔note links from [[wiki-links]] (DB_NOTES_LINKS)
 *   tagEdges   — note↔tag edges derived from each note's tags array
 *
 * connectionCount on noteNodes counts all edges (wiki + tag) so node sizing
 * reflects total connectivity regardless of which toggles are active.
 */
export function buildGraphData(notes, wikiLinks = []) {
  // Build tag nodes from all unique tags across notes
  const tagMap = new Map()
  notes.forEach(n => {
    ;(n.tags ?? []).forEach(tag => {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, { id: `tag-${tag}`, name: tag, noteCount: 0, type: 'tag' })
      }
      tagMap.get(tag).noteCount++
    })
  })
  const tagNodes = [...tagMap.values()]

  // Build tag edges (note → tag node)
  const tagEdges = []
  notes.forEach(n => {
    ;(n.tags ?? []).forEach(tag => {
      if (tagMap.has(tag)) {
        tagEdges.push({ source: n.id, target: `tag-${tag}`, type: 'tag' })
      }
    })
  })

  // Normalise wiki-links from backend shape { from_note_id, to_note_id }
  const wikiEdges = wikiLinks.map(l => ({
    source: l.from_note_id,
    target: l.to_note_id,
    type: 'wiki'
  }))

  // Connection count per note — sum of wiki edges + tag edges
  const connectionCount = {}
  notes.forEach(n => { connectionCount[n.id] = 0 })
  wikiEdges.forEach(l => {
    if (connectionCount[l.source] !== undefined) connectionCount[l.source]++
    if (connectionCount[l.target] !== undefined) connectionCount[l.target]++
  })
  tagEdges.forEach(l => {
    if (connectionCount[l.source] !== undefined) connectionCount[l.source]++
  })

  const noteNodes = notes.map(n => ({
    id: n.id,
    title: n.title,
    tags: n.tags ?? [],
    created_at: n.created_at,
    updated_at: n.updated_at,
    connectionCount: connectionCount[n.id] ?? 0,
    type: 'note'
  }))

  return { noteNodes, tagNodes, wikiEdges, tagEdges }
}

// ─── Sentiment Calendar Helpers ───────────────────────────────────────────────

/**
 * Group notes by date for the sentiment calendar.
 * Returns: { "2026-03-01": { score: 0.75, notes: [...] }, ... }
 */
export function buildCalendarData(notes) {
  const byDate = {}
  notes.forEach(n => {
    const dateStr = n.created_at || n.updated_at
    if (!dateStr) return
    const date = dateStr.slice(0, 10) // "YYYY-MM-DD"
    if (!byDate[date]) byDate[date] = { notes: [] }
    byDate[date].notes.push({ id: n.id, title: n.title })
  })
  const result = {}
  Object.entries(byDate).forEach(([date, { notes }]) => {
    result[date] = { count: notes.length, notes }
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
