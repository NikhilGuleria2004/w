import { Router } from "express";
import { formLimiter } from "../middleware/rateLimiter.js";
import { submitEnquiry } from "../controllers/enquiryController.js";

const router = Router();

router.post("/", formLimiter, submitEnquiry);

export default router;
