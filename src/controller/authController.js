const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();
const setCookies = (res, accessToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 15 minutes
  });

  // res.cookie("refreshToken", refreshToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "strict",
  //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  // });
};


const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  // const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
  //   expiresIn: "7d",
  // });

  // return { accessToken, refreshToken };

  return accessToken;
};




const signupController = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
  const existUser =await User.findOne({email});
  
    if(existUser){
      return res.status(400).json({message: "Email already exist"});
    }


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
const accessToken = generateTokens(user._id);
setCookies(res, accessToken);
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


const googlesignup = async(req,res)=>{
  try {
    const {email,name,photoURL} = req.body;
    const user =await User.findOne({email})
    if(user){
      console.log("user is present ");
      return res.status(200).json({
        message:"user is present"
      })
    }
    else{
      let newname = name.split(' ');
      let firstName = newname[0];
      let lastName = newname[1];
    let photoURL = photoURL||"";
      
      const newUser = await User.create({
        firstName,
        lastName,
        email,
       
      });

      await newUser.save();


      return res.status(200).json({
        message:"user is not present",
        firstname:newname[0],
        lastname:newname[1]||"",
        photoURL:photoURL,
      })
    }
  } catch (error) {
    console.error(error);
  }
}

const  logoutController = async (req, res) => {}



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
  googlesignup,
  //   forgetPasswordController,
};
