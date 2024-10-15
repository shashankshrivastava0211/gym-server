const express = require("express");

const membership = require('../controller/profileController')

// app.patch("/profileEdit");
const profileRouter = express.Router();
// profileRouter.get('/membership',membership);

module.exports = profileRouter;
