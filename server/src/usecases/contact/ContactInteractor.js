const { ContactInputPort } = require("./ContactInputPort");
const { ContactOutputPort } = require("./ContactOutputPort");
const { ErrorResponse } = require("../../utils/ErrorResponse");

exports.ContactInteractor = class ContactInteractor {
  constructor(contactRepository) {
    this.contactRepository = contactRepository;
    this.contactInputPort = new ContactInputPort();
    this.contactOutputPort = new ContactOutputPort();
  }

  async getContacts(userId) {
    const foundContacts = await this.contactRepository.findContactsByUserId(
      userId
    );
    if (!foundContacts) {
      throw new ErrorResponse({
        errorCode: "USER_NOT_FOUND_002",
      });
    }

    return this.contactOutputPort.formatFoundContacts(foundContacts);
  }

  async createContact(userId, unvalidatedUserInput) {
    const validContactEntity =
      this.contactInputPort.createContact(unvalidatedUserInput);
    if (validContactEntity.validationError) {
      const validationError = validContactEntity.validationError;
      throw new ErrorResponse({
        errorCode: `${validationError}`,
      });
    }

    validContactEntity.userId = userId;

    const createdContact = await this.contactRepository.createContact(
      validContactEntity
    );
    if (!createdContact) {
      throw new ErrorResponse({ errorCode: "DB_SERVICE_002" });
    }

    return this.contactOutputPort.formatCreatedContact(createdContact);
  }

  async updateContact(contactId, unvalidatedUserInput) {
    const validContactEntity =
      this.contactInputPort.editContact(unvalidatedUserInput);
    if (validContactEntity.validationError) {
      const validationError = validContactEntity.validationError;
      throw new ErrorResponse({
        errorCode: `${validationError}`,
      });
    }

    const updatedContact = await this.contactRepository.updateContact(
      contactId,
      validContactEntity
    );
    if (!updatedContact) {
      throw new ErrorResponse({
        errorCode: "DB_SERVICE_002",
      });
    }

    return this.contactOutputPort.formatUpdatedContact(updatedContact);
  }

  async deleteContact(contactId, unvalidatedUserInput) {
    const validContactEntity =
      this.contactInputPort.deleteContact(unvalidatedUserInput);
    if (validContactEntity.validationError) {
      const validationError = validContactEntity.validationError;
      throw new ErrorResponse({
        errorCode: `${validationError}`,
      });
    }

    const foundContact = await this.contactRepository.findContactById(
      contactId
    );
    if (!foundContact) {
      throw new ErrorResponse({
        errorCode: "ACCOUNT_NOT_FOUND_002",
      });
    }

    const deletedContact = await this.contactRepository.deleteContact(
      contactId,
      data
    );
    if (!deletedContact) {
      throw new ErrorResponse({
        errorCode: "DB_SERVICE_002",
      });
    }

    return this.contactOutputPort.formatDeletedContact();
  }
};
