import { type Response } from "express";
import { DB } from "../db/db.js";
import type { AuthenticatedRequest } from "../types/user.js";

interface DeleteFolderRequestBody {
	folder_id: number;
}

export const ApiPostDeleteFolder = (
	req: AuthenticatedRequest<DeleteFolderRequestBody>,
	res: Response,
): void => {
	if (!req.user) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	const { folder_id } = req.body as DeleteFolderRequestBody;

	const db = DB.Instance();
	const result = db.DeleteFolder(req.user.ID, folder_id);

	if (result.error !== null) {
		console.error(`error deleting folder: ${result.error}`);
		res.status(500).json({ message: "Internal server error" });
		return;
	}

	res.status(200).end();
};
