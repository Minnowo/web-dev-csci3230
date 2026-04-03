import type { JwtPayload } from "jsonwebtoken";
import type { Request } from "express";

export type User = {
	ID: number;
	NAME: string;
	EMAIL: string;
	CREATED: string;
};

export type JwtUserPayload = User & JwtPayload;

export interface AuthenticatedRequest extends Request {
	user?: JwtUserPayload;
}
