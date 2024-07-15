const { Router } = require("express");
const {
  validateSession,
} = require("../../../interface-adapters/middlewares/validateSession");
const {
  validateRequestMetadata,
} = require("../../../interface-adapters/middlewares/validateRequestMetadata");
const {
  getBanks,
  createBank,
  updateBank,
  deleteBank,
} = require("../../../interface-adapters/controllers/bankController");

const bankRouter = Router();

bankRouter.get(
  "/get-banks",
  validateRequestMetadata(),
  validateSession,
  getBanks
);
bankRouter.post(
  "/create-bank",
  validateRequestMetadata(),
  validateSession,
  createBank
);
bankRouter.put(
  "/update-bank/:id",
  validateRequestMetadata(),
  validateSession,
  updateBank
);
bankRouter.delete(
  "/delete-bank/:id",
  validateRequestMetadata(),
  validateSession,
  deleteBank
);

exports.bankRouter = bankRouter;
