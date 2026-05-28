import dotenv from "dotenv";
dotenv.config();
const required = (key) => {
  const val = process.env[key];
  if (!val) {
    console.warn(`[config] Warning: ${key} is not set.`);
  }
  return val || "";
};

export const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT, 10) || 3001,

  
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",

  
  RESEND_API_KEY: process.env.RESEND_API_KEY || "",
  FROM_EMAIL: process.env.FROM_EMAIL || "onboarding@resend.dev",
  ADMISSIONS_EMAIL:
    process.env.ADMISSIONS_EMAIL || "admissions@schoolchandigarh.in",
};
