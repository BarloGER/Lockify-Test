const { filterSensitiveData } = require("../../utils/filterSensitiveData");

exports.UserPresenter = class UserPresenter {
  present(language, output) {
    return {
      success: true,
      message: output.message[language],
    };
  }

  presentUser(language, result) {
    return {
      success: result.success,
      message: result.message[language],
      user: {
        userId: result.user.userId,
        isBlocked: result.user.isBlocked,
        isVerified: result.user.isVerified,
        username: result.user.username,
        email: result.user.email,
        isNewsletterAllowed: result.user.isNewsletterAllowed,
        encryptedSecret: result.user.encryptedSecret,
        secretEncryptionIv: result.user.secretEncryptionIv,
        secretEncryptionSalt: result.user.secretEncryptionSalt,
        passwordUpdatedAt: result.user.passwordUpdatedAt,
      },
    };
  }

  presentBlockedUser(language, result) {
    return {
      success: result.success,
      message: result.message[language],
      user: {
        isBlocked: result.user.isBlocked,
      },
    };
  }
};
