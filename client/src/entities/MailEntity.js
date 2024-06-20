export class MailEntity {
  constructor(userInput) {
    // Assign all transferred values
    Object.entries(userInput).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  validateValidFields(validFields) {
    const fields = Object.keys(this);
    const specifiedFields = fields.filter((field) => this[field] !== undefined);
    if (specifiedFields.length === 0) {
      return "USER_VALIDATION_001";
    }

    const extraFields = fields.filter((field) => !validFields.includes(field));
    if (extraFields.length > 0) {
      return "USER_VALIDATION_002";
    }

    return null;
  }

  validateForSupportMail() {
    const validFields = ["email", "subject", "html"];

    const result = this.validateValidFields(validFields);
    if (result) return result;

    return (
      this.validateEmail(true) ||
      this.validateSubject(true) ||
      this.validateHtml(true)
    );
  }

  validateEmail() {
    if (!this.email) return "MAIL_VALIDATION_001";
    if (typeof this.email !== "string") return "MAIL_VALIDATION_002";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email))
      return "MAIL_VALIDATION_003";
    return null;
  }

  validateSubject() {
    if (!this.subject) return "MAIL_VALIDATION_004";
    if (typeof this.subject !== "string") return "MAIL_VALIDATION_005";
    if (this.subject.length < 5 || this.subject.length > 78)
      return "MAIL_VALIDATION_006";
    return null;
  }

  validateHtml() {
    if (!this.html) return "MAIL_VALIDATION_007";
    if (typeof this.html !== "string") return "MAIL_VALIDATION_008";
    return null;
  }
}
