import mongoose from "mongoose";
import { Enquiry } from "../models/Enquiry.js";

/**
 * Saves a single enquiry to MongoDB.
 * Falls back to a console log if the DB is not connected.
 */
export async function saveEnquiry(enquiry) {
  if (mongoose.connection.readyState !== 1) {
    console.log("[fileStore] DB not connected — enquiry not persisted:", enquiry);
    return { ok: true, skipped: true };
  }

  try {
    const record = await Enquiry.create(enquiry);
    console.log(`[fileStore] Enquiry saved to MongoDB: ${record._id}`);
    return { ok: true, record };
  } catch (error) {
    console.error("[fileStore] Failed to save enquiry:", error);
    return { ok: false, error };
  }
}
