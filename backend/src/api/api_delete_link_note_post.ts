import { type Response } from "express";
import { DB } from "../db/db.js";
import type { AuthenticatedRequest } from "../types/user.js";
import type { NoteLink } from "../types/note.js";

interface DeleteNoteLinkRequestBody {
	links: Array<NoteLink>;
}

export const ApiPostDeleteNoteLinks = (
	req: AuthenticatedRequest<DeleteNoteLinkRequestBody>,
	res: Response,
): void => {
	if (!req.user) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	const { links } = req.body as DeleteNoteLinkRequestBody;

	console.info("/api/notes/link/delete", links);

	if (links.length === 0) {
		res.status(400).json({
			message: "Expected non-empty list of note links",
		});
		return;
	}

	const db = DB.Instance();

	const tx = db.DB().transaction(() => {
		for (let i = 0; i < links.length; i++) {
			const link = links[i]!;
			const res = db.DeleteNoteLink(link.from_note_id, link.to_note_id);

			if (res.error !== null) {
				throw res.error;
			}
		}
	});

	try {
		tx();
		res.status(200).end();
	} catch (e) {
		console.error(e);
		res.status(500).json({ message: "Internal server error" });
	}
};
