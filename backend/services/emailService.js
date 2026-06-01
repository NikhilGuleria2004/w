import { resend } from "../config/resend.js";
import { config } from "../config/env.js";
import { escapeHtml } from "../utils/escapeHtml.js";
import { formatTimestampIST } from "../utils/formatDate.js";
import { saveEnquiry } from "../utils/fileStore.js";

const FROM = config.FROM_EMAIL;
const TO_ADMISSIONS = config.ADMISSIONS_EMAIL;


export async function sendEnquiryEmails(enquiry) {
  if (!resend) {
    console.log("[emailService] RESEND_API_KEY not set — skipping email.");
    console.log("[emailService] Enquiry data:", enquiry);
    await saveEnquiry(enquiry);
    return { ok: true, skipped: true };
  }

  const { parentName, childName, email, phone, grade, message } = enquiry;
  const timestamp = formatTimestampIST();


  const s = {
    parentName: escapeHtml(parentName),
    childName: escapeHtml(childName),
    email: escapeHtml(email),
    phone: escapeHtml(phone),
    grade: escapeHtml(grade),
    message: escapeHtml(message || "—"),
  };

  try {
    await Promise.all([
      
      resend.emails.send({
        from: `School of Excellence Website <${FROM}>`,
        to: TO_ADMISSIONS,
        subject: `New Admissions Enquiry — ${s.grade}`,
        html: buildAdmissionsNotification(s, timestamp),
      }),

      
      resend.emails.send({ 
        from: `School of Excellence Chandigarh <${FROM}>`,
        to: email,
        subject: "We've received your enquiry — School of Excellence Chandigarh",
        html: buildParentConfirmation(s),
      }),
    ]);

    await saveEnquiry(enquiry);

    return { ok: true };
  } catch (error) {
    console.error("[emailService] sendEnquiryEmails failed:", error);
    return { ok: false, error };
  }
}

export async function sendContactEmail(contact) {
  if (!resend) {
    console.log("[emailService] RESEND_API_KEY not set — skipping email.");
    console.log("[emailService] Contact data:", contact);
    return { ok: true, skipped: true };
  }

  const { name, email, subject, message } = contact;

  const s = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    subject: escapeHtml(subject || ""),
    message: escapeHtml(message),
  };

  try {
    await resend.emails.send({
      from: `School Website Contact <${FROM}>`,
      to: TO_ADMISSIONS,
      subject: s.subject   
        ? `Contact Form: ${s.subject}`
        : `Contact Form message from ${s.name}`,
      html: buildContactNotification(s),
    });

    return { ok: true };
  } catch (error) {
    console.error("[emailService] sendContactEmail failed:", error);
    return { ok: false, error };
  }
}


function buildAdmissionsNotification(s, timestamp) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="margin:0;padding:0;background:#f4f4f5;font-family:sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 0;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.08);">
            <tr><td style="background:#1a1a2e;padding:24px 32px;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:600;">School of Excellence Chandigarh</h1>
              <p style="margin:4px 0 0;color:#a0a0c0;font-size:13px;">New Admissions Enquiry</p>
            </td></tr>
            <tr><td style="padding:32px;">
              <h2 style="margin:0 0 20px;font-size:16px;color:#1a1a2e;">Enquiry Details</h2>
              <table cellpadding="10" cellspacing="0" width="100%" style="border-collapse:collapse;font-size:14px;color:#333;">
                <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#666;width:40%;">Parent / Guardian</td><td><strong>${s.parentName}</strong></td></tr>
                <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#666;">Child's Name</td><td>${s.childName || "—"}</td></tr>
                <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#666;">Email</td><td><a href="mailto:${s.email}" style="color:#4f46e5;">${s.email}</a></td></tr>
                <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#666;">Phone</td><td>${s.phone}</td></tr>
                <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#666;">Grade Applying For</td><td><strong>${s.grade}</strong></td></tr>
                <tr><td style="color:#666;vertical-align:top;">Message</td><td>${s.message}</td></tr>
              </table>
              <p style="margin:24px 0 0;font-size:12px;color:#999;">Submitted on ${timestamp} IST</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body></html>
  `;
}

function buildParentConfirmation(s) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="margin:0;padding:0;background:#f4f4f5;font-family:sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 0;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.08);">
            <tr><td style="background:#1a1a2e;padding:24px 32px;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:600;">School of Excellence Chandigarh</h1>
            </td></tr>
            <tr><td style="padding:32px;color:#333;font-size:15px;line-height:1.7;">
              <p>Dear ${s.parentName},</p>
              <p>Thank you for reaching out to us. We have received your admissions enquiry and a member of our team will be in touch with you shortly.</p>
              <table cellpadding="10" cellspacing="0" width="100%" style="border-collapse:collapse;font-size:14px;background:#f8f8fc;border-radius:6px;margin:20px 0;">
                <tr><td style="color:#666;width:40%;">Grade</td><td><strong>${s.grade}</strong></td></tr>
                <tr><td style="color:#666;">Phone on file</td><td>${s.phone}</td></tr>
              </table>
              <p>If you have any immediate questions, please contact us:</p>
              <p style="margin:0;">
                📧 <a href="mailto:admissions@schoolchandigarh.in" style="color:#4f46e5;">admissions@schoolchandigarh.in</a><br>
                📞 +91 80352 74300
              </p>
              <p style="margin-top:24px;">We look forward to welcoming you to our campus.</p>
              <p>Warm regards,<br><strong>Admissions Team</strong><br>School of Excellence Chandigarh</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body></html>
  `;
}

function buildContactNotification(s) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="margin:0;padding:0;background:#f4f4f5;font-family:sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 0;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.08);">
            <tr><td style="background:#1a1a2e;padding:24px 32px;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:600;">Contact Form Submission</h1>
            </td></tr>
            <tr><td style="padding:32px;">
              <table cellpadding="10" cellspacing="0" width="100%" style="border-collapse:collapse;font-size:14px;color:#333;">
                <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#666;width:30%;">From</td><td><strong>${s.name}</strong> &lt;${s.email}&gt;</td></tr>
                ${s.subject ? `<tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#666;">Subject</td><td>${s.subject}</td></tr>` : ""}
                <tr><td style="color:#666;vertical-align:top;">Message</td><td style="white-space:pre-wrap;">${s.message}</td></tr>
              </table>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body></html>
  `;
}
