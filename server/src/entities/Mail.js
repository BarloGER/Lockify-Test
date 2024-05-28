exports.MailEntity = class MailEntity {
  constructor({ email, subject, message }) {
    this.email = email;
    this.subject = subject;
    this.message = message;
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

  validateMessage() {
    if (!this.message) return "MAIL_VALIDATION_007";
    if (typeof this.message !== "string") return "MAIL_VALIDATION_008";
    return null;
  }

  validateAll() {
    return (
      this.validateEmail() || this.validateSubject() || this.validateMessage()
    );
  }
};
