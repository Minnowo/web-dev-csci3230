import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import analyzeRouter from './routes/analyze.js'
import smartSearchRouter from './routes/smartSearch.js'

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api', analyzeRouter)
app.use('/api', smartSearchRouter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// Start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  if (!process.env.GEMINI_API_KEY) {
    console.warn('WARNING: GEMINI_API_KEY is not set in .env')
  }
  if (!process.env.DATABASE_URL) {
    console.warn('WARNING: DATABASE_URL is not set in .env')
  }
})
