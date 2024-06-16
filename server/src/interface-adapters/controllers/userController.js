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
  passwordHashingService
);

exports.registerUser = asyncHandler(async (req, res, next) => {
  const language = req.headers["accept-language"].includes("de") ? "DE" : "EN";

  const userInput = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    isNewsletterAllowed: req.body.isNewsletterAllowed,
  };

  const result = await userInteractor.createUser(userInput);
  const response = userPresenter.presentUser(language, result);

  req.session.regenerate((err) => {
    if (err) {
      throw new ErrorResponse({
        errorCode: "SYS_SERVICE_001",
      });
    }
  });

  req.session.userId = result.user.userId;
  res.status(201).json(response);
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const language = req.headers["accept-language"].includes("de") ? "DE" : "EN";

  const userInput = {
    email: req.body.email,
    password: req.body.password,
  };

  const result = await userInteractor.authenticateUser(userInput);
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

exports.getUser = asyncHandler(async (req, res, next) => {
  const language = req.headers["accept-language"].includes("de") ? "DE" : "EN";
  const { userId } = req;

  const isAuthenticated = req.session.userId === userId;
  if (!isAuthenticated) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_001" });
  }

  const result = await userInteractor.getUser(userId);
  const response = userPresenter.presentUser(language, result);

  res.status(200).json(response);
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const language = req.headers["accept-language"].includes("de") ? "DE" : "EN";
  const { userId } = req;

  const isAuthenticated = req.session.userId === userId;
  if (!isAuthenticated) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_001" });
  }

  const userInput = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    isNewsletterAllowed: req.body.isNewsletterAllowed,
  };

  const result = await userInteractor.editUser(userId, userInput);
  const response = userPresenter.presentUser(language, result);

  res.status(200).json(response);
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const language = req.headers["accept-language"].includes("de") ? "DE" : "EN";
  const { userId } = req;

  const isAuthenticated = req.session.userId === userId;
  if (!isAuthenticated) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_001" });
  }

  const userInput = {};

  const result = await userInteractor.deleteUser(userId, userInput);
  const response = userPresenter.present(language, result);

  res.status(200).json(response);
});

exports.confirmEmailAddress = asyncHandler(async (req, res, next) => {
  const language = req.headers["accept-language"].includes("de") ? "DE" : "EN";
  const { userId } = req;

  const isAuthenticated = req.session.userId === userId;
  if (!isAuthenticated) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_001" });
  }

  const userInput = {
    verificationCode: req.body.verificationCode,
  };

  const result = await userInteractor.verifyCode(userId, userInput);
  const response = userPresenter.present(language, result);

  res.status(200).json(response);
});

exports.sendNewVerificationCode = asyncHandler(async (req, res, next) => {
  const language = req.headers["accept-language"].includes("de") ? "DE" : "EN";

  const { userId } = req;

  const isAuthenticated = req.session.userId === userId;
  if (!isAuthenticated) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_001" });
  }

  const userInput = {
    email: req.body.email,
  };

  const result = await userInteractor.updateVerificationCode(userId, userInput);
  const response = userPresenter.present(language, result);

  res.status(200).json(response);
});

exports.sendNewPassword = asyncHandler(async (req, res, next) => {
  const language = req.headers["accept-language"].includes("de") ? "DE" : "EN";

  const userInput = {
    email: req.body.email,
  };

  const result = await userInteractor.updatePassword(userInput);
  const response = userPresenter.present(language, result);

  res.status(200).json(response);
});
