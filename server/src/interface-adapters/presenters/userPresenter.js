exports.UserPresenter = class UserPresenter {
  present(output) {
    if (!output.success) {
      return { error: true, message: output.message };
    }
    return {
      success: true,
      message: "Registration successful.",
      userId: output.userId,
    };
  }
};
