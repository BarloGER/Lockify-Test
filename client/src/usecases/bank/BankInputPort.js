import { BankEntity } from "../../entities/BankEntity";

export class BankInputPort {
  validateCreationInputBeforeEncryption(userInput) {
    const bank = new BankEntity(userInput);

    const validationError = bank.validateForCreationBeforeEncryption();
    if (validationError) {
      return { validationError };
    }

    return bank;
  }

  validateCreationInputAfterEncryption(userInput) {
    const bank = new BankEntity(userInput);

    const validationError = bank.validateForCreationAfterEncryption();
    if (validationError) {
      return { validationError };
    }

    return bank;
  }

  validateUpdatedInputBeforeEncryption(userInput) {
    const bank = new BankEntity(userInput);

    const validationError = bank.validateForUpdateBeforeEncryption();
    if (validationError) {
      return { validationError };
    }

    return bank;
  }

  validateUpdatedInputAfterEncryption(userInput) {
    const bank = new BankEntity(userInput);

    const validationError = bank.validateForUpdateAfterEncryption();
    if (validationError) {
      return { validationError };
    }

    return bank;
  }
}
