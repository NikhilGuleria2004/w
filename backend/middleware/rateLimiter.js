
import rateLimit from "express-rate-limit";

export const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10,                   
  standardHeaders: true,     
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP. Please try again in 15 minutes.",
  },
});
