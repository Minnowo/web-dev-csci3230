import { GoogleGenerativeAI } from '@google/generative-ai'
import express from 'express'

const router = express.Router()

// POST /api/notes/:id/analyze
router.post('/notes/:id/analyze', async (req, res) => {
  try {
    const { id } = req.params
    const { content } = req.body

    // Validate input
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: 'Note content is empty' })
    }

    // Check API key
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured' })
    }

    // Build prompt
    const prompt = `
You are an assistant that analyzes personal notes.

Given the following note content, return a JSON object with exactly these three fields:
1. "tags": an array of 3-6 short, lowercase topic tags (e.g. ["work", "planning", "ideas"])
2. "sentiment_score": a float between -1.0 (very negative) and 1.0 (very positive) representing the emotional tone of the note
3. "summary": a single sentence (max 15 words) summarizing the note

Return ONLY valid JSON. No explanation. No markdown. No code blocks.

Note content:
"""
${content}
"""
    `.trim()

    // Call Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    const result = await model.generateContent(prompt)
    const text = result.response.text().trim()

    // Parse response
    let parsed
    try {
      parsed = JSON.parse(text)
    } catch (e) {
      console.error('Gemini returned non-JSON:', text)
      return res.status(500).json({ error: 'Failed to parse Gemini response', raw: text })
    }

    // Validate shape
    const { tags, sentiment_score, summary } = parsed
    if (!Array.isArray(tags) || typeof sentiment_score !== 'number' || typeof summary !== 'string') {
      return res.status(500).json({ error: 'Unexpected response shape from Gemini', raw: parsed })
    }

    // --- Phase 2: save to DB here (when Ryan's schema is ready) ---
    // await db.notes.update(id, { tags, sentiment_score, summary })

    // Return result
    res.json({ id, tags, sentiment_score, summary })

  } catch (err) {
    console.error('Analyze route error:', err)
    res.status(500).json({ error: 'Internal server error', details: err.message })
  }
})

export default router
