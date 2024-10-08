const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const signupController = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please provide email and password");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).send("Internal server error" + "" + err.message);
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please provide email and password");
    }
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ _id: user._id }, "bllps5830F", {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).send("Internal server error: " + err.message);
  }
};
// const forgetPasswordController = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       throw new Error("User not found");
//     }
//     const token = jwt.sign({ _id: user._id }, "bllps5830F", {
//       expiresIn: "7d",
//     });
//     res.cookie("token", token, {
//       httpOnly: true,
//     });
//     res.status(200).json({
//       success: true,
//       message: "User logged in successfully",
//       data: user,
//     });
//   } catch (err) {
//     res.status(500).send("Internal server error: " + err.message);
//   }
// };

module.exports = {
  signupController,
  loginController,
  //   forgetPasswordController,
};
