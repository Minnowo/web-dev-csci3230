import "dotenv/config";
import express, { type Request, type Response } from "express";
import cors from "cors";
import { DB } from "./db/db.js";
import { ApiPostLogin } from "./api/api_login_post.js";
import { ApiPostCreateUser } from "./api/api_create_user_post.js";
import { MiddleWareAuthenticateToken } from "./middleware/auth.js";
import { ApiGetWhoAmI } from "./api/api_whoami_get.js";
import { ApiGetNote } from "./api/api_note_get.js";
import { ApiGetNotesList } from "./api/api_notes_list_get.js";
import { ApiPostCreateNote } from "./api/api_create_note_post.js";
import { ApiPostUpdateNote } from "./api/api_update_note_post.js";
import { ApiPostDeleteNote } from "./api/api_delete_note_post.js";

// ── David's routes ────────────────────────────────────────────────────────────
import analyzeRouter from "./routes/analyze.js";
import hybridSearchRouter from "./routes/hybridSearch.js";
import noteIndexRouter from "./routes/noteIndex.js";
import noteBackdateRouter from "./routes/noteBackdate.js";
import { ApiPostLinkNote } from "./api/api_link_note_post.js";
import { ApiPostDeleteNoteLinks } from "./api/api_delete_link_note_post.js";
import { ApiGetNoteLinks } from "./api/api_note_links_get.js";
import { ApiGetAllNoteLinks } from "./api/api_note_links_all_get.js";
import { ApiPostCreateFolder } from "./api/api_create_folder_post.js";
import { ApiPostDeleteFolder } from "./api/api_delete_folder_post.js";
import { ApiPostMoveNote } from "./api/api_move_note_post.js";
import { ApiPostMoveFolder } from "./api/api_move_folder_post.js";
import { ApiPostRenameFolder } from "./api/api_rename_folder_post.js";
import { ApiGetTags } from "./api/api_tags_get.js";
import { ApiPostTag } from "./api/api_tag_post.js";
import { ApiPostDeleteTag } from "./api/api_tag_delete.js";
import { ApiGetNoteTags } from "./api/api_note_tags_get.js";
import { ApiPostNoteTags } from "./api/api_note_tags_post.js";
import { ApiGetFilesList } from "./api/api_files_list_get.js";
import { ApiPostFileUpload } from "./api/api_post_file_upload.js";
import { runUploadThen } from "./middleware/multerUpload.js";
import { ApiGetFileDownload } from "./api/api_file_download_get.js";
import { ApiGetFolderChildren } from "./api/api_folder_children_get.js";
import { ApiGetFolders } from "./api/api_folders_get.js";
import { ApiGetFolderExport } from "./api/api_folder_export_get.js";
import { ApiGetNoteExportMd } from "./api/api_note_export_md_get.js";
import { ApiGetNoteExportHtml } from "./api/api_note_export_html_get.js";

export const ExpressApp = express();
const PORT = 3000;

ExpressApp.use(cors());
ExpressApp.use(express.json());

// ── Health check ──────────────────────────────────────────────────────────────
ExpressApp.get("/api/health", (req: Request, res: Response) => {
	res.json({ status: "ok", message: "Server is running" });
});

// ── David's routes ────────────────────────────────────────────────────────────
ExpressApp.use("/api", analyzeRouter);
ExpressApp.use("/api", hybridSearchRouter);
ExpressApp.use("/api", noteIndexRouter);
ExpressApp.use("/api", noteBackdateRouter);

ExpressApp.get("/", (req: Request, res: Response) => {
	res.send("Hello from TypeScript + Express 🚀");
});

// keep it simple, put literally all endpoints here so we can easily read them.
ExpressApp.post("/api/login", ApiPostLogin);
ExpressApp.post("/api/register", ApiPostCreateUser);
ExpressApp.get("/api/whoami", MiddleWareAuthenticateToken, ApiGetWhoAmI);

