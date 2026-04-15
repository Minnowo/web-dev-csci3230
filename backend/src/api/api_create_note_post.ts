import { type Response } from "express";
import { DB } from "../db/db.js";
import { parseIconForCreate } from "./note_icon.js";
import type { AuthenticatedRequest } from "../types/user.js";

interface CreateNoteRequestBody {
	title: string;
	content: string;
	icon?: string | null;
}

export const ApiPostCreateNote = (
	req: AuthenticatedRequest,
	res: Response,
): void => {
	if (!req.user) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	const { title, content, icon } = req.body as CreateNoteRequestBody;

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

	const safeIcon = parseIconForCreate(icon);
	if (
		typeof safeIcon === "object" &&
		safeIcon !== null &&
		"error" in safeIcon
	) {
		res.status(400).json({ message: safeIcon.error });
		return;
	}	

	const db = DB.Instance();
	const result = db.CreateNote(req.user.ID, cleanTitle, content, safeIcon);

	if (result.error !== null) {
		console.error(`error creating note: ${result.error}`);
		res.status(500).json({ message: "Internal server error" });
		return;
	}

	res.status(201).json({ id: result.data });
};
