const { MailEntity } = require("../../entities/MailEntity");
const { ErrorResponse } = require("../../utils");

exports.MailInputPort = class MailInputPort {
  validateMailInput(userInput) {
    const mail = new MailEntity(userInput);

    const validationError = mail.validateForSendMail(mail);
    if (validationError) {
      throw new ErrorResponse({ errorCode: `${validationError}` });
    }

    return mail;
  }
};
