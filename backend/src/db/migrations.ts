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

export const Migrations: Array<{
	fromVersion: number;
	toVersion: number;
	func: MigrationFunc;
}> = [
	{ fromVersion: 0, toVersion: 1, func: migrate_0 },
	{ fromVersion: 1, toVersion: 2, func: migrate_1 },
];
