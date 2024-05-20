const { Router } = require("express");
const {
  registerUser,
} = require("../../../interface-adapters/controllers/userController");

const userRouter = Router();

userRouter.post("/register", registerUser);

exports.userRouter = userRouter;
