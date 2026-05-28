

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d\s\-()\\.]{7,20}$/;

export class EnquiryModel {
  /**
   * 
   * @param {object} body
   * @returns {object}    
   */
  static fromBody(body) {
    return {
      parentName: (body.parentName || body.name || "").trim(),
      childName: (body.childName || "").trim(),
      email: (body.email || "").trim().toLowerCase(),
      phone: (body.phone || "").trim(),
      grade: (body.grade || "").trim(),
      message: (body.message || "").trim(),
    };
  }

  /**
   * 
   * @param {object} data 
   * @returns {string[]}  
   */
  static validate(data) {
    const errors = [];

    if (!data.parentName || data.parentName.length < 2)
      errors.push("A valid parent / guardian name is required.");

    if (!data.email || !EMAIL_RE.test(data.email))
      errors.push("A valid email address is required.");

    if (!data.phone || !PHONE_RE.test(data.phone))
      errors.push("A valid phone number is required (7–20 digits).");

    if (!data.grade)
      errors.push("Please select a grade / year group.");

    return errors;
  }
}
