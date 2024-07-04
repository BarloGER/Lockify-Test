const { NoteInteractor } = require("../../usecases/note/NoteInteractor");
const { NoteRepository } = require("../repositories/NoteRepository");
const { NotePresenter } = require("../presenters/NotePresenter");
const { asyncHandler } = require("../utils/asyncHandler");
const { ErrorResponse } = require("../../utils/ErrorResponse");

const noteRepository = new NoteRepository();
const notePresenter = new NotePresenter();
const noteInteractor = new NoteInteractor(noteRepository);

exports.getNotes = asyncHandler(async (req, res, next) => {
  const language = req.headers["accept-language"].includes("de") ? "DE" : "EN";
  const { userId } = req;

  const isAuthenticated = req.session.userId === userId;
  if (!isAuthenticated) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_001" });
  }

  const result = await noteInteractor.getNotes(userId);
  const response = notePresenter.presentNotes(language, result);

  res.status(200).json(response);
});

exports.createNote = asyncHandler(async (req, res, next) => {
  const language = req.headers["accept-language"].includes("de") ? "DE" : "EN";

  const { userId } = req;

  const userInput = {
    encryptedNoteTitle: req.body.encryptedNoteTitle,
    noteTitleEncryptionIv: req.body.noteTitleEncryptionIv,
    noteTitleEncryptionSalt: req.body.noteTitleEncryptionSalt,
    encryptedNoteContent: req.body.encryptedNoteContent,
    noteContentEncryptionIv: req.body.noteContentEncryptionIv,
    noteContentEncryptionSalt: req.body.noteContentEncryptionSalt,
  };

  const result = await noteInteractor.createNote(userId, userInput);
  const response = notePresenter.presentSingleNote(language, result);

  res.status(201).json(response);
});

exports.updateNote = asyncHandler(async (req, res, next) => {
  const language = req.headers["accept-language"].includes("de") ? "DE" : "EN";
  const { userId } = req;
  const noteId = req.params.id;

  const isAuthenticated = req.session.userId === userId;
  if (!isAuthenticated) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_001" });
  }

  const userInput = {
    encryptedNoteTitle: req.body.encryptedNoteTitle,
    noteTitleEncryptionIv: req.body.noteTitleEncryptionIv,
    noteTitleEncryptionSalt: req.body.noteTitleEncryptionSalt,
    encryptedNoteContent: req.body.encryptedNoteContent,
    noteContentEncryptionIv: req.body.noteContentEncryptionIv,
    noteContentEncryptionSalt: req.body.noteContentEncryptionSalt,
  };

  const result = await noteInteractor.updateNote(noteId, userInput);
  const response = notePresenter.presentSingleNote(language, result);

  res.status(200).json(response);
});

exports.deleteNote = asyncHandler(async (req, res, next) => {
  const language = req.headers["accept-language"].includes("de") ? "DE" : "EN";
  const { userId } = req;
  const noteId = req.params.id;

  const isAuthenticated = req.session.userId === userId;
  if (!isAuthenticated) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_001" });
  }

  const userInput = {};

  const result = await noteInteractor.deleteNote(noteId, userInput);
  const response = notePresenter.present(language, result);

  res.status(200).json(response);
});
