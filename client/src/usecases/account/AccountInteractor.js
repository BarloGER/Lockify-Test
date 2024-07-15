import { AccountInputPort } from "./AccountInputPort";
import { AccountOutputPort } from "./AccountOutputPort";

export class AccountInteractor {
  constructor(accountRepository) {
    this.accountRepository = accountRepository;
    this.accountInputPort = new AccountInputPort();
    this.accountOutputPort = new AccountOutputPort();
  }

  async getAccounts() {
    const getAccountsResponse =
      await this.accountRepository.getAccountsRequest();
    if (!getAccountsResponse.success) {
      return this.accountOutputPort.formatFailedRequest(getAccountsResponse);
    }

    return this.accountOutputPort.formatMultipleAccounts(getAccountsResponse);
  }

  async validateUserInputForCreateAccount(unvalidatedUserInput) {
    const validatedUserInput =
      this.accountInputPort.validatePreEncryptionInputForCreateAccount(
        unvalidatedUserInput
      );
    if (validatedUserInput.validationError) {
      const validationError = validatedUserInput.validationError;
      return this.accountOutputPort.formatValidationError(validationError);
    }

    return this.accountOutputPort.formatValidAccountInput(validatedUserInput);
  }

  async createAccount(encryptedAccountData) {
    const validAccountEntity =
      this.accountInputPort.validateEncryptedDataForCreateAccount(
        encryptedAccountData
      );
    console.log(validAccountEntity);
    if (validAccountEntity.validationError) {
      return { validationError: validAccountEntity.validationError };
    }

    const creationResponse = await this.accountRepository.createAccountRequest(
      validAccountEntity
    );
    if (!creationResponse.success) {
      return this.accountOutputPort.formatFailedRequest(creationResponse);
    }

    return this.accountOutputPort.formatSingleAccount(creationResponse);
  }

  async validateUserInputForUpdateAccount(unvalidatedUserInput) {
    const validatedUserInput =
      this.accountInputPort.validatePreEncryptionInputForUpdateAccount(
        unvalidatedUserInput
      );
    if (validatedUserInput.validationError) {
      return { validationError: validatedUserInput.validationError };
    }

    return this.accountOutputPort.formatValidAccountInput(validatedUserInput);
  }

  async updateAccount(accountId, encryptedAccountData) {
    const validAccountEntity =
      this.accountInputPort.validateEncryptedDataForUpdateAccount(
        encryptedAccountData
      );
    if (validAccountEntity.validationError) {
      return { validationError: validAccountEntity.validationError };
    }

    const updateResponse = await this.accountRepository.updateAccountRequest(
      accountId,
      validAccountEntity
    );
    if (!updateResponse.success) {
      return this.accountOutputPort.formatFailedRequest(updateResponse);
    }

    return this.accountOutputPort.formatSingleAccount(updateResponse);
  }

  async deleteAccount(accountId) {
    const deletionResponse = await this.accountRepository.deleteAccountRequest(
      accountId
    );
    if (!deletionResponse.success) {
      return this.accountOutputPort.formatFailedRequest(deletionResponse);
    }

    return this.accountOutputPort.formatSuccessfulResponse(deletionResponse);
  }
}
