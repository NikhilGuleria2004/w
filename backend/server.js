/**
 * School of Excellence Chandigarh — Backend Server
 * Place this file at: backend/server.js
 *
 * Install dependencies:
 *   npm install express cors dotenv resend express-rate-limit
 *
 * Create a .env file in /backend with:
 *   PORT=5000
 *   CLIENT_URL=http://localhost:5173
 *   RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
 *   FROM_EMAIL=onboarding@resend.dev
 *   ADMISSIONS_EMAIL=admissions@schoolchandigarh.in
 *
 * Get a free Resend API key at: https://resend.com
 * Free tier: 3,000 emails/month, no credit card required.
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const resend = new Resend(process.env.RESEND_API_KEY);

/* ── Middleware ─────────────────────────────────────────────── */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Rate limit: max 10 submissions per IP per 15 minutes
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: "Too many requests. Please try again later." },
});

/* ── Helper: Validate enquiry fields ───────────────────────── */

function validateEnquiry(body) {
  const { name, email, phone, grade } = body;
  const errors = [];

  if (!name || name.trim().length < 2)
    errors.push("A valid name is required.");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push("A valid email address is required.");
  if (!phone || !/^[+\d\s\-()]{7,20}$/.test(phone))
    errors.push("A valid phone number is required.");
  if (!grade)
    errors.push("Please select a grade.");

  return errors;
}

/* ── Routes ─────────────────────────────────────────────────── */

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

/**
 * POST /api/enquiry
 * Handles the admissions enquiry modal form.
 * Body: { name, email, phone, grade, message? }
 */
app.post("/api/enquiry", formLimiter, async (req, res) => {
  const { name, email, phone, grade, message } = req.body;

  const errors = validateEnquiry(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const FROM = process.env.FROM_EMAIL || "onboarding@resend.dev";
  const TO_ADMISSIONS = process.env.ADMISSIONS_EMAIL || "admissions@schoolchandigarh.in";

  if (!process.env.RESEND_API_KEY) {
    // No API key — just log and return success (useful during local dev)
    console.log("[Enquiry received — RESEND_API_KEY not set, skipping email]");
    console.log({ name, email, phone, grade, message });
    return res.status(200).json({
      success: true,
      message: "Thank you for your enquiry. We will be in touch soon.",
    });
  }

  try {
    await Promise.all([
      // Notification to admissions team
      resend.emails.send({
        from: `School of Excellence Website <${FROM}>`,
        to: TO_ADMISSIONS,
        subject: `New Admissions Enquiry — ${grade}`,
        html: `
          <h2 style="font-family:sans-serif;">New Admissions Enquiry</h2>
          <table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
            <tr><td><strong>Name</strong></td><td>${name}</td></tr>
            <tr><td><strong>Email</strong></td><td>${email}</td></tr>
            <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
            <tr><td><strong>Grade Applying For</strong></td><td>${grade}</td></tr>
            <tr><td><strong>Message</strong></td><td>${message || "—"}</td></tr>
          </table>
          <p style="color:#888;font-size:12px;font-family:sans-serif;">Submitted on ${timestamp} IST</p>
        `,
      }),

      // Confirmation to parent
      resend.emails.send({
        from: `School of Excellence Chandigarh <${FROM}>`,
        to: email,
        subject: "We've received your enquiry — School of Excellence Chandigarh",
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <p>Dear ${name},</p>
            <p>Thank you for your enquiry about School of Excellence Chandigarh. We have received your details and a member of our Admissions Team will be in touch with you shortly.</p>
            <p><strong>Your enquiry summary:</strong><br/>
              Grade: ${grade}<br/>
              Phone: ${phone}
            </p>
            <p>If you have any questions in the meantime, please contact us at:<br/>
              📧 admissions@schoolchandigarh.in<br/>
              📞 +91 80352 74300
            </p>
            <p>We look forward to welcoming you to our campus.</p>
            <p>Warm regards,<br/><strong>Admissions Team</strong><br/>School of Excellence Chandigarh</p>
          </div>
        `,
      }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Thank you for your enquiry. We will be in touch soon.",
    });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(500).json({
      success: false,
      message: "Your enquiry was received but we could not send a confirmation email. Please contact us directly.",
    });
  }
});

/**
 * POST /api/contact
 * General contact form.
 * Body: { name, email, subject, message }
 */
app.post("/api/contact", formLimiter, async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Name, email, and message are required." });
  }

  if (!process.env.RESEND_API_KEY) {
    console.log("[Contact received — RESEND_API_KEY not set, skipping email]");
    return res.status(200).json({ success: true, message: "Message sent successfully." });
  }

  try {
    await resend.emails.send({
      from: `School Website Contact <${process.env.FROM_EMAIL || "onboarding@resend.dev"}>`,
      to: process.env.ADMISSIONS_EMAIL || "admissions@schoolchandigarh.in",
      subject: subject ? `Contact Form: ${subject}` : `Contact Form Message from ${name}`,
      html: `
        <h2 style="font-family:sans-serif;">Contact Form Submission</h2>
        <p style="font-family:sans-serif;"><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p style="font-family:sans-serif;"><strong>Message:</strong><br/>${message}</p>
      `,
    });

    return res.status(200).json({ success: true, message: "Message sent successfully." });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(500).json({ success: false, message: "Failed to send message." });
  }
});

/* ── 404 fallback ───────────────────────────────────────────── */
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found." });
});

/* ── Start ──────────────────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`✅  School of Excellence backend running on http://localhost:${PORT}`);
  console.log(`   Resend configured: ${process.env.RESEND_API_KEY ? "yes" : "no — emails will be skipped"}`);
});