# School of Excellence Chandigarh — Backend

MVC-structured Express 5 backend for the school website.

## Project structure

```
backend/
├── server.js                   # Entry point — binds to port
├── app.js                      # Express app factory (middleware + routes)
├── .env.example                # Environment variable template
│
├── config/
│   ├── env.js                  # Centralised env config with defaults
│   └── resend.js               # Resend client singleton
│
├── controllers/
│   ├── healthController.js     # GET  /api/health
│   ├── enquiryController.js    # POST /api/enquiry
│   └── contactController.js    # POST /api/contact
│
├── models/
│   ├── Enquiry.js              # Enquiry shape + validation
│   └── Contact.js              # Contact shape + validation
│
├── routes/
│   ├── health.routes.js
│   ├── enquiry.routes.js
│   └── contact.routes.js
│
├── services/
│   └── emailService.js         # All Resend logic + HTML email templates
│
├── middleware/
│   ├── rateLimiter.js          # express-rate-limit config
│   ├── requestLogger.js        # Simple request log
│   ├── errorHandler.js         # Global error handler
│   └── notFound.js             # 404 handler
│
└── utils/
    ├── escapeHtml.js           # XSS-safe HTML escaping
    └── formatDate.js           # IST timestamp formatter
```

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Create your .env file
cp .env.example .env
# Edit .env — add your RESEND_API_KEY

# 3. Start the dev server
npm run dev

# 4. Start in production
npm start
```

## API endpoints

| Method | Path           | Body fields                                     | Description                     |
|--------|----------------|-------------------------------------------------|---------------------------------|
| GET    | /api/health    | —                                               | Liveness probe                  |
| POST   | /api/enquiry   | parentName, childName?, email, phone, grade, message? | Admissions enquiry form |
| POST   | /api/contact   | name, email, subject?, message                  | General contact form            |

All POST endpoints are rate-limited to **10 requests per IP per 15 minutes**.

## Environment variables

| Variable           | Required | Description                          |
|--------------------|----------|--------------------------------------|
| `PORT`             | No       | Server port (default `3001`)         |
| `NODE_ENV`         | No       | `development` or `production`        |
| `CLIENT_URL`       | No       | Frontend origin for CORS             |
| `RESEND_API_KEY`   | Yes*     | Resend API key — emails skipped if absent |
| `FROM_EMAIL`       | No       | Sender address (default Resend sandbox) |
| `ADMISSIONS_EMAIL` | No       | Recipient for notifications          |

*Without `RESEND_API_KEY` the server still accepts and logs submissions — useful for local development.

## Wiring to the frontend

In `frontend/src/pages/Enquire.jsx`, replace the `setTimeout` stub in `handleSubmit` with:

```js
const res = await fetch("http://localhost:3001/api/enquiry", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    parentName: formData.parentName,
    childName:  formData.childName,
    email:      formData.email,
    phone:      formData.phone,
    grade:      formData.yearGroup,
    message:    formData.message,
  }),
});
const json = await res.json();
if (!json.success) throw new Error(json.errors?.join(", ") || json.message);
setSubmitted(true);
```
