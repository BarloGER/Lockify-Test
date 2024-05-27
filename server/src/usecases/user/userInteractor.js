const crypto = require("crypto");
const { UserInputPort } = require("./userInputPort");
const { userOutput } = require("./userOutputPort");
const { ErrorResponse } = require("../../utils/ErrorResponse");

const userInputPort = new UserInputPort();

exports.UserInteractor = class UserInteractor {
  constructor(userRepository, passwordHashingService) {
    this.userRepository = userRepository;
    this.passwordHashingService = passwordHashingService;
  }

  async createUser(userInput) {
    const user = userInputPort.createUser(userInput);

    if (await this.userRepository.existsByUsername(user.username)) {
      throw new ErrorResponse({
        errorCode: "USER_CONFLICT_001",
      });
    }
    if (await this.userRepository.existsByEmail(user.email)) {
      throw new ErrorResponse({
        errorCode: "USER_CONFLICT_002",
      });
    }

    user.password = await this.passwordHashingService.hashPassword(
      user.password
    );
    user.verificationCode = crypto.randomBytes(4).toString("hex");

    const savedUser = await this.userRepository.createUser(user);
    return userOutput({
      success: true,
      message: {
        EN: "Your registration was successful! Please confirm your e-mail address by entering the verification code we sent you. Don't forget to check your spam folder too.",
        DE: "Deine Registrierung war erfolgreich! Bitte bestätige deine E-Mail-Adresse durch Eingabe des Verifizierungscodes, den wir dir zugesendet haben. Vergiss nicht, auch deinen Spam-Ordner zu überprüfen.",
      },
      userId: savedUser.userId,
    });
  }

  async authenticateUser(userInput) {
    const credentials = userInputPort.authenticateUser(userInput);

    const foundUser = await this.userRepository.findUserByEmail(
      credentials.email
    );
    if (!foundUser) {
      throw new ErrorResponse({
        errorCode: "USER_NOT_FOUND_001",
      });
    }

    const isValidPassword =
      await this.passwordHashingService.comparePasswordHash(
        credentials.password,
        foundUser.password
      );
    if (!isValidPassword) {
      throw new ErrorResponse({
        errorCode: "USER_CONFLICT_003",
      });
    }

    return userOutput({
      success: true,
      message: {
        EN: "Login successful.",
        DE: "Anmeldung erfolgreich.",
      },
      userId: foundUser.userId,
    });
  }

  async editUser(userId, userInput) {
    const updateData = userInputPort.editUser(userInput);

    const foundUser = await this.userRepository.findUserById(userId);
    if (!foundUser) {
      throw new ErrorResponse({
        errorCode: "USER_NOT_FOUND_002",
      });
    }

    if (userInput.username) {
      if (await this.userRepository.existsByUsername(userInput.username)) {
        throw new ErrorResponse({
          errorCode: "USER_CONFLICT_001",
        });
      }
      updateData.username = userInput.username;
    }

    if (userInput.email) {
      if (await this.userRepository.existsByEmail(userInput.email)) {
        throw new ErrorResponse({
          errorCode: "USER_CONFLICT_002",
        });
      }
      updateData.email = userInput.email;
    }

    if (userInput.password) {
      updateData.password = await this.passwordHashingService.hashPassword(
        userInput.password
      );
    }

    const updatedUser = await this.userRepository.updateUser(
      userId,
      updateData
    );
    if (!updatedUser) {
      throw new ErrorResponse({
        errorCode: "DB_SERVICE_002",
      });
    }

    return userOutput({
      success: true,
      message: {
        EN: "User updated successfully.",
        DE: "Benutzer erfolgreich aktualisiert.",
      },
      userId: updatedUser.userId,
    });
  }

  async deleteUser(userId, userInput) {
    const data = userInputPort.deleteUser(userInput);

    const foundUser = await this.userRepository.findUserById(userId);
    if (!foundUser) {
      throw new ErrorResponse({
        errorCode: "USER_NOT_FOUND_002",
      });
    }

    const deletedUser = await this.userRepository.deleteUser(userId, data);
    if (!deletedUser) {
      throw new ErrorResponse({
        errorCode: "DB_SERVICE_002",
      });
    }

    return userOutput({
      success: true,
      message: {
        EN: "User deleted successfully.",
        DE: "Benutzer erfolgreich gelöscht.",
      },
    });
  }
};
