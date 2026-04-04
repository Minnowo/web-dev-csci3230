// ── analyze.ts (David) ────────────────────────────────────────────────────────
// POST /api/notes/:id/analyze
//
// Accepts a note's title + content, calls Gemini to produce:
//   - tags          : string[]   (3-6 short topic tags)
//   - sentiment_score: number    (-1.0 very negative → 1.0 very positive)
//   - summary       : string     (≤15 word sentence)
//
// Then generates a semantic embedding for the note using gemini-embedding-001
// and upserts it into the note_embeddings table for later smart search.
//
// Requires GEMINI_API_KEY in the environment.

import { GoogleGenerativeAI } from "@google/generative-ai";
import express, { type Request, type Response } from "express";
import { DB } from "../db/db.js";

const router = express.Router();

router.post("/notes/:id/analyze", async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { title = "", content, tags: existingTags = [] } = req.body;

		// ── Validation ────────────────────────────────────────────────────────
		if (!content || (content as string).trim().length === 0) {
			return res.status(400).json({ error: "Note content is empty" });
		}

		if (!process.env.GEMINI_API_KEY) {
			return res
				.status(500)
				.json({ error: "GEMINI_API_KEY is not configured" });
		}

		const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

		// ── Step 1: Tags + Sentiment + Summary via gemini-2.5-flash ──────────
		// We ask the model to return structured JSON so we can parse it reliably.
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
		`.trim();

		const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
		const result = await model.generateContent(prompt);
		const text = result.response.text().trim();

		let parsed: { tags: string[]; sentiment_score: number; summary: string };
		try {
			parsed = JSON.parse(text);
		} catch {
			console.error("Gemini returned non-JSON:", text);
			return res
				.status(500)
				.json({ error: "Failed to parse Gemini response", raw: text });
		}

		const { tags, sentiment_score, summary } = parsed;

		if (
			!Array.isArray(tags) ||
			typeof sentiment_score !== "number" ||
			typeof summary !== "string"
		) {
			return res.status(500).json({
				error: "Unexpected response shape from Gemini",
				raw: parsed,
			});
		}

		// ── Step 2: Generate embedding via gemini-embedding-001 ───────────────
		// We embed title + summary + tags + content together for the richest
		// semantic representation of the note.
		const embeddingInput = [title, summary, tags.join(", "), content]
			.filter(Boolean)
			.join(" | ");

		const embeddingModel = genAI.getGenerativeModel({
			model: "gemini-embedding-001",
		});
		const embeddingResult = await embeddingModel.embedContent(embeddingInput);
		const embedding: number[] = embeddingResult.embedding.values;

		// ── Step 3: Upsert embedding into SQLite ──────────────────────────────
		// Stored as a JSON string since SQLite has no vector type.
		// Cosine similarity is computed in JS at search time (see smartSearch.ts).
		const db = DB.Instance().DB();
		db.prepare(`
			INSERT INTO note_embeddings (note_id, embedding, updated_at)
			VALUES (?, ?, unixepoch())
			ON CONFLICT (note_id) DO UPDATE
				SET embedding  = excluded.embedding,
				    updated_at = unixepoch()
		`).run(id, JSON.stringify(embedding));

		console.log(`✓ Embedding saved for note ${id} (${embedding.length} dims)`);

		return res.json({
			id,
			tags,
			sentiment_score,
			summary,
			embedding_dims: embedding.length,
		});
	} catch (err) {
		console.error("Analyze route error:", err);
		return res.status(500).json({
			error: "Internal server error",
			details: (err as Error).message,
		});
	}
});

export default router;
