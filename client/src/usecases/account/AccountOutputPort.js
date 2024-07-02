export class AccountOutputPort {
  constructor() {
    this.success = false;
    this.message = {};
    this.accounts = [];
  }

  prepareSingleAccountOutput(data) {
    this.success = data.success;
    this.message = data.message;
    this.account = data.account;
    return {
      success: this.success,
      message: this.message,
      account: this.account,
    };
  }

  prepareAccountsOutput(data) {
    this.success = data.success;
    this.message = data.message;
    this.accounts = data.accounts;
    return {
      success: this.success,
      message: this.message,
      accounts: this.accounts,
    };
  }

  prepareOutput(data) {
    this.success = data.success;
    this.message = data.message;
    return {
      success: this.success,
      message: this.message,
    };
  }
}
