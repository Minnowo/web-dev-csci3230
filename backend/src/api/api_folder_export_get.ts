import fs from "node:fs";
import path from "node:path";
import type { Response } from "express";
import archiver from "archiver";
import { DB } from "../db/db.js";
import { UPLOAD_DIR_NAME } from "../constants/upload.js";
import type { AuthenticatedRequest } from "../types/user.js";
import type { Folder } from "../types/folder.js";
import type { Note } from "../types/note.js";

// Strips filesystem-unsafe characters from a name
export function safeName(name: string): string {
	return name
		.trim()
		.replace(/[<>:"/\\|?*\x00-\x1f]+/g, "_")
		.replace(/^\.+/, "_") || "untitled";
}

function buildFolderPathMap(
	folders: Folder[],
	rootFolderId: number | null,
): Map<number, string> {
	const pathMap = new Map<number, string>();
	const childrenOf = new Map<number | null, Folder[]>();

	for (const f of folders) {
		const parentKey = f.parent_folder_id;
		const list = childrenOf.get(parentKey) ?? [];
		list.push(f);
		childrenOf.set(parentKey, list);
	}

	function walk(parentId: number | null, prefix: string): void {
		const children = childrenOf.get(parentId) ?? [];
		for (const folder of children) {
			const folderPath = prefix + safeName(folder.name) + "/";
			pathMap.set(folder.id, folderPath);
			walk(folder.id, folderPath);
		}
	}

	walk(rootFolderId, "");
	return pathMap;
}

export const ApiGetFolderExport = (
	req: AuthenticatedRequest,
	res: Response,
): void => {
	if (!req.user) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	const userId = req.user.ID;
	const idParam = req.params.id as string | undefined;
	const folderId = idParam ? Number(idParam) : null;

	if (idParam && (Number.isNaN(folderId) || (folderId !== null && folderId <= 0))) {
		res.status(400).json({ message: "Invalid folder id" });
		return;
	}

	const db = DB.Instance();

	const foldersResult = db.GetFolders(userId);
	if (foldersResult.error !== null) {
		console.error(`error fetching folders for export: ${foldersResult.error}`);
		res.status(500).json({ message: "Internal server error" });
		return;
	}

	const notesResult = db.GetAllNotesWithContent(userId);
	if (notesResult.error !== null) {
		console.error(`error fetching notes for export: ${notesResult.error}`);
		res.status(500).json({ message: "Internal server error" });
		return;
	}

	const allFolders = foldersResult.data;
	const allNotes = notesResult.data;

	if (folderId !== null) {
		const folderExists = allFolders.some((f) => f.id === folderId);
		if (!folderExists) {
			res.status(404).json({ message: "Folder not found" });
			return;
		}
	}

	const pathMap = buildFolderPathMap(allFolders, folderId);

	const descendantFolderIds = new Set(pathMap.keys());
	const relevantNotes = allNotes.filter((n: Note) => {
		if (folderId === null) return n.folder_id === null || descendantFolderIds.has(n.folder_id);
		return n.folder_id === folderId || (n.folder_id !== null && descendantFolderIds.has(n.folder_id));
	});

	const zipName = (folderId !== null)
		? safeName(allFolders.find((f) => f.id === folderId)!.name)
		: "workspace";

	res.setHeader("Content-Type", "application/zip");
	res.setHeader(
		"Content-Disposition",
		`attachment; filename="${zipName}.zip"`,
	);

	const archive = archiver("zip", { zlib: { level: 5 } });

	archive.on("error", (err) => {
		console.error("archive error:", err);
		if (!res.headersSent) {
			res.status(500).json({ message: "Failed to create zip" });
		}
	});

	archive.pipe(res);

	const usedPaths = new Set<string>();

	for (const note of relevantNotes) {
		const dir = (note.folder_id !== null && note.folder_id !== folderId)
			? (pathMap.get(note.folder_id) ?? "")
			: "";

		let baseName = safeName(note.title);
		let fullPath = dir + baseName + ".md";

		let counter = 1;
		while (usedPaths.has(fullPath)) {
			fullPath = dir + baseName + `-${counter}` + ".md";
			counter++;
		}
		usedPaths.add(fullPath);

		archive.append(note.content, { name: fullPath });
	}

	if (folderId === null) {
		const filesResult = db.ListFileAssetsForUser(userId);
		if (filesResult.error === null) {
			for (const file of filesResult.data) {
				const diskPath = path.join(process.cwd(), UPLOAD_DIR_NAME, file.storage_path);
				if (fs.existsSync(diskPath)) {
					const zipPath = "assets/" + safeName(file.original_name);
					archive.file(diskPath, { name: zipPath });
				}
			}
		}
	}

	archive.finalize();
};
