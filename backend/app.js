import express from "express";
import cors from "cors";
import { config } from "./config/env.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import healthRoutes from "./routes/health.routes.js";
import enquiryRoutes from "./routes/enquiry.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import parentRoutes from "./routes/parent.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: config.CLIENT_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(requestLogger);

app.use("/api", healthRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/parent", parentRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
