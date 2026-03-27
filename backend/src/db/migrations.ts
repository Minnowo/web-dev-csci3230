import type { DB, Result } from "./db.js";
import { DBError } from "./errors.js";

type MigrationFunc = (db: DB) => Result<number>;

const migrate_0: MigrationFunc = (database: DB) => {
	const db = database.DB();

	try {
		const tx = db.transaction(() => {
			db.exec(
				`CREATE TABLE IF NOT EXISTS DB_VERSION (VERSION INTEGER PRIMARY KEY NOT NULL)`,
			);

			db.prepare("INSERT INTO DB_VERSION (VERSION) VALUES (?)").run(0);
		});

		tx();
	} catch (err) {
		return { data: null, error: DBError.from(err) };
	}

	return { data: 1, error: null };
};

// ── Migration 1 (David) ───────────────────────────────────────────────────────
// Creates the note_embeddings table used for Gemini semantic search.
// Embeddings are stored as a JSON-stringified float array (TEXT) since SQLite
// has no native vector type. Cosine similarity is computed in JavaScript at
// query time — acceptable for the scale of this project (~hundreds of notes).
const migrate_1: MigrationFunc = (database: DB) => {
	const db = database.DB();

	try {
		const tx = db.transaction(() => {
			db.exec(`
				CREATE TABLE IF NOT EXISTS note_embeddings (
					note_id    TEXT    PRIMARY KEY NOT NULL,
					embedding  TEXT    NOT NULL,
					updated_at INTEGER NOT NULL DEFAULT (unixepoch())
				)
			`);

			db.prepare("UPDATE DB_VERSION SET VERSION = ?").run(2);
		});

		tx();
	} catch (err) {
		return { data: null, error: DBError.from(err) };
	}

	return { data: 2, error: null };
};

export const Migrations: Array<{ version: number; func: MigrationFunc }> = [
	{ version: 0, func: migrate_0 },
	{ version: 2, func: migrate_1 }, // version: 2 so maxVer.version=2, loop runs past migrate_0
];
