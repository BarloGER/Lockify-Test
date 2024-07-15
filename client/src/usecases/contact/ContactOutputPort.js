export class ContactOutputPort {
  constructor() {
    this.success = false;
    this.message = {};
    this.contacts = [];
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

  formatValidContactInput(validatedUserInput) {
    return {
      success: true,
      validContactEntity: {
        companyName: validatedUserInput.companyName,
        firstName: validatedUserInput.firstName,
        lastName: validatedUserInput.lastName,
        streetAddress: validatedUserInput.streetAddress,
        additionalAddressInfo: validatedUserInput.additionalAddressInfo,
        city: validatedUserInput.city,
        stateProvinceRegion: validatedUserInput.stateProvinceRegion,
        postalCode: validatedUserInput.postalCode,
        country: validatedUserInput.country,
        phoneNumber: validatedUserInput.phoneNumber,
        email: validatedUserInput.email,
        birthDate: validatedUserInput.birthDate,
        notes: validatedUserInput.notes,
      },
    };
  }

  formatSingleContact(successfulResponse) {
    return {
      success: true,
      message: successfulResponse.message,
      contact: successfulResponse.contact,
    };
  }

  formatMultipleContacts(successfulResponse) {
    return {
      success: true,
      message: successfulResponse.message,
      contacts: successfulResponse.contacts,
    };
  }

  formatSuccessfulResponse(successfulResponse) {
    return {
      success: true,
      message: successfulResponse.message,
    };
  }
}
