import { type Request, type Response } from "express";
import { DB } from "../db/db.js";

interface CreateUserRequestBody {
	username: string;
	email: string;
	password: string;
}

export const ApiPostCreateUser = (
	req: Request<object, object, CreateUserRequestBody>,
	res: Response,
) => {
	const { username, email, password } = req.body;

	if (username.trim().length === 0 || email.trim().length === 0) {
		res.status(400);
		res.send(`Expected non-zero length for username / email`);
		return;
	}

	if (password.length < 2) {
		res.status(400);
		res.send(`Password must be at least 2 characters`);
		return;
	}

	console.info(`creating user ${username} ${email}`);

	const db = DB.Instance();

	const result = db.AddUser(username.trim(), email.trim(), password);

	if (result.error !== null) {
		console.error(`error creating user: ${result.error}`);
		res.status(500);
		res.send(`Internal server error`);
	} else {
		const payload = {
			id: result.data,
		};
		res.status(200).json(payload);
	}
};
