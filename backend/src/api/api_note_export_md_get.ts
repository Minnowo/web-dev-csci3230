import { type Response } from "express";
import { DB } from "../db/db.js";
import type { AuthenticatedRequest } from "../types/user.js";

function cleanTitle(title: string): string {
	return title
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

export const ApiGetNoteExportMd = (
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

	const db = DB.Instance();
	const result = db.GetSingleNote(noteId, req.user.ID);

	if (result.error !== null) {
		console.error(`error retrieving note for export: ${result.error}`);
		res.status(500).json({ message: "Internal server error" });
		return;
	}

	if (!result.data) {
		res.status(404).json({ message: "Note not found" });
		return;
	}

	const filename = cleanTitle(result.data.title) || "untitled-note";

	res.setHeader("Content-Type", "text/markdown; charset=utf-8");
	res.setHeader(
		"Content-Disposition",
		`attachment; filename="${filename}.md"`,
	);
	res.send(result.data.content);
};
