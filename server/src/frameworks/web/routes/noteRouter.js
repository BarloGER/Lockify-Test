const { Router } = require("express");
const {
  validateSession,
} = require("../../../interface-adapters/middlewares/validateSession");
const {
  validateRequestMetadata,
} = require("../../../interface-adapters/middlewares/validateRequestMetadata");
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../../../interface-adapters/controllers/noteController");

const noteRouter = Router();

noteRouter.get(
  "/get-notes",
  validateRequestMetadata(),
  validateSession,
  getNotes
);
noteRouter.post(
  "/create-note",
  validateRequestMetadata(),
  validateSession,
  createNote
);
noteRouter.put(
  "/update-note/:id",
  validateRequestMetadata(),
  validateSession,
  updateNote
);
noteRouter.delete(
  "/delete-note/:id",
  validateRequestMetadata(),
  validateSession,
  deleteNote
);

exports.noteRouter = noteRouter;
