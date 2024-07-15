const {
  AccountInteractor,
} = require("../../usecases/account/AccountInteractor");
const { AccountRepository } = require("../repositories/AccountRepository");
const { AccountPresenter } = require("../presenters/AccountPresenter");
const { asyncHandler } = require("../utils/asyncHandler");
const { ErrorResponse } = require("../../utils/ErrorResponse");

const accountRepository = new AccountRepository();
const accountPresenter = new AccountPresenter();
const accountInteractor = new AccountInteractor(accountRepository);

exports.getAccounts = asyncHandler(async (req, res, next) => {
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

  const result = await accountInteractor.getAccounts(userId);
  const response = accountPresenter.presentAccounts(language, result);

  res.status(200).json(response);
});

exports.createAccount = asyncHandler(async (req, res, next) => {
  const language =
    req.headers["accept-language"] &&
    req.headers["accept-language"].includes("de")
      ? "DE"
      : "EN";

  const { userId } = req;

  const userInput = {
    accountName: req.body.accountName,
    accountUrl: req.body.accountUrl,
    username: req.body.username,
    email: req.body.email,
    encryptedPassword: req.body.encryptedPassword,
    passwordEncryptionIv: req.body.passwordEncryptionIv,
    passwordEncryptionSalt: req.body.passwordEncryptionSalt,
    encryptedNotes: req.body.encryptedNotes,
    notesEncryptionIv: req.body.notesEncryptionIv,
    notesEncryptionSalt: req.body.notesEncryptionSalt,
  };

  const result = await accountInteractor.createAccount(userId, userInput);
  const response = accountPresenter.presentSingleAccount(language, result);

  res.status(201).json(response);
});

exports.updateAccount = asyncHandler(async (req, res, next) => {
  const language =
    req.headers["accept-language"] &&
    req.headers["accept-language"].includes("de")
      ? "DE"
      : "EN";
  const { userId } = req;
  const accountId = req.params.id;

  const isAuthenticated = req.session.userId === userId;
  if (!isAuthenticated) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_001" });
  }

  const userInput = {
    accountName: req.body.accountName,
    accountUrl: req.body.accountUrl,
    username: req.body.username,
    email: req.body.email,
    encryptedPassword: req.body.encryptedPassword,
    passwordEncryptionIv: req.body.passwordEncryptionIv,
    passwordEncryptionSalt: req.body.passwordEncryptionSalt,
    encryptedNotes: req.body.encryptedNotes,
    notesEncryptionIv: req.body.notesEncryptionIv,
    notesEncryptionSalt: req.body.notesEncryptionSalt,
  };

  const result = await accountInteractor.updateAccount(accountId, userInput);
  const response = accountPresenter.presentSingleAccount(language, result);

  res.status(200).json(response);
});

exports.deleteAccount = asyncHandler(async (req, res, next) => {
  const language =
    req.headers["accept-language"] &&
    req.headers["accept-language"].includes("de")
      ? "DE"
      : "EN";
  const { userId } = req;
  const accountId = req.params.id;

  const isAuthenticated = req.session.userId === userId;
  if (!isAuthenticated) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_001" });
  }

  const userInput = {};

  const result = await accountInteractor.deleteAccount(accountId, userInput);
  const response = accountPresenter.present(language, result);

  res.status(200).json(response);
});
