const { UserEntity } = require("../../entities/User");
const { ErrorResponse, errorCodes } = require("../../utils");

exports.UserInputPort = class UserInputPort {
  createUser(userInput) {
    const user = new UserEntity(userInput);
    const validationError = user.validateForRegistration();
    if (validationError) {
      throw new ErrorResponse({ errorCode: `${validationError}` });
    }

    return user;
  }

  authenticateUser(userInput) {
    const credentials = new UserEntity({
      email: userInput.email,
      password: userInput.password,
    });
    const validationError = credentials.validateForLogin();
    if (validationError) {
      throw new ErrorResponse({ errorCode: `${validationError}` });
    }

    return credentials;
  }
};
