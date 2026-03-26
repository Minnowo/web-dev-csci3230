import { SqliteError } from "better-sqlite3";

export type DBErrorType =
	| "table-not-found"
	| "unique-constraint"
	| "foreign-key"
	| "syntax-error"
	| "unknown";

export class DBError extends Error {
	public readonly original: unknown;
	public readonly type: DBErrorType;

	constructor(err: unknown, type: DBErrorType = "unknown") {
		super(err instanceof Error ? err.message : String(err));
		this.name = "DBError";
		this.original = err;
		this.type = type;

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, DBError);
		}
	}

	public static from(err: unknown): DBError {
		if (err instanceof SqliteError) {
			// this is such a mess, why is this type so bad
			const type = DBError.detectType(err as unknown as SqliteError);
			return new DBError(err, type);
		}
		return new DBError(err, "unknown");
	}

	private static detectType(err: SqliteError): DBErrorType {
		const msg = err.toString().toLowerCase();

		if (msg.startsWith("sqliteerror: no such table"))
			return "table-not-found";
		if (msg.includes("sqliteerror: unique constraint failed"))
			return "unique-constraint";
		if (msg.includes("sqliteerror: foreign key constraint failed"))
			return "foreign-key";
		if (msg.includes("sqliteerror: syntax error")) return "syntax-error";

		return "unknown";
	}

	public isTableNotFound(): boolean {
		return this.type === "table-not-found";
	}

	public isUniqueConstraint(): boolean {
		return this.type === "unique-constraint";
	}

	public isForeignKeyError(): boolean {
		return this.type === "foreign-key";
	}

	public isSyntaxError(): boolean {
		return this.type === "syntax-error";
	}

	public isUnknown(): boolean {
		return this.type === "unknown";
	}
}
