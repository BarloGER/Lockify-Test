const { Router } = require("express");
const {
  validateSession,
} = require("../../../interface-adapters/middlewares/validateSession");
// const {
//   validateJoi,
// } = require("../../../interface-adapters/middlewares/validateJoi");
// const {
//   registerUserSchema,
//   loginUserSchema,
//   updateUserSchema,
//   deleteUserSchema,
//   confirmEmailSchema,
//   sendMailSchema,
// } = require("../../../interface-adapters/joiSchemas/userSchemas");
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../../../interface-adapters/controllers/noteController");

const noteRouter = Router();

noteRouter.get("/get-notes", validateSession, getNotes);
noteRouter.post("/create-note", validateSession, createNote);
noteRouter.put("/update-note/:id", validateSession, updateNote);
noteRouter.delete("/delete-note/:id", validateSession, deleteNote);

exports.noteRouter = noteRouter;
