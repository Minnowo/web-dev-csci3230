import Database from "better-sqlite3";
import { DBError } from "./errors.js";
import { Migrations } from "./migrations.js";
import crypto from "crypto";
import type { User } from "../types/user.js";
import type { Note, NoteListItem } from "../types/note.js";

export type Result<T> =
	| { data: T; error: null }
	| { data: null; error: DBError };

export class DB {
	private static instance: DB;
	private db: InstanceType<typeof Database>;

	private constructor() {
		this.db = new Database("./db.sqlite3");
		// Don't really care about this, it just adds junk to the filesystem
		// this.db.pragma("journal_mode = WAL");
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

	public GetUser(username: string, password: string): Result<User> {
		try {
			const hashedPassword = crypto
				.createHash("sha256")
				.update(password)
				.digest();

			const stmt = this.db.prepare(
				"SELECT ID, NAME, EMAIL, CREATED FROM DB_USER WHERE NAME = ? AND PASSWORD = ?",
			);

			const info = stmt.get(username, hashedPassword) as User;

			return { data: info, error: null };
		} catch (err) {
			return { data: null, error: DBError.from(err) };
		}
	}

	public AddUser(
		username: string,
		email: string,
		password: string,
	): Result<number> {
		try {
			// I said we were gonna use bcrypt because it's good, but it's way easier to just use a builtin than add a new library just for that.
			// Who really cares anyways since we're not being marked on good security practices. This should do well enough.
			const hashedPassword = crypto
				.createHash("sha256")
				.update(password)
				.digest();

			const stmt = this.db.prepare(
				"INSERT INTO DB_USER(NAME, EMAIL, PASSWORD) VALUES (?, ?, ?)",
			);

			const info = stmt.run(username, email, hashedPassword);

			return { data: Number(info.lastInsertRowid), error: null };
		} catch (err) {
			return { data: null, error: DBError.from(err) };
		}
	}

	public CreateNote(userId: number, title: string, content: string): Result<number> {
		try {
			const stmt = this.db.prepare(
				"INSERT INTO DB_NOTES (USER_ID, TITLE, CONTENT) VALUES (?, ?, ?)",
			);

			const info = stmt.run(userId, title, content);

			return { data: Number(info.lastInsertRowid), error: null };
		} catch (err) {
			return { data: null, error: DBError.from(err) };
		}	
	}

	public GetNotesList(userId: number): Result<NoteListItem[]> {
		try {
			const stmt = this.db.prepare(
				"SELECT ID, TITLE, UPDATED FROM DB_NOTES WHERE USER_ID = ? ORDER BY UPDATED DESC",
			);

			const rows = stmt.all(userId) as Note[];

			return { data: rows, error: null};				
		} catch (err) {
			return { data: null, error: DBError.from(err) };
		}
	}

	public GetSingleNote(noteId: number, userId: number): Result<Note> {
		try {
			const stmt = this.db.prepare(
				"SELECT ID, USER_ID, TITLE, CONTENT, CREATED, UPDATED FROM DB_NOTES WHERE ID = ? AND USER_ID = ?",
			);

			const row = stmt.get(noteId, userId) as Note;

			return { data: row, error: null };
		} catch (err) {
			return { data: null, error: DBError.from(err) };
		}
	}

	public UpdateNote(noteId: number, userId: number, title: string, content: string): Result<number> {
		try {
			const stmt = this.db.prepare(
				`UPDATE DB_NOTES
				 SET TITLE = ?,
				 	 CONTENT = ?,
					 UPDATED = CURRENT_TIMESTAMP
			 	 WHERE ID = ? AND USER_ID = ?`
			);

			const row = stmt.run(title, content, noteId, userId);

			return { data: row.changes, error: null};
		} catch (err) {
			return { data: null, error: DBError.from(err)};
		}
	} 

	public DeleteNote(noteId: number, userId: number): Result<number> {
		try {
			const stmt = this.db.prepare(
				"DELETE FROM DB_NOTES WHERE ID = ? AND USER_ID = ?",
			);

			const row = stmt.run(noteId, userId);

			return { data: row.changes, error: null};
		} catch (err) {
			return { data: null, error: DBError.from(err)};
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
