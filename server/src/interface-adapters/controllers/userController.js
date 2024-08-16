const { UserInteractor } = require("../../usecases/user/UserInteractor");
const { UserRepository } = require("../repositories/UserRepository");
const { UserPresenter } = require("../presenters/UserPresenter");
const { MailRepository } = require("../repositories/MailRepository");
const { PasswordHashingService } = require("../utils/PasswordHashingService");
const { asyncHandler } = require("../utils/asyncHandler");
const { ErrorResponse } = require("../../utils/ErrorResponse");

const userRepository = new UserRepository();
const userPresenter = new UserPresenter();
const mailRepository = new MailRepository();
const passwordHashingService = new PasswordHashingService();
const userInteractor = new UserInteractor(
  userRepository,
  mailRepository,
  passwordHashingService,
);

exports.getUser = asyncHandler(async (req, res, next) => {
  const language =
    req.headers["accept-language"] &&
    req.headers["accept-language"].includes("de")
      ? "DE"
      : "EN";
  const { userId } = req;

  const isAuthenticated = req.session.userId === userId;
  if (!isAuthenticated) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_001" });
  }

  const result = await userInteractor.getUser(userId);
  let response;
  if (!result.success) {
    response = userPresenter.presentBlockedUser(language, result);
  }
  response = userPresenter.presentUser(language, result);

  res.status(200).json(response);
});

exports.registerUser = asyncHandler(async (req, res, next) => {
  const language =
    req.headers["accept-language"] &&
    req.headers["accept-language"].includes("de")
      ? "DE"
      : "EN";

  const unvalidatedUserInput = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    encryptedSecret: req.body.encryptedSecret,
    secretEncryptionIv: req.body.secretEncryptionIv,
    secretEncryptionSalt: req.body.secretEncryptionSalt,
    isNewsletterAllowed: req.body.isNewsletterAllowed,
  };

  const result = await userInteractor.createUser(unvalidatedUserInput);
  const response = userPresenter.presentUser(language, result);

  req.session.regenerate((err) => {
    if (err) {
      throw new ErrorResponse({
        errorCode: "SYS_SERVICE_001",
      });
    }
  });

  req.session.userId = response.user.userId;
  res.status(201).json(response);
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const language =
    req.headers["accept-language"] &&
    req.headers["accept-language"].includes("de")
      ? "DE"
      : "EN";

  const unvalidatedUserInput = {
    email: req.body.email,
    password: req.body.password,
  };

  const result = await userInteractor.authenticateUser(unvalidatedUserInput);
  const response = userPresenter.presentUser(language, result);

  req.session.regenerate((err) => {
    if (err) {
      throw new ErrorResponse({
        errorCode: "SYS_SERVICE_001",
      });
    }

    req.session.userId = result.user.userId;
    res.status(200).json(response);
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const language =
    req.headers["accept-language"] &&
    req.headers["accept-language"].includes("de")
      ? "DE"
      : "EN";
  const { userId } = req;

  const isAuthenticated = req.session.userId === userId;
  if (!isAuthenticated) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_001" });
  }

  const unvalidatedUserInput = {
    username: req.body.updatedData.username,
    email: req.body.updatedData.email,
    password: req.body.updatedData.password,
    isNewsletterAllowed: req.body.updatedData.isNewsletterAllowed,
  };

  const result = await userInteractor.updateUser(userId, unvalidatedUserInput);
  const response = userPresenter.presentUser(language, result);

  res.status(200).json(response);
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const language =
    req.headers["accept-language"] &&
    req.headers["accept-language"].includes("de")
      ? "DE"
      : "EN";
  const { userId } = req;

  const isAuthenticated = req.session.userId === userId;
  if (!isAuthenticated) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_001" });
  }

  const emptyUserInput = {};

  const result = await userInteractor.deleteUser(userId, emptyUserInput);
  const response = userPresenter.present(language, result);

  res.status(200).json(response);
});

exports.logoutUser = asyncHandler(async (req, res, next) => {
  const language =
    req.headers["accept-language"] &&
    req.headers["accept-language"].includes("de")
      ? "DE"
      : "EN";
  const { userId } = req;

  const isAuthenticated = req.session.userId === userId;
  if (!isAuthenticated) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_001" });
  }

  const response = {
    success: true,
    message:
      language === "DE" ? "Erfolgreich ausgeloggt" : "Logged out successfully",
  };

  req.session.destroy((err) => {
    if (err) {
      throw new ErrorResponse({ errorCode: "SYS_SERVICE_002" });
    }

    res.clearCookie("connect.sid", {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: true,
    });

    res.status(200).json(response);
  });
});

exports.confirmEmailAddress = asyncHandler(async (req, res, next) => {
  const language =
    req.headers["accept-language"] &&
    req.headers["accept-language"].includes("de")
      ? "DE"
      : "EN";
  const { userId } = req;

  const isAuthenticated = req.session.userId === userId;
  if (!isAuthenticated) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_001" });
  }

  const unvalidatedUserInput = {
    verificationCode: req.body.verificationCode,
  };

  const result = await userInteractor.verifyCode(userId, unvalidatedUserInput);
  const response = userPresenter.present(language, result);

  res.status(200).json(response);
});

exports.sendNewVerificationCode = asyncHandler(async (req, res, next) => {
  const language =
    req.headers["accept-language"] &&
    req.headers["accept-language"].includes("de")
      ? "DE"
      : "EN";

  const { userId } = req;

  const isAuthenticated = req.session.userId === userId;
  if (!isAuthenticated) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_001" });
  }

  const unvalidatedUserInput = {
    email: req.body.email,
  };

  const result = await userInteractor.updateVerificationCode(
    userId,
    unvalidatedUserInput,
  );
  const response = userPresenter.present(language, result);

  res.status(200).json(response);
});

exports.sendNewPassword = asyncHandler(async (req, res, next) => {
  const language =
    req.headers["accept-language"] &&
    req.headers["accept-language"].includes("de")
      ? "DE"
      : "EN";

  const unvalidatedUserInput = {
    email: req.body.email,
  };

  const result = await userInteractor.updatePassword(unvalidatedUserInput);
  const response = userPresenter.present(language, result);

  res.status(200).json(response);
});
