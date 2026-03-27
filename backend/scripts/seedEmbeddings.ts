// ── seedEmbeddings.ts (David) ─────────────────────────────────────────────────
// Generates embeddings for all mock notes by calling /api/notes/:id/analyze.
// Run once after cloning to populate the local SQLite DB for smart search.
//
// Usage: docker exec express-backend npx tsx scripts/seedEmbeddings.ts
//
// Skips notes that already have embeddings (safe to re-run).
// Rate-limited to ~1 request/second to stay within Gemini free tier limits.

import { DB } from "../src/db/db.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

// Import mock notes — this file is mounted from the frontend
// We read it dynamically since it's an ES module with a named export
const mockDataPath = "/frontend/src/services/mockData.js";

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
	if (!process.env.GEMINI_API_KEY) {
		console.error("GEMINI_API_KEY not set in .env");
		process.exit(1);
	}

	const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
	const embeddingModel = genAI.getGenerativeModel({
		model: "gemini-embedding-001",
	});

	const db = DB.Instance().DB();

	// Ensure table exists
	db.exec(`
		CREATE TABLE IF NOT EXISTS note_embeddings (
			note_id    TEXT    PRIMARY KEY NOT NULL,
			embedding  TEXT    NOT NULL,
			updated_at INTEGER NOT NULL DEFAULT (unixepoch())
		)
	`);

	// Load mock notes
	const { mockNotes } = await import(mockDataPath);
	console.log(`Loaded ${mockNotes.length} mock notes`);

	// Check which notes already have embeddings
	const existing = new Set(
		(
			db
				.prepare("SELECT note_id FROM note_embeddings")
				.all() as { note_id: string }[]
		).map((r) => r.note_id),
	);
	console.log(`${existing.size} embeddings already in DB`);

	const toEmbed = mockNotes.filter(
		(n: { id: string }) => !existing.has(n.id),
	);
	console.log(`${toEmbed.length} notes need embeddings\n`);

	if (toEmbed.length === 0) {
		console.log("Nothing to do!");
		return;
	}

	// Prepare upsert statement
	const upsert = db.prepare(`
		INSERT INTO note_embeddings (note_id, embedding, updated_at)
		VALUES (?, ?, unixepoch())
		ON CONFLICT (note_id) DO UPDATE
			SET embedding  = excluded.embedding,
			    updated_at = unixepoch()
	`);

	let saved = 0;
	let errors = 0;

	for (let i = 0; i < toEmbed.length; i++) {
		const note = toEmbed[i] as {
			id: string;
			title: string;
			summary: string;
			tags: string[];
			content: string;
		};

		// Build embedding input: title + summary + tags + content
		const input = [
			note.title,
			note.summary,
			Array.isArray(note.tags) ? note.tags.join(", ") : "",
			note.content,
		]
			.filter(Boolean)
			.join(" | ");

		try {
			const result = await embeddingModel.embedContent(input);
			const embedding = result.embedding.values;

			upsert.run(note.id, JSON.stringify(embedding));
			saved++;

			if (saved % 20 === 0 || i === toEmbed.length - 1) {
				console.log(
					`  [${i + 1}/${toEmbed.length}] ${saved} saved, ${errors} errors`,
				);
			}

			// Rate limit: ~1 req/sec keeps us well within free tier
			await sleep(1000);
		} catch (err) {
			errors++;
			console.error(
				`  ERROR on note ${note.id} (${note.title}):`,
				(err as Error).message,
			);
			// Pause longer after an error (likely rate limit)
			console.log("  Pausing 10s...");
			await sleep(10000);
		}
	}

	console.log(
		`\nDone! ${saved} new embeddings, ${errors} errors. Total in DB: ${existing.size + saved}`,
	);
}

main();
