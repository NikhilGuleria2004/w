const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class ContactModel {
  /**
   * 
   * @param {object} body
   * @returns {object} 
   */
  static fromBody(body) {
    return {
      name: (body.name || "").trim(),
      email: (body.email || "").trim().toLowerCase(),
      subject: (body.subject || "").trim(),
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

    if (!data.name || data.name.length < 2)
      errors.push("A valid name is required.");

    if (!data.email || !EMAIL_RE.test(data.email))
      errors.push("A valid email address is required.");

    if (!data.message || data.message.length < 10)
      errors.push("Please enter a message (minimum 10 characters).");

    return errors;
  }
}
