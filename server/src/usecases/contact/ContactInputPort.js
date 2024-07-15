const { ContactEntity } = require("../../entities/ContactEntity");

exports.ContactInputPort = class ContactInputPort {
  createContact(unvalidatedUserInput) {
    const validContactEntity = new ContactEntity(unvalidatedUserInput);

    const validationError = validContactEntity.validateForCreation();
    if (validationError) {
      return { validationError };
    }

    return validContactEntity;
  }

  editContact(unvalidatedUserInput) {
    const validContactEntity = new ContactEntity(unvalidatedUserInput);

    const validationError = validContactEntity.validateForUpdate();
    if (validationError) {
      return { validationError };
    }

    return validContactEntity;
  }

  deleteContact(unvalidatedUserInput) {
    const validContactEntity = new ContactEntity(unvalidatedUserInput);

    const validationError = validContactEntity.validateForDelete();
    if (validationError) {
      return { validationError };
    }
  }
};
