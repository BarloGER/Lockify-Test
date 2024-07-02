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
    const foundAccounts = await this.accountRepository.findAccountsByUserId(
      userId
    );
    if (!foundAccounts) {
      throw new ErrorResponse({
        errorCode: "USER_NOT_FOUND_002",
      });
    }

    const accountOutputData = {
      success: true,
      message: {
        EN: "Accounts successfully queried.",
        DE: "Accounts erfolgreich abgefragt.",
      },
      accounts: foundAccounts,
    };

    return this.accountOutputPort.prepareAccountsOutput(accountOutputData);
  }

  async createAccount(userId, userInput) {
    const account = this.accountInputPort.createAccount(userInput);
    account.userId = userId;

    const savedAccount = await this.accountRepository.createAccount(account);
    if (!savedAccount) {
      throw new ErrorResponse({ errorCode: "DB_SERVICE_002" });
    }

    const accountOutputData = {
      success: true,
      message: {
        EN: "Account successfuly created.",
        DE: "Account erfolgreich erstellt.",
      },
      account: savedAccount,
    };

    return this.accountOutputPort.prepareSingleAccountOutput(accountOutputData);
  }

  async updateAccount(accountId, userInput) {
    const updateData = this.accountInputPort.editAccount(userInput);

    const updatedAccount = await this.accountRepository.updateAccount(
      accountId,
      updateData
    );
    if (!updatedAccount) {
      throw new ErrorResponse({
        errorCode: "DB_SERVICE_002",
      });
    }

    const accountOutputData = {
      success: true,
      message: {
        EN: "Account updated successfully.",
        DE: "Account erfolgreich aktualisiert",
      },
      account: updateData,
    };

    return this.accountOutputPort.prepareSingleAccountOutput(accountOutputData);
  }

  async deleteAccount(accountId, userInput) {
    const data = this.accountInputPort.deleteAccount(userInput);

    const foundAccount = await this.accountRepository.findAccountById(
      accountId
    );
    if (!foundAccount) {
      throw new ErrorResponse({
        errorCode: "ACCOUNT_NOT_FOUND_002",
      });
    }

    const deletedAccount = await this.accountRepository.deleteAccount(
      accountId,
      data
    );
    if (!deletedAccount) {
      throw new ErrorResponse({
        errorCode: "DB_SERVICE_002",
      });
    }

    const accountOutputData = {
      success: true,
      message: {
        EN: "Account deleted successfully.",
        DE: "Account erfolgreich gelöscht.",
      },
    };

    return this.accountOutputPort.output(accountOutputData);
  }
};
