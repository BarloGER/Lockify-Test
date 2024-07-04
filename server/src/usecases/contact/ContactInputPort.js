const { ContactEntity } = require("../../entities/ContactEntity");
const { ErrorResponse } = require("../../utils");

exports.ContactInputPort = class ContactInputPort {
  createContact(userInput) {
    const contact = new ContactEntity(userInput, { isNewContact: true });

    const validationError = contact.validateForCreation();
    if (validationError) {
      throw new ErrorResponse({ errorCode: `${validationError}` });
    }

    return contact;
  }

  editContact(userInput) {
    const updateData = new ContactEntity(userInput);

    const validationError = updateData.validateForUpdate();
    if (validationError) {
      throw new ErrorResponse({ errorCode: `${validationError}` });
    }

    return updateData;
  }

  deleteContact(userInput) {
    const data = new ContactEntity(userInput);

    const validationError = data.validateForDelete();
    if (validationError) {
      throw new ErrorResponse({ errorCode: `${validationError}` });
    }
  }
};
