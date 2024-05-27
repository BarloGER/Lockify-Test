const { UserEntity } = require("../../entities/User");
const { ErrorResponse, errorCodes } = require("../../utils");

exports.UserInputPort = class UserInputPort {
  createUser(userInput) {
    const user = new UserEntity(userInput, { isNewUser: true });

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

  editUser(userInput) {
    const updateData = new UserEntity({
      username: userInput.username,
      email: userInput.email,
      password: userInput.password,
    });

    const validationError = updateData.validateForUpdate();
    if (validationError) {
      throw new ErrorResponse({ errorCode: `${validationError}` });
    }

    return updateData;
  }

  deleteUser(userInput) {
    const data = new UserEntity(userInput);

    const validationError = data.validateForDelete();
    if (validationError) {
      throw new ErrorResponse({ errorCode: `${validationError}` });
    }
  }
};
