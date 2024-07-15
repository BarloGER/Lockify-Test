import { ContactEntity } from "../../entities/ContactEntity";

export class ContactInputPort {
  validatePreEncryptionInputForCreateContact(unvalidatedUserInput) {
    const validContactEntity = new ContactEntity(unvalidatedUserInput);

    const validationError =
      validContactEntity.validateForCreationBeforeEncryption();
    if (validationError) {
      return { validationError };
    }

    return validContactEntity;
  }

  validateEncryptedDataForCreateContact(validContactEntity) {
    const validEncryptedContactEntity = new ContactEntity(validContactEntity);

    const validationError =
      validEncryptedContactEntity.validateForCreationAfterEncryption();
    if (validationError) {
      return { validationError };
    }

    return validEncryptedContactEntity;
  }

  validatePreEncryptionInputForUpdateContact(unvalidatedUserInput) {
    const validContactEntity = new ContactEntity(unvalidatedUserInput);

    const validationError =
      validContactEntity.validateForUpdateBeforeEncryption();
    if (validationError) {
      return { validationError };
    }

    return validContactEntity;
  }

  validateEncryptedDataForUpdateContact(validContactEntity) {
    const validEncryptedContactEntity = new ContactEntity(validContactEntity);

    const validationError =
      validEncryptedContactEntity.validateForUpdateAfterEncryption();
    if (validationError) {
      return { validationError };
    }

    return validEncryptedContactEntity;
  }
}
