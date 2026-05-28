
import { EnquiryModel } from "../models/Enquiry.js";
import { sendEnquiryEmails } from "../services/emailService.js";


export async function submitEnquiry(req, res, next) {
  try {
    
    const data = EnquiryModel.fromBody(req.body);

    
    const errors = EnquiryModel.validate(data);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    
    const result = await sendEnquiryEmails(data);

    if (!result.ok) {
      
      return res.status(500).json({
        success: false,
        message:
          "Your enquiry was received but we could not send a confirmation email. Please contact us at admissions@schoolchandigarh.in.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Thank you for your enquiry. We will be in touch soon.",
    });
  } catch (err) {
    next(err); 
  }
}
