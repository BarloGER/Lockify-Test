const { BankInteractor } = require("../../usecases/bank/BankInteractor");
const { BankRepository } = require("../repositories/BankRepository");
const { BankPresenter } = require("../presenters/BankPresenter");
const { asyncHandler } = require("../utils/asyncHandler");
const { ErrorResponse } = require("../../utils/ErrorResponse");

const bankRepository = new BankRepository();
const bankPresenter = new BankPresenter();
const bankInteractor = new BankInteractor(bankRepository);

exports.getBanks = asyncHandler(async (req, res, next) => {
  const language = req.headers["accept-language"].includes("de") ? "DE" : "EN";
  const { userId } = req;

  const isAuthenticated = req.session.userId === userId;
  if (!isAuthenticated) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_001" });
  }

  const result = await bankInteractor.getBanks(userId);
  const response = bankPresenter.presentBanks(language, result);

  res.status(200).json(response);
});

exports.createBank = asyncHandler(async (req, res, next) => {
  const language = req.headers["accept-language"].includes("de") ? "DE" : "EN";

  const { userId } = req;

  const userInput = {
    bankName: req.body.bankName,
    accountHolderFirstName: req.body.accountHolderFirstName,
    accountHolderLastName: req.body.accountHolderLastName,
    encryptedIban: req.body.encryptedIban,
    ibanEncryptionIv: req.body.ibanEncryptionIv,
    ibanEncryptionSalt: req.body.ibanEncryptionSalt,
    swiftBic: req.body.swiftBic,
    accountType: req.body.accountType,
    branchCode: req.body.branchCode,
    cardHolderFirstName: req.body.cardHolderFirstName,
    cardHolderLastName: req.body.cardHolderLastName,
    encryptedCardNumber: req.body.encryptedCardNumber,
    cardNumberEncryptionIv: req.body.cardNumberEncryptionIv,
    cardNumberEncryptionSalt: req.body.cardNumberEncryptionSalt,
    expiryDate: req.body.expiryDate,
    encryptedCardCvvCvc: req.body.encryptedCardCvvCvc,
    cardCvvCvcEncryptionIv: req.body.cardCvvCvcEncryptionIv,
    cardCvvCvcEncryptionSalt: req.body.cardCvvCvcEncryptionSalt,
    cardType: req.body.cardType,
  };

  const result = await bankInteractor.createBank(userId, userInput);
  const response = bankPresenter.presentSingleBank(language, result);

  res.status(201).json(response);
});

exports.updateBank = asyncHandler(async (req, res, next) => {
  const language = req.headers["accept-language"].includes("de") ? "DE" : "EN";
  const { userId } = req;
  const bankId = req.params.id;

  const isAuthenticated = req.session.userId === userId;
  if (!isAuthenticated) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_001" });
  }

  const userInput = {
    bankName: req.body.bankName,
    accountHolderFirstName: req.body.accountHolderFirstName,
    accountHolderLastName: req.body.accountHolderLastName,
    encryptedIban: req.body.encryptedIban,
    ibanEncryptionIv: req.body.ibanEncryptionIv,
    ibanEncryptionSalt: req.body.ibanEncryptionSalt,
    swiftBic: req.body.swiftBic,
    accountType: req.body.accountType,
    branchCode: req.body.branchCode,
    cardHolderFirstName: req.body.cardHolderFirstName,
    cardHolderLastName: req.body.cardHolderLastName,
    encryptedCardNumber: req.body.encryptedCardNumber,
    cardNumberEncryptionIv: req.body.cardNumberEncryptionIv,
    cardNumberEncryptionSalt: req.body.cardNumberEncryptionSalt,
    expiryDate: req.body.expiryDate,
    encryptedCardCvvCvc: req.body.encryptedCardCvvCvc,
    cardCvvCvcEncryptionIv: req.body.cardCvvCvcEncryptionIv,
    cardCvvCvcEncryptionSalt: req.body.cardCvvCvcEncryptionSalt,
    cardType: req.body.cardType,
  };

  const result = await bankInteractor.updateBank(bankId, userInput);
  const response = bankPresenter.presentSingleBank(language, result);

  res.status(200).json(response);
});

exports.deleteBank = asyncHandler(async (req, res, next) => {
  const language = req.headers["accept-language"].includes("de") ? "DE" : "EN";
  const { userId } = req;
  const bankId = req.params.id;

  const isAuthenticated = req.session.userId === userId;
  if (!isAuthenticated) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_001" });
  }

  const userInput = {};

  const result = await bankInteractor.deleteBank(bankId, userInput);
  const response = bankPresenter.present(language, result);

  res.status(200).json(response);
});
