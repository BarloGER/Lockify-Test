import { MailInputPort } from "./MailInputPort";
import { MailOutputPort } from "./MailOutputPort";

export class MailInteractor {
  constructor(mailRepository) {
    this.mailRepository = mailRepository;
    this.mailInputPort = new MailInputPort();
    this.mailOutputPort = new MailOutputPort();
  }

  async sendSupportMail(userInput) {
    const mail = this.mailInputPort.validateSupportMailInput(userInput);
    if (mail.validationError) {
      return { validationError: mail.validationError };
    }

    const sendMailResult = await this.mailRepository.sendSupportMail(mail);

    const mailOutputData = {
      message: sendMailResult.message,
    };

    return this.mailOutputPort.prepareMailOutput(mailOutputData);
  }
}
