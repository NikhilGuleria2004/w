import dotenv from "dotenv";
dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT, 10) || 3001,

  MONGODB_URI: process.env.MONGODB_URI || "",

  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",

  RESEND_API_KEY: process.env.RESEND_API_KEY || "",
  FROM_EMAIL: process.env.FROM_EMAIL || "onboarding@resend.dev",
  ADMISSIONS_EMAIL: process.env.ADMISSIONS_EMAIL || "admissions@schoolchandigarh.in",

  JWT_SECRET: process.env.JWT_SECRET || "",
};
