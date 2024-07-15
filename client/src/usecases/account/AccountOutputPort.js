export class AccountOutputPort {
  constructor() {
    this.success = false;
    this.message = {};
    this.accounts = [];
  }

  formatValidationError(validationError) {
    return {
      success: false,
      message: validationError,
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

  formatValidAccountInput(validatedUserInput) {
    return {
      success: true,
      validAccountEntity: {
        accountName: validatedUserInput.accountName,
        accountUrl: validatedUserInput.accountUrl,
        username: validatedUserInput.username,
        email: validatedUserInput.email,
        password: validatedUserInput.password,
        notes: validatedUserInput.notes,
      },
    };
  }

  formatSingleAccount(successfulResponse) {
    return {
      success: true,
      message: successfulResponse.message,
      account: successfulResponse.account,
    };
  }

  formatMultipleAccounts(successfulResponse) {
    return {
      success: true,
      message: successfulResponse.message,
      accounts: successfulResponse.accounts,
    };
  }

  formatSuccessfulResponse(successfulResponse) {
    return {
      success: true,
      message: successfulResponse.message,
    };
  }
}
