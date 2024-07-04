export class BankOutputPort {
  constructor() {
    this.success = false;
    this.message = {};
    this.banks = [];
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

  prepareOutput(data) {
    this.success = data.success;
    this.message = data.message;
    return {
      success: this.success,
      message: this.message,
    };
  }
}
