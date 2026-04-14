import type { Response } from "express";
import { persistUploadedFile } from "./file_upload_persist.js";
import type { AuthenticatedRequest } from "../types/user.js";

// Uploads a file and attaches it to either a note or a folder.
export const ApiPostFileUpload = (
	req: AuthenticatedRequest,
	res: Response,
): void => {
	if (!req.user) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	if (!req.file) {
		res.status(400).json({ message: 'Expected multipart field "file"' });
		return;
	}

	const output = persistUploadedFile(req, req.file);

	if (!output.ok) {
		res.status(output.status).json({ message: output.message });
		return;
	}

	res.status(201).json(output.asset);
};
