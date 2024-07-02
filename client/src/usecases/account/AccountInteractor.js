import { AccountInputPort } from "./AccountInputPort";
import { AccountOutputPort } from "./AccountOutputPort";

export class AccountInteractor {
  constructor(accountRepository) {
    this.accountRepository = accountRepository;
    this.accountInputPort = new AccountInputPort();
    this.accountOutputPort = new AccountOutputPort();
  }

  async getAccounts() {
    const accountRequestResult = await this.accountRepository.getAccounts();

    const accountOutputData = {
      success: accountRequestResult.success,
      message: accountRequestResult.message,
      accounts: accountRequestResult.accounts,
      statusCode: accountRequestResult.statusCode,
      statusMessage: accountRequestResult.statusMessage,
      errorType: accountRequestResult.errorType,
      errorCode: accountRequestResult.errorCode,
    };

    return this.accountOutputPort.prepareAccountsOutput(accountOutputData);
  }

  async validateCreateAccount(userInput) {
    const account =
      this.accountInputPort.validateCreationInputBeforeEncryption(userInput);
    if (account.validationError) {
      return { validationError: account.validationError };
    }
  }

  async validateEditAccount(userInput) {
    const account =
      this.accountInputPort.validateUpdatedInputBeforeEncryption(userInput);
    if (account.validationError) {
      return { validationError: account.validationError };
    }
  }

  async createAccount(userInput) {
    const account =
      this.accountInputPort.validateCreationInputAfterEncryption(userInput);
    if (account.validationError) {
      return { validationError: account.validationError };
    }

    const registrationResult = await this.accountRepository.createAccount(
      account
    );

    const outputData = {
      success: registrationResult.success,
      message: registrationResult.message,
      account: registrationResult.account,
    };

    return this.accountOutputPort.prepareSingleAccountOutput(outputData);
  }

  async editAccount(accountId, userInput) {
    const account =
      this.accountInputPort.validateUpdatedInputAfterEncryption(userInput);
    if (account.validationError) {
      return { validationError: account.validationError };
    }

    const registrationResult = await this.accountRepository.updateAccount(
      accountId,
      account
    );

    console.log(registrationResult);

    const outputData = {
      success: registrationResult.success,
      message: registrationResult.message,
      account: registrationResult.account,
    };

    return this.accountOutputPort.prepareSingleAccountOutput(outputData);
  }

  async deleteAccount(accountId) {
    const deletionResult = await this.accountRepository.deleteAccount(
      accountId
    );

    const outputData = {
      success: deletionResult.success,
      message: deletionResult.message,
    };

    return this.accountOutputPort.prepareOutput(outputData);
  }
}
