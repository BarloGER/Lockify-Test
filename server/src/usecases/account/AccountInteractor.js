const { AccountInputPort } = require("./AccountInputPort");
const { AccountOutputPort } = require("./AccountOutputPort");
const { ErrorResponse } = require("../../utils/ErrorResponse");

exports.AccountInteractor = class AccountInteractor {
  constructor(accountRepository) {
    this.accountRepository = accountRepository;
    this.accountInputPort = new AccountInputPort();
    this.accountOutputPort = new AccountOutputPort();
  }

  async getAccounts(userId) {
    const foundAccounts =
      await this.accountRepository.findAccountsByUserId(userId);
    if (!foundAccounts) {
      throw new ErrorResponse({
        errorCode: "USER_NOT_FOUND_002",
      });
    }

    return this.accountOutputPort.formatFoundAccounts(foundAccounts);
  }

  async createAccount(userId, unvalidatedUserInput) {
    const validAccountEntity =
      this.accountInputPort.createAccount(unvalidatedUserInput);
    if (validAccountEntity.validationError) {
      const validationError = validAccountEntity.validationError;
      throw new ErrorResponse({
        errorCode: `${validationError}`,
      });
    }

    validAccountEntity.userId = userId;

    const createdAccount =
      await this.accountRepository.createAccount(validAccountEntity);
    if (!createdAccount) {
      throw new ErrorResponse({ errorCode: "DB_SERVICE_002" });
    }

    return this.accountOutputPort.formatCreatedAccount(createdAccount);
  }

  async updateAccount(accountId, unvalidatedUserInput) {
    const validAccountEntity =
      this.accountInputPort.editAccount(unvalidatedUserInput);
    if (validAccountEntity.validationError) {
      const validationError = validAccountEntity.validationError;
      throw new ErrorResponse({
        errorCode: `${validationError}`,
      });
    }

    const updatedAccount = await this.accountRepository.updateAccount(
      accountId,
      validAccountEntity,
    );
    if (!updatedAccount) {
      throw new ErrorResponse({
        errorCode: "DB_SERVICE_002",
      });
    }

    return this.accountOutputPort.formatUpdatedAccount(updatedAccount);
  }

  async deleteAccount(accountId, unvalidatedUserInput) {
    const validAccountEntity =
      this.accountInputPort.deleteAccount(unvalidatedUserInput);
    if (validAccountEntity.validationError) {
      const validationError = validAccountEntity.validationError;
      throw new ErrorResponse({
        errorCode: `${validationError}`,
      });
    }

    const foundAccount =
      await this.accountRepository.findAccountById(accountId);
    if (!foundAccount) {
      throw new ErrorResponse({
        errorCode: "ACCOUNT_NOT_FOUND_002",
      });
    }

    const deletedAccount =
      await this.accountRepository.deleteAccount(accountId);
    if (!deletedAccount) {
      throw new ErrorResponse({
        errorCode: "DB_SERVICE_002",
      });
    }

    return this.accountOutputPort.formatDeletedAccount();
  }
};
