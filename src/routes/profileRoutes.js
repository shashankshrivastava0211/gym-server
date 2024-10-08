const app = require("express");
const profileRouter = app.Router();

app.patch("/profileEdit");

module.exports = profileRouter;
