const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require('dotenv')
const cookiesParser = require("cookie-parser");
require("./config/database");
dotenv.config();
//middlewares
app.use(cors());
app.use(express.json());
app.use(cookiesParser());
app.use(
  morgan(
    ":date[web] :method :url :status :response-time ms - :res[content-length]"
  )
);
//routes
const authRouter = require("./routes/authRoutes");
const profileRouter = require("./routes/profileRoutes");

app.use("/api", authRouter);
// app.use(".api", authRouter);
app.use("/api", profileRouter);

app.listen(1717, () => {
  console.log("Server running on port 1717");
});
