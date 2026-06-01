import { getSession } from "../services/sessionStore.js";

export function requireAuth(req, res, next) {
  const auth = req.headers.authorization || "";
  const m = auth.match(/^Bearer\s+(.+)$/i);
  if (!m) return res.status(401).json({ success: false, message: "Missing authorization" });
  const token = m[1];
  const session = getSession(token);
  if (!session) return res.status(401).json({ success: false, message: "Invalid token" });
  req.token = token;
  req.session = session;
  next();
}
