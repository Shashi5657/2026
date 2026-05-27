

import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "@10-frontend-auth/auth";

export async function createContext(opts: CreateExpressContextOptions) {
	const session = await auth.api.getSession({
		headers: fromNodeHeaders(opts.req.headers),
	});
	return {
		auth: null,
		session,
	};
}


export type Context = Awaited<ReturnType<typeof createContext>>;
