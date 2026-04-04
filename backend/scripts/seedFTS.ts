// ── seedFTS.ts (David) ────────────────────────────────────────────────────────
// Populates the notes_fts FTS5 table from mock notes for hybrid keyword search.
// No API calls — pure SQLite inserts, runs in seconds.
//
// Usage: docker exec express-backend npx tsx scripts/seedFTS.ts
//
// Skips notes already indexed (safe to re-run).

import { DB } from "../src/db/db.js";

const mockDataPath = "/frontend/src/services/mockData.js";

async function main() {
	const db = DB.Instance().DB();

	// Ensure table exists (migration may not have run yet in dev)
	db.exec(`
		CREATE VIRTUAL TABLE IF NOT EXISTS notes_fts USING fts5(
			note_id  UNINDEXED,
			title,
			tags,
			summary,
			content,
			tokenize = 'porter ascii'
		)
	`);

	// Load mock notes from the frontend volume mount
	const { mockNotes } = await import(mockDataPath);
	console.log(`Loaded ${mockNotes.length} mock notes`);

	// Check which notes are already indexed
	const existing = new Set(
		(
			db
				.prepare("SELECT note_id FROM notes_fts")
				.all() as { note_id: string }[]
		).map((r) => r.note_id),
	);
	console.log(`${existing.size} notes already indexed`);

	const toIndex = (
		mockNotes as {
			id: string;
			title?: string;
			tags?: string[];
			summary?: string;
			content?: string;
		}[]
	).filter((n) => !existing.has(n.id));

	console.log(`${toIndex.length} notes to index\n`);

	if (toIndex.length === 0) {
		console.log("Nothing to do!");
		return;
	}

	const insert = db.prepare(
		`INSERT INTO notes_fts (note_id, title, tags, summary, content) VALUES (?, ?, ?, ?, ?)`,
	);

	// Wrap in a transaction for speed — single commit instead of one per row
	const insertAll = db.transaction(() => {
		for (const note of toIndex) {
			insert.run(
				note.id,
				note.title ?? "",
				Array.isArray(note.tags) ? note.tags.join(" ") : "",
				note.summary ?? "",
				note.content ?? "",
			);
		}
	});

	insertAll();

	console.log(
		`Done! Indexed ${toIndex.length} notes. Total: ${existing.size + toIndex.length}`,
	);
}

main();
