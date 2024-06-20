import { MailEntity } from "../../entities/MailEntity";

export class MailInputPort {
  validateSupportMailInput(userInput) {
    const mail = new MailEntity(userInput);

    const validationError = mail.validateForSupportMail();
    if (validationError) {
      return { validationError };
    }

    return mail;
  }
}
