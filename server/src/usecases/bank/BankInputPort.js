const { BankEntity } = require("../../entities/BankEntity");

exports.BankInputPort = class BankInputPort {
  createBank(unvalidatedUserInput) {
    const validBankEntity = new BankEntity(unvalidatedUserInput);

    const validationError = validBankEntity.validateForCreation();
    if (validationError) {
      return { validationError };
    }

    return validBankEntity;
  }

  editBank(unvalidatedUserInput) {
    const validBankEntity = new BankEntity(unvalidatedUserInput);

    const validationError = validBankEntity.validateForUpdate();
    if (validationError) {
      return { validationError };
    }

    return validBankEntity;
  }

  deleteBank(unvalidatedUserInput) {
    const validBankEntity = new BankEntity(unvalidatedUserInput);

    const validationError = validBankEntity.validateForDelete();
    if (validationError) {
      return { validationError };
    }
  }
};
