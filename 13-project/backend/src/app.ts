import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler";
import { swaggerSpec } from "./config/swagger";
import swaggerUi from "swagger-ui-express";
import authRoutes from "./routes/auth.route";
import taskRoutes from "./routes/task.routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health Check
 *     responses:
 *       200:
 *         description: Server is healthy
 */
app.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "Server Running",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.all("/{*splat}", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

export default app;
