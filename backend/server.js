import app from "./app.js";
import { config } from "./config/env.js";
import { connectDB } from "./config/db.js";

async function start() {
  await connectDB();

  app.listen(config.PORT, () => {
    console.log(`\n✅  Server running on http://localhost:${config.PORT}`);
    console.log(`   Environment  : ${config.NODE_ENV}`);
    console.log(`   MongoDB      : ${config.MONGODB_URI ? "connected" : "not configured — add MONGODB_URI to .env"}`);
    console.log(`   Resend email : ${config.RESEND_API_KEY ? "configured" : "not set — emails will be skipped"}\n`);
  });
}

start();
