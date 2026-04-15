import fs from "node:fs";
import path from "node:path";
import type { Express } from "express";
import { canonicalMimeForExtension, extensionWithDot } from "../constants/upload.js";
import { DB } from "../db/db.js";
import type { FileAsset } from "../types/file.js";
import type { AuthenticatedRequest } from "../types/user.js";

function safeOriginalName(original: string): string {
	const base = path.basename(original).replace(/[\u0000-\u001f]/g, "_");
	return base.length > 0 ? base.slice(0, 255) : "file";
}

export type PersistOutcome =
	| { ok: true; asset: FileAsset }
	| { ok: false; status: number; message: string };

export function persistUploadedFile(
	req: AuthenticatedRequest,
	file: Express.Multer.File,
): PersistOutcome {
	const userId = req.user!.ID;
	const absPath = path.join(file.destination, file.filename);

	const extDot = extensionWithDot(file.originalname);
	const mime = canonicalMimeForExtension(extDot);
	if (!mime) {
		try {
			fs.unlinkSync(absPath);
		} catch {
			// ignore - file might already be deleted
		}
		return { ok: false, status: 400, message: "Unsupported file type" };
	}

	const extForDb = extDot.startsWith(".") ? extDot.slice(1) : extDot;
	const storagePath = path.posix.join(String(userId), file.filename);

	const db = DB.Instance();
	const created = db.CreateFileAsset({
		userId,
		originalName: safeOriginalName(file.originalname),
		storedName: file.filename,
		mimeType: mime,
		extension: extForDb.length > 0 ? extForDb : null,
		sizeBytes: file.size,
		storagePath,
	});

	if (created.error !== null) {
		try {
			fs.unlinkSync(absPath);
		} catch {
			// ignore - file might already be deleted
		}
		return { ok: false, status: 500, message: "Could not save file" };
	}

	const row = db.GetFileAssetForUser(created.data, userId);
	if (row.error !== null || !row.data) {
		return { ok: false, status: 500, message: "Could not load saved file" };
	}

	return { ok: true, asset: row.data };
}
