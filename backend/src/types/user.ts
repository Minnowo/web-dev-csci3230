import type { JwtPayload } from "jsonwebtoken";
import type { Request } from "express";

export type User = {
	ID: number;
	NAME: string;
	EMAIL: string;
	CREATED: string;
};

export type JwtUserPayload = User & JwtPayload;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AuthenticatedRequest<BodyType = any>
	extends Request<any, any, BodyType, any> {
	user?: JwtUserPayload;
}
