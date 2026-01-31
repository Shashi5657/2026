import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { ENV } from "./config/env.js";
import bookRoutes from "./modules/books/book.route.js";

const app = express();

//Global middlewares

app.use(helmet());
app.use(cors());
app.use(express.json());

if (ENV.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(
    morgan("combined", {
      stream: {
        write: (message) => console.log(message.trim()),
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

//routes
app.use("/api/v1/books", bookRoutes);

export default app;
