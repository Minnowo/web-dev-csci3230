import { type Response } from "express";
import { DB } from "../db/db.js";
import type { AuthenticatedRequest } from "../types/user.js";

export const ApiPostNoteTags = (
	req: AuthenticatedRequest,
	res: Response,
): void => {
	if (!req.user) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	const idParam = req.params.id;
	const noteId = Number(idParam);

	if (!idParam || Number.isNaN(noteId) || noteId <= 0) {
		res.status(400).json({ message: "Invalid note id" });
		return;
	}

	const { tags } = req.body as { tags?: unknown };

	if (!Array.isArray(tags)) {
		res.status(400).json({ message: "tags must be an array" });
		return;
	}

	const db = DB.Instance();
	const result = db.SyncNoteTags(noteId, req.user.ID, tags as string[]);

	if (result.error !== null) {
		if (result.error.message === "Note not found") {
			res.status(404).json({ message: "Note not found" });
			return;
		}
		console.error(`error syncing note tags: ${result.error}`);
		res.status(500).json({ message: "Internal server error" });
		return;
	}

	res.status(200).json({ tags: result.data });
};
