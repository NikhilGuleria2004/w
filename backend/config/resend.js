import { Resend } from "resend";
import { config } from "./env.js";

export const resend = config.RESEND_API_KEY
  ? new Resend(config.RESEND_API_KEY)
  : null;
