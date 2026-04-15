import { type Response } from "express";
import { DB } from "../db/db.js";
import type { AuthenticatedRequest } from "../types/user.js";

interface RenameFolderRequestBody {
	folder_id: number;
	name: string;
}

export const ApiPostRenameFolder = (
	req: AuthenticatedRequest<RenameFolderRequestBody>,
	res: Response,
): void => {
	if (!req.user) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	const { folder_id, name } = req.body as RenameFolderRequestBody;

	if (typeof folder_id !== "number" || !Number.isInteger(folder_id)) {
		res.status(400).json({ message: "folder_id must be an integer" });
		return;
	}

	if (typeof name !== "string" || name.trim().length === 0) {
		res.status(400).json({ message: "name must be a non-empty string" });
		return;
	}

	const db = DB.Instance();
	const result = db.RenameFolder(req.user.ID, folder_id, name.trim());

	if (result.error !== null) {
		console.error(`error renaming folder: ${result.error}`);
		res.status(500).json({ message: "Internal server error" });
		return;
	}

	res.status(200).end();
};
