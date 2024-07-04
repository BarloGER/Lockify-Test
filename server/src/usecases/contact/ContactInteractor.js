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
        errorCode: "CONTACT_NOT_FOUND_002",
      });
    }

    const contactOutputData = {
      success: true,
      message: {
        EN: "Contacts successfully queried.",
        DE: "Kontakte erfolgreich abgefragt.",
      },
      contacts: foundContacts,
    };

    return this.contactOutputPort.prepareContactsOutput(contactOutputData);
  }

  async createContact(userId, userInput) {
    const contact = this.contactInputPort.createContact(userInput);
    contact.userId = userId;

    const savedContact = await this.contactRepository.createContact(contact);
    if (!savedContact) {
      throw new ErrorResponse({ errorCode: "DB_SERVICE_002" });
    }

    const contactOutputData = {
      success: true,
      message: {
        EN: "Contact successfuly created.",
        DE: "Kontakte erfolgreich erstellt.",
      },
      contact: savedContact,
    };

    return this.contactOutputPort.prepareSingleContactOutput(contactOutputData);
  }

  async updateContact(contactId, userInput) {
    const updateData = this.contactInputPort.editContact(userInput);

    const updatedContact = await this.contactRepository.updateContact(
      contactId,
      updateData
    );
    if (!updatedContact) {
      throw new ErrorResponse({
        errorCode: "DB_SERVICE_002",
      });
    }

    const contactOutputData = {
      success: true,
      message: {
        EN: "Contact updated successfully.",
        DE: "Kontakte erfolgreich aktualisiert",
      },
      contact: updateData,
    };

    return this.contactOutputPort.prepareSingleContactOutput(contactOutputData);
  }

  async deleteContact(contactId, userInput) {
    const data = this.contactInputPort.deleteContact(userInput);

    const foundContact = await this.contactRepository.findContactById(
      contactId
    );
    if (!foundContact) {
      throw new ErrorResponse({
        errorCode: "CONTACT_NOT_FOUND_002",
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

    const contactOutputData = {
      success: true,
      message: {
        EN: "Contact deleted successfully.",
        DE: "Kontakte erfolgreich gelöscht.",
      },
    };

    return this.contactOutputPort.output(contactOutputData);
  }
};
