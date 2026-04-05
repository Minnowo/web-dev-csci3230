import { type Response } from "express";
import { DB } from "../db/db.js";
import type { AuthenticatedRequest } from "../types/user.js";

export const ApiGetNote = (
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
        console.error(`error retrieving note: ${result.error}`);
        res.status(500).json({ message: "Internal server error" });
        return;
    }

    if (!result.data) {
        res.status(404).json({ message: "Note not found" });
        return;
    }

    res.status(200).json(result.data);
}; 