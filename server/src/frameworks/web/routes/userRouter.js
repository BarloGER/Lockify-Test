const { Router } = require("express");
const {
  validateSession,
} = require("../../../interface-adapters/middlewares/validateSession");
const {
  validateJoi,
} = require("../../../interface-adapters/middlewares/validateJoi");
const {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
  deleteUserSchema,
  confirmEmailSchema,
  sendMailSchema,
} = require("../../../interface-adapters/joiSchemas/userSchemas");
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

userRouter.post("/register", validateJoi(registerUserSchema), registerUser);
userRouter.post("/login", validateJoi(loginUserSchema), loginUser);
userRouter.get("/get-user", validateSession, getUser);
userRouter.put(
  "/update",
  validateSession,
  // validateJoi(updateUserSchema),
  updateUser
);
userRouter.delete(
  "/delete",
  validateSession,
  validateJoi(deleteUserSchema),
  deleteUser
);
userRouter.post(
  "/confirm-email",
  validateSession,
  validateJoi(confirmEmailSchema),
  confirmEmailAddress
);
userRouter.post(
  "/send-new-code",
  validateSession,
  validateJoi(sendMailSchema),
  sendNewVerificationCode
);
userRouter.post(
  "/send-new-password",
  validateJoi(sendMailSchema),
  sendNewPassword
);

exports.userRouter = userRouter;
