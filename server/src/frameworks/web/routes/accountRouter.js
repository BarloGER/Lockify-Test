const { Router } = require("express");
const {
  validateSession,
} = require("../../../interface-adapters/middlewares/validateSession");
const {
  validateRequestMetadata,
} = require("../../../interface-adapters/middlewares/validateRequestMetadata");
const {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
} = require("../../../interface-adapters/controllers/accountController");

const accountRouter = Router();

accountRouter.get(
  "/get-accounts",
  validateRequestMetadata(),
  validateSession,
  getAccounts
);
accountRouter.post(
  "/create-account",
  validateRequestMetadata(),
  validateSession,
  createAccount
);
accountRouter.put(
  "/update-account/:id",
  validateRequestMetadata(),
  validateSession,
  updateAccount
);
accountRouter.delete(
  "/delete-account/:id",
  validateRequestMetadata(),
  validateSession,
  deleteAccount
);

exports.accountRouter = accountRouter;
