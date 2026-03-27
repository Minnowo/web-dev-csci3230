// ── smartSearch.ts (David) ────────────────────────────────────────────────────
// POST /api/search/smart
//
// Semantic search over all notes using Gemini embeddings + cosine similarity.
//
// Flow:
//   1. Embed the query string using gemini-embedding-001
//   2. Load all stored note embeddings from SQLite
//   3. Compute cosine similarity between the query vector and each note vector
//   4. Return the top K most similar note IDs sorted by score (descending)
//
// This approach has constant cost per search — one Gemini API call regardless
// of how many notes exist. Cosine similarity runs in JS which is fine for
// thousands of notes. If the project scales further, consider a vector DB.
//
// Requires GEMINI_API_KEY in the environment.

import { GoogleGenerativeAI } from "@google/generative-ai";
import express, { type Request, type Response } from "express";
import { DB } from "../db/db.js";

const router = express.Router();

// ── Cosine similarity ─────────────────────────────────────────────────────────
// Returns a value in [-1, 1] where 1 = identical direction, 0 = orthogonal,
// -1 = opposite. For semantic embeddings, higher = more similar in meaning.
function cosineSimilarity(a: number[], b: number[]): number {
	let dot = 0;
	let magA = 0;
	let magB = 0;

	for (let i = 0; i < a.length; i++) {
		dot += a[i] * b[i];
		magA += a[i] * a[i];
		magB += b[i] * b[i];
	}

	const denom = Math.sqrt(magA) * Math.sqrt(magB);
	return denom === 0 ? 0 : dot / denom;
}

// ── Route ─────────────────────────────────────────────────────────────────────
router.post("/search/smart", async (req: Request, res: Response) => {
	try {
		const { query, topK = 15 } = req.body as {
			query: string;
			topK?: number;
		};

		if (!query || query.trim().length === 0) {
			return res.status(400).json({ error: "Query is empty" });
		}

		if (!process.env.GEMINI_API_KEY) {
			return res
				.status(500)
				.json({ error: "GEMINI_API_KEY is not configured" });
		}

		// ── Step 1: Embed the query ───────────────────────────────────────────
		const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
		const embeddingModel = genAI.getGenerativeModel({
			model: "gemini-embedding-001",
		});
		const queryResult = await embeddingModel.embedContent(query.trim());
		const queryVector: number[] = queryResult.embedding.values;

		// ── Step 2: Load all stored embeddings from SQLite ────────────────────
		const db = DB.Instance().DB();
		const rows = db
			.prepare("SELECT note_id, embedding FROM note_embeddings")
			.all() as { note_id: string; embedding: string }[];

		if (rows.length === 0) {
			return res.json({ query, total_searched: 0, results: [] });
		}

		// ── Step 3: Score each note by cosine similarity ──────────────────────
		const scored = rows
			.map((row) => {
				const vector: number[] = JSON.parse(row.embedding);
				return {
					id: row.note_id,
					similarity: cosineSimilarity(queryVector, vector),
				};
			})
			.sort((a, b) => b.similarity - a.similarity) // descending
			.slice(0, topK);

		console.log(
			`Smart search: "${query}" → searched ${rows.length} notes, ` +
				`top similarity: ${scored[0]?.similarity.toFixed(3)}`,
		);

		return res.json({
			query,
			total_searched: rows.length,
			results: scored,
		});
	} catch (err) {
		console.error("Smart search error:", err);
		return res.status(500).json({
			error: "Internal server error",
			details: (err as Error).message,
		});
	}
});

export default router;
