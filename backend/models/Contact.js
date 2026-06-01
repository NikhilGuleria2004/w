import mongoose from "mongoose";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true },
    email:   { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, trim: true, default: "" },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactSchema);

export class ContactModel {
  static fromBody(body) {
    return {
      name:    (body.name || "").trim(),
      email:   (body.email || "").trim().toLowerCase(),
      subject: (body.subject || "").trim(),
      message: (body.message || "").trim(),
    };
  }

  static validate(data) {
    const errors = [];
    if (!data.name || data.name.length < 2)
      errors.push("A valid name is required.");
    if (!data.email || !EMAIL_RE.test(data.email))
      errors.push("A valid email address is required.");
    if (!data.message || data.message.length < 10)
      errors.push("Please enter a message (minimum 10 characters).");
    return errors;
  }
}
