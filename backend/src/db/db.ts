import Database from "better-sqlite3";
import { DBError } from "./errors.js";
import { Migrations } from "./migrations.js";

export type Result<T> =
	| { data: T; error: null }
	| { data: null; error: DBError };

export class DB {
	private static instance: DB;
	private db: InstanceType<typeof Database>;

	private constructor() {
		this.db = new Database("./db.sqlite3");
		this.db.pragma("journal_mode = WAL");
		this.db.pragma("foreign_keys = ON");
	}

	public static Instance(): DB {
		if (!DB.instance) {
			DB.instance = new DB();
		}
		return DB.instance;
	}

	public DB(): InstanceType<typeof Database> {
		return this.db;
	}

	public Version(): Result<number> {
		try {
			const row = this.db
				.prepare("SELECT VERSION FROM DB_VERSION")
				.get() as { VERSION: number };

			return { data: row.VERSION, error: null };
		} catch (err) {
			return { data: null, error: DBError.from(err) };
		}
	}

	public Migrate(): Error | null {
		let version = this.Version();

		if (version.error !== null) {
			if (!version.error.isTableNotFound()) {
				console.error(
					"Unknown error while migrating database: ",
					version.error,
				);

				return version.error;
			}

			console.info("Version table not found, assuming empty database");
			version = { data: 0, error: null };
		}

		const maxVer = Migrations[Migrations.length - 1];

		if (maxVer === undefined) {
			throw new Error(
				"Max database version is undefined, this is impossible",
			);
		}

		console.debug(
			`Starting migration loop. this version: ${version.data} max version: ${maxVer.toVersion}`,
		);

		let curVersion = version.data;

		for (let i = 0; i < Migrations.length; i++) {
			const migration = Migrations[i];

			if (migration === undefined) {
				throw new Error(
					`Migration version ${curVersion} is undefined, this is impossible`,
				);
			}

			if (curVersion !== migration.fromVersion) {
				continue;
			}

			console.info(
				`Migrating database from version ${migration.fromVersion} to ${migration.toVersion}`,
			);

			const err = migration.func(
				this,
				migration.fromVersion,
				migration.toVersion,
			);

			if (err !== null) {
				console.info(
					`Migrating database from version ${migration.fromVersion} failed: ${err}`,
				);

				return err;
			}

			curVersion = migration.toVersion;
		}

		console.info("Migration finished. DB Version:", curVersion);

		return null;
	}
}
