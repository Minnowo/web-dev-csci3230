import { type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { AuthenticatedRequest, JwtUserPayload } from "../types/user.js";
import { JWT_SECRET } from "../constants/jwt_secret.js";

export function MiddleWareAuthenticateToken(
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
): void {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		res.status(401).json({ message: "Token missing" });
		return;
	}

	const secret = JWT_SECRET;
	if (!secret) {
		res.status(500).json({ message: "Server misconfiguration" });
		return;
	}

	jwt.verify(token, secret, (err, decoded) => {
		if (err) {
			res.status(403).json({ message: "Invalid or expired token" });
			return;
		}

		req.user = decoded as JwtUserPayload;
		next();
	});
}
