
import app from "./app.js";
import { config } from "./config/env.js";

app.listen(config.PORT, () => {
  console.log(`\n✅  Server running on http://localhost:${config.PORT}`);
  console.log(`   Environment  : ${config.NODE_ENV}`);
  console.log(`   Resend email : ${config.RESEND_API_KEY ? "configured" : "not set — emails will be skipped"}\n`);
});
