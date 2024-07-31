const crypto = require("crypto");
const { UserInputPort } = require("./UserInputPort");
const { UserOutputPort } = require("./UserOutputPort");
const { MailInteractor } = require("../mail/MailInteractor");
const { ErrorResponse } = require("../../utils/ErrorResponse");

//? Maybe rename lastVerificationAttempts

exports.UserInteractor = class UserInteractor {
  constructor(userRepository, mailRepository, passwordHashingService) {
    this.userRepository = userRepository;
    this.mailRepository = mailRepository;
    this.passwordHashingService = passwordHashingService;
    this.userInputPort = new UserInputPort();
    this.userOutputPort = new UserOutputPort();
    this.mailInteractor = new MailInteractor(mailRepository);
  }

  async getUser(userId) {
    const foundUser = await this.userRepository.findUserById(userId);
    if (!foundUser) {
      throw new ErrorResponse({
        errorCode: "USER_NOT_FOUND_002",
      });
    }

    const isBlocked = foundUser.isBlocked;
    if (isBlocked) {
      return this.userOutputPort.formatBlockedUser(foundUser);
    }

    return this.userOutputPort.formatFoundUser(foundUser);
  }

  async createUser(unvalidatedUserInput) {
    const validUserEntity =
      this.userInputPort.validateInputForCreateUser(unvalidatedUserInput);
    if (validUserEntity.validationError) {
      const validationError = validUserEntity.validationError;
      throw new ErrorResponse({
        errorCode: `${validationError}`,
      });
    }

    if (await this.userRepository.existsByUsername(validUserEntity.username)) {
      throw new ErrorResponse({
        errorCode: "USER_CONFLICT_001",
      });
    }
    if (await this.userRepository.existsByEmail(validUserEntity.email)) {
      throw new ErrorResponse({
        errorCode: "USER_CONFLICT_002",
      });
    }

    validUserEntity.password = await this.passwordHashingService.hashPassword(
      validUserEntity.password
    );
    validUserEntity.verificationCode = crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase();

    const createdUserResponse = await this.userRepository.saveUserToDB(
      validUserEntity
    );
    if (!createdUserResponse) {
      throw new ErrorResponse({ errorCode: "DB_SERVICE_002" });
    }

    await this.mailInteractor.sendVerificationMail({
      email: validUserEntity.email,
      verificationCode: validUserEntity.verificationCode,
    });

    return this.userOutputPort.formatCreatedUser(createdUserResponse);
  }

  async authenticateUser(unvalidatedUserInput) {
    const validUserEntity =
      this.userInputPort.validateInputForAuthenticateUser(unvalidatedUserInput);
    if (validUserEntity.validationError) {
      const validationError = validUserEntity.validationError;
      throw new ErrorResponse({
        errorCode: `${validationError}`,
      });
    }

    const foundUser = await this.userRepository.findUserByEmail(
      validUserEntity.email
    );
    if (!foundUser) {
      throw new ErrorResponse({
        errorCode: "USER_NOT_FOUND_001",
      });
    }

    const isValidPassword =
      await this.passwordHashingService.comparePasswordHash(
        validUserEntity.password,
        foundUser.password
      );
    if (!isValidPassword) {
      throw new ErrorResponse({
        errorCode: "USER_CONFLICT_003",
      });
    }

    return this.userOutputPort.formatFoundUser(foundUser);
  }

  async updateUser(userId, unvalidatedUserInput) {
    const validUserEntity =
      this.userInputPort.validateInputForUpdateUser(unvalidatedUserInput);
    if (validUserEntity.validationError) {
      const validationError = validUserEntity.validationError;
      throw new ErrorResponse({
        errorCode: `${validationError}`,
      });
    }

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

    if (validUserEntity.username) {
      if (
        await this.userRepository.existsByUsername(validUserEntity.username)
      ) {
        throw new ErrorResponse({
          errorCode: "USER_CONFLICT_001",
        });
      }
    }

    if (validUserEntity.email) {
      if (await this.userRepository.existsByEmail(validUserEntity.email)) {
        throw new ErrorResponse({
          errorCode: "USER_CONFLICT_002",
        });
      }
    }

    if (validUserEntity.password) {
      validUserEntity.password = await this.passwordHashingService.hashPassword(
        validUserEntity.password
      );
    }

    const updatedUserResponse = await this.userRepository.updateUserInDB(
      userId,
      validUserEntity
    );
    if (!updatedUserResponse) {
      throw new ErrorResponse({
        errorCode: "DB_SERVICE_002",
      });
    }

    return this.userOutputPort.formatUpdatedUser(updatedUserResponse);
  }

  async deleteUser(userId, emptyUserInput) {
    const emptyUserEntity =
      this.userInputPort.validateInputForDeleteUser(emptyUserInput);

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

    const deletedUserResponse = await this.userRepository.deleteUser(
      userId,
      emptyUserEntity
    );
    if (!deletedUserResponse) {
      throw new ErrorResponse({
        errorCode: "DB_SERVICE_002",
      });
    }

    return this.userOutputPort.formatDeletedUser(deletedUserResponse);
  }

  async verifyCode(userId, unvalidatedUserInput) {
    const validUserEntity =
      this.userInputPort.validateInputForVerification(unvalidatedUserInput);
    if (validUserEntity.validationError) {
      const validationError = validUserEntity.validationError;
      throw new ErrorResponse({
        errorCode: `${validationError}`,
      });
    }

    const verificationCode = validUserEntity.verificationCode.toUpperCase();

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
      await this.userRepository.updateUserInDB(userId, updateData);

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
      await this.userRepository.updateUserInDB(userId, updateData);
      throw new ErrorResponse({
        errorCode: "USER_CONFLICT_004",
      });
    }

    const updateData = {
      isVerified: true,
      verificationCode: "",
      verificationAttempts: 0,
    };

    const updatedUserResponse = await this.userRepository.updateUserInDB(
      userId,
      updateData
    );
    if (!updatedUserResponse) {
      throw new ErrorResponse({
        errorCode: "DB_SERVICE_002",
      });
    }

    return this.userOutputPort.formatSuccessfulVerification(
      updatedUserResponse
    );
  }

  async updateVerificationCode(userId, unvalidatedUserInput) {
    const validUserEntity =
      this.userInputPort.validateInputForUpdateData(unvalidatedUserInput);
    if (validUserEntity.validationError) {
      const validationError = validUserEntity.validationError;
      throw new ErrorResponse({
        errorCode: `${validationError}`,
      });
    }

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
      email: validUserEntity.email,
      verificationCode: verificationCode,
    });

    const updateData = {
      lastVerificationAttempt: currentTime,
      verificationCode: verificationCode,
    };

    const updatedUserResponse = await this.userRepository.updateUserInDB(
      userId,
      updateData
    );
    if (!updatedUserResponse) {
      throw new ErrorResponse({
        errorCode: "DB_SERVICE_002",
      });
    }

    return this.userOutputPort.formatUpdatedVerificationCode(
      updatedUserResponse
    );
  }

  async updatePassword(unvalidatedUserInput) {
    const validUserEntity =
      this.userInputPort.validateInputForUpdateData(unvalidatedUserInput);
    if (validUserEntity.validationError) {
      const validationError = validUserEntity.validationError;
      throw new ErrorResponse({
        errorCode: `${validationError}`,
      });
    }

    const foundUser = await this.userRepository.findUserByEmail(
      validUserEntity.email
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

    await this.mailInteractor.sendNewPasswordMail({
      email: validUserEntity.email,
      newPassword,
    });

    const updateData = {
      lastVerificationAttempt: currentTime,
      password: newPasswordHash,
    };

    const userId = foundUser.userId;
    const updatedUserResponse = await this.userRepository.updateUserInDB(
      userId,
      updateData
    );
    if (!updatedUserResponse) {
      throw new ErrorResponse({
        errorCode: "DB_SERVICE_002",
      });
    }

    return this.userOutputPort.formatUpdatedPassword(updatedUserResponse);
  }
};
