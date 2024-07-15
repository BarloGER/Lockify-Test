export class BankOutputPort {
  constructor() {
    this.success = false;
    this.message = {};
    this.banks = [];
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

  formatValidBankInput(validatedUserInput) {
    return {
      success: true,
      validBankEntity: {
        bankName: validatedUserInput.bankName,
        accountHolderFirstName: validatedUserInput.accountHolderFirstName,
        accountHolderLastName: validatedUserInput.accountHolderLastName,
        iban: validatedUserInput.iban,
        swiftBic: validatedUserInput.swiftBic,
        accountType: validatedUserInput.accountType,
        branchCode: validatedUserInput.branchCode,
        cardHolderFirstName: validatedUserInput.cardHolderFirstName,
        cardHolderLastName: validatedUserInput.cardHolderLastName,
        cardNumber: validatedUserInput.cardNumber,
        expiryDate: validatedUserInput.expiryDate,
        cardCvvCvc: validatedUserInput.cardCvvCvc,
        cardType: validatedUserInput.cardType,
      },
    };
  }

  formatSingleBank(successfulResponse) {
    return {
      success: true,
      message: successfulResponse.message,
      bank: successfulResponse.bank,
    };
  }

  formatMultipleBanks(successfulResponse) {
    return {
      success: true,
      message: successfulResponse.message,
      banks: successfulResponse.banks,
    };
  }

  formatSuccessfulResponse(successfulResponse) {
    return {
      success: true,
      message: successfulResponse.message,
    };
  }
}
