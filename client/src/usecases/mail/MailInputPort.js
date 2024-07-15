import { MailEntity } from "../../entities/MailEntity";

export class MailInputPort {
  validateSupportMailInput(unvalidatedMailInput) {
    const validMailEntity = new MailEntity(unvalidatedMailInput);

    const validationError = validMailEntity.validateForSupportMail();
    if (validationError) {
      return { validationError };
    }

    return validMailEntity;
  }
}
