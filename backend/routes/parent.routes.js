import express from "express";
import { login, getAccount } from "../controllers/parentController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.get("/account", requireAuth, getAccount);

export default router;
