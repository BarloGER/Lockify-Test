import { UserInputPort } from "./UserInputPort";
import { UserOutputPort } from "./UserOutputPort";

export class UserInteractor {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.userInputPort = new UserInputPort();
    this.userOutputPort = new UserOutputPort();
  }

  async checkAuthAndGetUser() {
    const authenticationResult =
      await this.userRepository.checkAuthAndGetUser();

    const authOutputData = {
      success: authenticationResult.success,
      message: authenticationResult.message,
      user: authenticationResult.user,
      statusCode: authenticationResult.statusCode,
      statusMessage: authenticationResult.statusMessage,
      errorType: authenticationResult.errorType,
      errorCode: authenticationResult.errorCode,
    };

    return this.userOutputPort.prepareAuthOutput(authOutputData);
  }

  async registerUser(userInput) {
    const user = this.userInputPort.validateRegistrationInput(userInput);
    if (user.validationError) {
      return { validationError: user.validationError };
    }

    const registrationResult = await this.userRepository.registerUser(user);

    const userOutputData = {
      success: registrationResult.success,
      message: registrationResult.message,
      user: registrationResult.user,
    };

    return this.userOutputPort.prepareUserOutput(userOutputData);
  }

  async loginUser(userInput) {
    const credentials = this.userInputPort.validateLoginInput(userInput);
    if (credentials.validationError) {
      return { validationError: credentials.validationError };
    }

    const loginResult = await this.userRepository.loginUser(credentials);

    const userOutputData = {
      success: loginResult.success,
      message: loginResult.message,
      user: loginResult.user,
    };

    return this.userOutputPort.prepareUserOutput(userOutputData);
  }

  async confirmEmailAddress(userInput) {
    const verificationData =
      this.userInputPort.validateVerificationInput(userInput);
    if (verificationData.validationError) {
      return { validationError: verificationData.validationError };
    }

    const verificationResult = await this.userRepository.confirmEmailAddress(
      verificationData
    );

    const outputData = {
      success: verificationResult.success,
      message: verificationResult.message,
    };

    return this.userOutputPort.prepareOutput(outputData);
  }

  async requestNewVerificationCode(userInput) {
    const codeRequestData = this.userInputPort.validateRequestData(userInput);
    if (codeRequestData.validationError) {
      return { validationError: codeRequestData.validationError };
    }

    const codeRequestResult =
      await this.userRepository.requestNewVerificationCode(codeRequestData);

    const outputData = {
      success: codeRequestResult.success,
      message: codeRequestResult.message,
    };

    return this.userOutputPort.prepareOutput(outputData);
  }

  async requestNewPassword(userInput) {
    const passwordRequestData =
      this.userInputPort.validateRequestData(userInput);
    if (passwordRequestData.validationError) {
      return { validationError: passwordRequestData.validationError };
    }

    const passwordRequestResult = await this.userRepository.requestNewPassword(
      passwordRequestData
    );

    const outputData = {
      success: passwordRequestResult.success,
      message: passwordRequestResult.message,
    };

    return this.userOutputPort.prepareOutput(outputData);
  }
}
