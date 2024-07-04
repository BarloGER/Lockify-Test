import { ContactEntity } from "../../entities/ContactEntity";

export class ContactInputPort {
  validateCreationInputBeforeEncryption(userInput) {
    const contact = new ContactEntity(userInput);

    const validationError = contact.validateForCreationBeforeEncryption();
    if (validationError) {
      return { validationError };
    }

    return contact;
  }

  validateCreationInputAfterEncryption(userInput) {
    const contact = new ContactEntity(userInput);

    const validationError = contact.validateForCreationAfterEncryption();
    if (validationError) {
      return { validationError };
    }

    return contact;
  }

  validateUpdatedInputBeforeEncryption(userInput) {
    const contact = new ContactEntity(userInput);

    const validationError = contact.validateForUpdateBeforeEncryption();
    if (validationError) {
      return { validationError };
    }

    return contact;
  }

  validateUpdatedInputAfterEncryption(userInput) {
    const contact = new ContactEntity(userInput);

    const validationError = contact.validateForUpdateAfterEncryption();
    if (validationError) {
      return { validationError };
    }

    return contact;
  }
}
