const {
  ContactInteractor,
} = require("../../usecases/contact/ContactInteractor");
const { ContactRepository } = require("../repositories/ContactRepository");
const { ContactPresenter } = require("../presenters/ContactPresenter");
const { asyncHandler } = require("../utils/asyncHandler");
const { ErrorResponse } = require("../../utils/ErrorResponse");

const contactRepository = new ContactRepository();
const contactPresenter = new ContactPresenter();
const contactInteractor = new ContactInteractor(contactRepository);

exports.getContacts = asyncHandler(async (req, res, next) => {
  const language = req.headers["accept-language"].includes("de") ? "DE" : "EN";
  const { userId } = req;

  const isAuthenticated = req.session.userId === userId;
  if (!isAuthenticated) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_001" });
  }

  const result = await contactInteractor.getContacts(userId);
  const response = contactPresenter.presentContacts(language, result);

  res.status(200).json(response);
});

exports.createContact = asyncHandler(async (req, res, next) => {
  const language = req.headers["accept-language"].includes("de") ? "DE" : "EN";

  const { userId } = req;

  const userInput = {
    companyName: req.body.companyName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    streetAddress: req.body.streetAddress,
    additionalAddressInfo: req.body.additionalAddressInfo,
    city: req.body.city,
    stateProvinceRegion: req.body.stateProvinceRegion,
    postalCode: req.body.postalCode,
    country: req.body.country,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    birthDate: req.body.birthDate,
    encryptedNotes: req.body.encryptedNotes,
    notesEncryptionIv: req.body.notesEncryptionIv,
    notesEncryptionSalt: req.body.notesEncryptionSalt,
  };

  const result = await contactInteractor.createContact(userId, userInput);
  const response = contactPresenter.presentSingleContact(language, result);

  res.status(201).json(response);
});

exports.updateContact = asyncHandler(async (req, res, next) => {
  const language = req.headers["accept-language"].includes("de") ? "DE" : "EN";
  const { userId } = req;
  const contactId = req.params.id;

  const isAuthenticated = req.session.userId === userId;
  if (!isAuthenticated) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_001" });
  }

  const userInput = {
    companyName: req.body.companyName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    streetAddress: req.body.streetAddress,
    additionalAddressInfo: req.body.additionalAddressInfo,
    city: req.body.city,
    stateProvinceRegion: req.body.stateProvinceRegion,
    postalCode: req.body.postalCode,
    country: req.body.country,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    birthDate: req.body.birthDate,
    encryptedNotes: req.body.encryptedNotes,
    notesEncryptionIv: req.body.notesEncryptionIv,
    notesEncryptionSalt: req.body.notesEncryptionSalt,
  };

  const result = await contactInteractor.updateContact(contactId, userInput);
  const response = contactPresenter.presentSingleContact(language, result);

  res.status(200).json(response);
});

exports.deleteContact = asyncHandler(async (req, res, next) => {
  const language = req.headers["accept-language"].includes("de") ? "DE" : "EN";
  const { userId } = req;
  const contactId = req.params.id;

  const isAuthenticated = req.session.userId === userId;
  if (!isAuthenticated) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_001" });
  }

  const userInput = {};

  const result = await contactInteractor.deleteContact(contactId, userInput);
  const response = contactPresenter.present(language, result);

  res.status(200).json(response);
});
