import { type Response } from "express";
import type { AuthenticatedRequest } from "../types/user.js";

export const ApiGetWhoAmI = (req: AuthenticatedRequest, res: Response) => {
	const me = req.user;

	if (!me) {
		res.status(401);
		return;
	}

	res.status(200).json({
		ID: me.ID,
		NAME: me.NAME,
		EMAIL: me.EMAIL,
		CREATED: me.CREATED,
	});
};
