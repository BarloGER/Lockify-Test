const { Router } = require("express");
const {
  validateSession,
} = require("../../../interface-adapters/middlewares/validateSession");
const {
  validateRequestMetadata,
} = require("../../../interface-adapters/middlewares/validateRequestMetadata");
const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  confirmEmailAddress,
  sendNewVerificationCode,
  sendNewPassword,
} = require("../../../interface-adapters/controllers/userController");

const userRouter = Router();

userRouter.post("/register", validateRequestMetadata(), registerUser);
userRouter.post("/login", validateRequestMetadata(), loginUser);
userRouter.get(
  "/get-user",
  validateRequestMetadata(),
  validateSession,
  getUser
);
userRouter.put(
  "/update",
  validateRequestMetadata(),
  validateSession,
  updateUser
);
userRouter.delete(
  "/delete",
  validateRequestMetadata(),
  validateSession,
  deleteUser
);
userRouter.post(
  "/confirm-email",
  validateRequestMetadata(),
  validateSession,
  confirmEmailAddress
);
userRouter.post(
  "/send-new-code",
  validateRequestMetadata(),
  validateSession,
  sendNewVerificationCode
);
userRouter.post(
  "/send-new-password",
  validateRequestMetadata(),
  sendNewPassword
);

exports.userRouter = userRouter;
