const { filterSensitiveData } = require("../../utils/filterSensitiveData");

exports.UserPresenter = class UserPresenter {
  present(language, output) {
    return {
      success: true,
      message: output.message[language],
    };
  }

  presentUser(language, output) {
    const safeUserData = filterSensitiveData(output.user.dataValues, [
      "createdAt",
    ]);

    return {
      success: true,
      message: output.message[language],
      user: safeUserData,
    };
  }

  presentBlockedUser(language, output) {
    return {
      success: output.success,
      message: output.message[language],
      user: output.user,
    };
  }
};