// API endpoints for notes
ExpressApp.get("/api/notes", MiddleWareAuthenticateToken, ApiGetNotesList);
ExpressApp.get("/api/notes/links", MiddleWareAuthenticateToken, ApiGetAllNoteLinks);
ExpressApp.post("/api/notes", MiddleWareAuthenticateToken, ApiPostCreateNote);
ExpressApp.post(
	"/api/notes/link",
	MiddleWareAuthenticateToken,
	ApiPostLinkNote,
);
ExpressApp.post(
	"/api/notes/link/delete",
	MiddleWareAuthenticateToken,
	ApiPostDeleteNoteLinks,
);

ExpressApp.get("/api/notes/:id", MiddleWareAuthenticateToken, ApiGetNote);
ExpressApp.get(
	"/api/notes/:id/links",
	MiddleWareAuthenticateToken,
	ApiGetNoteLinks,
);
ExpressApp.get(
	"/api/notes/:id/export",
	MiddleWareAuthenticateToken,
	ApiGetNoteExportMd,
);
ExpressApp.get(
	"/api/notes/:id/export/html",
	MiddleWareAuthenticateToken,
	ApiGetNoteExportHtml,
);
ExpressApp.post(
	"/api/notes/:id/update",
	MiddleWareAuthenticateToken,
	ApiPostUpdateNote,
);
ExpressApp.post(
	"/api/notes/:id/delete",
	MiddleWareAuthenticateToken,
	ApiPostDeleteNote,
);
ExpressApp.get(
	"/api/files",
	MiddleWareAuthenticateToken,
	ApiGetFilesList,
);
ExpressApp.post(
	"/api/files/upload",
	MiddleWareAuthenticateToken,
	runUploadThen(ApiPostFileUpload),
);
ExpressApp.get(
	"/api/files/:id/download",
	MiddleWareAuthenticateToken,
	ApiGetFileDownload,
);

ExpressApp.get("/api/folders", MiddleWareAuthenticateToken, ApiGetFolders);
ExpressApp.get("/api/folders/export", MiddleWareAuthenticateToken, ApiGetFolderExport);
ExpressApp.get(
	"/api/folder/:id",
	MiddleWareAuthenticateToken,
	ApiGetFolderChildren,
);
ExpressApp.get(
	"/api/folder/:id/export",
	MiddleWareAuthenticateToken,
	ApiGetFolderExport,
);
ExpressApp.post(
	"/api/folder",
	MiddleWareAuthenticateToken,
	ApiPostCreateFolder,
);
ExpressApp.post(
	"/api/folder/delete",
	MiddleWareAuthenticateToken,
	ApiPostDeleteFolder,
);
ExpressApp.post(
	"/api/notes/:id/move",
	MiddleWareAuthenticateToken,
	ApiPostMoveNote,
);
ExpressApp.post(
	"/api/folder/move",
	MiddleWareAuthenticateToken,
	ApiPostMoveFolder,
);
ExpressApp.post(
	"/api/folder/rename",
	MiddleWareAuthenticateToken,
	ApiPostRenameFolder,
);

// ── Tag endpoints (David) ─────────────────────────────────────────────────────
ExpressApp.get("/api/tags", MiddleWareAuthenticateToken, ApiGetTags);
ExpressApp.post("/api/tags", MiddleWareAuthenticateToken, ApiPostTag);
ExpressApp.post(
	"/api/tags/:id/delete",
	MiddleWareAuthenticateToken,
	ApiPostDeleteTag,
);
ExpressApp.get(
	"/api/notes/:id/tags",
	MiddleWareAuthenticateToken,
	ApiGetNoteTags,
);
ExpressApp.post(
	"/api/notes/:id/tags",
	MiddleWareAuthenticateToken,
	ApiPostNoteTags,
);

ExpressApp.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);

	if (!process.env.GEMINI_API_KEY) {
		console.warn("WARNING: GEMINI_API_KEY is not set in .env");
	}

	// Run DB migrations on startup (creates tables if they don't exist)
	const db = DB.Instance();
	db.Migrate();
	console.info("Got DB", db);
});
