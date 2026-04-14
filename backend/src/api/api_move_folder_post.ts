import { type Response } from "express";
import { DB } from "../db/db.js";
import type { AuthenticatedRequest } from "../types/user.js";

interface MoveFolderRequestBody {
	folder_id: number;
	parent_folder_id: number | null;
}

export const ApiPostMoveFolder = (
	req: AuthenticatedRequest<MoveFolderRequestBody>,
	res: Response,
): void => {
	if (!req.user) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	const { folder_id, parent_folder_id } = req.body as MoveFolderRequestBody;

	if (typeof folder_id !== "number" || !Number.isInteger(folder_id)) {
		res.status(400).json({ message: "folder_id must be an integer" });
		return;
	}

	if (
		parent_folder_id !== null &&
		(typeof parent_folder_id !== "number" || !Number.isInteger(parent_folder_id))
	) {
		res.status(400).json({ message: "parent_folder_id must be an integer or null" });
		return;
	}

	if (folder_id === parent_folder_id) {
		res.status(400).json({ message: "A folder cannot be moved into itself" });
		return;
	}

	const db = DB.Instance();
	const result = db.MoveFolder(folder_id, req.user.ID, parent_folder_id ?? null);

	if (result.error !== null) {
		console.error(`error moving folder: ${result.error}`);
		res.status(500).json({ message: "Internal server error" });
		return;
	}

	res.status(200).end();
};
