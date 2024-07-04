const { filterSensitiveData } = require("../../utils/filterSensitiveData");
//! Will only output if success is true for now
//! Check safeUserData currently not working
exports.ContactPresenter = class ContactPresenter {
  presentContacts(language, output) {
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
      contacts: output.contacts,
    };
  }

  presentSingleContact(language, output) {
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
      contact: output.contact,
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
