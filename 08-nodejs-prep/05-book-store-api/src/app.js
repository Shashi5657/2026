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

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(
    morgan("combined", {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    }),
  );
}
//Health check Route

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
  });
});

export default app;
