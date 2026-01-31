import mongoose from "mongoose";
import { ENV } from "./env.js";

if (!ENV.MONGO_URI) {
  throw new Error("Please define MONGO_URI in env variable");
}

let isConnected = false;

export const connectToDB = async () => {
  try {
    if (isConnected) {
      console.log("Using existing DB connection");
      return;
    }

    const db = await mongoose.connect(ENV.MONGO_URI, {
      dbName: "book-store",
      autoIndex: false,
      maxPoolSize: 10,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("MONGO DB Connected Successfully");
  } catch (error) {
    console.error("MONGODB Connection failed", error.message);
  }
};
