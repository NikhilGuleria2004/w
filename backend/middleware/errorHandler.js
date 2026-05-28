
import { config } from "../config/env.js";


export function errorHandler(err, _req, res, _next) {
  const status = err.status || err.statusCode || 500;

  console.error(`[errorHandler] ${status} —`, err.message);
  if (config.NODE_ENV !== "production") {
    console.error(err.stack);
  }

  res.status(status).json({
    success: false,
    message:
      config.NODE_ENV === "production"
        ? "An unexpected error occurred. Please try again later."
        : err.message,
    ...(config.NODE_ENV !== "production" && { stack: err.stack }),
  });
}
