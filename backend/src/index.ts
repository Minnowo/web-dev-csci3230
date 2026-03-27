import "dotenv/config";
import express, { type Request, type Response } from "express";
import cors from "cors";
import { DB } from "./db/db.js";

// ── David's routes ────────────────────────────────────────────────────────────
import analyzeRouter from "./routes/analyze.js";
import smartSearchRouter from "./routes/smartSearch.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/api/health", (req: Request, res: Response) => {
	res.json({ status: "ok", message: "Server is running" });
});

// ── Gemini routes (David) ─────────────────────────────────────────────────────
app.use("/api", analyzeRouter);
app.use("/api", smartSearchRouter);

app.get("/", (req: Request, res: Response) => {
	res.send("Hello from TypeScript + Express 🚀");
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);

	if (!process.env.GEMINI_API_KEY) {
		console.warn("WARNING: GEMINI_API_KEY is not set in .env");
	}

	// Run DB migrations on startup (creates tables if they don't exist)
	const db = DB.Instance();
	db.Migrate();
});
