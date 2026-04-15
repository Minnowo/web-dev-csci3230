import { type Response } from "express";
import { marked } from "marked";
import { DB } from "../db/db.js";
import type { AuthenticatedRequest } from "../types/user.js";
import { safeName } from "./api_folder_export_get.js";

export const ApiGetNoteExportHtml = (
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
		console.error(`error retrieving note for HTML export: ${result.error}`);
		res.status(500).json({ message: "Internal server error" });
		return;
	}

	if (!result.data) {
		res.status(404).json({ message: "Note not found" });
		return;
	}

	const title = result.data.title;
	const body = marked.parse(result.data.content) as string;

	const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 800px; margin: 2rem auto; padding: 0 1rem; line-height: 1.6; color: #1a1a1a; }
  pre { background: #f4f4f4; padding: 1rem; border-radius: 4px; overflow-x: auto; }
  code { background: #f4f4f4; padding: 0.15rem 0.3rem; border-radius: 3px; }
  pre code { background: none; padding: 0; }
  img { max-width: 100%; }
  blockquote { border-left: 3px solid #ccc; margin-left: 0; padding-left: 1rem; color: #555; }
</style>
</head>
<body>
<h1>${title}</h1>
${body}
</body>
</html>`;

	const filename = safeName(title);

	res.setHeader("Content-Type", "text/html; charset=utf-8");
	res.setHeader(
		"Content-Disposition",
		`attachment; filename="${filename}.html"`,
	);
	res.send(html);
};
