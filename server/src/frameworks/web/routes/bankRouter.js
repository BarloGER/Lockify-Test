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
  getBanks,
  createBank,
  updateBank,
  deleteBank,
} = require("../../../interface-adapters/controllers/bankController");

const bankRouter = Router();

bankRouter.get("/get-banks", validateSession, getBanks);
bankRouter.post("/create-bank", validateSession, createBank);
bankRouter.put("/update-bank/:id", validateSession, updateBank);
bankRouter.delete("/delete-bank/:id", validateSession, deleteBank);

exports.bankRouter = bankRouter;
