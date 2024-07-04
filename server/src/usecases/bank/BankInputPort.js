const { BankEntity } = require("../../entities/BankEntity");
const { ErrorResponse } = require("../../utils");

exports.BankInputPort = class BankInputPort {
  createBank(userInput) {
    const bank = new BankEntity(userInput, { isNewBank: true });

    const validationError = bank.validateForCreation();
    if (validationError) {
      throw new ErrorResponse({ errorCode: `${validationError}` });
    }

    return bank;
  }

  editBank(userInput) {
    const updateData = new BankEntity(userInput);

    const validationError = updateData.validateForUpdate();
    if (validationError) {
      throw new ErrorResponse({ errorCode: `${validationError}` });
    }

    return updateData;
  }

  deleteBank(userInput) {
    const data = new BankEntity(userInput);

    const validationError = data.validateForDelete();
    if (validationError) {
      throw new ErrorResponse({ errorCode: `${validationError}` });
    }
  }
};
