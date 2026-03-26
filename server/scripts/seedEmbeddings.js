/**
 * Seed embeddings for all mock notes into Postgres.
 * Run from the server directory: node scripts/seedEmbeddings.js
 *
 * Uses only gemini-embedding-001 (mock notes already have tags/summary/sentiment).
 * Skips notes that already have embeddings stored.
 */

import 'dotenv/config'
import { GoogleGenerativeAI } from '@google/generative-ai'
import pg from 'pg'
import { mockNotes } from '../../frontend/src/services/mockData.js'

const { Pool } = pg

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function main() {
  if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY not set'); process.exit(1)
  }
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL not set'); process.exit(1)
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  const embeddingModel = genAI.getGenerativeModel({ model: 'gemini-embedding-001' })

  // Get already-stored note IDs so we can skip them
  const { rows } = await pool.query('SELECT note_id FROM note_embeddings')
  const existing = new Set(rows.map(r => r.note_id))
  console.log(`${existing.size} embeddings already in DB. Processing ${mockNotes.length} notes...`)

  let saved = 0
  let skipped = 0
  let errors = 0

  for (let i = 0; i < mockNotes.length; i++) {
    const note = mockNotes[i]

    if (existing.has(note.id)) {
      skipped++
      continue
    }

    const input = [
      note.title,
      note.summary,
      Array.isArray(note.tags) ? note.tags.join(', ') : '',
      note.content
    ].filter(Boolean).join(' | ')

    try {
      const result = await embeddingModel.embedContent(input)
      const embedding = result.embedding.values

      await pool.query(
        `INSERT INTO note_embeddings (note_id, embedding)
         VALUES ($1, $2)
         ON CONFLICT (note_id) DO UPDATE SET embedding = EXCLUDED.embedding, updated_at = NOW()`,
        [note.id, JSON.stringify(embedding)]
      )

      saved++
      if (saved % 20 === 0 || saved === 1) {
        console.log(`  [${i + 1}/${mockNotes.length}] ${saved} saved, ${skipped} skipped, ${errors} errors`)
      }

      await sleep(200)
    } catch (err) {
      errors++
      console.error(`  ERROR note ${note.id} (${note.title}): ${err.message}`)
      await sleep(5000)
    }
  }

  console.log(`\nDone. ${saved} new embeddings saved, ${skipped} skipped, ${errors} errors.`)
  await pool.end()
}

main()
