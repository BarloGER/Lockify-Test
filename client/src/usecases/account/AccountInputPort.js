import { AccountEntity } from "../../entities/AccountEntity";

export class AccountInputPort {
  validateCreationInputBeforeEncryption(userInput) {
    const account = new AccountEntity(userInput);

    const validationError = account.validateForCreationBeforeEncryption();
    if (validationError) {
      return { validationError };
    }

    return account;
  }

  validateCreationInputAfterEncryption(userInput) {
    const account = new AccountEntity(userInput);

    const validationError = account.validateForCreationAfterEncryption();
    if (validationError) {
      return { validationError };
    }

    return account;
  }

  validateUpdatedInputBeforeEncryption(userInput) {
    const account = new AccountEntity(userInput);

    const validationError = account.validateForUpdateBeforeEncryption();
    if (validationError) {
      return { validationError };
    }

    return account;
  }

  validateUpdatedInputAfterEncryption(userInput) {
    const account = new AccountEntity(userInput);

    const validationError = account.validateForUpdateAfterEncryption();
    if (validationError) {
      return { validationError };
    }

    return account;
  }
}
