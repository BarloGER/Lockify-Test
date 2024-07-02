const { AccountEntity } = require("../../entities/AccountEntity");
const { ErrorResponse } = require("../../utils");

exports.AccountInputPort = class AccountInputPort {
  createAccount(userInput) {
    const account = new AccountEntity(userInput, { isNewAccount: true });

    const validationError = account.validateForCreation();
    if (validationError) {
      throw new ErrorResponse({ errorCode: `${validationError}` });
    }

    return account;
  }

  editAccount(userInput) {
    const updateData = new AccountEntity(userInput);

    const validationError = updateData.validateForUpdate();
    if (validationError) {
      throw new ErrorResponse({ errorCode: `${validationError}` });
    }

    return updateData;
  }

  deleteAccount(userInput) {
    const data = new AccountEntity(userInput);

    const validationError = data.validateForDelete();
    if (validationError) {
      throw new ErrorResponse({ errorCode: `${validationError}` });
    }
  }
};
