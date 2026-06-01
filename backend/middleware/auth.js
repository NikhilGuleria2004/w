import { getSession } from "../services/sessionStore.js";

export function requireAuth(req, res, next) {
  const auth = req.headers.authorization || "";
  const match = auth.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    return res.status(401).json({ success: false, message: "Missing authorization header" });
  }

  const token = match[1];
  const session = getSession(token);

  if (!session) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }

  req.token = token;
  req.session = session;
  next();
}
