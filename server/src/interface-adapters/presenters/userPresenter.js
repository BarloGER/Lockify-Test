const { filterSensitiveData } = require("../../utils/filterSensitiveData");
//! Will only output if success is true for now
//! Check safeUserData
exports.UserPresenter = class UserPresenter {
  presentUser(language, output) {
    if (!output.success) {
      return { error: true, message: output.message };
    }

    const safeUserData = filterSensitiveData(output.user, [
      "password",
      "verificationCode",
      "verificationAttempts",
      "lastVerificationAttempt",
    ]);

    return {
      success: true,
      message: output.message[language],
      user: safeUserData,
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
