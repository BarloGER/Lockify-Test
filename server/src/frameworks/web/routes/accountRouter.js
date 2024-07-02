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
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
} = require("../../../interface-adapters/controllers/accountController");

const accountRouter = Router();

accountRouter.get("/get-accounts", validateSession, getAccounts);
accountRouter.post("/create-account", validateSession, createAccount);
accountRouter.put("/update-account/:id", validateSession, updateAccount);
accountRouter.delete("/delete-account/:id", validateSession, deleteAccount);

exports.accountRouter = accountRouter;
