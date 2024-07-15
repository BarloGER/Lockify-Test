const { Router } = require("express");
const {
  validateSession,
} = require("../../../interface-adapters/middlewares/validateSession");
const {
  validateRequestMetadata,
} = require("../../../interface-adapters/middlewares/validateRequestMetadata");
const {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} = require("../../../interface-adapters/controllers/contactController");

const contactRouter = Router();

contactRouter.get(
  "/get-contacts",
  validateRequestMetadata(),
  validateSession,
  getContacts
);
contactRouter.post(
  "/create-contact",
  validateRequestMetadata(),
  validateSession,
  createContact
);
contactRouter.put(
  "/update-contact/:id",
  validateRequestMetadata(),
  validateSession,
  updateContact
);
contactRouter.delete(
  "/delete-contact/:id",
  validateRequestMetadata(),
  validateSession,
  deleteContact
);

exports.contactRouter = contactRouter;
