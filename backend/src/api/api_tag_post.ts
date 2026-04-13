import { type Response } from "express";
import { DB } from "../db/db.js";
import type { AuthenticatedRequest } from "../types/user.js";

export const ApiPostTag = (req: AuthenticatedRequest, res: Response): void => {
	if (!req.user) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	const { name } = req.body as { name?: string };

	if (!name || name.trim().length === 0) {
		res.status(400).json({ message: "Tag name is required" });
		return;
	}

	const db = DB.Instance();
	const result = db.UpsertTag(req.user.ID, name);

	if (result.error !== null) {
		console.error(`error creating tag: ${result.error}`);
		res.status(500).json({ message: "Internal server error" });
		return;
	}

	res.status(200).json({ id: result.data, name: name.toLowerCase().trim() });
};
