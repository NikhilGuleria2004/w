import { config } from "../config/env.js";

export function getHealth(_req, res) {
  res.status(200).json({
    status: "ok",
    environment: config.NODE_ENV,
    timestamp: new Date().toISOString(),
    email: config.RESEND_API_KEY ? "configured" : "not configured",
  });
}
