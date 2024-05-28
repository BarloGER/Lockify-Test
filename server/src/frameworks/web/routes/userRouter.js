const { Router } = require("express");
const {
  validateCookie,
} = require("../../../interface-adapters/middlewares/validateCookie");
const {
  validateJoi,
} = require("../../../interface-adapters/middlewares/validateJoi");
const {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
  deleteUserSchema,
} = require("../../../interface-adapters/joiSchemas/userSchemas");
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  confirmEmailAddress,
  sendNewVerificationCode,
} = require("../../../interface-adapters/controllers/userController");

const userRouter = Router();

userRouter.post("/register", validateJoi(registerUserSchema), registerUser);
userRouter.post("/login", validateJoi(loginUserSchema), loginUser);
userRouter.put(
  "/update",
  validateCookie,
  validateJoi(updateUserSchema),
  updateUser
);
userRouter.delete(
  "/delete",
  validateCookie,
  validateJoi(deleteUserSchema),
  deleteUser
);
userRouter.post("/confirm-email", validateCookie, confirmEmailAddress);
userRouter.post("/send-new-code", validateCookie, sendNewVerificationCode);

exports.userRouter = userRouter;
