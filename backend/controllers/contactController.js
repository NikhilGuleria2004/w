import { ContactModel } from "../models/Contact.js";
import { sendContactEmail } from "../services/emailService.js";


export async function submitContact(req, res, next) {
  try {
    
    const data = ContactModel.fromBody(req.body);

  
    const errors = ContactModel.validate(data);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    
    const result = await sendContactEmail(data);

    if (!result.ok) {
      return res.status(500).json({
        success: false,
        message: "Failed to send your message. Please try again or email us directly.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Your message has been sent. We'll get back to you shortly.",
    });
  } catch (err) {
    next(err);
  }
}
