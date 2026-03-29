import express, { type Request, type Response } from "express";
import { DB } from "./db/db.js";
import { ApiPostLogin } from "./api/api_login_post.js";
import { ApiPostCreateUser } from "./api/api_create_user_post.js";
import { MiddleWareAuthenticateToken } from "./middleware/auth.js";
import { ApiGetWhoAmI } from "./api/api_whoami_get.js";

export const ExpressApp = express();
const PORT = 3000;

ExpressApp.use(express.json());

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

	const db = DB.Instance();

	console.info("Got DB", db);

	db.Migrate();
});
