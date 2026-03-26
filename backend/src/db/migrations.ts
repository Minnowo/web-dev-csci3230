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

const migrate_1: MigrationFunc = (database: DB) => {
	return { data: null, error: DBError.from(new Error("not implemented")) };
};

export const Migrations: Array<{ version: number; func: MigrationFunc }> = [
	{ version: 0, func: migrate_0 },
	// { version: 1, func: migrate_1 },
];
