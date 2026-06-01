import fs from "fs/promises";
import path from "path";
import { createSession, getSession } from "../services/sessionStore.js";

const DATA_FILE = path.resolve("./data/accounts.json");

async function readAccounts() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw || "{}");
  } catch (err) {
    console.warn("[parentController] Failed to read accounts.json", err.message);
    return {};
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    const accounts = await readAccounts();
    const acct = accounts[email.toLowerCase()];

    if (!acct || acct.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = createSession(email.toLowerCase());

    const safe = { ...acct };
    delete safe.password;

    return res.json({ success: true, token, account: safe });
  } catch (err) {
    console.error("[parentController] login error", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function getAccount(req, res) {
  try {
    const session = getSession(req.token);
    if (!session) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }

    const accounts = await readAccounts();
    const acct = accounts[session.email];
    if (!acct) {
      return res.status(404).json({ success: false, message: "Account not found" });
    }

    const safe = { ...acct };
    delete safe.password;
    return res.json({ success: true, account: safe });
  } catch (err) {
    console.error("[parentController] getAccount error", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
