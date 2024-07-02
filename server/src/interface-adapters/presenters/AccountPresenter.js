const { filterSensitiveData } = require("../../utils/filterSensitiveData");
//! Will only output if success is true for now
//! Check safeUserData currently not working
exports.AccountPresenter = class AccountPresenter {
  presentAccounts(language, output) {
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
      accounts: output.accounts,
    };
  }

  presentSingleAccount(language, output) {
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
      account: output.account,
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
