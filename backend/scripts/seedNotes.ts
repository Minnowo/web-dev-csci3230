/**
 * seedNotes.ts — Seeds DB_NOTES with 12 test notes for a given user.
 *
 * Usage:
 *   npx tsx scripts/seedNotes.ts <username>
 *
 * Safe to re-run — skips notes that are already seeded for the user.
 */

import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.resolve(__dirname, "../db.sqlite3");

const TEST_NOTES = [
	{
		title: "Meeting Notes",
		content:
			"Discussed the new dashboard layout with the team. We agreed on a sidebar navigation pattern and will use D3 for the graph visualization. Next sprint starts Monday.",
		tags: ["work", "planning", "dashboard"],
	},
	{
		title: "Recipe Collection",
		content:
			"Grandmas pasta sauce recipe: tomatoes, garlic, basil, olive oil. Simmer for two hours on low heat. Add parmesan at the end. Perfect for Sunday dinners.",
		tags: ["cooking", "food", "personal"],
	},
	{
		title: "Backend Architecture",
		content:
			"The backend uses Express with TypeScript and SQLite. Authentication is handled via JWT tokens. We have a migration system for database schema changes.",
		tags: ["tech", "backend", "work"],
	},
	{
		title: "Frontend Components",
		content:
			"Vue 3 composition API with reactive stores. Editor uses contenteditable div with markdown conversion. Sidebar has a recursive tree for nested folders.",
		tags: ["tech", "frontend", "work"],
	},
	{
		title: "Workout Plan",
		content:
			"Monday: chest and triceps. Wednesday: back and biceps. Friday: legs and shoulders. Run three times a week for cardio. Rest on weekends.",
		tags: ["fitness", "health", "personal"],
	},
	{
		title: "Book Recommendations",
		content:
			"Clean Code by Robert Martin. Designing Data Intensive Applications by Martin Kleppmann. The Pragmatic Programmer by Hunt and Thomas. All great for software engineering.",
		tags: ["books", "learning", "personal"],
	},
	{
		title: "Sprint Retro",
		content:
			"The team discussed what went well with the dashboard sprint. Frontend components are solid but the backend migration took longer than expected. Need better testing next sprint.",
		tags: ["work", "planning", "team"],
	},
	{
		title: "Database Design",
		content:
			"SQLite with FTS5 for full-text search. Migration system handles schema versioning. Backend stores notes with title and content. TypeScript types keep the API layer clean.",
		tags: ["tech", "backend", "work"],
	},
	{
		title: "Cooking Journal",
		content:
			"Tried a new pasta recipe tonight with garlic bread on the side. The sauce needed more basil. Sunday dinners are becoming a tradition.",
		tags: ["cooking", "food", "personal"],
	},
	{
		title: "Running Log",
		content:
			"Ran five kilometers today. Cardio is improving since starting the workout plan. Legs were sore from Friday but pushed through.",
		tags: ["fitness", "health", "personal"],
	},
	{
		title: "Dashboard Wireframe",
		content:
			"Sketched the sidebar navigation and graph visualization layout. D3 force simulation for the node graph. Team meeting tomorrow to review the dashboard design.",
		tags: ["work", "planning", "dashboard"],
	},
	{
		title: "Reading Notes",
		content:
			"Finished Clean Code chapter on functions. Software engineering principles apply to our frontend components and backend architecture. Good patterns for the team to follow.",
		tags: ["books", "learning", "tech"],
	},
	// ── Auto-tag test notes (no pre-seeded tags — use Auto-tag button to generate) ──
	{
		title: "Travel Plans",
		content:
			"Planning a trip to Japan in the spring. Want to visit Tokyo, Kyoto, and Osaka. Need to book flights and accommodations early. Looking into a JR Pass for the bullet trains. Excited about the food and temples.",
		tags: [],
	},
	{
		title: "Interview Prep",
		content:
			"Reviewing data structures and algorithms. Practiced binary search trees and dynamic programming problems. Need to review system design — load balancing, caching, and database sharding. Mock interview scheduled for next Thursday.",
		tags: [],
	},
	{
		title: "Budget Review",
		content:
			"Monthly expenses are over budget again. Groceries went up by twenty percent. Need to cut back on eating out and subscriptions. Savings goal for the year is still on track but barely. Should look into a better budgeting app.",
		tags: [],
	},
];

const username = process.argv[2];
if (!username) {
	console.error("Usage: npx tsx scripts/seedNotes.ts <username>");
	process.exit(1);
}

const db = new Database(DB_PATH);

const user = db
	.prepare("SELECT ID FROM DB_USER WHERE NAME = ?")
	.get(username) as { ID: number } | undefined;
if (!user) {
	console.error(`User "${username}" not found in DB_USER`);
	process.exit(1);
}

const userId = user.ID;
console.log(`Seeding notes for user "${username}" (ID: ${userId})`);

const existingTitles = new Set(
	(
		db
			.prepare("SELECT TITLE FROM DB_NOTES WHERE USER_ID = ?")
			.all(userId) as { TITLE: string }[]
	).map((r) => r.TITLE),
);

const insertNote = db.prepare(
	"INSERT INTO DB_NOTES (USER_ID, TITLE, CONTENT) VALUES (?, ?, ?)",
);
const insertFts = db.prepare(
	"INSERT INTO notes_fts (note_id, title, content) VALUES (?, ?, ?)",
);
const upsertTag = db.prepare(
	"INSERT INTO DB_TAGS (USER_ID, NAME) VALUES (?, ?) ON CONFLICT(USER_ID, NAME) DO NOTHING",
);
const getTagId = db.prepare(
	"SELECT ID FROM DB_TAGS WHERE USER_ID = ? AND NAME = ?",
);
const insertNoteTag = db.prepare(
	"INSERT OR IGNORE INTO DB_NOTE_TAGS (NOTE_ID, TAG_ID) VALUES (?, ?)",
);

const seed = db.transaction(() => {
	let inserted = 0;
	for (const note of TEST_NOTES) {
		if (existingTitles.has(note.title)) {
			console.log(`  skip: "${note.title}" already exists`);
			continue;
		}
		const result = insertNote.run(userId, note.title, note.content);
		const noteId = Number(result.lastInsertRowid);
		insertFts.run(noteId, note.title, note.content);

		for (const tagName of note.tags) {
			upsertTag.run(userId, tagName);
			const row = getTagId.get(userId, tagName) as { ID: number };
			insertNoteTag.run(noteId, row.ID);
		}

		console.log(`  added: "${note.title}" (id: ${noteId}, tags: ${note.tags.join(", ")})`);
		inserted++;
	}
	return inserted;
});

const count = seed();
console.log(`\nDone. Inserted ${count} note(s).`);

db.close();
