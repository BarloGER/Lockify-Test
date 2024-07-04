const { filterSensitiveData } = require("../../utils/filterSensitiveData");
//! Will only output if success is true for now
//! Check safeUserData currently not working
exports.NotePresenter = class NotePresenter {
  presentNotes(language, output) {
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
      notes: output.notes,
    };
  }

  presentSingleNote(language, output) {
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
      note: output.note,
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
