const { BankInputPort } = require("./BankInputPort");
const { BankOutputPort } = require("./BankOutputPort");
const { ErrorResponse } = require("../../utils/ErrorResponse");

exports.BankInteractor = class BankInteractor {
  constructor(bankRepository) {
    this.bankRepository = bankRepository;
    this.bankInputPort = new BankInputPort();
    this.bankOutputPort = new BankOutputPort();
  }

  async getBanks(userId) {
    const foundBanks = await this.bankRepository.findBanksByUserId(userId);
    if (!foundBanks) {
      throw new ErrorResponse({
        errorCode: "USER_NOT_FOUND_002",
      });
    }

    return this.bankOutputPort.formatFoundBanks(foundBanks);
  }

  async createBank(userId, unvalidatedUserInput) {
    const validBankEntity = this.bankInputPort.createBank(unvalidatedUserInput);
    if (validBankEntity.validationError) {
      const validationError = validBankEntity.validationError;
      throw new ErrorResponse({
        errorCode: `${validationError}`,
      });
    }

    validBankEntity.userId = userId;

    const createdBank = await this.bankRepository.createBank(validBankEntity);
    if (!createdBank) {
      throw new ErrorResponse({ errorCode: "DB_SERVICE_002" });
    }

    return this.bankOutputPort.formatCreatedBank(createdBank);
  }

  async updateBank(bankId, unvalidatedUserInput) {
    const validBankEntity = this.bankInputPort.editBank(unvalidatedUserInput);
    if (validBankEntity.validationError) {
      const validationError = validBankEntity.validationError;
      throw new ErrorResponse({
        errorCode: `${validationError}`,
      });
    }

    const updatedBank = await this.bankRepository.updateBank(
      bankId,
      validBankEntity
    );
    if (!updatedBank) {
      throw new ErrorResponse({
        errorCode: "DB_SERVICE_002",
      });
    }

    return this.bankOutputPort.formatUpdatedBank(updatedBank);
  }

  async deleteBank(bankId, unvalidatedUserInput) {
    const validBankEntity = this.bankInputPort.deleteBank(unvalidatedUserInput);
    if (validBankEntity.validationError) {
      const validationError = validBankEntity.validationError;
      throw new ErrorResponse({
        errorCode: `${validationError}`,
      });
    }

    const foundBank = await this.bankRepository.findBankById(bankId);
    if (!foundBank) {
      throw new ErrorResponse({
        errorCode: "ACCOUNT_NOT_FOUND_002",
      });
    }

    const deletedBank = await this.bankRepository.deleteBank(bankId, data);
    if (!deletedBank) {
      throw new ErrorResponse({
        errorCode: "DB_SERVICE_002",
      });
    }

    return this.bankOutputPort.formatDeletedBank();
  }
};
