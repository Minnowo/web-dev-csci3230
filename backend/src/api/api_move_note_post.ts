import { type Response } from "express";
import { DB } from "../db/db.js";
import type { AuthenticatedRequest } from "../types/user.js";

interface MoveNoteRequestBody {
	parent_folder_id: number | null;
}

export const ApiPostMoveNote = (
	req: AuthenticatedRequest<MoveNoteRequestBody>,
	res: Response,
): void => {
	if (!req.user) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	const noteId = parseInt(req.params.id, 10);
	if (isNaN(noteId)) {
		res.status(400).json({ message: "Invalid note id" });
		return;
	}

	const { parent_folder_id } = req.body as MoveNoteRequestBody;

	if (
		parent_folder_id !== null &&
		(typeof parent_folder_id !== "number" || !Number.isInteger(parent_folder_id))
	) {
		res.status(400).json({ message: "parent_folder_id must be an integer or null" });
		return;
	}

	const db = DB.Instance();
	const result = db.MoveNote(noteId, req.user.ID, parent_folder_id ?? null);

	if (result.error !== null) {
		console.error(`error moving note: ${result.error}`);
		res.status(500).json({ message: "Internal server error" });
		return;
	}

	res.status(200).end();
};
