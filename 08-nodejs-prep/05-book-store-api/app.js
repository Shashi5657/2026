import { configDotenv } from "dotenv";
import express from "express";
import { connectToDB } from "./database";

configDotenv();

const app = express();
const PORT = process.env.PORT || 4000;

//middlewares
app.use(express.json());

const startServer = async () => {
  try {
    await connectToDB();

    app.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
