const { AccountEntity } = require("../../entities/AccountEntity");

exports.AccountInputPort = class AccountInputPort {
  createAccount(unvalidatedUserInput) {
    const validAccountEntity = new AccountEntity(unvalidatedUserInput);

    const validationError = validAccountEntity.validateForCreation();
    if (validationError) {
      return { validationError };
    }

    return validAccountEntity;
  }

  editAccount(unvalidatedUserInput) {
    const validAccountEntity = new AccountEntity(unvalidatedUserInput);

    const validationError = validAccountEntity.validateForUpdate();
    if (validationError) {
      return { validationError };
    }

    return validAccountEntity;
  }

  deleteAccount(unvalidatedUserInput) {
    const validAccountEntity = new AccountEntity(unvalidatedUserInput);

    const validationError = validAccountEntity.validateForDelete();
    if (validationError) {
      return { validationError };
    }
  }
};
