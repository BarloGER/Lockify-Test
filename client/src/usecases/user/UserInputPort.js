import { UserEntity } from "../../entities/UserEntity";

export class UserInputPort {
  validateRegistrationInput(userInput) {
    const user = new UserEntity(userInput);

    const validationError = user.validateForRegistration();
    if (validationError) {
      return { validationError };
    }

    return user;
  }

  validateLoginInput(userInput) {
    const credentials = new UserEntity(userInput);

    const validationError = credentials.validateForLogin();
    if (validationError) {
      return { validationError };
    }

    return credentials;
  }

  validateUpdateInput(userInput) {
    const user = new UserEntity(userInput);

    const validationError = user.validateForUpdate();
    if (validationError) {
      return { validationError };
    }

    return user;
  }

  // deleteUser(userInput) {
  //   const data = new UserEntity(userInput);

  //   const validationError = data.validateForDelete();
  //   if (validationError) {
  //     throw new ErrorResponse({ errorCode: `${validationError}` });
  //   }
  // }

  validateVerificationInput(userInput) {
    const verificationData = new UserEntity(userInput);

    const validationError = verificationData.validateForVerification();
    if (validationError) {
      return { validationError };
    }

    return verificationData;
  }

  validateRequestData(userInput) {
    const requestData = new UserEntity(userInput);

    const validationError = requestData.validateForRequest();
    if (validationError) {
      return { validationError };
    }

    return requestData;
  }
}
