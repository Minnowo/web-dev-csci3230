import { type Response } from "express";
import { DB } from "../db/db.js";
import type { AuthenticatedRequest } from "../types/user.js";

interface CreateFolderRequestBody {
	parent_folder_id: number | null;
	title: string;
}

export const ApiPostCreateFolder = (
	req: AuthenticatedRequest<CreateFolderRequestBody>,
	res: Response,
): void => {
	if (!req.user) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	const { title, parent_folder_id } = req.body as CreateFolderRequestBody;

	if (typeof title !== "string") {
		res.status(400).json({
			message: "Invalid data types, need to be strings",
		});
		return;
	}

	const cleanTitle = title.trim();

	if (cleanTitle.length === 0) {
		res.status(400).json({ message: "Expected non-empty title" });
		return;
	}

	const db = DB.Instance();
	const result = db.CreateFolder(req.user.ID, parent_folder_id, cleanTitle);

	if (result.error !== null) {
		console.error(`error creating folder: ${result.error}`);
		res.status(500).json({ message: "Internal server error" });
		return;
	}

	res.status(201).json({ id: result.data });
};
