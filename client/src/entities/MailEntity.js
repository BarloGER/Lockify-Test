export class MailEntity {
  constructor(userInput) {
    const allowedFields = ["email", "subject", "html"];

    Object.entries(userInput).forEach(([key, value]) => {
      if (allowedFields.includes(key)) {
        this[key] = value;
      }
    });
  }

  validateValidFields(validFields) {
    const fields = Object.keys(this);
    const specifiedFields = fields.filter(
      (field) => this[field] !== undefined && this[field] !== ""
    );
    if (specifiedFields.length === 0) {
      return "MAIL_VALIDATION_001";
    }

    const extraFields = fields.filter((field) => !validFields.includes(field));
    if (extraFields.length > 0) {
      return "MAIL_VALIDATION_002";
    }

    return null;
  }

  validateForSupportMail() {
    const validFields = ["email", "subject", "html"];

    const validationErrors = this.validateValidFields(validFields);
    if (validationErrors) return validationErrors;

    return (
      this.validateEmail(true) ||
      this.validateSubject(true) ||
      this.validateHtml(true)
    );
  }

  validateEmail(isRequired) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (isRequired && !this.email) return "MAIL_VALIDATION_003";
    if (this.email && typeof this.email !== "string")
      return "MAIL_VALIDATION_004";
    if (this.email && !regex.test(this.email)) return "MAIL_VALIDATION_005";
    if (this.email && (this.email.length < 6 || this.email.length > 254))
      return "MAIL_VALIDATION_006";

    return null;
  }

  validateSubject(isRequired) {
    if (isRequired && !this.subject) return "MAIL_VALIDATION_007";
    if (this.subject && typeof this.subject !== "string")
      return "MAIL_VALIDATION_008";
    if ((this.subject && this.subject.length < 5) || this.subject.length > 78)
      return "MAIL_VALIDATION_009";
    return null;
  }

  validateHtml() {
    if (!this.html) return "MAIL_VALIDATION_010";
    if (typeof this.html !== "string") return "MAIL_VALIDATION_011";
    if ((this.html && this.html.length < 1) || this.html.length > 600)
      return "MAIL_VALIDATION_012";
    return null;
  }
}
