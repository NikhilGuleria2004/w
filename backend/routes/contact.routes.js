import { Router } from "express";
import { formLimiter } from "../middleware/rateLimiter.js";
import { submitContact } from "../controllers/contactController.js";        

const router = Router();

router.post("/", formLimiter, submitContact);

export default router;
