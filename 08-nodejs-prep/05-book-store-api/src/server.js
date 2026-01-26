import { configDotenv } from "dotenv";
import app from "./app";
import { connectToDB } from "./config/db";
import { ENV } from "./config/env";
import logger from "./config/logger";

configDotenv();

const PORT = ENV.PORT || 4000;

let server;

const connectToServer = async () => {
  try {
    await connectToDB();
    server = app.listen(PORT, () => {
      logger.info(`🚀 Server running on PORT: ${PORT}`);
    });
  } catch (error) {
    logger.error("❌ Server startup failed:", error);
    process.exit(1); // Crash fast (production safe)
  }
};

connectToServer();
