import { ContactInputPort } from "./ContactInputPort";
import { ContactOutputPort } from "./ContactOutputPort";

export class ContactInteractor {
  constructor(contactRepository) {
    this.contactRepository = contactRepository;
    this.contactInputPort = new ContactInputPort();
    this.contactOutputPort = new ContactOutputPort();
  }

  async getContacts() {
    const contactRequestResult = await this.contactRepository.getContacts();

    const contactOutputData = {
      success: contactRequestResult.success,
      message: contactRequestResult.message,
      contacts: contactRequestResult.contacts,
      statusCode: contactRequestResult.statusCode,
      statusMessage: contactRequestResult.statusMessage,
      errorType: contactRequestResult.errorType,
      errorCode: contactRequestResult.errorCode,
    };

    return this.contactOutputPort.prepareContactsOutput(contactOutputData);
  }

  async validateCreateContact(userInput) {
    const contact =
      this.contactInputPort.validateCreationInputBeforeEncryption(userInput);
    if (contact.validationError) {
      return { validationError: contact.validationError };
    }
  }

  async validateEditContact(userInput) {
    const contact =
      this.contactInputPort.validateUpdatedInputBeforeEncryption(userInput);
    if (contact.validationError) {
      return { validationError: contact.validationError };
    }
  }

  async createContact(userInput) {
    const contact =
      this.contactInputPort.validateCreationInputAfterEncryption(userInput);
    if (contact.validationError) {
      return { validationError: contact.validationError };
    }

    const registrationResult = await this.contactRepository.createContact(
      contact
    );

    const outputData = {
      success: registrationResult.success,
      message: registrationResult.message,
      contact: registrationResult.contact,
    };

    return this.contactOutputPort.prepareSingleContactOutput(outputData);
  }

  async editContact(contactId, userInput) {
    const contact =
      this.contactInputPort.validateUpdatedInputAfterEncryption(userInput);
    if (contact.validationError) {
      return { validationError: contact.validationError };
    }

    const registrationResult = await this.contactRepository.updateContact(
      contactId,
      contact
    );

    const outputData = {
      success: registrationResult.success,
      message: registrationResult.message,
      contact: registrationResult.contact,
    };

    return this.contactOutputPort.prepareSingleContactOutput(outputData);
  }

  async deleteContact(contactId) {
    const deletionResult = await this.contactRepository.deleteContact(
      contactId
    );

    const outputData = {
      success: deletionResult.success,
      message: deletionResult.message,
    };

    return this.contactOutputPort.prepareOutput(outputData);
  }
}
