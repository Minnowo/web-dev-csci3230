import type { DB } from "./db.js";
import { DBError } from "./errors.js";

type MigrationFunc = (
	db: DB,
	fromVersion: number,
	toVersion: number,
) => DBError | null;

const migrate_0: MigrationFunc = (
	database: DB,
	_: number,
	toVersion: number,
) => {
	const db = database.DB();

	try {
		const tx = db.transaction(() => {
			db.exec(
				`CREATE TABLE IF NOT EXISTS DB_VERSION (VERSION INTEGER PRIMARY KEY NOT NULL)`,
			);

			db.prepare("INSERT INTO DB_VERSION (VERSION) VALUES (?)").run(
				toVersion,
			);
		});

		tx();
	} catch (err) {
		return DBError.from(err);
	}

	return null;
};

const migrate_1: MigrationFunc = (
	database: DB,
	fromVersion: number,
	toVersion: number,
) => {
	const db = database.DB();

	try {
		const tx = db.transaction(() => {
			db.exec(
				`CREATE TABLE IF NOT EXISTS DB_USER (` +
					`ID        INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,` +
					`NAME      TEXT UNIQUE,` +
					`EMAIL     TEXT,` +
					`PASSWORD  BLOB,` +
					`CREATED   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP` +
					`);`,
			);

			// just copy paste this at the end of every transaction in ever migration function
			db.prepare(
				"UPDATE DB_VERSION SET VERSION = ? WHERE VERSION = ?",
			).run(toVersion, fromVersion);
		});

		tx();
	} catch (err) {
		return DBError.from(err);
	}

	return null;
};

const migrate_2: MigrationFunc = (
	database: DB,
	fromVersion: number,
	toVersion: number,
) => {
    const db = database.DB();

	try {
		const tx = db.transaction (() => {
			db.exec(
				`CREATE TABLE IF NOT EXISTS DB_NOTES (
					ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
					USER_ID INTEGER NOT NULL,
					TITLE TEXT NOT NULL,
					CONTENT TEXT NOT NULL DEFAULT "",
					CREATED TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
					UPDATED TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
					FOREIGN KEY (USER_ID) REFERENCES DB_USER(ID) ON DELETE CASCADE
				)`
			);
			
			db.prepare(
				"UPDATE DB_VERSION SET VERSION = ? WHERE VERSION = ?",
			).run(toVersion, fromVersion);
		});

		tx();
		
	} catch (err) {
		return DBError.from(err);
	}

	return null;
};

// ── Migration 2 (David) ───────────────────────────────────────────────────────
// Creates the note_embeddings table used for Gemini semantic search.
// Embeddings are stored as a JSON-stringified float array (TEXT) since SQLite
// has no native vector type. Cosine similarity is computed in JavaScript at
// query time — acceptable for the scale of this project (~hundreds of notes).
const migrate_3: MigrationFunc = (
	database: DB,
	fromVersion: number,
	toVersion: number,
) => {
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

			db.prepare(
				"UPDATE DB_VERSION SET VERSION = ? WHERE VERSION = ?",
			).run(toVersion, fromVersion);
		});

		tx();
	} catch (err) {
		return DBError.from(err);
	}

	return null;
};

export const Migrations: Array<{
	fromVersion: number;
	toVersion: number;
	func: MigrationFunc;
}> = [
	{ fromVersion: 0, toVersion: 1, func: migrate_0 },
	{ fromVersion: 1, toVersion: 2, func: migrate_1 },
	{ fromVersion: 2, toVersion: 3, func: migrate_2 },
	{ fromVersion: 3, toVersion: 4, func: migrate_3 },
];
