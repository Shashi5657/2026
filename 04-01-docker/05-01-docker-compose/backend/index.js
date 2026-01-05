import express from "express";
import mongoose from "mongoose";

const app = express();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("🚀 Docker Compose + MongoDB Working! changes reflected");
});

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("Backend running on 3000");
});
