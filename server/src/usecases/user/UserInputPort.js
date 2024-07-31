const { UserEntity } = require("../../entities/UserEntity");

exports.UserInputPort = class UserInputPort {
  validateInputForCreateUser(unvalidatedUserInput) {
    const validUserEntity = new UserEntity(unvalidatedUserInput, {
      isNewUser: true,
    });

    const validationError = validUserEntity.validateForRegistration();
    if (validationError) {
      return { validationError };
    }

    return validUserEntity;
  }

  validateInputForAuthenticateUser(unvalidatedUserInput) {
    const credentials = new UserEntity(unvalidatedUserInput);

    const validationError = credentials.validateForAuthentication();
    if (validationError) {
      return { validationError };
    }

    return credentials;
  }

  validateInputForUpdateUser(unvalidatedUserInput) {
    const validUserEntity = new UserEntity(unvalidatedUserInput);

    const validationError = validUserEntity.validateForUpdate();
    if (validationError) {
      return { validationError };
    }

    return validUserEntity;
  }

  validateInputForDeleteUser(emptyUserInput) {
    const emptyEntity = new UserEntity(emptyUserInput);

    const validationError = emptyEntity.validateForDelete();
    if (validationError) {
      return { validationError };
    }

    return emptyEntity;
  }

  validateInputForVerification(unvalidatedUserInput) {
    const verificationData = new UserEntity({
      verificationCode: unvalidatedUserInput.verificationCode,
    });

    const validationError = verificationData.validateForVerification();
    if (validationError) {
      return { validationError };
    }

    return verificationData;
  }

  validateInputForUpdateData(unvalidatedUserInput) {
    const data = new UserEntity(unvalidatedUserInput);

    const validationError = data.validateForUpdateData();
    if (validationError) {
      return { validationError };
    }

    return data;
  }
};
