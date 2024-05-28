const { MailEntity } = require("../../entities/Mail");

exports.MailInputPort = class MailInputPort {
  createMail({ email, subject, message }) {
    const mailData = new MailEntity({
      email,
      subject,
      message,
    });

    const validationError = mailData.validateAll();
    if (validationError) {
      throw new ErrorResponse({ errorCode: `${validationError}` });
    }

    return mailData;
  }
};
