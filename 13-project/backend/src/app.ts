import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use(errorHandler);

app.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "Server Running",
  });
});

export default app;
