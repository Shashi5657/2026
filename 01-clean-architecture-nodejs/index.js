import { configDotenv } from "dotenv";

configDotenv();
import e from "express";
import { connectToDB } from "./src/frameworks/db";
import {authRoutes} from "./src/routes/auth.route.js"


const app = e();
app.use(e.json());

connectToDB();

app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
