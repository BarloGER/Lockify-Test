const crypto = require("crypto");
const { UserInputPort } = require("./UserInputPort");
const { UserOutputPort } = require("./UserOutputPort");
const { MailInteractor } = require("../mail/MailInteractor");
const { ErrorResponse } = require("../../utils/ErrorResponse");

//? Maybe rename lastVerificationAttempts

exports.UserInteractor = class UserInteractor {
  constructor(userRepository, passwordHashingService) {
    this.userRepository = userRepository;
    this.passwordHashingService = passwordHashingService;
    this.userInputPort = new UserInputPort();
    this.userOutputPort = new UserOutputPort();
    this.mailInteractor = new MailInteractor();
  }

  async createUser(userInput) {
    const user = this.userInputPort.createUser(userInput);

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
    user.verificationCode = crypto.randomBytes(4).toString("hex").toUpperCase();

    const savedUser = await this.userRepository.createUser(user);
    if (!savedUser) {
      throw new ErrorResponse({ errorCode: "DB_SERVICE_002" });
    }

    await this.mailInteractor.sendVerificationMail({
      email: user.email,
      verificationCode: user.verificationCode,
    });

    const userOutputData = {
      success: true,
      message: {
        EN: "Your registration was successful! Please confirm your e-mail address by entering the verification code we sent you. Don't forget to check your spam folder too.",
        DE: "Deine Registrierung war erfolgreich! Bitte bestätige deine E-Mail-Adresse durch Eingabe des Verifizierungscodes, den wir dir zugesendet haben. Vergiss nicht, auch deinen Spam-Ordner zu überprüfen.",
      },
      userId: savedUser.userId,
    };

    return this.userOutputPort.output(userOutputData);
  }

  async authenticateUser(userInput) {
    const credentials = this.userInputPort.authenticateUser(userInput);

    const foundUser = await this.userRepository.findUserByEmail(
      credentials.email
    );
    if (!foundUser) {
      throw new ErrorResponse({
        errorCode: "USER_NOT_FOUND_001",
      });
    }

    const isBlocked = foundUser.isBlocked;
    if (isBlocked) {
      throw new ErrorResponse({ errorCode: "USER_AUTHORIZATION_001" });
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

    const userOutputData = {
      success: true,
      message: {
        EN: "Login successful.",
        DE: "Anmeldung erfolgreich.",
      },
      userId: foundUser.userId,
    };

    return this.userOutputPort.output(userOutputData);
  }

  async editUser(userId, userInput) {
    const updateData = this.userInputPort.editUser(userInput);

    const foundUser = await this.userRepository.findUserById(userId);
    if (!foundUser) {
      throw new ErrorResponse({
        errorCode: "USER_NOT_FOUND_002",
      });
    }

    const isBlocked = foundUser.isBlocked;
    if (isBlocked) {
      throw new ErrorResponse({ errorCode: "USER_AUTHORIZATION_001" });
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

    const userOutputData = {
      success: true,
      message: {
        EN: "User updated successfully.",
        DE: "Benutzer erfolgreich aktualisiert",
      },
    };

    return this.userOutputPort.output(userOutputData);
  }

  async deleteUser(userId, userInput) {
    const data = this.userInputPort.deleteUser(userInput);

    const foundUser = await this.userRepository.findUserById(userId);
    if (!foundUser) {
      throw new ErrorResponse({
        errorCode: "USER_NOT_FOUND_002",
      });
    }

    const isBlocked = foundUser.isBlocked;
    if (isBlocked) {
      throw new ErrorResponse({ errorCode: "USER_AUTHORIZATION_001" });
    }

    const deletedUser = await this.userRepository.deleteUser(userId, data);
    if (!deletedUser) {
      throw new ErrorResponse({
        errorCode: "DB_SERVICE_002",
      });
    }

    const userOutputData = {
      success: true,
      message: {
        EN: "User deleted successfully.",
        DE: "Benutzer erfolgreich gelöscht.",
      },
    };

    return this.userOutputPort.output(userOutputData);
  }

  async verifyCode(userId, userInput) {
    const verificationData = this.userInputPort.verifyCode(userInput);
    const verificationCode = verificationData.verificationCode.toUpperCase();

    const foundUser = await this.userRepository.findUserById(userId);
    if (!foundUser) {
      throw new ErrorResponse({
        errorCode: "USER_NOT_FOUND_002",
      });
    }

    const isBlocked = foundUser.isBlocked;
    if (isBlocked) {
      throw new ErrorResponse({ errorCode: "USER_AUTHORIZATION_001" });
    }

    const isAlreadyVerified = foundUser.isVerified;
    if (isAlreadyVerified) {
      throw new ErrorResponse({
        errorCode: "USER_CONFLICT_005",
      });
    }

    const tooManyAttempts = foundUser.verificationAttempts >= 5;
    if (tooManyAttempts) {
      const updateData = {
        isBlocked: true,
      };
      await this.userRepository.updateUser(userId, updateData);

      throw new ErrorResponse({
        errorCode: "USER_AUTHORIZATION_002",
      });
    }

    const isValidCode = foundUser.verificationCode === verificationCode;
    if (!isValidCode) {
      const updateData = {
        verificationAttempts: (foundUser.verificationAttempts += 1),
        lastVerificationAttempt: new Date(),
      };
      await this.userRepository.updateUser(userId, updateData);
      throw new ErrorResponse({
        errorCode: "USER_CONFLICT_004",
      });
    }

    const updateData = {
      isVerified: true,
      verificationCode: "",
      verificationAttempts: 0,
    };

    await this.userRepository.updateUser(userId, updateData);

    const userOutputData = {
      success: true,
      message: {
        EN: "You have successfully confirmed your email address.",
        DE: "Du hast deine Email-Adresse erfolgreich bestätigt.",
      },
    };

    return this.userOutputPort.output(userOutputData);
  }

  async updateVerificationCode(userId, userInput) {
    const userData = this.userInputPort.updateVerificationCode(userInput);
    const verificationCode = crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase();

    const foundUser = await this.userRepository.findUserById(userId);
    if (!foundUser) {
      throw new ErrorResponse({
        errorCode: "USER_NOT_FOUND_002",
      });
    }

    const isBlocked = foundUser.isBlocked;
    if (isBlocked) {
      throw new ErrorResponse({ errorCode: "USER_AUTHORIZATION_001" });
    }

    const isAlreadyVerified = foundUser.isVerified;
    if (isAlreadyVerified) {
      throw new ErrorResponse({
        errorCode: "USER_CONFLICT_005",
      });
    }

    const currentTime = new Date();

    const lastVerificationAttempt = foundUser.lastVerificationAttempt;
    if (lastVerificationAttempt !== null) {
      const timeSinceLastVerification = currentTime - lastVerificationAttempt;

      // Check whether the waiting time of 15 minutes has expired
      if (timeSinceLastVerification < 15 * 60 * 1000) {
        throw new ErrorResponse({
          errorCode: "USER_REQUEST_001",
        });
      }
    }

    await this.mailInteractor.sendVerificationMail({
      email: userData.email,
      verificationCode: verificationCode,
    });

    const updateData = {
      lastVerificationAttempt: currentTime,
      verificationCode: verificationCode,
    };

    await this.userRepository.updateUser(userId, updateData);

    const userOutputData = {
      success: true,
      message: {
        EN: "A new verification code has been sent to your email address. Don't forget to check your spam folder as well.",
        DE: "Dir wurde ein neuer Verifizierungscode an deine Email Adresse gesendet. Vergiss nicht auch deinen Spam Ordner zu überprüfen.",
      },
    };

    return this.userOutputPort.output(userOutputData);
  }

  async updatePassword(userInput) {
    const userData = this.userInputPort.updatePassword(userInput);

    const foundUser = await this.userRepository.findUserByEmail(userData.email);
    if (!foundUser) {
      throw new ErrorResponse({
        errorCode: "USER_NOT_FOUND_002",
      });
    }

    const isBlocked = foundUser.isBlocked;
    if (isBlocked) {
      throw new ErrorResponse({ errorCode: "USER_AUTHORIZATION_001" });
    }

    const generatePassword = () => {
      const randomBytes = crypto.randomBytes(12);
      const password = randomBytes.toString("hex");

      return password.substring(0, 12);
    };

    const newPassword = generatePassword();
    const newPasswordHash = await this.passwordHashingService.hashPassword(
      newPassword
    );

    const currentTime = new Date();
    const lastVerificationAttempt = foundUser.lastVerificationAttempt;
    if (lastVerificationAttempt !== null) {
      const timeSinceLastVerification = currentTime - lastVerificationAttempt;

      // Check whether the waiting time of 15 minutes has expired
      if (timeSinceLastVerification < 15 * 60 * 1000) {
        throw new ErrorResponse({
          errorCode: "USER_REQUEST_002",
        });
      }
    }

    await this.mailInteractor.sendNewPassword({
      email: userData.email,
      newPassword,
    });

    const updateData = {
      lastVerificationAttempt: currentTime,
      password: newPasswordHash,
    };

    const userId = foundUser.userId;
    await this.userRepository.updateUser(userId, updateData);

    const userOutputData = {
      success: true,
      message: {
        EN: "A new password has been sent to your email address. Don't forget to check your spam folder as well.",
        DE: "Dir wurde ein neues Passwort an deine Email Adresse gesendet. Vergiss nicht auch deinen Spam Ordner zu überprüfen.",
      },
    };

    return this.userOutputPort.output(userOutputData);
  }
};
