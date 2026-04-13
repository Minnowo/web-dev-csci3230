import { type Response } from "express";
import { DB } from "../db/db.js";
import type { AuthenticatedRequest } from "../types/user.js";

export const ApiPostDeleteTag = (
	req: AuthenticatedRequest,
	res: Response,
): void => {
	if (!req.user) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	const idParam = req.params.id;
	const tagId = Number(idParam);

	if (!idParam || Number.isNaN(tagId) || tagId <= 0) {
		res.status(400).json({ message: "Invalid tag id" });
		return;
	}

	const db = DB.Instance();
	const result = db.DeleteTag(req.user.ID, tagId);

	if (result.error !== null) {
		console.error(`error deleting tag: ${result.error}`);
		res.status(500).json({ message: "Internal server error" });
		return;
	}

	if (result.data === 0) {
		res.status(404).json({ message: "Tag not found" });
		return;
	}

	res.status(200).json({ id: tagId });
};
