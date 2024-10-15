const express = require("express");
const {
  signupController,
  loginController,
  googlesignup,
  //   forgetPasswordController,
} = require("../controller/authController");
const membership = require("../controller/profileController");
const authRouter = express.Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);
authRouter.post("/updateauth", googlesignup);
authRouter.post('/membership',membership);
// authRouter.patch("/profileEdit", forgetPasswordController);

module.exports = authRouter;
