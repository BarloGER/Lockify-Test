const { UserInteractor } = require("../../usecases/user/userInteractor");
const { UserRepository } = require("../repositories/userRepository");
const { UserPresenter } = require("../presenters/userPresenter");
const { PasswordHashingService } = require("../utils/PasswordHashingService");
const { asyncHandler } = require("../utils/asyncHandler");
const { ErrorResponse } = require("../../utils/ErrorResponse");

const userRepository = new UserRepository();
const userPresenter = new UserPresenter();
const passwordHashingService = new PasswordHashingService();
const userInteractor = new UserInteractor(
  userRepository,
  passwordHashingService
);

exports.registerUser = asyncHandler(async (req, res, next) => {
  const language = req.headers["accept-language"] === "de" ? "DE" : "EN";

  const userInput = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const result = await userInteractor.createUser(userInput);
  const response = userPresenter.present(language, result);

  req.session.regenerate((err) => {
    if (err) {
      throw new ErrorResponse({
        errorCode: "SYS_SERVICE_001",
      });
    }
  });

  req.session.userId = result.userId;
  res.status(201).json(response);
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const language = req.headers["accept-language"] === "de" ? "DE" : "EN";

  const userInput = {
    email: req.body.email,
    password: req.body.password,
  };

  const result = await userInteractor.authenticateUser(userInput);
  const response = userPresenter.present(language, result);

  req.session.regenerate((err) => {
    if (err) {
      throw new ErrorResponse({
        errorCode: "SYS_SERVICE_001",
      });
    }

    req.session.userId = result.userId;
    res.status(200).json(response);
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const language = req.headers["accept-language"] === "de" ? "DE" : "EN";
  const { userId } = req;

  if (req.session.userId !== userId) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_001" });
  }

  const userInput = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const result = await userInteractor.editUser(userId, userInput);
  const response = userPresenter.present(language, result);

  res.status(200).json(response);
});
