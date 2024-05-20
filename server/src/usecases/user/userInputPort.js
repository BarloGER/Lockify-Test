const { UserEntity } = require("../../entities/User");

exports.UserInputPort = class UserInputPort {
  createUser(user) {
    return new UserEntity({
      username: user.username,
      email: user.email,
      password: user.password,
      isVerified: false,
      isBlocked: false,
      isNewsletterAllowed: false,
      verificationCode: null,
      verificationAttempts: 0,
    });
  }
};
