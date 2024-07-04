const { filterSensitiveData } = require("../../utils/filterSensitiveData");
//! Will only output if success is true for now
//! Check safeUserData currently not working
exports.BankPresenter = class BankPresenter {
  presentBanks(language, output) {
    if (!output.success) {
      return { error: true, message: output.message };
    }

    // const safeUserData = filterSensitiveData(output.user, [
    //   "password",
    //   "verificationCode",
    //   "verificationAttempts",
    //   "lastVerificationAttempt",
    // ]);

    return {
      success: true,
      message: output.message[language],
      banks: output.banks,
    };
  }

  presentSingleBank(language, output) {
    if (!output.success) {
      return { error: true, message: output.message };
    }

    // const safeUserData = filterSensitiveData(output.user, [
    //   "password",
    //   "verificationCode",
    //   "verificationAttempts",
    //   "lastVerificationAttempt",
    // ]);

    return {
      success: true,
      message: output.message[language],
      bank: output.bank,
    };
  }

  present(language, output) {
    if (!output.success) {
      return { error: true, message: output.message };
    }
    return {
      success: true,
      message: output.message[language],
    };
  }
};
