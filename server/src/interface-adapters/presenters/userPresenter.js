// Will only output if success is true for now
exports.UserPresenter = class UserPresenter {
  present(language, output) {
    if (!output.success) {
      return { error: true, message: output.message };
    }
    return {
      success: true,
      message: output.message[language],
      userId: output.userId,
    };
  }
};
