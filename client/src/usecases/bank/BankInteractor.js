import { BankInputPort } from "./BankInputPort";
import { BankOutputPort } from "./BankOutputPort";

export class BankInteractor {
  constructor(bankRepository) {
    this.bankRepository = bankRepository;
    this.bankInputPort = new BankInputPort();
    this.bankOutputPort = new BankOutputPort();
  }

  async getBanks() {
    const bankRequestResult = await this.bankRepository.getBanks();

    const bankOutputData = {
      success: bankRequestResult.success,
      message: bankRequestResult.message,
      banks: bankRequestResult.banks,
      statusCode: bankRequestResult.statusCode,
      statusMessage: bankRequestResult.statusMessage,
      errorType: bankRequestResult.errorType,
      errorCode: bankRequestResult.errorCode,
    };

    return this.bankOutputPort.prepareBanksOutput(bankOutputData);
  }

  async validateCreateBank(userInput) {
    const bank =
      this.bankInputPort.validateCreationInputBeforeEncryption(userInput);
    if (bank.validationError) {
      return { validationError: bank.validationError };
    }
  }

  async validateEditBank(userInput) {
    const bank =
      this.bankInputPort.validateUpdatedInputBeforeEncryption(userInput);
    if (bank.validationError) {
      return { validationError: bank.validationError };
    }
  }

  async createBank(userInput) {
    const bank =
      this.bankInputPort.validateCreationInputAfterEncryption(userInput);
    if (bank.validationError) {
      return { validationError: bank.validationError };
    }

    const registrationResult = await this.bankRepository.createBank(bank);

    const outputData = {
      success: registrationResult.success,
      message: registrationResult.message,
      bank: registrationResult.bank,
    };

    return this.bankOutputPort.prepareSingleBankOutput(outputData);
  }

  async editBank(bankId, userInput) {
    const bank =
      this.bankInputPort.validateUpdatedInputAfterEncryption(userInput);
    if (bank.validationError) {
      return { validationError: bank.validationError };
    }

    const registrationResult = await this.bankRepository.updateBank(
      bankId,
      bank
    );

    const outputData = {
      success: registrationResult.success,
      message: registrationResult.message,
      bank: registrationResult.bank,
    };

    return this.bankOutputPort.prepareSingleBankOutput(outputData);
  }

  async deleteBank(bankId) {
    const deletionResult = await this.bankRepository.deleteBank(bankId);

    const outputData = {
      success: deletionResult.success,
      message: deletionResult.message,
    };

    return this.bankOutputPort.prepareOutput(outputData);
  }
}
