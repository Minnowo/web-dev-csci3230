import { type Response } from "express";
import { DB } from "../db/db.js";
import type { AuthenticatedRequest } from "../types/user.js";

interface UpdateNoteRequestBody {
	title: string;
	content: string;
}

export const ApiPostUpdateNote = (
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

	const { title, content } = req.body as UpdateNoteRequestBody;

	if (typeof title !== "string" || typeof content !== "string") {
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
	const result = db.UpdateNote(noteId, req.user.ID, cleanTitle, content);

	if (result.error !== null) {
		console.error(`error updating note: ${result.error}`);
		res.status(500).json({ message: "Internal server error" });
		return;
	}

	if (result.data === 0) {
		res.status(404).json({ message: "Note not found" });
		return;
	}

	const updatedNote = db.GetSingleNote(noteId, req.user.ID);

	if (updatedNote.error !== null || !updatedNote.data) {
		res.status(500).json({ message: "Internal server error" });
		return;
	}

	res.status(200).json(updatedNote.data);
};
