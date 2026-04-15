import { type Response } from "express";
import { DB } from "../db/db.js";
import type { AuthenticatedRequest } from "../types/user.js";

export const ApiGetFolderChildren = (
	req: AuthenticatedRequest,
	res: Response,
): void => {
	if (!req.user) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	const idParam = req.params.id;
	const folderId = Number(idParam);

	if (Number.isNaN(folderId) || folderId < 0) {
		res.status(400).json({ message: "Invalid note id" });
		return;
	}

	const db = DB.Instance();
	const result = db.GetFoldersChildren(
		req.user.ID,
		folderId === 0 ? null : folderId,
	);

	if (result.error !== null) {
		console.error(`error listing folder children: ${result.error}`);
		res.status(500).json({ message: "Internal server error" });
		return;
	}

	res.status(200).json(result.data);
};
