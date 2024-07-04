exports.BankOutputPort = class BankOutputPort {
  constructor() {
    this.success = false;
    this.message = {};
    this.bank = {};
  }

  prepareSingleBankOutput(data) {
    this.success = data.success;
    this.message = data.message;
    this.bank = data.bank;
    return {
      success: this.success,
      message: this.message,
      bank: this.bank,
    };
  }

  prepareBanksOutput(data) {
    this.success = data.success;
    this.message = data.message;
    this.banks = data.banks;
    return {
      success: this.success,
      message: this.message,
      banks: this.banks,
    };
  }

  output(data) {
    this.success = data.success;
    this.message = data.message;
    return {
      success: this.success,
      message: this.message,
    };
  }
};
