const sessions = new Map();

function makeToken() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createSession(email) {
  const token = makeToken();
  sessions.set(token, { email, created: Date.now() });
  return token;
}

export function getSession(token) {
  if (!token) return null;
  return sessions.get(token) || null;
}

export function destroySession(token) {
  return sessions.delete(token);
}
