const express = require("express");
const {
  signupController,
  loginController,
  //   forgetPasswordController,
} = require("../controller/authController");
const authRouter = express.Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);
// authRouter.patch("/profileEdit", forgetPasswordController);

module.exports = authRouter;
