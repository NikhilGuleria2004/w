import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d";

export function createSession(email) {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function getSession(token) {
  if (!token) return null;
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return { email: payload.email };
  } catch {
    return null;
  }
}

export function destroySession() {
  // JWT tokens are stateless — invalidation is handled client-side by discarding the token
}
