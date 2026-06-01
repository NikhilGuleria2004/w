import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";
import { Account } from "../models/Account.js";
import { createSession, getSession } from "../services/sessionStore.js";

const JSON_FALLBACK = path.resolve("./data/accounts.json");

async function findAccount(email) {
  if (mongoose.connection.readyState === 1) {
    return Account.findOne({ email: email.toLowerCase() }).lean();
  }
  // Fallback: read from JSON when DB is not connected
  try {
    const raw = await fs.readFile(JSON_FALLBACK, "utf8");
    const accounts = JSON.parse(raw || "{}");
    const acct = accounts[email.toLowerCase()];
    return acct ? { ...acct, email: email.toLowerCase() } : null;
  } catch {
    return null;
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    const acct = await findAccount(email);
    if (!acct || acct.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = createSession(email.toLowerCase());

    const { password: _pw, ...safe } = acct;

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

    const acct = await findAccount(session.email);
    if (!acct) {
      return res.status(404).json({ success: false, message: "Account not found" });
    }

    const { password: _pw, ...safe } = acct;
    return res.json({ success: true, account: safe });
  } catch (err) {
    console.error("[parentController] getAccount error", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
