import mongoose from "mongoose";

if (!process.env.MONGO_URI) {
  throw new Error("Please define MONGO_URI in env variable");
}
let isConnected = false;

export const connectToDB = async () => {
  try {
    if (isConnected) {
      console.log("Using existing database connection");
      return;
    }
    const db = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "book-store",
      autoIndex: false,
      maxPoolSize: 10,
    });

    isConnected = db.connections[0].readyState === 1;

    console.log("MONGO DB connected successfully");
  } catch (error) {
    console.error("Mongo DB Connection failed:", error.message);
    process.exit(1);
  }
};
