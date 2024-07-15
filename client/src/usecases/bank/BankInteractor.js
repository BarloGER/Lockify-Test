import { BankInputPort } from "./BankInputPort";
import { BankOutputPort } from "./BankOutputPort";

export class BankInteractor {
  constructor(bankRepository) {
    this.bankRepository = bankRepository;
    this.bankInputPort = new BankInputPort();
    this.bankOutputPort = new BankOutputPort();
  }

  async getBanks() {
    const getBanksResponse = await this.bankRepository.getBanksRequest();
    if (!getBanksResponse.success) {
      return this.bankOutputPort.formatFailedRequest(getBanksResponse);
    }

    return this.bankOutputPort.formatMultipleBanks(getBanksResponse);
  }

  async validateUserInputForCreateBank(unvalidatedUserInput) {
    const validatedUserInput =
      this.bankInputPort.validatePreEncryptionInputForCreateBank(
        unvalidatedUserInput
      );
    if (validatedUserInput.validationError) {
      const validationError = validatedUserInput.validationError;
      return this.bankOutputPort.formatValidationError(validationError);
    }

    return this.bankOutputPort.formatValidBankInput(validatedUserInput);
  }

  async createBank(encryptedBankData) {
    const validBankEntity =
      this.bankInputPort.validateEncryptedDataForCreateBank(encryptedBankData);
    if (validBankEntity.validationError) {
      return { validationError: validBankEntity.validationError };
    }

    const creationResponse = await this.bankRepository.createBankRequest(
      validBankEntity
    );
    if (!creationResponse.success) {
      return this.bankOutputPort.formatFailedRequest(creationResponse);
    }

    return this.bankOutputPort.formatSingleBank(creationResponse);
  }

  async validateUserInputForUpdateBank(unvalidatedUserInput) {
    const validatedUserInput =
      this.bankInputPort.validatePreEncryptionInputForUpdateBank(
        unvalidatedUserInput
      );
    if (validatedUserInput.validationError) {
      return { validationError: validatedUserInput.validationError };
    }

    return this.bankOutputPort.formatValidBankInput(validatedUserInput);
  }

  async updateBank(bankId, encryptedBankData) {
    const validBankEntity =
      this.bankInputPort.validateEncryptedDataForUpdateBank(encryptedBankData);
    if (validBankEntity.validationError) {
      return { validationError: validBankEntity.validationError };
    }

    const updateResponse = await this.bankRepository.updateBankRequest(
      bankId,
      validBankEntity
    );
    if (!updateResponse.success) {
      return this.bankOutputPort.formatFailedRequest(updateResponse);
    }

    return this.bankOutputPort.formatSingleBank(updateResponse);
  }

  async deleteBank(bankId) {
    const deletionResponse = await this.bankRepository.deleteBankRequest(
      bankId
    );
    if (!deletionResponse.success) {
      return this.bankOutputPort.formatFailedRequest(deletionResponse);
    }

    return this.bankOutputPort.formatSuccessfulResponse(deletionResponse);
  }
}
