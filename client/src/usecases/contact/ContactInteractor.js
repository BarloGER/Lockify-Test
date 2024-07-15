import { ContactInputPort } from "./ContactInputPort";
import { ContactOutputPort } from "./ContactOutputPort";

export class ContactInteractor {
  constructor(contactRepository) {
    this.contactRepository = contactRepository;
    this.contactInputPort = new ContactInputPort();
    this.contactOutputPort = new ContactOutputPort();
  }

  async getContacts() {
    const getContactsResponse =
      await this.contactRepository.getContactsRequest();
    if (!getContactsResponse.success) {
      return this.contactOutputPort.formatFailedRequest(getContactsResponse);
    }

    return this.contactOutputPort.formatMultipleContacts(getContactsResponse);
  }

  async validateUserInputForCreateContact(unvalidatedUserInput) {
    const validatedUserInput =
      this.contactInputPort.validatePreEncryptionInputForCreateContact(
        unvalidatedUserInput
      );
    if (validatedUserInput.validationError) {
      const validationError = validatedUserInput.validationError;
      return this.contactOutputPort.formatValidationError(validationError);
    }

    return this.contactOutputPort.formatValidContactInput(validatedUserInput);
  }

  async createContact(encryptedContactData) {
    const validContactEntity =
      this.contactInputPort.validateEncryptedDataForCreateContact(
        encryptedContactData
      );
    if (validContactEntity.validationError) {
      return { validationError: validContactEntity.validationError };
    }

    const creationResponse = await this.contactRepository.createContactRequest(
      validContactEntity
    );
    if (!creationResponse.success) {
      return this.contactOutputPort.formatFailedRequest(creationResponse);
    }

    return this.contactOutputPort.formatSingleContact(creationResponse);
  }

  async validateUserInputForUpdateContact(unvalidatedUserInput) {
    const validatedUserInput =
      this.contactInputPort.validatePreEncryptionInputForUpdateContact(
        unvalidatedUserInput
      );
    if (validatedUserInput.validationError) {
      return { validationError: validatedUserInput.validationError };
    }

    return this.contactOutputPort.formatValidContactInput(validatedUserInput);
  }

  async updateContact(contactId, encryptedContactData) {
    const validContactEntity =
      this.contactInputPort.validateEncryptedDataForUpdateContact(
        encryptedContactData
      );
    if (validContactEntity.validationError) {
      return { validationError: validContactEntity.validationError };
    }

    const updateResponse = await this.contactRepository.updateContactRequest(
      contactId,
      validContactEntity
    );
    if (!updateResponse.success) {
      return this.contactOutputPort.formatFailedRequest(updateResponse);
    }

    return this.contactOutputPort.formatSingleContact(updateResponse);
  }

  async deleteContact(contactId) {
    const deletionResponse = await this.contactRepository.deleteContactRequest(
      contactId
    );
    if (!deletionResponse.success) {
      return this.contactOutputPort.formatFailedRequest(deletionResponse);
    }

    return this.contactOutputPort.formatSuccessfulResponse(deletionResponse);
  }
}
