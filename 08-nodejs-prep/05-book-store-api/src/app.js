import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { ENV } from "./config/env";

const app = express();

//Global middlewares

app.use(helmet());
app.use(cors());
app.use(express.json());

if (ENV.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
