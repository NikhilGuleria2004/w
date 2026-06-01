import mongoose from "mongoose";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d\s\-()\\.]{7,20}$/;

const enquirySchema = new mongoose.Schema(
  {
    parentName: { type: String, required: true, trim: true },
    childName:  { type: String, trim: true, default: "" },
    email:      { type: String, required: true, trim: true, lowercase: true },
    phone:      { type: String, required: true, trim: true },
    grade:      { type: String, required: true, trim: true },
    message:    { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

export const Enquiry = mongoose.model("Enquiry", enquirySchema);

export class EnquiryModel {
  static fromBody(body) {
    return {
      parentName: (body.parentName || body.name || "").trim(),
      childName:  (body.childName || "").trim(),
      email:      (body.email || "").trim().toLowerCase(),
      phone:      (body.phone || "").trim(),
      grade:      (body.grade || "").trim(),
      message:    (body.message || "").trim(),
    };
  }

  static validate(data) {
    const errors = [];
    if (!data.parentName || data.parentName.length < 2)
      errors.push("A valid parent / guardian name is required.");
    if (!data.email || !EMAIL_RE.test(data.email))
      errors.push("A valid email address is required.");
    if (!data.phone || !PHONE_RE.test(data.phone))
      errors.push("A valid phone number is required (7–20 digits).");
    if (!data.grade)
      errors.push("Please select a grade / year group.");
    return errors;
  }
}
