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
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} = require("../../../interface-adapters/controllers/contactController");

const contactRouter = Router();

contactRouter.get("/get-contacts", validateSession, getContacts);
contactRouter.post("/create-contact", validateSession, createContact);
contactRouter.put("/update-contact/:id", validateSession, updateContact);
contactRouter.delete("/delete-contact/:id", validateSession, deleteContact);

exports.contactRouter = contactRouter;
