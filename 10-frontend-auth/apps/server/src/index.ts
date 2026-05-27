import { env } from "@10-frontend-auth/env/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { createContext } from "@10-frontend-auth/api/context";
import { appRouter } from "@10-frontend-auth/api/routers/index";
import cors from "cors";
import express from "express";
import { auth } from "@10-frontend-auth/auth";
import { toNodeHandler } from "better-auth/node";

const app = express();

app.use(
	cors({
		origin: env.CORS_ORIGIN,
		methods: ["GET", "POST", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	})
);


app.all("/api/auth{/*path}", toNodeHandler(auth));

app.use(
	"/trpc",
	createExpressMiddleware({
		router: appRouter,
		createContext,
	})
);


app.use(express.json());


app.get("/", (_req, res) => {
	res.status(200).send("OK");
});

app.listen(3000, () => {
	console.log("Server is running on http://localhost:3000");
});
