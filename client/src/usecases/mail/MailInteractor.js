import { MailInputPort } from "./MailInputPort";
import { MailOutputPort } from "./MailOutputPort";

export class MailInteractor {
  constructor(mailRepository) {
    this.mailRepository = mailRepository;
    this.mailInputPort = new MailInputPort();
    this.mailOutputPort = new MailOutputPort();
  }

  async sendSupportMail(unvalidatedMailInput) {
    const validMailEntity =
      this.mailInputPort.validateSupportMailInput(unvalidatedMailInput);
    if (validMailEntity.validationError) {
      return { validationError: validMailEntity.validationError };
    }

    const sendMailResponse =
      await this.mailRepository.sendSupportMail(validMailEntity);

    return this.mailOutputPort.formatSuccessfulResponse(sendMailResponse);
  }
}
