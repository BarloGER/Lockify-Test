import { BankEntity } from "../../entities/BankEntity";

export class BankInputPort {
  validatePreEncryptionInputForCreateBank(unvalidatedUserInput) {
    const validBankEntity = new BankEntity(unvalidatedUserInput);

    const validationError =
      validBankEntity.validateForCreationBeforeEncryption();
    if (validationError) {
      return { validationError };
    }

    return validBankEntity;
  }

  validateEncryptedDataForCreateBank(validBankEntity) {
    const validEncryptedBankEntity = new BankEntity(validBankEntity);

    const validationError =
      validEncryptedBankEntity.validateForCreationAfterEncryption();
    if (validationError) {
      return { validationError };
    }

    return validEncryptedBankEntity;
  }

  validatePreEncryptionInputForUpdateBank(unvalidatedUserInput) {
    const validBankEntity = new BankEntity(unvalidatedUserInput);

    const validationError = validBankEntity.validateForUpdateBeforeEncryption();
    if (validationError) {
      return { validationError };
    }

    return validBankEntity;
  }

  validateEncryptedDataForUpdateBank(validBankEntity) {
    const validEncryptedBankEntity = new BankEntity(validBankEntity);

    const validationError =
      validEncryptedBankEntity.validateForUpdateAfterEncryption();
    if (validationError) {
      return { validationError };
    }

    return validEncryptedBankEntity;
  }
}
