#!/usr/bin/env node
/**
 * seedTestData.mjs — Creates a test user and seeds sample notes, tags, and wiki-links.
 *
 * HTTP-based: calls the running backend API. No direct DB access, no build step.
 *
 * Test credentials:
 *   username : testuser
 *   password : password123
 *
 * Usage (local)  : node scripts/seedTestData.mjs
 * Usage (Docker) : run via the "seeder" service in docker-compose.yml
 *
 * Idempotent — safe to re-run. Skips notes and tags that already exist.
 */

const API      = process.env.API_URL ?? 'http://localhost:3000/api'
const USERNAME = 'testuser'
const EMAIL    = 'test@example.com'
const PASSWORD = 'password123'

// ─── Seed data ────────────────────────────────────────────────────────────────
// Designed to exercise the graph:
//   - tech/work cluster (highly connected hub nodes)
//   - personal/health cluster (moderate connections)
//   - books/learning cluster (small)
//   - a few isolated notes (no tags, no links)
// Wiki-links create directed edges in DB_NOTES_LINKS for the graph view.

const NOTES = [
  {
    title: 'Q1 Planning Meeting',
    content: 'Discussed the Q1 roadmap with the engineering team. Three main initiatives: graph visualization, full-text search, and tag management. Sprint starts Monday.\n\nSee [[Sprint Retrospective]] for outcomes and [[Team Standup Notes]] for daily updates.',
    tags: ['work', 'planning', 'leadership'],
    links: ['Sprint Retrospective', 'Team Standup Notes'],
  },
  {
    title: 'Backend Architecture',
    content: 'The backend uses Express with TypeScript and SQLite. JWT authentication with a migration-based schema system. REST API with authenticated endpoints for notes, tags, and links.\n\nSee [[Database Design]] for the schema and [[API Design Patterns]] for endpoint conventions.',
    tags: ['tech', 'backend', 'work'],
    links: ['Database Design', 'API Design Patterns'],
  },
  {
    title: 'Frontend Components',
    content: 'Vue 3 composition API. The editor uses contenteditable for rich text input. Force-directed graph visualization with D3.js. Tag panel for per-note and global tag management.\n\nRelated: [[Graph Visualization Notes]] for the D3 implementation and [[Backend Architecture]] for the API layer.',
    tags: ['tech', 'frontend', 'work'],
    links: ['Graph Visualization Notes', 'Backend Architecture'],
  },
  {
    title: 'Database Design',
    content: 'SQLite with FTS5 for full-text search using BM25 ranking. Tables: DB_NOTES, DB_TAGS, DB_NOTE_TAGS, DB_NOTES_LINKS. Migration system handles versioning.\n\nSee [[Backend Architecture]] for how the DB layer fits into the overall system.',
    tags: ['tech', 'backend', 'work'],
    links: ['Backend Architecture'],
  },
  {
    title: 'Sprint Retrospective',
    content: 'The graph visualization sprint went well. Tag system took longer than expected but the two-cache model is solid. Next sprint: sentiment analysis and real data for visualizations.\n\nOriginated from [[Q1 Planning Meeting]]. Action items tracked in [[Team Standup Notes]].',
    tags: ['work', 'planning', 'team'],
    links: ['Q1 Planning Meeting', 'Team Standup Notes'],
  },
  {
    title: 'Graph Visualization Notes',
    content: 'D3 force simulation with charge, link, center, and collision forces. Node sizing by connection count. Two edge types: wiki-links (solid) and tag edges (dashed). Collapsible stats drawer with network and topic metrics.\n\nSee [[Data Analysis Methods]] for the graph algorithms used in the stats panel.',
    tags: ['tech', 'frontend', 'data'],
    links: ['Data Analysis Methods'],
  },
  {
    title: 'API Design Patterns',
    content: 'REST with consistent response shapes. Bearer token auth. Bulk endpoints for performance — e.g. GET /notes/links returns all links in one call. Errors follow HTTP semantics.\n\nSchema decisions documented in [[Database Design]].',
    tags: ['tech', 'backend', 'patterns'],
    links: ['Database Design'],
  },
  {
    title: 'Team Standup Notes',
    content: 'Daily standups at 10am. Ryan working on note links. Sid working on sidebar navigation. David working on graph visualizations and the tag system. Good progress this week.',
    tags: ['work', 'team'],
    links: [],
  },
  {
    title: 'Data Analysis Methods',
    content: 'BFS for connected component detection. BM25 for full-text ranking. Co-occurrence matrix for tag relationships. Graph degree centrality for identifying hub notes.\n\nImplementation details in [[Graph Visualization Notes]].',
    tags: ['tech', 'data', 'learning'],
    links: ['Graph Visualization Notes'],
  },
  {
    title: 'Recipe Collection',
    content: 'Pasta sauce: tomatoes, garlic, basil, olive oil. Simmer two hours on low. Add parmesan at the end. Perfect for Sunday dinners.',
    tags: ['cooking', 'food', 'personal'],
    links: [],
  },
  {
    title: 'Workout Plan',
    content: 'Monday chest and triceps. Wednesday back and biceps. Friday legs and shoulders. Three cardio sessions per week. Progressive overload every two weeks.\n\nTracking progress in [[Running Log]].',
    tags: ['fitness', 'health', 'personal'],
    links: ['Running Log'],
  },
  {
    title: 'Running Log',
    content: 'Week 1: 5km, 6km, 5km. Week 2: 6km, 7km, 6km. Pace improving. Cardio is getting easier since starting the structured [[Workout Plan]].',
    tags: ['fitness', 'health', 'personal'],
    links: ['Workout Plan'],
  },
  {
    title: 'Clean Code Review',
    content: 'Key takeaways: functions do one thing, names reveal intent, comments explain why not what. Applies directly to our backend handlers and frontend composables.\n\nPrinciples I applied to [[Backend Architecture]] and [[API Design Patterns]].',
    tags: ['books', 'learning', 'tech'],
    links: ['Backend Architecture', 'API Design Patterns'],
  },
  {
    title: 'System Design Notes',
    content: 'Load balancing, horizontal vs vertical scaling. Caching layers. Database sharding and replication. CAP theorem tradeoffs. Event-driven architecture.\n\nRelated to our own [[Database Design]] and [[Backend Architecture]] decisions.',
    tags: ['tech', 'backend', 'learning'],
    links: ['Database Design', 'Backend Architecture'],
  },
  {
    title: 'Cooking Journal',
    content: 'Tried a new pasta recipe tonight. Needed more basil and less salt. Garlic bread on the side was a win. Adding it to my [[Recipe Collection]].',
    tags: ['cooking', 'food', 'personal'],
    links: ['Recipe Collection'],
  },
  {
    title: 'Reading List',
    content: 'Currently reading: Designing Data-Intensive Applications. Queue: The Pragmatic Programmer, A Philosophy of Software Design, Crafting Interpreters.\n\nNotes from completed books in [[Clean Code Review]].',
    tags: ['books', 'learning'],
    links: ['Clean Code Review'],
  },
  {
    title: 'Personal Goals 2026',
    content: 'Run a half marathon by June. Read 12 books this year. Ship the graph visualization feature. Learn more about distributed systems.',
    tags: ['personal', 'planning'],
    links: [],
  },
  {
    title: 'Travel Plans',
    content: 'Japan in spring: Tokyo, Kyoto, Osaka. Book flights 3 months out. JR Pass for bullet trains. Must-visit: Arashiyama bamboo grove, teamLab digital art.',
    tags: ['personal'],
    links: [],
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function log(msg) { console.log(msg) }

async function post(path, body, token) {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${API}${path}`, { method: 'POST', headers, body: JSON.stringify(body) })
  return { ok: res.ok, status: res.status, data: res.ok ? await res.json().catch(() => null) : null }
}

async function get(path, token) {
  const headers = {}
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${API}${path}`, { headers })
  return { ok: res.ok, data: res.ok ? await res.json().catch(() => []) : [] }
}

async function waitForBackend(retries = 20, intervalMs = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`${API}/health`)
      if (res.ok) { log('Backend is up.'); return }
    } catch { /* not ready yet */ }
    log(`Waiting for backend... (${i + 1}/${retries})`)
    await new Promise(r => setTimeout(r, intervalMs))
  }
  throw new Error('Backend did not become ready in time')
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  log('─────────────────────────────────────')
  log(' GraphNotes seed script')
  log(`─────────────────────────────────────`)
  log(`API: ${API}`)

  await waitForBackend()

  // 1. Register (ok to fail if user exists)
  const reg = await post('/register', { username: USERNAME, email: EMAIL, password: PASSWORD })
  if (reg.ok) {
    log(`Registered new user: ${USERNAME}`)
  } else {
    log(`User already exists, continuing...`)
  }

  // 2. Login
  const login = await post('/login', { username: USERNAME, password: PASSWORD })
  if (!login.ok) throw new Error(`Login failed (status ${login.status}) — wrong password or server error`)
  const token = login.data.token
  log(`Logged in as ${USERNAME}`)

  // 3. Load existing tags (idempotency)
  const existingTagsRes = await get('/tags', token)
  const tagIdByName = {}
  for (const t of (existingTagsRes.data?.tags ?? [])) tagIdByName[t.name] = t.id

  // Create any missing tags
  const allTagNames = [...new Set(NOTES.flatMap(n => n.tags))]
  for (const name of allTagNames) {
    if (tagIdByName[name]) continue
    const r = await post('/tags', { name }, token)
    if (r.ok && r.data?.id) tagIdByName[name] = r.data.id
  }
  log(`Tags ready: ${Object.keys(tagIdByName).length} total`)

  // 4. Load existing notes (idempotency)
  const existingNotesRes = await get('/notes', token)
  const existingNotes = existingNotesRes.data ?? []
  const noteIdByTitle = {}
  for (const n of existingNotes) noteIdByTitle[n.title] = n.id

  // Create missing notes and assign tags
  let created = 0
  for (const note of NOTES) {
    if (noteIdByTitle[note.title]) {
      log(`  skip: "${note.title}" (already exists)`)
      continue
    }
    const tagLine = note.tags.length ? '\n\n' + note.tags.map(t => `#${t}`).join(' ') : ''
    const r = await post('/notes', { title: note.title, content: note.content + tagLine }, token)
    if (!r.ok) { log(`  WARN: failed to create "${note.title}"`); continue }
    const id = r.data?.id
    noteIdByTitle[note.title] = id

    // Assign tags
    if (note.tags.length) {
      await post(`/notes/${id}/tags`, { tags: note.tags }, token)
    }

    log(`  created: "${note.title}" (id: ${id}, tags: ${note.tags.join(', ') || 'none'})`)
    created++
  }
  log(`Notes: ${created} created, ${NOTES.length - created} skipped`)

  // 5. Create wiki-links
  let linkCount = 0
  for (const note of NOTES) {
    if (!note.links.length) continue
    const fromId = noteIdByTitle[note.title]
    if (!fromId) continue
    const toIds = note.links.map(t => noteIdByTitle[t]).filter(Boolean)
    if (!toIds.length) continue
    const r = await post('/notes/link', { links: [{ from_id: fromId, to_ids: toIds }] }, token)
    if (r.ok) {
      log(`  linked: "${note.title}" → ${note.links.join(', ')}`)
      linkCount += toIds.length
    }
  }
  log(`Links: ${linkCount} created`)

  // 6. Index notes for search
  for (const note of NOTES) {
    const id = noteIdByTitle[note.title]
    if (!id) continue
    await post(`/notes/${id}/index`, { title: note.title, content: note.content, tags: note.tags.join(' ') })
  }
  log(`Search index updated`)

  log('')
  log('─────────────────────────────────────')
  log(' Seed complete!')
  log(' Test credentials:')
  log(`   username : ${USERNAME}`)
  log(`   password : ${PASSWORD}`)
  log('─────────────────────────────────────')
}

main().catch(err => { console.error('Seed failed:', err.message); process.exit(1) })
