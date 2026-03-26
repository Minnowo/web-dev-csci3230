import { GoogleGenerativeAI } from '@google/generative-ai'
import express from 'express'
import pool from '../db.js'

const router = express.Router()

// POST /api/search/smart
router.post('/search/smart', async (req, res) => {
  try {
    const { query, topK = 15 } = req.body

    if (!query || query.trim().length === 0) {
      return res.status(400).json({ error: 'Query is empty' })
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured' })
    }

    // Embed the search query
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const embeddingModel = genAI.getGenerativeModel({ model: 'gemini-embedding-001' })
    const queryResult = await embeddingModel.embedContent(query.trim())
    const queryVector = queryResult.embedding.values

    // pgvector cosine similarity search (<=> = cosine distance, so 1 - distance = similarity)
    const { rows } = await pool.query(
      `SELECT note_id, 1 - (embedding <=> $1::vector) AS similarity
       FROM note_embeddings
       ORDER BY embedding <=> $1::vector
       LIMIT $2`,
      [JSON.stringify(queryVector), topK]
    )

    console.log(`Smart search: "${query}" → ${rows.length} results, top similarity: ${rows[0]?.similarity?.toFixed(3)}`)

    res.json({
      query,
      total_searched: rows.length,
      results: rows.map(r => ({ id: r.note_id, similarity: parseFloat(r.similarity) }))
    })

  } catch (err) {
    console.error('Smart search error:', err)
    res.status(500).json({ error: 'Internal server error', details: err.message })
  }
})

export default router
