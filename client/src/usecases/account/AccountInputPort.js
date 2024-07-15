import { AccountEntity } from "../../entities/AccountEntity";

export class AccountInputPort {
  validatePreEncryptionInputForCreateAccount(unvalidatedUserInput) {
    const validAccountEntity = new AccountEntity(unvalidatedUserInput);

    const validationError =
      validAccountEntity.validateForCreationBeforeEncryption();
    if (validationError) {
      return { validationError };
    }

    return validAccountEntity;
  }

  validateEncryptedDataForCreateAccount(validAccountEntity) {
    const validEncryptedAccountEntity = new AccountEntity(validAccountEntity);

    const validationError =
      validEncryptedAccountEntity.validateForCreationAfterEncryption();
    if (validationError) {
      return { validationError };
    }

    return validEncryptedAccountEntity;
  }

  validatePreEncryptionInputForUpdateAccount(unvalidatedUserInput) {
    const validAccountEntity = new AccountEntity(unvalidatedUserInput);

    const validationError =
      validAccountEntity.validateForUpdateBeforeEncryption();
    if (validationError) {
      return { validationError };
    }

    return validAccountEntity;
  }

  validateEncryptedDataForUpdateAccount(validAccountEntity) {
    const validEncryptedAccountEntity = new AccountEntity(validAccountEntity);

    const validationError =
      validEncryptedAccountEntity.validateForUpdateAfterEncryption();
    if (validationError) {
      return { validationError };
    }

    return validEncryptedAccountEntity;
  }
}
