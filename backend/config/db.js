import mongoose from "mongoose";
import { config } from "./env.js";

export async function connectDB() {
  if (!config.MONGODB_URI) {
    console.warn("[db] MONGODB_URI is not set — running without database. Enquiries will not be persisted.");
    return;
  }

  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log("✅  MongoDB connected");
  } catch (err) {
    console.error("[db] MongoDB connection failed:", err.message);
    process.exit(1);
  }
}
