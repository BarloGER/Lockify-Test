export class UserOutputPort {
  constructor() {
    this.success = false;
    this.message = {};
    this.user = {};
  }

  formatValidationError(validationError) {
    return {
      success: false,
      message: validationError,
    };
  }

  formatBlockedUser(successfulResponse) {
    return {
      success: false,
      message: successfulResponse.message,
      user: successfulResponse.user,
    };
  }

  formatFailedRequest(requestError) {
    return {
      success: requestError.success,
      message: requestError.message,
      statusCode: requestError.statusCode,
      statusMessage: requestError.statusMessage,
      errorCode: requestError.errorCode,
      errorType: requestError.errorType,
    };
  }

  formatValidUserInput(validatedUserInput) {
    return {
      success: true,
      validUserEntity: {
        username: validatedUserInput.username,
        email: validatedUserInput.email,
        password: validatedUserInput.password,
        masterPassword: validatedUserInput.masterPassword,
        isNewsletterAllowed: validatedUserInput.isNewsletterAllowed,
      },
    };
  }

  formatUser(successfulResponse) {
    return {
      success: true,
      message: successfulResponse.message,
      user: successfulResponse.user,
    };
  }

  formatSuccessfulResponse(successfulResponse) {
    return {
      success: true,
      message: successfulResponse.message,
    };
  }
}
