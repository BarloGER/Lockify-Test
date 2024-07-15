import { UserInputPort } from "./UserInputPort";
import { UserOutputPort } from "./UserOutputPort";

export class UserInteractor {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.userInputPort = new UserInputPort();
    this.userOutputPort = new UserOutputPort();
  }

  async checkAuthAndGetUser() {
    const authenticationResponse =
      await this.userRepository.checkAuthAndGetUserRequest();
    if (!authenticationResponse.success && authenticationResponse.user) {
      return this.userOutputPort.formatBlockedUser(authenticationResponse);
    } else if (!authenticationResponse.success) {
      return this.userOutputPort.formatFailedRequest(authenticationResponse);
    }

    return this.userOutputPort.formatUser(authenticationResponse);
  }

  async validateUserInputForRegisterUser(unvalidatedUserInput) {
    const validatedUserInput =
      this.userInputPort.validatePreEncryptionInputForRegisterUser(
        unvalidatedUserInput
      );
    if (validatedUserInput.validationError) {
      const validationError = validatedUserInput.validationError;
      return this.userOutputPort.formatValidationError(validationError);
    }

    return this.userOutputPort.formatValidUserInput(validatedUserInput);
  }

  async registerUser(encryptedUserData) {
    const validUserEntity =
      this.userInputPort.validateEncryptedDataForRegisterUser(
        encryptedUserData
      );
    if (validUserEntity.validationError) {
      const validationError = validUserEntity.validationError;
      return this.userOutputPort.formatValidationError(validationError);
    }

    const registrationResponse = await this.userRepository.registerUserRequest(
      validUserEntity
    );
    if (!registrationResponse.success) {
      return this.userOutputPort.formatFailedRequest(registrationResponse);
    }

    return this.userOutputPort.formatUser(registrationResponse);
  }

  async authenticateUser(unvalidatedUserInput) {
    const validUserEntity =
      this.userInputPort.validateInputForAuthenticateUser(unvalidatedUserInput);
    if (validUserEntity.validationError) {
      const validationError = validUserEntity.validationError;
      return this.userOutputPort.formatValidationError(validationError);
    }

    const authenticationResponse =
      await this.userRepository.authenticateUserRequest(validUserEntity);
    if (!authenticationResponse.success) {
      return this.userOutputPort.formatFailedRequest(authenticationResponse);
    }

    return this.userOutputPort.formatUser(authenticationResponse);
  }

  async updateUser(userInput) {
    // ! Add masterPassword
    const validUserEntity =
      this.userInputPort.validatePreEncryptionInputForUpdateUser(userInput);
    if (validUserEntity.validationError) {
      return { validationError: validUserEntity.validationError };
    }

    const updateResponse = await this.userRepository.updateUserRequest(
      validUserEntity
    );
    if (!updateResponse.success) {
      return this.userOutputPort.formatFailedRequest(updateResponse);
    }

    return this.userOutputPort.formatUser(updateResponse);
  }

  async deleteUser() {
    const deletionResponse = await this.userRepository.deleteUserRequest();
    if (!deletionResponse.success) {
      return this.userOutputPort.formatFailedRequest(deletionResponse);
    }

    return this.userOutputPort.formatSuccessfulResponse(deletionResponse);
  }

  async confirmEmailAddress(unvalidatedUserInput) {
    const validUserEntity =
      this.userInputPort.validateInputForVerification(unvalidatedUserInput);
    if (validUserEntity.validationError) {
      return {
        validationError: validUserEntity.validationError,
      };
    }

    const verificationResponse =
      await this.userRepository.confirmEmailAddressRequest(validUserEntity);
    if (!verificationResponse.success) {
      return this.userOutputPort.formatFailedRequest(verificationResponse);
    }

    return this.userOutputPort.formatSuccessfulResponse(verificationResponse);
  }

  async requestNewVerificationCode(unvalidatedUserInput) {
    const validUserEntity =
      this.userInputPort.validateInputForRequest(unvalidatedUserInput);
    if (validUserEntity.validationError) {
      return {
        validationError: validUserEntity.validationError,
      };
    }

    const newCodeResponse =
      await this.userRepository.newVerificationCodeRequest(validUserEntity);
    if (!newCodeResponse.success) {
      return this.userOutputPort.formatFailedRequest(newCodeResponse);
    }

    return this.userOutputPort.formatSuccessfulResponse(newCodeResponse);
  }

  async requestNewPassword(unvalidatedUserInput) {
    const validUserEntity =
      this.userInputPort.validateInputForRequest(unvalidatedUserInput);
    if (validUserEntity.validationError) {
      return { validationError: validUserEntity.validationError };
    }

    const newPasswordResponse = await this.userRepository.newPasswordRequest(
      validUserEntity
    );
    if (!newPasswordResponse.success) {
      return this.userOutputPort.formatFailedRequest(newPasswordResponse);
    }

    return this.userOutputPort.formatSuccessfulResponse(newPasswordResponse);
  }
}
