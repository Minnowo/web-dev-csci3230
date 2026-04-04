import "dotenv/config";
import express, { type Request, type Response } from "express";
import cors from "cors";
import { DB } from "./db/db.js";
import { ApiPostLogin } from "./api/api_login_post.js";
import { ApiPostCreateUser } from "./api/api_create_user_post.js";
import { MiddleWareAuthenticateToken } from "./middleware/auth.js";
import { ApiGetWhoAmI } from "./api/api_whoami_get.js";

// ── David's routes ────────────────────────────────────────────────────────────
import analyzeRouter from "./routes/analyze.js";
import smartSearchRouter from "./routes/smartSearch.js";

export const ExpressApp = express();
const PORT = 3000;

ExpressApp.use(cors());
ExpressApp.use(express.json());

// ── Health check ──────────────────────────────────────────────────────────────
ExpressApp.get("/api/health", (req: Request, res: Response) => {
	res.json({ status: "ok", message: "Server is running" });
});

// ── Gemini routes (David) ─────────────────────────────────────────────────────
ExpressApp.use("/api", analyzeRouter);
ExpressApp.use("/api", smartSearchRouter);

ExpressApp.get("/", (req: Request, res: Response) => {
	res.send("Hello from TypeScript + Express 🚀");
	console.log("hello world");
});

// keep it simple, put literally all endpoints here so we can easily read them.
ExpressApp.post("/api/login", ApiPostLogin);
ExpressApp.post("/api/register", ApiPostCreateUser);
ExpressApp.get("/api/whoami", MiddleWareAuthenticateToken, ApiGetWhoAmI);

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
