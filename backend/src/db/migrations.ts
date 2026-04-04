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

// ── Migration 2 (David) ───────────────────────────────────────────────────────
// Creates the notes_fts FTS5 virtual table for hybrid keyword search.
// Porter stemmer: "running" and "run" match the same note.
// Field weights via bm25(): title=10×, tags=5×, summary=3×, content=1×.
const migrate_2: MigrationFunc = (
	database: DB,
	fromVersion: number,
	toVersion: number,
) => {
	const db = database.DB();

	try {
		const tx = db.transaction(() => {
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
];
