
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { env } from "@10-frontend-auth/env/server";
import { createDb } from "@10-frontend-auth/db";
import * as schema from "@10-frontend-auth/db/schema/auth";


export function createAuth() {
	const db = createDb();

	return betterAuth({
		database: drizzleAdapter(db, {

provider: "sqlite",

			schema: schema,
		}),
		trustedOrigins: [
			env.CORS_ORIGIN,
		],
		emailAndPassword: {
			enabled: true,
		},
		secret: env.BETTER_AUTH_SECRET,
		baseURL: env.BETTER_AUTH_URL,
		advanced: {
			defaultCookieAttributes: {
				sameSite: "none",
				secure: true,
				httpOnly: true,
			},
		},
		plugins: [
		],
	});
}

export const auth = createAuth();



