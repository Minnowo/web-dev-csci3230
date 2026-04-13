import { type Response } from "express";
import { DB } from "../db/db.js";
import type { AuthenticatedRequest } from "../types/user.js";

export const ApiGetTags = (req: AuthenticatedRequest, res: Response): void => {
	if (!req.user) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	const db = DB.Instance();
	const result = db.GetTags(req.user.ID);

	if (result.error !== null) {
		console.error(`error getting tags: ${result.error}`);
		res.status(500).json({ message: "Internal server error" });
		return;
	}

	res.status(200).json({ tags: result.data });
};
