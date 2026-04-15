import fs from "node:fs";
import path from "node:path";
import type { Response } from "express";
import { DB } from "../db/db.js";
import { UPLOAD_DIR_NAME } from "../constants/upload.js";
import type { AuthenticatedRequest } from "../types/user.js";

export const ApiGetFileDownload = (
	req: AuthenticatedRequest,
	res: Response,
): void => {
	if (!req.user) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	const idParam = req.params.id;
	const fileId = Number(idParam);

	if (!idParam || Number.isNaN(fileId) || fileId <= 0) {
		res.status(400).json({ message: "Invalid file id" });
		return;
	}

	const db = DB.Instance();
	const result = db.GetFileAssetForUser(fileId, req.user.ID);

	if (result.error !== null) {
		console.error(`error retrieving file asset: ${result.error}`);
		res.status(500).json({ message: "Internal server error" });
		return;
	}

	if (!result.data) {
		res.status(404).json({ message: "File not found" });
		return;
	}

	const file = result.data;
	const diskPath = path.join(process.cwd(), UPLOAD_DIR_NAME, file.storage_path);

	if (!fs.existsSync(diskPath)) {
		res.status(404).json({ message: "File not found on disk" });
		return;
	}

	res.setHeader("Content-Type", file.mime_type);
	res.setHeader(
		"Content-Disposition",
		`attachment; filename="${file.original_name}"`,
	);
	fs.createReadStream(diskPath).pipe(res);
};
